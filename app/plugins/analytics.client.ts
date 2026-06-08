/**
 * 全站 PV：路由完成后上报；启动与离开页面时尝试 flush 失败队列（fetch keepalive）。
 */
export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { trackPageview, flushRetryQueue } = useAnalytics();

  void flushRetryQueue();

  router.afterEach((to) => {
    void trackPageview(to.fullPath);
  });

  if (import.meta.client) {
    window.addEventListener('pagehide', () => {
      void flushRetryQueue({ keepalive: true });
    });
  }
});
