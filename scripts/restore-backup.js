/**
 * 恢复备份脚本
 * 从 .backup 文件夹恢复原图片
 */

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TARGET_DIR = path.resolve(__dirname, '../public/images/products')

const stats = {
  total: 0,
  restored: 0,
  removedWebp: 0,
  errors: []
}

/**
 * 递归处理目录
 */
async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory() && entry.name === '.backup') {
      // 处理备份目录
      await restoreBackup(fullPath, dir)
    } else if (entry.isDirectory()) {
      // 递归处理子目录
      await processDirectory(fullPath)
    }
  }
}

/**
 * 从备份恢复文件
 */
async function restoreBackup(backupDir, targetDir) {
  const files = await fs.readdir(backupDir)

  for (const file of files) {
    stats.total++
    const backupPath = path.join(backupDir, file)
    const targetPath = path.join(targetDir, file)

    try {
      // 检查是否有对应的 webp 文件需要删除
      const webpPath = targetPath.replace('.png', '.webp')
      try {
        await fs.access(webpPath)
        await fs.unlink(webpPath)
        stats.removedWebp++
        console.log(`  🗑️  删除: ${path.basename(webpPath)}`)
      } catch {
        // webp 文件不存在
      }

      // 恢复原文件
      await fs.copyFile(backupPath, targetPath)
      stats.restored++
      console.log(`  ✅ 恢复: ${file}`)
    } catch (error) {
      stats.errors.push({ file, error: error.message })
      console.log(`  ❌ 失败: ${file} - ${error.message}`)
    }
  }

  // 删除空的备份目录
  try {
    const remaining = await fs.readdir(backupDir)
    if (remaining.length === 0) {
      await fs.rmdir(backupDir)
      console.log(`  📁 删除备份目录: ${backupDir}`)
    }
  } catch {
    // 目录不为空或无法删除
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('====================================')
  console.log('        恢复备份脚本')
  console.log('====================================\n')

  console.log(`📁 目标目录: ${TARGET_DIR}\n`)

  try {
    await fs.access(TARGET_DIR)
  } catch {
    console.error(`❌ 目标目录不存在`)
    process.exit(1)
  }

  console.log('🔍 开始恢复备份...\n')
  await processDirectory(TARGET_DIR)

  console.log('\n====================================')
  console.log('           恢复完成!')
  console.log('====================================\n')

  console.log('📊 统计结果:')
  console.log(`   备份文件数: ${stats.total}`)
  console.log(`   恢复成功: ${stats.restored}`)
  console.log(`   删除 WebP: ${stats.removedWebp}`)
  console.log(`   失败: ${stats.errors.length}`)

  if (stats.errors.length > 0) {
    console.log('\n❌ 错误详情:')
    stats.errors.forEach((err, i) => {
      console.log(`   ${i + 1}. ${err.file}: ${err.error}`)
    })
  }
}

main().catch(console.error)