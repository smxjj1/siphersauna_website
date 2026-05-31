import { defineProductCategory } from '~/types/product'

export const productCategories = {
  'feeding-bottles': defineProductCategory({
    slug: 'feeding-bottles',
    name: 'Feeding Bottles',
    title: 'Baby Feeding Bottles | Safe & BPA-Free',
    description: 'Discover our premium collection of baby feeding bottles. BPA-free materials, anti-colic designs, and easy-grip shapes for comfortable feeding.',
    hero: {
      headline: 'Gentle Feeding, Happy Babies',
      subheadline: 'Our feeding bottles are designed with your baby\'s comfort in mind. Anti-colic vents, soft silicone nipples, and easy-to-clean designs.',
    },
    imageFolder: 'feeding-bottles',
  }),

  'water-cups': defineProductCategory({
    slug: 'water-cups',
    name: 'Water Cups',
    title: 'Baby Water Cups & Sippy Cups | Spill-Proof Design',
    description: 'Transition your little one from bottle to cup with our spill-proof water cups. Ergonomic handles, soft spouts, and fun colors.',
    hero: {
      headline: 'Sip by Sip, Growing Up',
      subheadline: 'Help your toddler master independent drinking with our ergonomic, spill-proof water cups designed for little hands.',
    },
    imageFolder: 'water-cups',
  }),

  'baby-tableware': defineProductCategory({
    slug: 'baby-tableware',
    name: 'Baby Tableware',
    title: 'Baby Tableware | Plates, Bowls & Spoons',
    description: 'Make mealtime fun and safe with our baby tableware collection. Suction bases, divided plates, and soft-tip spoons for self-feeding.',
    hero: {
      headline: 'Mealtime Made Easy',
      subheadline: 'From first foods to self-feeding, our tableware collection supports every stage of your baby\'s eating journey.',
    },
    imageFolder: 'baby-tableware',
  }),

  'bath-potty': defineProductCategory({
    slug: 'bath-potty',
    name: 'Bath & Potty',
    title: 'Baby Bath & Potty Training Products',
    description: 'Create a safe and comfortable bath time routine with our baby bath products. Potty trainers, bath tubs, and gentle wash accessories.',
    hero: {
      headline: 'Clean & Comfortable',
      subheadline: 'Make bath time and potty training a breeze with our ergonomically designed products for babies and toddlers.',
    },
    imageFolder: 'bath-potty',
  }),

  'accessories': defineProductCategory({
    slug: 'accessories',
    name: 'Accessories',
    title: 'Baby Feeding Accessories | Brushes, Boxes & Teethers',
    description: 'Complete your baby care kit with our accessories. Bottle brushes, powder boxes, teethers, and more essential items.',
    hero: {
      headline: 'Everything You Need',
      subheadline: 'From bottle cleaning to soothing teething pain, our accessories make parenting easier every day.',
    },
    imageFolder: 'accessories',
  }),
}

export type ProductCategorySlug = keyof typeof productCategories

export function getAllCategories() {
  return Object.values(productCategories)
}

export function getCategoryBySlug(slug: string) {
  return productCategories[slug as ProductCategorySlug]
}

export function isValidCategorySlug(slug: string): slug is ProductCategorySlug {
  return slug in productCategories
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(productCategories)
}