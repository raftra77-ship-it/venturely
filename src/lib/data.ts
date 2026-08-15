import { Product, WaitlistEntry, Order, ProductReview, PlatformConfig } from '@/types';
import { DEFAULT_PLATFORM_CONFIG } from './constants';
import { calculateValidationScore } from './validation-engine';
import { generateRecommendations } from './recommendation-engine';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'NerveBand Haptic Stress Relief',
    slug: 'nerveband-haptic-stress-relief',
    tagline: 'Targeted nerve pulses that calm your autonomic nervous system in under 90 seconds.',
    description:
      'NerveBand delivers subtle, non-invasive acoustic vibe micro-pulses directly to the median nerve on your wrist. Scientifically shown to lower heart rate variability (HRV) stress markers during high-stakes work or anxiety spikes.',
    problem: 'Founders and professionals suffer chronic sympathetic nervous system overload, damaging focus and sleep.',
    solution: 'Wearable haptic frequency generator that shifts your body into parasympathetic calm on demand.',
    category: 'Health & Wellness',
    subcategory: 'Neurotech Wearables',
    stage: '4_EARLY_PRODUCT',
    founderName: 'Dr. Aris Thorne',
    companyName: 'NerveTech Labs',
    founderEmail: 'aris@nervetech.io',
    images: [
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 6499,
    discountPrice: 5999,
    inventoryTotal: 100,
    inventorySold: 72,
    manufacturingStatus: 'Batch 1 Assembled — Shipping in 48 hours',
    targetAudience: 'High-performing professionals, founders, & biohackers',
    validationObjective: 'Test sell-through rate & CAC on initial 100-unit pilot run',
    estimatedLaunchDate: '2026-09-01',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-07-15T08:00:00Z',

    // Smytten Trial Props
    hasTrialOption: true,
    trialPointsCost: 2,
    trialSizeDescription: '7-Day Haptic Pulse Discovery Kit',
    trialInventoryTotal: 100,
    trialInventoryClaimed: 72,

    views: 18420,
    uniqueVisitors: 14200,
    waitlistCount: 540,
    interestVotes: 1240,
    preOrdersCount: 45,
    ordersCount: 72,
    totalRevenue: 431928,
    cac: 680,
    aov: 5999,
    roas: 3.8,
    conversionRate: 4.8,
    refundRate: 0.9,
    sellThroughRate: 72,
    salesVelocityPerDay: 8,

    validationScore: {
      overall: 84,
      demand: 91,
      conversion: 78,
      customerSatisfaction: 92,
      unitEconomics: 79,
      momentum: 85,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Immediate HRV Calm',
        percentage: 84,
        quotes: ['Noticeably reduced my afternoon anxiety during board presentations.', 'Sleek design, fits under my shirt cuff seamlessly.'],
      },
      {
        category: 'IMPROVEMENT',
        title: 'Battery life enhancement',
        percentage: 28,
        quotes: ['Lasts 2 days, but would love a 5-day battery case like wireless earbuds.'],
      },
    ],
  },
  {
    id: 'prod_2',
    name: 'AuraSound Bone Conduction Glasses',
    slug: 'aurasound-bone-conduction-glasses',
    tagline: 'Titanium smart eyewear that delivers private audio without blocking ambient sound.',
    description:
      'Ultra-lightweight 22g titanium frames equipped with high-fidelity directional bone conduction drivers. Listen to meetings, podcasts, and calls while remaining 100% aware of your environment.',
    problem: 'Traditional earbuds block ambient acoustic safety during outdoor sports or commuting and cause ear canal fatigue.',
    solution: 'Micro-vibrating bone conduction arms integrated seamlessly into prescription-ready fashion frames.',
    category: 'Audio & Wearables',
    stage: '0_IDEA',
    founderName: 'Maya Lin',
    companyName: 'Aura Labs',
    founderEmail: 'maya@auralabs.design',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 8999,
    expectedPrice: 8999,
    inventoryTotal: 0,
    inventorySold: 0,
    manufacturingStatus: 'CAD Design & 3D Printed Prototype Validated',
    targetAudience: 'Urban commuters, cyclists, remote workers',
    validationObjective: 'Gauge consumer demand & capture waitlist prior to tooling investment',
    estimatedLaunchDate: '2026-11-15',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-08-01T10:00:00Z',

    // Smytten Trial Props
    hasTrialOption: true,
    trialPointsCost: 1,
    trialSizeDescription: '3D Printed Frame Fitting & Audio Demo Kit',
    trialInventoryTotal: 200,
    trialInventoryClaimed: 145,

    views: 8950,
    uniqueVisitors: 6800,
    waitlistCount: 890,
    interestVotes: 1420,
    preOrdersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    cac: 120,
    aov: 8999,
    roas: 0,
    conversionRate: 9.9,
    refundRate: 0,
    sellThroughRate: 0,
    salesVelocityPerDay: 0,

    validationScore: {
      overall: 78,
      demand: 88,
      conversion: 82,
      customerSatisfaction: 85,
      unitEconomics: 70,
      momentum: 74,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Sleek Aesthetic',
        percentage: 91,
        quotes: ['Does not look like bulky tech glasses! Highly interested in prescription lens option.'],
      },
    ],
  },
  {
    id: 'prod_3',
    name: 'HydroPure Go UV-C Flask',
    slug: 'hydropure-go-uvc-flask',
    tagline: 'Self-cleaning double-wall titanium flask with deep-UV water sterilization.',
    description:
      'Eliminates 99.9999% of bio-contaminants in 60 seconds using medical-grade UV-C micro-LEDs built into the leak-proof cap. Vacuum insulated titanium keeps beverages cold for 24 hours.',
    problem: 'Reusable water bottles quickly build up bacteria odor and are impractical to clean while traveling.',
    solution: 'Automated 2-hour UV purification cycle that cleans both water and internal stainless steel surfaces.',
    category: 'Home & Kitchen',
    stage: '2_PROTOTYPE',
    founderName: 'Karan Malhotra',
    companyName: 'HydroPure Technologies',
    founderEmail: 'karan@hydropure.co',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 3999,
    expectedPrice: 4499,
    discountPrice: 3499,
    inventoryTotal: 250,
    inventorySold: 165,
    manufacturingStatus: 'Pre-production Tooling Complete — Pre-Orders Open',
    targetAudience: 'Travelers, hikers, gym enthusiasts, eco-conscious buyers',
    validationObjective: 'Secure pre-orders to fund initial 500-unit mold run',
    estimatedLaunchDate: '2026-10-01',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: false,
    isSponsored: false,
    createdAt: '2026-07-20T12:00:00Z',

    // Smytten Trial Props
    hasTrialOption: true,
    trialPointsCost: 1,
    trialSizeDescription: 'Mini UV Sterilization Cap Tester Bottle',
    trialInventoryTotal: 150,
    trialInventoryClaimed: 98,

    views: 12400,
    uniqueVisitors: 9800,
    waitlistCount: 420,
    interestVotes: 890,
    preOrdersCount: 165,
    ordersCount: 165,
    totalRevenue: 577335,
    cac: 410,
    aov: 3499,
    roas: 4.2,
    conversionRate: 5.2,
    refundRate: 0.5,
    sellThroughRate: 66,
    salesVelocityPerDay: 12,

    validationScore: {
      overall: 82,
      demand: 85,
      conversion: 80,
      customerSatisfaction: 88,
      unitEconomics: 84,
      momentum: 81,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Odor-free freshness',
        percentage: 88,
        quotes: ['Finally a flask that never smells after three days of gym use!'],
      },
    ],
  },
  {
    id: 'prod_4',
    name: 'KiloKeyboard Solid Copper Desk Set',
    slug: 'kilokeyboard-solid-copper-desk-set',
    tagline: 'Precision CNC-machined solid copper mechanical keyboard with gasket mount.',
    description:
      'Weighing 3.2 kg, the KiloKeyboard offers unparalleled acoustic resonance and tactile stability. Features hot-swappable PCB, custom tuned silent tactile switches, and raw brushed copper patina.',
    problem: 'Mass market plastic keyboards feel light, hollow, and wear out easily.',
    solution: 'Heirloom-grade solid copper construction with acoustics tuned for deep, satisfying typing sound.',
    category: 'Workspace & Productivity',
    stage: '6_VALIDATED',
    founderName: 'Elena Rostova',
    companyName: 'Kilo Design Co',
    founderEmail: 'elena@kilokeyboard.com',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 18999,
    discountPrice: 16999,
    inventoryTotal: 150,
    inventorySold: 138,
    manufacturingStatus: 'Batch Production Standardized — Immediate Dispatch',
    targetAudience: 'Software engineers, designers, keyboard enthusiasts',
    validationObjective: 'Graduate validated batch into curated marketplace',
    estimatedLaunchDate: '2026-06-01',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: true,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-05-10T14:00:00Z',

    // Smytten Trial Props
    hasTrialOption: true,
    trialPointsCost: 2,
    trialSizeDescription: 'Solid Copper Keycap & Switch Acoustic Tester Block',
    trialInventoryTotal: 100,
    trialInventoryClaimed: 82,

    views: 34200,
    uniqueVisitors: 28900,
    waitlistCount: 1240,
    interestVotes: 3200,
    preOrdersCount: 138,
    ordersCount: 138,
    totalRevenue: 2345862,
    cac: 1250,
    aov: 16999,
    roas: 5.1,
    conversionRate: 4.2,
    refundRate: 0.4,
    sellThroughRate: 92,
    salesVelocityPerDay: 6,

    validationScore: {
      overall: 89,
      demand: 94,
      conversion: 82,
      customerSatisfaction: 96,
      unitEconomics: 88,
      momentum: 87,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Unmatched Build Quality',
        percentage: 96,
        quotes: ['The acoustic profile is unbelievable. Worth every single rupee.'],
      },
    ],
  },
  {
    id: 'prod_5',
    name: 'Zenith Acoustical Isolation Pod',
    slug: 'zenith-acoustical-isolation-pod',
    tagline: 'Modular soundproof privacy cabin engineered for distraction-free remote work.',
    description:
      'Compact 1.2m x 1.2m acoustic cabin featuring 38dB noise attenuation, automated ventilation system, dimmable circadian LED lighting, and integrated sit-stand desk.',
    problem: 'Home office noise and open workspace distractions destroy deep focus.',
    solution: 'Flat-pack modular pod that assembles in 45 minutes to create an instant silent zone.',
    category: 'Workspace & Productivity',
    stage: '7_MARKETPLACE',
    founderName: 'Vikram Sethi',
    companyName: 'Zenith Pods',
    founderEmail: 'vikram@zenithpods.in',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 125000,
    discountPrice: 115000,
    inventoryTotal: 30,
    inventorySold: 22,
    manufacturingStatus: 'Factory Direct Shipping — 7 Day Delivery',
    targetAudience: 'Remote executives, podcast hosts, software leads',
    validationObjective: 'Scale B2B & high-ticket consumer distribution',
    estimatedLaunchDate: '2026-03-01',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: true,
    isFeatured: true,
    isSponsored: true,
    createdAt: '2026-03-15T09:00:00Z',

    // Smytten Trial Props
    hasTrialOption: true,
    trialPointsCost: 3,
    trialSizeDescription: '38dB Acoustic Material Swatch & VR Pod Experience Kit',
    trialInventoryTotal: 50,
    trialInventoryClaimed: 41,

    views: 42100,
    uniqueVisitors: 31000,
    waitlistCount: 680,
    interestVotes: 1950,
    preOrdersCount: 22,
    ordersCount: 22,
    totalRevenue: 2530000,
    cac: 8500,
    aov: 115000,
    roas: 4.8,
    conversionRate: 2.1,
    refundRate: 0.0,
    sellThroughRate: 73,
    salesVelocityPerDay: 1,

    validationScore: {
      overall: 87,
      demand: 89,
      conversion: 76,
      customerSatisfaction: 98,
      unitEconomics: 92,
      momentum: 82,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Complete Silence',
        percentage: 98,
        quotes: ['Blocks out street traffic and household noise entirely.'],
      },
    ],
  },
  {
    id: 'prod_6',
    name: 'PulseRoast Smart Micro Roaster',
    slug: 'pulseroast-smart-micro-roaster',
    tagline: 'App-controlled single-origin coffee roaster with fluid-bed heat precision.',
    description:
      'Roast green coffee beans to barista perfection right on your kitchen counter. Features custom roast profile sharing, optical bean color sensors, and smoke-free catalytic filter.',
    problem: 'Store-bought roasted coffee loses peak aroma within 14 days of roasting.',
    solution: 'Fresh micro-batch roaster that roasts 150g of fresh green beans in 8 minutes.',
    category: 'D2C Food & Beverage',
    stage: '1_CONCEPT',
    founderName: 'Julian Vance',
    companyName: 'PulseRoast Co',
    founderEmail: 'julian@pulseroast.com',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 14999,
    expectedPrice: 14999,
    inventoryTotal: 0,
    inventorySold: 0,
    manufacturingStatus: 'Concept Design & Firmware Algorithm Prototype Tested',
    targetAudience: 'Specialty coffee lovers, home baristas',
    validationObjective: 'Test pricing acceptance & collect feature preference votes',
    estimatedLaunchDate: '2026-12-01',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: false,
    isSponsored: false,
    createdAt: '2026-08-05T11:00:00Z',

    // Smytten Trial Props
    hasTrialOption: true,
    trialPointsCost: 1,
    trialSizeDescription: 'Single-Origin Green Bean Discovery Sample (3 x 50g)',
    trialInventoryTotal: 300,
    trialInventoryClaimed: 210,

    views: 6400,
    uniqueVisitors: 4900,
    waitlistCount: 380,
    interestVotes: 720,
    preOrdersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    cac: 180,
    aov: 14999,
    roas: 0,
    conversionRate: 7.7,
    refundRate: 0,
    sellThroughRate: 0,
    salesVelocityPerDay: 0,

    validationScore: {
      overall: 73,
      demand: 82,
      conversion: 74,
      customerSatisfaction: 80,
      unitEconomics: 68,
      momentum: 71,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'FEATURE_REQUEST',
        title: 'Green bean subscription box',
        percentage: 76,
        quotes: ['Would love monthly green bean shipments along with the roaster!'],
      },
    ],
  },
];

let productsStore = [...INITIAL_PRODUCTS];
let waitlistsStore: WaitlistEntry[] = [];
let ordersStore: Order[] = [
  {
    id: 'ord_1',
    orderNumber: 'VEN-89210',
    productId: 'prod_1',
    productName: 'NerveBand Haptic Stress Relief',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul.v@gmail.com',
    shippingAddress: '42 MG Road, Indiranagar, Bengaluru, 560038',
    amount: 5999,
    quantity: 1,
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    trackingNumber: 'BLR-908123',
    createdAt: '2026-08-14T09:30:00Z',
  },
];

let platformConfigStore: PlatformConfig = { ...DEFAULT_PLATFORM_CONFIG };

productsStore = productsStore.map((p) => {
  const score = calculateValidationScore(p);
  const updated = { ...p, validationScore: score };
  return { ...updated, recommendations: generateRecommendations(updated) };
});

export function getProducts(filters?: { category?: string; stage?: string; query?: string }): Product[] {
  let list = [...productsStore];
  if (filters?.category && filters.category !== 'All') {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters?.stage && filters.stage !== 'All') {
    list = list.filter((p) => p.stage === filters.stage);
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.founderName.toLowerCase().includes(q) ||
        p.companyName.toLowerCase().includes(q)
    );
  }
  return list;
}

export function getProductById(id: string): Product | undefined {
  return productsStore.find((p) => p.id === id || p.slug === id);
}

export function addProduct(productData: Partial<Product>): Product {
  const newId = `prod_${Date.now()}`;
  const slug = productData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || newId;

  const newProduct: Product = {
    id: newId,
    name: productData.name || 'Untitled Startup',
    slug,
    tagline: productData.tagline || 'Revolutionary new product',
    description: productData.description || '',
    problem: productData.problem || '',
    solution: productData.solution || '',
    category: productData.category || 'Consumer Hardware',
    stage: productData.stage || '0_IDEA',
    founderName: productData.founderName || 'Anonymous Founder',
    companyName: productData.companyName || 'Stealth Startup',
    founderEmail: productData.founderEmail || 'founder@startup.io',
    images: productData.images && productData.images.length > 0
      ? productData.images
      : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'],
    price: Number(productData.price) || 2999,
    expectedPrice: Number(productData.expectedPrice) || Number(productData.price) || 2999,
    inventoryTotal: Number(productData.inventoryTotal) || 100,
    inventorySold: 0,
    manufacturingStatus: productData.manufacturingStatus || 'Initial Validation',
    targetAudience: productData.targetAudience || 'Early Adopters',
    validationObjective: productData.validationObjective || 'Validate market demand',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: false,
    isSponsored: false,
    createdAt: new Date().toISOString(),

    hasTrialOption: true,
    trialPointsCost: 1,
    trialSizeDescription: 'Discovery Pack Sample Unit',
    trialInventoryTotal: 100,
    trialInventoryClaimed: 0,

    views: 45,
    uniqueVisitors: 32,
    waitlistCount: 0,
    interestVotes: 0,
    preOrdersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    cac: 0,
    aov: Number(productData.price) || 2999,
    roas: 0,
    conversionRate: 0,
    refundRate: 0,
    sellThroughRate: 0,
    salesVelocityPerDay: 0,

    validationScore: {
      overall: 55,
      demand: 60,
      conversion: 40,
      customerSatisfaction: 85,
      unitEconomics: 50,
      momentum: 45,
    },
    recommendations: [],
    feedbackThemes: [],
  };

  newProduct.validationScore = calculateValidationScore(newProduct);
  newProduct.recommendations = generateRecommendations(newProduct);

  productsStore.unshift(newProduct);
  return newProduct;
}

export function joinWaitlist(entry: Omit<WaitlistEntry, 'id' | 'createdAt'>): WaitlistEntry {
  const newEntry: WaitlistEntry = {
    ...entry,
    id: `wait_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  waitlistsStore.push(newEntry);

  const product = productsStore.find((p) => p.id === entry.productId);
  if (product) {
    product.waitlistCount += 1;
    product.interestVotes += 1;
    product.views += 3;
    product.validationScore = calculateValidationScore(product);
    product.recommendations = generateRecommendations(product);
  }

  return newEntry;
}

export function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
  const newOrder: Order = {
    ...orderData,
    id: `ord_${Date.now()}`,
    orderNumber: `VEN-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
  };
  ordersStore.unshift(newOrder);

  const product = productsStore.find((p) => p.id === orderData.productId);
  if (product) {
    if (orderData.isTrialOrder && product.trialInventoryClaimed !== undefined) {
      product.trialInventoryClaimed += 1;
    } else {
      product.ordersCount += orderData.quantity;
      product.inventorySold += orderData.quantity;
      product.totalRevenue += orderData.amount;
    }
    product.sellThroughRate = Math.round((product.inventorySold / Math.max(product.inventoryTotal, 1)) * 100);
    product.conversionRate = Number(((product.ordersCount / Math.max(product.views, 1)) * 100).toFixed(1));
    product.validationScore = calculateValidationScore(product);
    product.recommendations = generateRecommendations(product);
  }

  return newOrder;
}

export function getWaitlists(productId?: string): WaitlistEntry[] {
  if (productId) return waitlistsStore.filter((w) => w.productId === productId);
  return waitlistsStore;
}

export function getOrders(productId?: string): Order[] {
  if (productId) return ordersStore.filter((o) => o.productId === productId);
  return ordersStore;
}

export function updateOrderStatus(orderId: string, status: Order['status']) {
  const order = ordersStore.find((o) => o.id === orderId);
  if (order) order.status = status;
}

export function graduateProductToMarketplace(productId: string) {
  const product = productsStore.find((p) => p.id === productId);
  if (product) {
    product.isGraduatedToMarketplace = true;
    product.stage = '7_MARKETPLACE';
    product.recommendations = generateRecommendations(product);
  }
}

export function approveProductByAdmin(productId: string, approve: boolean) {
  const product = productsStore.find((p) => p.id === productId);
  if (product) {
    product.isApprovedByAdmin = approve;
  }
}

export function getPlatformConfig(): PlatformConfig {
  return platformConfigStore;
}

export function updatePlatformConfig(config: Partial<PlatformConfig>) {
  platformConfigStore = { ...platformConfigStore, ...config };
}
