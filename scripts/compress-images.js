/**
 * 图片压缩脚本 - 智能版
 * 使用 sharp 库批量压缩图片，自动选择最优压缩策略
 *
 * 使用方法：
 * 1. npm install sharp --save-dev
 * 2. node scripts/compress-images.js
 */

import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置项
const CONFIG = {
  targetDir: path.resolve(__dirname, '../public/images/products'),
  backup: false,  // 不备份，因为压缩后更大会自动跳过
  concurrency: 5,
  supportedFormats: ['.png', '.jpg', '.jpeg', '.webp']
}

// 统计信息
const stats = {
  total: 0,
  compressed: 0,
  skipped: 0,  // 压缩后更大，跳过
  failed: 0,
  originalSize: 0,
  compressedSize: 0,
  details: []
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function calcReduction(original, compressed) {
  if (original === 0) return '0%'
  return ((original - compressed) / original * 100).toFixed(1) + '%'
}

async function getImageFiles(dir) {
  const files = []
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== '.backup') {
      const subFiles = await getImageFiles(fullPath)
      files.push(...subFiles)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (CONFIG.supportedFormats.includes(ext)) {
        files.push(fullPath)
      }
    }
  }
  return files
}

/**
 * 获取多种压缩策略的结果，选择最小的
 */
async function getBestCompression(filePath, format) {
  const strategies = []

  if (format === 'png') {
    // PNG 压缩策略
    strategies.push(
      // 策略1: PNG 高压缩 + palette
      sharp(filePath).png({
        compressionLevel: 9,
        palette: true,
        effort: 10
      }).toBuffer().then(buf => ({ buffer: buf, format: 'png', strategy: 'PNG palette' })),

      // 策略2: PNG 高压缩无 palette
      sharp(filePath).png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        effort: 10
      }).toBuffer().then(buf => ({ buffer: buf, format: 'png', strategy: 'PNG adaptive' })),

      // 策略3: WebP 有损
      sharp(filePath).webp({ quality: 80, effort: 6 }).toBuffer()
        .then(buf => ({ buffer: buf, format: 'webp', strategy: 'WebP 80' })),

      // 策略4: WebP 高质量
      sharp(filePath).webp({ quality: 90, effort: 6 }).toBuffer()
        .then(buf => ({ buffer: buf, format: 'webp', strategy: 'WebP 90' }))
    )
  } else if (format === 'jpg' || format === 'jpeg') {
    strategies.push(
      // JPEG mozjpeg
      sharp(filePath).jpeg({ quality: 80, mozjpeg: true }).toBuffer()
        .then(buf => ({ buffer: buf, format: 'jpeg', strategy: 'JPEG mozjpeg 80' })),

      // JPEG 高质量
      sharp(filePath).jpeg({ quality: 85, mozjpeg: true, progressive: true }).toBuffer()
        .then(buf => ({ buffer: buf, format: 'jpeg', strategy: 'JPEG progressive 85' }))
    )
  } else if (format === 'webp') {
    strategies.push(
      sharp(filePath).webp({ quality: 80, effort: 6 }).toBuffer()
        .then(buf => ({ buffer: buf, format: 'webp', strategy: 'WebP 80' }))
    )
  }

  // 执行所有策略
  const results = await Promise.all(strategies)

  // 找到最小的
  let best = results[0]
  for (const result of results) {
    if (result.buffer.length < best.buffer.length) {
      best = result
    }
  }

  return best
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const format = ext.replace('.', '')

  try {
    // 获取原文件大小
    const originalStat = await fs.stat(filePath)
    const originalSize = originalStat.size

    // 获取最佳压缩结果
    const best = await getBestCompression(filePath, format)

    const compressedSize = best.buffer.length

    // 如果压缩后更大，跳过
    if (compressedSize >= originalSize) {
      stats.skipped++
      stats.originalSize += originalSize
      stats.compressedSize += originalSize  // 保持原大小
      console.log(`  ⏭️  ${path.basename(filePath)}`)
      console.log(`     ${formatSize(originalSize)} → 压缩后更大，保持原文件`)
      return { skipped: true }
    }

    // 写入压缩后的文件
    let finalPath = filePath
    if (best.format !== format) {
      // 格式变化（如 PNG → WebP）
      finalPath = filePath.replace(`.${format}`, `.${best.format}`)
      await fs.unlink(filePath)  // 删除原文件
    }
    await fs.writeFile(finalPath, best.buffer)

    // 更新统计
    stats.compressed++
    stats.originalSize += originalSize
    stats.compressedSize += compressedSize

    const saved = originalSize - compressedSize
    console.log(`  ✅ ${path.basename(filePath)} → ${best.format}`)
    console.log(`     ${formatSize(originalSize)} → ${formatSize(compressedSize)} (节省 ${formatSize(saved)}, ${calcReduction(originalSize, compressedSize)})`)
    console.log(`     策略: ${best.strategy}`)

    stats.details.push({
      file: path.basename(filePath),
      originalSize,
      compressedSize,
      strategy: best.strategy,
      formatChange: best.format !== format
    })

    return { success: true }

  } catch (error) {
    stats.failed++
    console.log(`  ❌ ${path.basename(filePath)}: ${error.message}`)
    return { error: error.message }
  }
}

async function processBatch(files) {
  for (let i = 0; i < files.length; i += CONFIG.concurrency) {
    const batch = files.slice(i, i + CONFIG.concurrency)
    await Promise.all(batch.map(file => compressImage(file)))
    console.log(`\n进度: ${Math.min(i + CONFIG.concurrency, files.length)}/${files.length}`)
  }
}

async function main() {
  console.log('====================================')
  console.log('   图片压缩脚本 - 智能多策略版')
  console.log('====================================\n')

  console.log(`📁 目标目录: ${CONFIG.targetDir}`)
  console.log(`🔄 并发数量: ${CONFIG.concurrency}`)
  console.log(`📐 策略说明:`)
  console.log(`   PNG: 自动尝试 PNG palette / PNG adaptive / WebP 80 / WebP 90`)
  console.log(`   JPG: mozjpeg 80 / progressive 85`)
  console.log(`   ⚡ 自动选择最小结果，压缩后更大则保持原文件`)
  console.log()

  try {
    await fs.access(CONFIG.targetDir)
  } catch {
    console.error(`❌ 目标目录不存在`)
    process.exit(1)
  }

  console.log('🔍 正在扫描图片文件...\n')
  const files = await getImageFiles(CONFIG.targetDir)
  stats.total = files.length

  if (files.length === 0) {
    console.log('⚠️  未找到图片')
    return
  }

  console.log(`📷 共找到 ${files.length} 张图片\n`)
  console.log('开始压缩...\n')

  const startTime = Date.now()
  await processBatch(files)
  const duration = ((Date.now() - startTime) / 1000).toFixed(2)

  console.log('\n====================================')
  console.log('           压缩完成!')
  console.log('====================================\n')

  console.log('📊 统计结果:')
  console.log(`   总文件数: ${stats.total}`)
  console.log(`   成功压缩: ${stats.compressed}`)
  console.log(`   保持原样: ${stats.skipped}`)
  console.log(`   失败: ${stats.failed}`)
  console.log()

  const saved = stats.originalSize - stats.compressedSize
  console.log('💾 体积变化:')
  console.log(`   原始大小: ${formatSize(stats.originalSize)}`)
  console.log(`   压缩后: ${formatSize(stats.compressedSize)}`)
  console.log(`   节省空间: ${formatSize(saved)}`)
  console.log(`   压缩率: ${calcReduction(stats.originalSize, stats.compressedSize)}`)
  console.log()
  console.log(`⏱️  耗时: ${duration} 秒`)

  // 显示格式转换详情
  const formatChanges = stats.details.filter(d => d.formatChange)
  if (formatChanges.length > 0) {
    console.log('\n🔄 格式转换:')
    formatChanges.forEach(d => {
      console.log(`   ${d.file} → WebP`)
    })
  }
}

main().catch(console.error)