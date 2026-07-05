import { buildLlmsFullContents } from '../../shared/seo/llms-full'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('llms:generate:full', async (_event, options, contents) => {
    const domain = String(options.domain || '')
    const title = String(options.full?.title || options.title || 'Documentation')
    const description = String(options.full?.description || options.description || '')

    contents.push(...await buildLlmsFullContents(domain, title, description))
  })
})
