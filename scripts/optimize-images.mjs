/**
 * 将 public/images 下的 PNG/JPEG 转为 WebP（保留原图作 fallback）。
 * 运行：npm run optimize:images
 */
import { readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const imagesRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public', 'images')
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg'])

function maxWidthFor(filePath) {
  if (filePath.includes(`${join('images', 'hero')}`) || filePath.includes('/hero/'))
    return 1920
  if (filePath.includes('logo'))
    return 512
  if (filePath.includes('about-us'))
    return 1600
  return 1200
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(fullPath)
      continue
    }
    const ext = extname(entry.name).toLowerCase()
    if (!IMAGE_EXT.has(ext))
      continue

    const outPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp')
    const meta = await sharp(fullPath).metadata()
    const width = maxWidthFor(fullPath)

    await sharp(fullPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outPath)

    const { size: originalSize } = await import('node:fs/promises').then(m => m.stat(fullPath))
    const { size: webpSize } = await import('node:fs/promises').then(m => m.stat(outPath))

    console.log(
      `${entry.name} (${Math.round(originalSize / 1024)}KB, ${meta.width}x${meta.height}) → ${Math.round(webpSize / 1024)}KB webp`,
    )
  }
}

await walk(imagesRoot)
console.log('Done.')
