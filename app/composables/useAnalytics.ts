// Analytics API composable：上报、URL 脱敏、失败队列、卸载时 flush（fetch keepalive）

const QUEUE_KEY = 'analytics_retry_queue';
const MAX_QUEUE = 25;

const SENSITIVE_PARAMS = new Set([
  'token',
  'access_token',
  'refresh_token',
  'id_token',
  'password',
  'secret',
  'auth',
  'session',
  'csrf',
  'api_key',
  'client_secret',
]);

/** 从 URL 中移除常见敏感 query，降低泄露风险 */
export function sanitizeAnalyticsUrl(href: string): string {
  if (!href || typeof href !== 'string')
    return '';
  try {
    const u = new URL(href);
    for (const key of [...u.searchParams.keys()]) {
      if (SENSITIVE_PARAMS.has(key.toLowerCase()))
        u.searchParams.delete(key);
    }
    return u.toString();
  }
  catch {
    return href;
  }
}

export function useAnalytics() {
  const config = useRuntimeConfig();
  const siteKey = config.public.analyticsSiteId as string;

  const getTrackEndpoint = () => {
    const baseUrl = config.public.analyticsBaseUrl as string;
    return `${baseUrl}/api/stats/track`;
  };

  const isDisabled = () => {
    if (!import.meta.client)
      return true;
    const d = config.public.analyticsDisabled;
    if (d === true || d === 'true')
      return true;
    const baseUrl = config.public.analyticsBaseUrl as string;
    if (!baseUrl || !siteKey)
      return true;
    return false;
  };

  const sessionOnlyUser = () => {
    const v = config.public.analyticsSessionOnlyUser;
    return v === true || v === 'true';
  };

  const getOrCreateStorageId = (storage: Storage, key: string, prefix: string) => {
    let value = storage.getItem(key);
    if (!value) {
      value = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      storage.setItem(key, value);
    }
    return value;
  };

  const getAnonymousUserId = () => {
    if (!import.meta.client)
      return `u_server_${Date.now()}`;
    const storage = sessionOnlyUser() ? sessionStorage : localStorage;
    return getOrCreateStorageId(storage, 'analytics_user_id', 'u');
  };

  const getSessionId = () => {
    if (!import.meta.client)
      return `s_server_${Date.now()}`;
    return getOrCreateStorageId(sessionStorage, 'analytics_session_id', 's');
  };

  function readQueue(): Record<string, unknown>[] {
    try {
      const raw = sessionStorage.getItem(QUEUE_KEY);
      if (!raw)
        return [];
      const arr = JSON.parse(raw) as unknown;
      return Array.isArray(arr) ? (arr as Record<string, unknown>[]) : [];
    }
    catch {
      return [];
    }
  }

  function writeQueue(items: Record<string, unknown>[]) {
    try {
      sessionStorage.setItem(QUEUE_KEY, JSON.stringify(items.slice(-MAX_QUEUE)));
    }
    catch {
      /* ignore quota */
    }
  }

  function enqueueFailed(body: Record<string, unknown>) {
    const q = readQueue();
    q.push(body);
    writeQueue(q);
  }

  async function postTrack(
    body: Record<string, unknown>,
    options?: { keepalive?: boolean },
  ): Promise<boolean> {
    const token = config.public.analyticsToken as string;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token)
      headers.Authorization = `Bearer ${token}`;

    try {
      const response = await fetch(getTrackEndpoint(), {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        keepalive: options?.keepalive === true,
      });
      return response.ok;
    }
    catch {
      return false;
    }
  }

  /** 重试队列：可在首屏或 pagehide 时调用 */
  async function flushRetryQueue(options?: { keepalive?: boolean }) {
    if (isDisabled())
      return;
    const pending = readQueue();
    if (pending.length === 0)
      return;
    sessionStorage.removeItem(QUEUE_KEY);
    const failed: Record<string, unknown>[] = [];
    for (const body of pending) {
      const ok = await postTrack(body, options);
      if (!ok)
        failed.push(body);
    }
    if (failed.length > 0)
      writeQueue(failed);
  }

  const sendTrackEvent = async (payload: {
    eventType: 'click' | 'pageview' | 'banner_view';
    elementInfo?: Record<string, unknown>;
  }) => {
    if (isDisabled())
      return;

    const body: Record<string, unknown> = {
      userId: getAnonymousUserId(),
      sessionId: getSessionId(),
      siteKey,
      eventType: payload.eventType,
      url: sanitizeAnalyticsUrl(import.meta.client ? window.location.href : ''),
      elementInfo: payload.elementInfo || {},
      timestamp: new Date().toISOString(),
    };

    const ok = await postTrack(body);
    if (!ok) {
      enqueueFailed(body);
      if (import.meta.dev)
        console.error('[Analytics] Request failed, queued for retry');
    }
  };

  const sendContactAnalytics = async (data: {
    action: string;
    form: string;
    subject?: string;
    reason?: string;
  }) => {
    await sendTrackEvent({
      eventType: 'click',
      elementInfo: data,
    });
  };

  const trackPageview = async (path = '') => {
    await sendTrackEvent({
      eventType: 'pageview',
      elementInfo: {
        path,
      },
    });
  };

  return {
    sendTrackEvent,
    sendContactAnalytics,
    trackPageview,
    flushRetryQueue,
  };
}
