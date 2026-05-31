/**
 * Excel 产品图片提取脚本
 *
 * 功能：读取 product.xlsx 中的悬浮图片，按产品分类保存到 public 目录
 *
 * 使用方法：
 * 1. 安装依赖：npm install exceljs
 * 2. 运行脚本：node scripts/extract-products.js
 *
 * 注意：Excel 中的悬浮图片（Drawing Objects）会通过位置坐标与行号匹配
 */

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// ==================== 配置项 ====================
const CONFIG = {
  // Excel 文件路径
  excelFile: 'products.xlsx',

  // 输出目录（Nuxt public 目录）
  outputDir: 'public/images/products',

  // 工作表名称（默认读取第一个工作表）
  sheetName: null, // null 表示第一个工作表

  // 列配置 - 根据实际 Excel 调整
  columns: {
    // 产品类别所在的列索引（从1开始）
    category: 1,       // A列
    // 产品名称/型号所在的列索引
    name: 5,           // E列（Item No）
    // 产品描述所在的列索引
    description: 6,    // F列
    // G-T 列规格信息
    pcsPerCtn: 7,      // G列: pcs per ctn
    nw: 8,            // H列: N.W. (kgs)
    gw: 9,             // I列: G.W. (kgs)
    ctnSize: 10,       // J列: Page size LXWXH(cm)
    length: 11,        // K列: L
    width: 12,         // L列: W
    height: 13,        // M列: H
    pcs20gp: 14,       // N列: pcs per 20GP
    pcs40hq: 15,       // O列: pcs per 40HQ
    moq: 16,           // P列: MOQ
    hsCode: 17,        // Q列: H.S. Code
    totalCartons: 18,  // R列: Total Cartons
    totalCbm: 19,      // S列: Total CBM
    remark: 20,         // T列: Remark
  },

  // 图片命名方式
  imageNaming: 'index', // 'index' | 'product' | 'original'
};

// ==================== 主函数 ====================
async function extractProductImages() {
  console.log('========================================');
  console.log('Excel 产品图片提取脚本');
  console.log('========================================\n');

  // 检查文件是否存在
  if (!fs.existsSync(CONFIG.excelFile)) {
    console.error(`❌ 错误：找不到文件 ${CONFIG.excelFile}`);
    return;
  }

  console.log(`📂 读取 Excel 文件: ${CONFIG.excelFile}`);

  // 创建 workbook 实例
  const workbook = new ExcelJS.Workbook();

  // 读取 Excel 文件
  await workbook.xlsx.readFile(CONFIG.excelFile);

  // 获取工作表
  const worksheet = CONFIG.sheetName
    ? workbook.getWorksheet(CONFIG.sheetName)
    : workbook.worksheets[0];

  if (!worksheet) {
    console.error('❌ 错误：找不到工作表');
    return;
  }

  console.log(`📋 工作表名称: ${worksheet.name}`);
  console.log(`📊 数据范围: ${worksheet.rowCount} 行, ${worksheet.columnCount} 列\n`);

  // ==================== 步骤1: 解析产品数据 ====================
  console.log('📝 步骤1: 解析产品数据...');
  const products = parseProductData(worksheet);
  console.log(`   找到 ${products.length} 个产品\n`);

  // ==================== 步骤2: 提取悬浮图片 ====================
  console.log('🖼️  步骤2: 提取悬浮图片...');
  const images = extractFloatingImages(worksheet, workbook);
  console.log(`   找到 ${images.length} 张图片\n`);

  // ==================== 步骤3: 匹配图片与产品 ====================
  console.log('🔗 步骤3: 匹配图片与产品...');
  const matchedProducts = matchImagesToProducts(products, images);
  console.log(`   成功匹配 ${matchedProducts.filter(p => p.images.length > 0).length} 个产品\n`);

  // ==================== 步骤4: 保存图片 ====================
  console.log('💾 步骤4: 保存图片到目录...');
  const savedCount = await saveProductImages(matchedProducts);
  console.log(`   共保存 ${savedCount} 张图片\n`);

  // ==================== 步骤5: 生成 JSON 数据 ====================
  console.log('📄 步骤5: 生成产品 JSON 数据...');
  generateProductsJson(matchedProducts);

  console.log('========================================');
  console.log('✅ 处理完成！');
  console.log('========================================');
}

// ==================== 解析产品数据 ====================
function parseProductData(worksheet) {
  const products = [];
  const { category, name, description } = CONFIG.columns;

  let currentCategory = '';
  let currentSubcategory = '';
  let currentCategorySlug = '';

  // 遍历每一行
  worksheet.eachRow((row, rowNumber) => {
    // 跳过表头行（第8行是表头 "Item No." 等，从第9行开始是分类或产品）
    if (rowNumber <= 8) return;

    // 获取各列数据
    const categoryCell = row.getCell(category);
    const nameCell = row.getCell(name);
    const descCell = row.getCell(description);

    // 处理单元格值（可能是富文本对象）
    const getCellValue = (cell) => {
      if (!cell || !cell.value) return '';
      const val = cell.value;
      // ExcelJS 富文本格式：{ richText: [{ text: '...' }] }
      if (typeof val === 'object' && val.richText) {
        return val.richText.map(t => t.text).join('').trim();
      }
      return String(val).trim();
    };

    // 处理数值单元格
    const getNumericValue = (cell) => {
      if (!cell || !cell.value) return null;
      const val = cell.value;
      if (typeof val === 'number') return val;
      // 尝试从字符串解析
      const num = parseFloat(String(val).replace(/[^\d.-]/g, ''));
      return isNaN(num) ? null : num;
    };

    const categoryValue = getCellValue(categoryCell);
    const nameValue = getCellValue(nameCell);
    const descValue = getCellValue(descCell);

    // 检查是否是分类标记行（如 "分类1、outdoor sauna" 或 "总类大类 saunaroom"）
    const isCategoryRow = /^分类\d+[、.]/.test(categoryValue) ||
                          /^大类分类[、.]/.test(categoryValue) ||
                          /^总类大类/.test(categoryValue);
    if (isCategoryRow) {
      // 解析分类信息
      if (categoryValue.includes('-')) {
        const parts = categoryValue.split('-');
        currentCategory = parts[0].replace(/分类\d+[、.]?\s*/, '').replace(/大类分类[、.]?\s*/, '').replace(/总类大类\s*/, '').trim();
        currentSubcategory = parts[1]?.trim() || '';
      } else {
        currentCategory = categoryValue.replace(/分类\d+[、.]?\s*/, '').replace(/大类分类[、.]?\s*/, '').replace(/总类大类\s*/, '').trim();
        currentSubcategory = '';
      }
      // 生成 slug，保留英文和中文字符后的英文部分
      currentCategorySlug = currentCategory
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      return; // 分类行不包含产品数据，跳过
    }

    // 跳过表头值（"Item No."）和空的产品名称
    if (!nameValue || nameValue === 'SIP-' || nameValue === 'Item No.') return;

    // 获取规格数据（G-T列）
    const cols = CONFIG.columns;
    const specs = {
      pcsPerCtn: getNumericValue(row.getCell(cols.pcsPerCtn)),
      nw: getNumericValue(row.getCell(cols.nw)),
      gw: getNumericValue(row.getCell(cols.gw)),
      ctnSize: getCellValue(row.getCell(cols.ctnSize)),
      length: getNumericValue(row.getCell(cols.length)),
      width: getNumericValue(row.getCell(cols.width)),
      height: getNumericValue(row.getCell(cols.height)),
      pcs20gp: getNumericValue(row.getCell(cols.pcs20gp)),
      pcs40hq: getNumericValue(row.getCell(cols.pcs40hq)),
      moq: getNumericValue(row.getCell(cols.moq)),
      hsCode: getCellValue(row.getCell(cols.hsCode)),
      totalCartons: getNumericValue(row.getCell(cols.totalCartons)),
      totalCbm: getNumericValue(row.getCell(cols.totalCbm)),
      remark: getCellValue(row.getCell(cols.remark)),
    };

    // 创建产品对象
    products.push({
      rowNumber,
      itemNo: nameValue,
      name: generateProductName(nameValue, currentCategory, currentSubcategory),
      description: descValue,
      category: currentCategory,
      categorySlug: currentCategorySlug,
      subcategory: currentSubcategory,
      specs,
      images: [], // 待匹配
      imagePaths: [], // 保存后的路径
    });
  });

  return products;
}

// ==================== 生成产品名称 ====================
function generateProductName(itemNo, category, subcategory) {
  let name = '';

  if (subcategory) {
    name = subcategory;
  } else if (category) {
    name = category;
  }

  // 根据型号添加特征
  if (itemNo.includes('SQ')) {
    name = 'Outdoor Sauna Room - Square Shape';
  } else if (itemNo.includes('LY')) {
    name = 'Outdoor Sauna Room - Luxury Edition';
  } else if (itemNo.includes('WG')) {
    name = 'Outdoor Sauna Room - Wide Glass Edition';
  } else if (itemNo.includes('NEW')) {
    name = 'Outdoor Sauna Room - New Design';
  } else if (itemNo.startsWith('SIP-I')) {
    if (subcategory.includes('Traditional')) {
      name = 'Indoor Traditional Sauna Room';
    } else if (subcategory.includes('Far') || subcategory.includes('Far-infrared')) {
      name = 'Far-Infrared Sauna Room';
    } else if (subcategory.includes('Dry') || subcategory.includes('combination')) {
      name = 'Dry-Wet Steam Combination Sauna';
    } else {
      name = 'Indoor Sauna Room';
    }
  }

  return name || `${itemNo} - ${category}`;
}

// ==================== 提取悬浮图片 ====================
/**
 * 提取 Excel 中的悬浮图片（Drawing Objects）
 *
 * ExcelJS 通过 worksheet._images 或 getImages() 获取图片
 * 图片对象包含 range 属性，用于确定位置
 */
function extractFloatingImages(worksheet, workbook) {
  const images = [];

  // 方法1: 使用 worksheet.images（ExcelJS 内置）
  if (worksheet.images && worksheet.images.length > 0) {
    console.log(`   通过 worksheet.images 找到 ${worksheet.images.length} 张图片`);

    worksheet.images.forEach((image, index) => {
      // ExcelJS 图片对象结构
      // image.range 包含位置信息 { tl: {col, row}, br: {col, row} }
      // tl = top-left (左上角), br = bottom-right (右下角)

      let rowNumber = 1;
      let colNumber = 1;

      // 获取图片位置
      if (image.range) {
        // range 可能是字符串格式 "A1" 或对象格式
        if (typeof image.range === 'string') {
          const parsed = parseCellRef(image.range);
          rowNumber = parsed.row;
          colNumber = parsed.col;
        } else if (image.range.tl) {
          rowNumber = image.range.tl.row + 1; // ExcelJS 行号从0开始
          colNumber = image.range.tl.col + 1;
        }
      }

      images.push({
        index,
        rowNumber,
        colNumber,
        imageId: image.imageId || index,
        imageData: image.buffer || null, // 图片二进制数据
        extension: image.extension || 'png',
      });
    });
  }

  // 方法2: 如果 worksheet.images 为空，尝试从 workbook.media 获取
  if (images.length === 0 && workbook.media && workbook.media.length > 0) {
    console.log(`   通过 workbook.media 找到 ${workbook.media.length} 张图片`);

    workbook.media.forEach((media, index) => {
      // media.index 对应关系索引，需要通过 worksheet 关联
      // 获取图片类型对应的扩展名
      const ext = getMediaExtension(media.type);
      images.push({
        index,
        rowNumber: null, // 未知行号，需要后续匹配
        colNumber: null,
        imageId: media.index,
        imageData: media.buffer,
        extension: ext,
      });
    });
  }

  // 方法3: 尝试读取 drawings XML（兼容不同 ExcelJS 版本）
  if (images.length === 0) {
    console.log('   尝试通过底层 API 获取图片...');

    // ExcelJS 内部可能存储在 _drawings 或 drawings
    const drawings = worksheet._drawings || worksheet.drawings;
    if (drawings) {
      drawings.forEach((drawing, index) => {
        // drawing 可能是 Drawing 对象
        if (drawing.position) {
          images.push({
            index,
            rowNumber: drawing.position.row || null,
            colNumber: drawing.position.col || null,
            imageId: drawing.image?.index || index,
            imageData: drawing.image?.buffer || null,
            extension: 'png',
          });
        }
      });
    }
  }

  if (images.length === 0) {
    console.log('   ⚠️ 未找到图片数据，请检查 Excel 文件是否包含悬浮图片');
  }

  return images;
}

// ==================== 解析单元格引用 ====================
/**
 * 解析 Excel 单元格引用（如 "A1" -> {col: 1, row: 1}）
 */
function parseCellRef(ref) {
  const match = ref.match(/^([A-Z]+)(\d+)$/);
  if (!match) return { col: 1, row: 1 };

  const colLetters = match[1];
  const rowNumber = parseInt(match[2]);

  // 将字母转换为列号（A=1, B=2, ...）
  let colNumber = 0;
  for (let i = 0; i < colLetters.length; i++) {
    colNumber = colNumber * 26 + (colLetters.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }

  return { col: colNumber, row: rowNumber };
}

// ==================== 获取图片扩展名 ====================
/**
 * 根据媒体类型获取正确的文件扩展名
 */
function getMediaExtension(type) {
  const typeMap = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/webp': 'webp',
  };

  if (typeof type === 'string') {
    // 处理如 "image/png" 格式
    const ext = typeMap[type.toLowerCase()] || type.split('/')[1] || 'png';
    return ext;
  }

  // ExcelJS 内部类型索引
  // type 可能是数字索引，需要根据实际情况调整
  return 'png';
}

// ==================== 匹配图片与产品 ====================
/**
 * 根据图片位置（行号）匹配对应的产品
 */
function matchImagesToProducts(products, images) {
  // 对于有明确行号的图片，直接匹配
  images.forEach(image => {
    if (image.rowNumber) {
      // 找到该行对应的产品
      const product = products.find(p => p.rowNumber === image.rowNumber);
      if (product) {
        product.images.push(image);
      } else {
        // 图片可能在产品行附近，查找最接近的产品
        const closestProduct = findClosestProduct(products, image.rowNumber);
        if (closestProduct) {
          closestProduct.images.push(image);
        }
      }
    } else {
      // 对于没有行号的图片，尝试按顺序匹配
      // 假设图片顺序与产品顺序一致
      const productByIndex = products[image.index % products.length];
      if (productByIndex) {
        productByIndex.images.push(image);
      }
    }
  });

  return products;
}

// ==================== 查找最接近的产品 ====================
function findClosestProduct(products, targetRow) {
  let closest = null;
  let minDistance = Infinity;

  products.forEach(product => {
    const distance = Math.abs(product.rowNumber - targetRow);
    if (distance < minDistance && distance <= 3) { // 最多允许3行距离
      minDistance = distance;
      closest = product;
    }
  });

  return closest;
}

// ==================== 保存图片 ====================
async function saveProductImages(products) {
  let savedCount = 0;

  for (const product of products) {
    if (product.images.length === 0) continue;

    // 创建目录路径: public/images/products/[category]/[itemNo]
    const categoryDir = path.join(CONFIG.outputDir, product.categorySlug);
    const productDir = path.join(categoryDir, product.itemNo);

    // 递归创建目录
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
      console.log(`   📁 创建目录: ${productDir}`);
    }

    // 保存每张图片
    for (let i = 0; i < product.images.length; i++) {
      const image = product.images[i];
      const imageNum = i + 1;

      // 生成文件名
      const filename = CONFIG.imageNaming === 'product'
        ? `${product.itemNo}-${imageNum}.${image.extension}`
        : CONFIG.imageNaming === 'original'
          ? `image-${image.index}.${image.extension}`
          : `${product.itemNo}-${imageNum}.${image.extension}`;

      const filePath = path.join(productDir, filename);

      // 写入图片文件
      if (image.imageData) {
        fs.writeFileSync(filePath, image.imageData);
        savedCount++;

        // 记录相对路径（用于 JSON）
        const relativePath = `/images/products/${product.categorySlug}/${product.itemNo}/${filename}`;
        product.imagePaths.push(relativePath);

        console.log(`   💾 保存: ${relativePath}`);
      } else {
        console.log(`   ⚠️ 图片无数据: ${product.itemNo} - 图片 ${imageNum}`);
      }
    }
  }

  return savedCount;
}

// ==================== 生成产品 JSON ====================
function generateProductsJson(products) {
  // 构建输出数据结构
  const output = {
    generatedAt: new Date().toISOString(),
    totalProducts: products.length,
    categories: [],
    products: [],
  };

  // 统计分类
  const categoryMap = new Map();
  products.forEach(product => {
    if (!categoryMap.has(product.categorySlug)) {
      categoryMap.set(product.categorySlug, {
        name: product.category,
        slug: product.categorySlug,
        count: 0,
        subcategories: [],
      });
    }
    categoryMap.get(product.categorySlug).count++;

    if (product.subcategory && !categoryMap.get(product.categorySlug).subcategories.includes(product.subcategory)) {
      categoryMap.get(product.categorySlug).subcategories.push(product.subcategory);
    }
  });

  output.categories = Array.from(categoryMap.values());

  // 构建产品数据
  products.forEach((product, index) => {
    output.products.push({
      id: index,
      itemNo: product.itemNo,
      name: product.name,
      description: product.description,
      material: '', // 可从 description 解析
      capacity: '',
      subcategory: product.subcategory,
      category: product.category,
      categorySlug: product.categorySlug,
      mainImage: product.imagePaths[0] || '',
      gallery: product.imagePaths,
      images: product.imagePaths,
      specs: product.specs,
    });
  });

  // 保存 JSON 文件
  const jsonPath = 'app/data/sauna-products.json';
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  console.log(`   📄 JSON 已保存: ${jsonPath}`);
}

// ==================== 执行脚本 ====================
extractProductImages().catch(err => {
  console.error('❌ 脚本执行出错:', err);
});