<script setup lang="ts">
/**
 * World Map Flylines Visualization Component
 *
 * 功能：以中国山西为起点，展示飞向全球各大洲代表性城市的动态飞线图
 *
 * 使用说明：
 * 1. 需要安装 echarts: npm install echarts
 * 2. 需要下载世界地图 GeoJSON 数据到 app/assets/json/world.json
 *    推荐下载源：
 *    - https://echarts-maps.github.io/echarts-countries-js/world.js (JS格式，需提取JSON)
 *    - https://raw.githubusercontent.com/apache-superset/superset-geojson/master/world_countries.json
 *    - 或从阿里云 DataV: https://geo.datav.aliyun.com/areas_v3/bound/world.json
 */

import * as echarts from 'echarts/core'
import { EffectScatterChart, LinesChart } from 'echarts/charts'
import { GeoComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { onMounted, onUnmounted, ref } from 'vue'

echarts.use([GeoComponent, LinesChart, EffectScatterChart, CanvasRenderer])

// 定义组件选项
defineOptions({
  name: 'WorldMapFlylines',
});

// 图表容器引用
const chartRef = ref<HTMLDivElement | null>(null);

// 图表实例
let chartInstance: ReturnType<typeof echarts.init> | null = null

// ==================== 城市经纬度坐标映射 ====================
// 包含起点佛山及全球各大洲代表性城市
const geoCoordMap: Record<string, [number, number]> = {
  // 起点 - 中国广东佛山
  'Foshan': [113.12, 23.02],

  // 亚洲
  'Tokyo': [139.69, 35.69],
  'Seoul': [126.98, 37.57],
  'Singapore': [103.85, 1.29],
  'Bangkok': [100.50, 13.76],
  'Mumbai': [72.88, 19.08],
  'Dubai': [55.27, 25.20],

  // 欧洲
  'London': [0.13, 51.51],
  'Paris': [2.35, 48.86],
  'Berlin': [13.40, 52.52],
  'Moscow': [37.62, 55.75],
  'Rome': [12.50, 41.90],

  // 非洲
  'Cairo': [31.24, 30.04],
  'Johannesburg': [28.04, -26.19],
  'Lagos': [3.39, 6.46],
  'Nairobi': [36.82, -1.29],

  // 北美洲
  'New York': [-74.00, 40.71],
  'Los Angeles': [-118.24, 34.05],
  'Chicago': [-87.63, 41.88],
  'Houston': [-95.37, 29.76],
  'Toronto': [-79.38, 43.65],

  // 南美洲
  'Sao Paulo': [-46.63, -23.55],
  'Rio de Janeiro': [-43.18, -22.91],
  'Buenos Aires': [-58.38, -34.60],
  'Lima': [-77.04, -12.05],

  // 大洋洲
  'Sydney': [151.21, -33.87],
  'Melbourne': [144.96, -37.81],
  'Auckland': [174.76, -36.85],
};

// ==================== 品牌颜色常量 ====================
const brandColors = {
  wood: '#8B5A2B',
  woodLight: '#C4A77D',
  cream: '#F5F1EB',
  gold: '#B8860B',
  dark: '#2D2016',
  mapBase: '#2D2016',
  mapLight: '#3D2A1C',
  mapHighlight: '#4A3728',
  mapMid: '#5A4738',
};

// ==================== 生成飞线数据 ====================
/**
 * 将起点与各终点组合成 ECharts lines 图表所需的 coords 格式
 * @param origin 起点城市名称
 * @param destinations 目的地城市名称数组
 * @returns lines 数据数组
 */
function generateFlylinesData(origin: string, destinations: string[]) {
  const originCoord = geoCoordMap[origin];
  if (!originCoord) {
    console.warn(`Origin city "${origin}" not found in geoCoordMap`);
    return [];
  }

  return destinations.map((dest) => {
    const destCoord = geoCoordMap[dest];
    if (!destCoord) {
      console.warn(`Destination city "${dest}" not found in geoCoordMap`);
      return null;
    }
    return {
      fromName: origin,
      toName: dest,
      coords: [originCoord, destCoord],
      value: Math.random() * 100 + 50, // 随机数值用于线条粗细
    };
  }).filter(Boolean);
}

// 目的地城市列表（按大洲分组）
const destinationCities = [
  // 亚洲
  'Tokyo', 'Seoul', 'Singapore', 'Bangkok', 'Mumbai', 'Dubai',
  // 欧洲
  'London', 'Paris', 'Berlin', 'Moscow', 'Rome',
  // 非洲
  'Cairo', 'Johannesburg', 'Lagos', 'Nairobi',
  // 北美洲
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Toronto',
  // 南美洲
  'Sao Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima',
  // 大洋洲
  'Sydney', 'Melbourne', 'Auckland',
];

// ==================== 生成涟漪点数据 ====================
/**
 * 生成起点和终点的涟漪点标记数据
 */
function generateRipplePointsData(origin: string, destinations: string[]) {
  const points: Array<{ name: string; value: [number, number]; itemStyle?: object }> = [];

  // 起点 - 使用特殊样式突出显示（红色标注HQ）
  const originCoord = geoCoordMap[origin];
  if (originCoord) {
    points.push({
      name: origin,
      value: originCoord,
      itemStyle: {
        color: '#E53935', // 红色标注总部
      },
    });
  }

  // 各目的地
  destinations.forEach((dest) => {
    const destCoord = geoCoordMap[dest];
    if (destCoord) {
      points.push({
        name: dest,
        value: destCoord,
      });
    }
  });

  return points;
}

// ==================== ECharts 配置 ====================
function getChartOption(): EChartsOption {
  const flylinesData = generateFlylinesData('Foshan', destinationCities);
  const ripplePointsData = generateRipplePointsData('Foshan', destinationCities);

  return {
    // 暖色深色背景 - 匹配桑拿品牌
    backgroundColor: 'transparent',

    // 不显示标题
    title: {
      show: false,
    },

    // 不显示提示框
    tooltip: {
      show: false,
    },

    // 地理坐标系配置
    geo: {
      map: 'world',
      roam: true, // 允许缩放和平移
      zoom: 1.2,
      center: [0, 20], // 中心点偏移以更好展示

      // 地图区域样式 - 暖色木质风格
      itemStyle: {
        areaColor: brandColors.mapLight,
        borderColor: brandColors.woodLight,
        borderWidth: 0.5,
      },

      // 高亮样式
      emphasis: {
        itemStyle: {
          areaColor: brandColors.mapHighlight,
          borderColor: brandColors.gold,
          borderWidth: 1,
        },
        label: {
          show: false,
        },
      },

      // 选中样式
      select: {
        itemStyle: {
          areaColor: brandColors.mapMid,
        },
      },

      // 区域标签
      label: {
        show: false, // 默认不显示国家名称
      },

      // 阴影效果
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowBlur: 10,
    },

    // 图表系列配置
    series: [
      // ==================== 飞线层 ====================
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, // 动画周期（秒）
          trailLength: 0.2, // 拖尾长度
          symbol: 'arrow',
          symbolSize: 6,
          color: brandColors.gold, // 流光颜色 - 品牌金色
        },
        lineStyle: {
          color: brandColors.woodLight, // 木质浅色
          width: 1.5,
          curveness: -0.3, // 逆时针弧线
          opacity: 0.6,
        },
        smooth: true, // 开启平滑曲线
        data: flylinesData,
      },

      // ==================== 涟漪点层 - 起点 ====================
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 4,
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
          period: 4,
        },
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#E53935', // 红色标注总部
          shadowBlur: 10,
          shadowColor: '#E53935',
        },
        data: ripplePointsData.filter((p) => p.name === 'Foshan'),
      },

      // ==================== 涟漪点层 - 目的地 ====================
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 5,
        },
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: brandColors.woodLight,
          shadowBlur: 5,
          shadowColor: brandColors.woodLight,
        },
        label: {
          show: false,
          position: 'right',
          formatter: '{b}',
          fontSize: 10,
          color: brandColors.cream,
        },
        data: ripplePointsData.filter((p) => p.name !== 'Foshan'),
      },
    ],
  };
}

// ==================== 初始化图表 ====================
async function initChart() {
  if (!chartRef.value) {
    console.warn('Chart container not found');
    return;
  }

  // 动态加载世界地图 GeoJSON（已从 world.js 提取）
  try {
    const worldJson = await import('@/assets/json/world.json');

    // 注册世界地图
    echarts.registerMap('world', worldJson.default || worldJson);

    // 创建图表实例
    chartInstance = echarts.init(chartRef.value, undefined, {
      renderer: 'canvas',
    });

    // 设置配置项
    chartInstance.setOption(getChartOption());

    console.log('World map flylines chart initialized successfully');
  } catch (error) {
    console.error('Failed to load world map GeoJSON:', error);

    // 显示错误提示
    if (chartRef.value) {
      chartRef.value.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #C4A77D; text-align: center;">
          <div>
            <p style="margin-bottom: 10px;">地图数据加载失败</p>
            <p style="font-size: 12px; color: #8B5A2B;">请检查 app/assets/json/world.json 文件是否存在</p>
          </div>
        </div>
      `;
    }
  }
}

// ==================== 窗口尺寸变化处理 ====================
function handleResize() {
  if (chartInstance) {
    chartInstance.resize();
  }
}

// ==================== 生命周期钩子 ====================
onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="world-map-flylines">
    <div ref="chartRef" class="chart-container" />
  </div>
</template>

<style scoped>
.world-map-flylines {
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>