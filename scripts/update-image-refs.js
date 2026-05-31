/**
 * 更新图片引用脚本
 * 将 sauna-products.json 中的 .png 引用更新为 .webp
 */

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_FILE = path.resolve(__dirname, '../app/data/sauna-products.json')

async function main() {
  console.log('====================================')
  console.log('       更新图片引用脚本')
  console.log('====================================\n')

  // 读取数据文件
  const content = await fs.readFile(DATA_FILE, 'utf-8')
  const data = JSON.parse(content)

  let count = 0

  // 更新所有图片路径
  function updateImagePaths(products) {
    for (const product of products) {
      if (product.mainImage) {
        product.mainImage = product.mainImage.replace('.png', '.webp')
        count++
      }
      if (product.images && Array.isArray(product.images)) {
        for (let i = 0; i < product.images.length; i++) {
          product.images[i] = product.images[i].replace('.png', '.webp')
          count++
        }
      }
      if (product.variants) {
        updateImagePaths(product.variants)
      }
    }
  }

  // 递归处理所有分类
  for (const category of data.categories || []) {
    if (category.products) {
      updateImagePaths(category.products)
    }
    if (category.subcategories) {
      for (const sub of category.subcategories) {
        if (sub.products) {
          updateImagePaths(sub.products)
        }
      }
    }
  }

  // 写入更新后的文件
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')

  console.log(`✅ 已更新 ${count} 个图片引用\n`)
  console.log('所有 .png 图片引用已更新为 .webp')
}

main().catch(console.error)