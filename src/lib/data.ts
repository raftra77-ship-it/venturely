import { Product, WaitlistEntry, Order, ProductReview, PlatformConfig, LiveFomoEvent } from '@/types';
import { DEFAULT_PLATFORM_CONFIG, LIVE_FOMO_EVENTS } from './constants';
import { calculateValidationScore } from './validation-engine';
import { generateRecommendations } from './recommendation-engine';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'ZenRing Glow — Biometric Mood Ring',
    slug: 'zenring-glow-biometric-mood-ring',
    tagline: 'Liquid titanium smart ring that reads biometric stress & glows subtle ambient colors.',
    description:
      'ZenRing Glow monitors skin temperature, galvanic skin response, and HRV micro-fluctuations. Made from aero-grade liquid titanium, it glows soft ambient hues to alert you when your body needs a 60-second breathing pause.',
    problem: 'Modern professionals experience hidden sympathetic nervous overload without realizing physical stress spikes.',
    solution: 'Subtle wearable haptic & optical biometric indicator ring providing real-time ambient biofeedback.',
    category: 'Health & Wearables',
    startupType: 'D2C',
    stage: '4_EARLY_PRODUCT',
    founderName: 'Aarav Sharma',
    companyName: 'ZenRing Technologies',
    founderEmail: 'aarav@zenring.tech',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 499,
    expectedPrice: 1499,
    discountPrice: 449,
    logisticsModel: 'VENTURELY_SUPPORTED',
    shippingEstimateDays: '3-4 Business Days',
    shippingFee: 49,

    inventoryTotal: 50,
    inventorySold: 42,
    recommendedBatchSize: 500,
    breakevenUnits: 80,
    manufacturingStatus: 'Batch #1 (50 Units) 84% Pre-ordered — Manufacturing setup ready',

    targetAudience: 'Biohackers, founders, tech workers, wellness enthusiasts',
    validationObjective: 'Test pre-order conversion rate & ₹499 impulse price elasticity',
    estimatedLaunchDate: '2026-09-10',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-07-20T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 50,
    batchClaimedCount: 42,
    priceLockExpiry: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
    currentViewersCount: 128,
    waitlistCount: 840,
    vipWaitlistSlots: 8,

    // Analytics
    views: 24500,
    uniqueVisitors: 19800,
    cartAdditionsCount: 680,
    checkoutInitiatedCount: 210,
    preOrdersCount: 42,
    ordersCount: 42,
    totalRevenue: 20958,

    cartPurchaseRate: 22.4, // High demand
    cartAbandonmentRate: 58.0,
    checkoutIntentRate: 30.8,
    willingnessToPayScore: 92,
    cac: 120,
    aov: 499,
    conversionRate: 5.4,
    refundRate: 0.5,
    commissionRate: 5,

    adMetrics: {
      activePackage: 'GROWTH',
      adSpend: 14999,
      impressions: 184000,
      clicks: 7360,
      ctr: 4.0,
      cpc: 2.03,
      cac: 120,
      roas: 4.8,
    },

    validationScore: {
      overall: 91,
      demand: 95,
      conversion: 88,
      customerSatisfaction: 92,
      unitEconomics: 89,
      fomoUrgency: 92,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Super sleek & instant stress awareness',
        percentage: 92,
        quotes: ['The ambient glow when my stress spikes is super subtle yet helpful.', 'Featherweight liquid titanium feels premium.'],
      },
      {
        category: 'IMPROVEMENT',
        title: 'More ring sizes needed',
        percentage: 18,
        quotes: ['Would love half-sizes for ring finger.'],
      },
    ],
  },
  {
    id: 'prod_2',
    name: 'BioShine Lumino-Plant — Bioluminescent Indoor Fern',
    slug: 'bioshine-lumino-plant-bioluminescent-houseplant',
    tagline: 'Zero-electricity living houseplant engineered to emit natural ambient blue light at night.',
    description:
      'BioShine is a non-GMO bioluminescent fern infused with natural sea algae enzymes. It charges from daylight during the day and emits a mesmerizing natural blue glow for 6-8 hours every night.',
    problem: 'Night lights consume electricity and artificial LED blue-screen light disrupts circadian sleep cycles.',
    solution: '100% natural, living biological ambient light source that purifies indoor air while creating zero heat or electric footprint.',
    category: 'Home & Biotech',
    startupType: 'D2C',
    stage: '2_PROTOTYPE',
    founderName: 'Dr. Priya Nambiar',
    companyName: 'LuminaFlora Bio',
    founderEmail: 'priya@luminaflora.bio',
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 599,
    expectedPrice: 1999,
    discountPrice: 549,
    logisticsModel: 'VENTURELY_SUPPORTED',
    shippingEstimateDays: '2-3 Business Days',
    shippingFee: 49,

    inventoryTotal: 40,
    inventorySold: 35,
    recommendedBatchSize: 600,
    breakevenUnits: 60,
    manufacturingStatus: 'Batch #1 (40 Plant Kits) 87% Claimed — Spore propagation active',

    targetAudience: 'Plant lovers, eco-tech fans, bedroom decor enthusiasts',
    validationObjective: 'Test live plant shipping survival & pre-order demand at ₹599',
    estimatedLaunchDate: '2026-09-15',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-07-22T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 40,
    batchClaimedCount: 35,
    priceLockExpiry: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    currentViewersCount: 165,
    waitlistCount: 1120,
    vipWaitlistSlots: 5,

    // Analytics
    views: 31200,
    uniqueVisitors: 24100,
    cartAdditionsCount: 920,
    checkoutInitiatedCount: 340,
    preOrdersCount: 35,
    ordersCount: 35,
    totalRevenue: 20965,

    cartPurchaseRate: 19.8,
    cartAbandonmentRate: 63.0,
    checkoutIntentRate: 36.9,
    willingnessToPayScore: 94,
    cac: 140,
    aov: 599,
    conversionRate: 4.8,
    refundRate: 0.2,
    commissionRate: 6,

    adMetrics: {
      activePackage: 'GROWTH',
      adSpend: 14999,
      impressions: 210000,
      clicks: 8400,
      ctr: 4.0,
      cpc: 1.78,
      cac: 140,
      roas: 5.1,
    },

    validationScore: {
      overall: 93,
      demand: 96,
      conversion: 90,
      customerSatisfaction: 95,
      unitEconomics: 91,
      fomoUrgency: 94,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Mindblowing night glow',
        percentage: 95,
        quotes: ['Literally glows like Pandora in Avatar! Best desk accessory ever.', 'Watering kit is foolproof.'],
      },
    ],
  },
  {
    id: 'prod_3',
    name: 'GhostWriter AI Deskbot — Mechanical Handwriting Arm',
    slug: 'ghostwriter-ai-deskbot-handwriting-arm',
    tagline: 'Desktop robotic arm that handwrites physical letters using a real fountain pen in your handwriting.',
    description:
      'GhostWriter connects via USB or Bluetooth. Upload a sample of your handwriting or pick a calligraphy font, and watch the precision micro-servos write genuine ink notes on cardstock for client thank-yous, wedding invites, or fan mail.',
    problem: 'Printed emails lack personal warmth, while handwriting 100 personalized letters causes severe wrist fatigue.',
    solution: 'Robotic physical plotter arm that writes real ink letters with human pressure variation and natural stroke angles.',
    category: 'Hardware & Objects',
    startupType: 'D2C',
    stage: '4_EARLY_PRODUCT',
    founderName: 'Rohan Varma',
    companyName: 'RoboScript Labs',
    founderEmail: 'rohan@roboscript.io',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 999,
    expectedPrice: 3499,
    discountPrice: 899,
    logisticsModel: 'VENTURELY_SUPPORTED',
    shippingEstimateDays: '3-5 Business Days',
    shippingFee: 49,

    inventoryTotal: 30,
    inventorySold: 27,
    recommendedBatchSize: 300,
    breakevenUnits: 45,
    manufacturingStatus: 'Batch #1 (30 Units) 90% Claimed — PCB assembly underway',

    targetAudience: 'Founders, salespeople, wedding planners, real estate agents',
    validationObjective: 'Test pre-order conversion for ₹999 hardware prototype deposit',
    estimatedLaunchDate: '2026-09-25',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: true,
    isSponsored: true,
    createdAt: '2026-07-25T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 30,
    batchClaimedCount: 27,
    priceLockExpiry: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    currentViewersCount: 210,
    waitlistCount: 1450,
    vipWaitlistSlots: 3,

    // Analytics
    views: 42000,
    uniqueVisitors: 31000,
    cartAdditionsCount: 1100,
    checkoutInitiatedCount: 420,
    preOrdersCount: 27,
    ordersCount: 27,
    totalRevenue: 26973,

    cartPurchaseRate: 18.2,
    cartAbandonmentRate: 61.8,
    checkoutIntentRate: 38.2,
    willingnessToPayScore: 89,
    cac: 280,
    aov: 999,
    conversionRate: 3.8,
    refundRate: 0.9,
    commissionRate: 6,

    adMetrics: {
      activePackage: 'SCALE',
      adSpend: 34999,
      impressions: 420000,
      clicks: 14700,
      ctr: 3.5,
      cpc: 2.38,
      cac: 280,
      roas: 3.8,
    },

    validationScore: {
      overall: 89,
      demand: 91,
      conversion: 87,
      customerSatisfaction: 90,
      unitEconomics: 88,
      fomoUrgency: 90,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Clients thought I spent hours writing notes',
        percentage: 91,
        quotes: ['Our response rate on sales letters jumped 3x!', 'Fountain pen mechanism is butter smooth.'],
      },
    ],
  },
  {
    id: 'prod_4',
    name: 'PitchDeck Roaster AI — VC Simulator Platform',
    slug: 'pitchdeck-roaster-ai-vc-simulator',
    tagline: 'Brutally honest AI investor simulator that roasts your pitch deck & simulates 100 investor Q&As in 30 seconds.',
    description:
      'Upload your PDF pitch deck or notion link. PitchDeck Roaster AI runs term-sheet stress tests, flags valuation red flags, and simulates live voice Q&A audio calls acting like Sequoia, YC, or Accel partners.',
    problem: 'Founders burn precious VC meetings getting rejected due to predictable pitch blindspots.',
    solution: 'Instant AI pitch audit & voice mock-interviews trained on 5,000+ funded startup decks.',
    category: 'AI & SaaS Platform',
    startupType: 'SAAS',
    stage: '4_EARLY_PRODUCT',
    founderName: 'Karan Mehta',
    companyName: 'RoastVC Inc',
    founderEmail: 'karan@roastvc.ai',
    images: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 199,
    expectedPrice: 999,
    discountPrice: 149,
    logisticsModel: 'SELF_FULFILLED',
    shippingEstimateDays: 'Instant Digital Access',
    shippingFee: 0,

    inventoryTotal: 500,
    inventorySold: 412,
    recommendedBatchSize: 2000,
    breakevenUnits: 150,
    manufacturingStatus: 'Cloud API Active — 412 Founders onboarded in Beta Batch #1',

    targetAudience: 'Early-stage founders, YC applicants, startup incubators',
    validationObjective: 'Test monthly subscription interest & ₹199 micro-SaaS conversion',
    estimatedLaunchDate: '2026-08-30',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: true,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-07-28T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 500,
    batchClaimedCount: 412,
    priceLockExpiry: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    currentViewersCount: 340,
    waitlistCount: 2890,
    vipWaitlistSlots: 12,

    // Analytics
    views: 68000,
    uniqueVisitors: 52000,
    cartAdditionsCount: 1850,
    checkoutInitiatedCount: 680,
    preOrdersCount: 412,
    ordersCount: 412,
    totalRevenue: 81988,

    cartPurchaseRate: 22.3,
    cartAbandonmentRate: 63.2,
    checkoutIntentRate: 36.8,
    willingnessToPayScore: 96,
    cac: 45,
    aov: 199,
    conversionRate: 6.2,
    refundRate: 0.1,
    commissionRate: 5,

    adMetrics: {
      activePackage: 'GROWTH',
      adSpend: 14999,
      impressions: 340000,
      clicks: 13600,
      ctr: 4.0,
      cpc: 1.10,
      cac: 45,
      roas: 5.4,
    },

    validationScore: {
      overall: 94,
      demand: 97,
      conversion: 93,
      customerSatisfaction: 96,
      unitEconomics: 92,
      fomoUrgency: 92,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Saved us from getting roasted by real VCs',
        percentage: 96,
        quotes: ['Identified 4 unit economic flaws in 30 seconds.', 'Voice Q&A mode feels terrifyingly real!'],
      },
    ],
  },
  {
    id: 'prod_5',
    name: 'ChaiBot Pocket Brewery — USB-C Karak Chai Maker',
    slug: 'chaibot-pocket-brewery-usb-c-chai-maker',
    tagline: 'Compact desktop thermo-induction brewer that makes authentic ginger masala chai in 90 seconds.',
    description:
      'ChaiBot fits in a coffee mug slot. Powered by 65W USB-C PD power banks, it uses micro-agitation technology to boil tea leaves, crushed ginger, and spices without burning milk.',
    problem: 'Office tea bags taste terrible, while making real boiled chai requires a stove kitchen.',
    solution: 'Desk-friendly magnetic induction mini kettle engineered specifically for tea leaf decoction.',
    category: 'Kitchen Tech & Objects',
    startupType: 'D2C',
    stage: '2_PROTOTYPE',
    founderName: 'Ananya Roy',
    companyName: 'ChaiCraft Labs',
    founderEmail: 'ananya@chaicraft.in',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 499,
    expectedPrice: 1999,
    discountPrice: 449,
    logisticsModel: 'VENTURELY_SUPPORTED',
    shippingEstimateDays: '3-4 Business Days',
    shippingFee: 49,

    inventoryTotal: 75,
    inventorySold: 68,
    recommendedBatchSize: 1000,
    breakevenUnits: 90,
    manufacturingStatus: 'Batch #1 (75 Units) 90% Claimed — Mold tooling finalized',

    targetAudience: 'Chai lovers, IT professionals, night shift coders, hostel students',
    validationObjective: 'Test pre-order demand for ₹499 desk chai brewer prototype',
    estimatedLaunchDate: '2026-09-18',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-07-30T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 75,
    batchClaimedCount: 68,
    priceLockExpiry: new Date(Date.now() + 28 * 3600 * 1000).toISOString(),
    currentViewersCount: 188,
    waitlistCount: 1340,
    vipWaitlistSlots: 7,

    // Analytics
    views: 38900,
    uniqueVisitors: 29400,
    cartAdditionsCount: 1050,
    checkoutInitiatedCount: 390,
    preOrdersCount: 68,
    ordersCount: 68,
    totalRevenue: 33932,

    cartPurchaseRate: 17.4,
    cartAbandonmentRate: 62.8,
    checkoutIntentRate: 37.2,
    willingnessToPayScore: 91,
    cac: 110,
    aov: 499,
    conversionRate: 4.9,
    refundRate: 0.4,
    commissionRate: 5,

    adMetrics: {
      activePackage: 'GROWTH',
      adSpend: 14999,
      impressions: 290000,
      clicks: 11600,
      ctr: 4.0,
      cpc: 1.29,
      cac: 110,
      roas: 4.5,
    },

    validationScore: {
      overall: 90,
      demand: 94,
      conversion: 87,
      customerSatisfaction: 91,
      unitEconomics: 89,
      fomoUrgency: 91,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Proper boiled tapri chai right at my work desk!',
        percentage: 94,
        quotes: ['No more watery office vending machine tea.', 'Cleaning cycle takes 5 seconds.'],
      },
    ],
  },
  {
    id: 'prod_6',
    name: 'CodeSnip Micro-Bounty — 15-Min Bug Fixing B2B Platform',
    slug: 'codesnip-micro-bounty-b2b-platform',
    tagline: 'Developer platform where startups post ₹500 micro-bounties for 15-minute bug fixes.',
    description:
      'Stuck on a tricky CSS alignment, regex error, or docker permission bug? Post your repo snippet to CodeSnip. Verified senior devs compete to fix your bug via live sandbox video in under 15 minutes.',
    problem: 'Founders burn hours searching StackOverflow for trivial syntax bugs that take senior devs 60 seconds.',
    solution: 'Micro-task B2B developer bounty network with instant sandbox code execution.',
    category: 'Developer Tools & B2B',
    startupType: 'B2B',
    stage: '4_EARLY_PRODUCT',
    founderName: 'Vikramaditya Rao',
    companyName: 'CodeSnip Tech',
    founderEmail: 'vikram@codesnip.dev',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 299,
    expectedPrice: 999,
    discountPrice: 249,
    logisticsModel: 'SELF_FULFILLED',
    shippingEstimateDays: 'Instant API Access',
    shippingFee: 0,

    inventoryTotal: 200,
    inventorySold: 165,
    recommendedBatchSize: 1000,
    breakevenUnits: 80,
    manufacturingStatus: 'Platform Active — 165 Founder Accounts Verified',

    targetAudience: 'Indie hackers, non-tech founders, CTOs, bootcamp grads',
    validationObjective: 'Test startup willingness to post ₹500 micro-bounties',
    estimatedLaunchDate: '2026-08-28',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: true,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-08-01T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 200,
    batchClaimedCount: 165,
    priceLockExpiry: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    currentViewersCount: 145,
    waitlistCount: 920,
    vipWaitlistSlots: 10,

    // Analytics
    views: 29000,
    uniqueVisitors: 21500,
    cartAdditionsCount: 780,
    checkoutInitiatedCount: 290,
    preOrdersCount: 165,
    ordersCount: 165,
    totalRevenue: 49335,

    cartPurchaseRate: 21.1,
    cartAbandonmentRate: 62.8,
    checkoutIntentRate: 37.2,
    willingnessToPayScore: 93,
    cac: 65,
    aov: 299,
    conversionRate: 5.1,
    refundRate: 0.2,
    commissionRate: 7,

    adMetrics: {
      activePackage: 'STARTER',
      adSpend: 4999,
      impressions: 120000,
      clicks: 4800,
      ctr: 4.0,
      cpc: 1.04,
      cac: 65,
      roas: 4.6,
    },

    validationScore: {
      overall: 91,
      demand: 93,
      conversion: 89,
      customerSatisfaction: 94,
      unitEconomics: 90,
      fomoUrgency: 90,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Fixed a 6-hour Next.js SSR bug in 8 minutes!',
        percentage: 95,
        quotes: ['Best ₹299 I ever spent as a solo founder.', 'Dev fixed the bug live on screen.'],
      },
    ],
  },
  {
    id: 'prod_7',
    name: 'ZeroWaste Sporebox — Coffee Ground Mushroom Kit',
    slug: 'zerowaste-sporebox-coffee-ground-mushroom-kit',
    tagline: 'Home mushroom cultivator kit using upcycled cafe coffee grounds — grows gourmet oyster mushrooms in 7 days.',
    description:
      'Unbox, mist with water twice daily, and harvest fresh pearl oyster mushrooms right on your kitchen counter. Each Sporebox is made from 100% upcycled coffee grounds collected from local cafes.',
    problem: 'Store-bought gourmet mushrooms are expensive, while growing food at home usually requires soil garden space.',
    solution: 'Zero-waste upcycled substrate box that guarantees 3 fresh mushroom harvests indoors.',
    category: 'FoodTech & Eco Objects',
    startupType: 'D2C',
    stage: '4_EARLY_PRODUCT',
    founderName: 'Devika Patel',
    companyName: 'FungiCycle Labs',
    founderEmail: 'devika@fungicycle.com',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 249,
    expectedPrice: 699,
    discountPrice: 199,
    logisticsModel: 'VENTURELY_SUPPORTED',
    shippingEstimateDays: '2-3 Business Days',
    shippingFee: 49,

    inventoryTotal: 100,
    inventorySold: 88,
    recommendedBatchSize: 1500,
    breakevenUnits: 120,
    manufacturingStatus: 'Batch #1 (100 Kits) 88% Claimed — Inoculation complete',

    targetAudience: 'Home cooks, eco-conscious families, kids science projects',
    validationObjective: 'Test pre-order conversion & ₹249 price point',
    estimatedLaunchDate: '2026-09-05',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-08-02T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 100,
    batchClaimedCount: 88,
    priceLockExpiry: new Date(Date.now() + 40 * 3600 * 1000).toISOString(),
    currentViewersCount: 195,
    waitlistCount: 1580,
    vipWaitlistSlots: 15,

    // Analytics
    views: 45000,
    uniqueVisitors: 36000,
    cartAdditionsCount: 1420,
    checkoutInitiatedCount: 510,
    preOrdersCount: 88,
    ordersCount: 88,
    totalRevenue: 21912,

    cartPurchaseRate: 17.3,
    cartAbandonmentRate: 64.0,
    checkoutIntentRate: 36.0,
    willingnessToPayScore: 95,
    cac: 55,
    aov: 249,
    conversionRate: 5.6,
    refundRate: 0.1,
    commissionRate: 5,

    adMetrics: {
      activePackage: 'GROWTH',
      adSpend: 14999,
      impressions: 310000,
      clicks: 12400,
      ctr: 4.0,
      cpc: 1.21,
      cac: 55,
      roas: 4.5,
    },

    validationScore: {
      overall: 92,
      demand: 95,
      conversion: 88,
      customerSatisfaction: 96,
      unitEconomics: 90,
      fomoUrgency: 93,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Harvested 400g of fresh mushrooms in 6 days!',
        percentage: 96,
        quotes: ['Super fun experience with my kids.', 'Delicious sauteed with butter & garlic.'],
      },
    ],
  },
  {
    id: 'prod_8',
    name: 'VibeCheck Voice AI — Date Chemistry App',
    slug: 'vibecheck-voice-ai-date-chemistry-app',
    tagline: 'AI voice analysis companion that analyzes tone, laughter, & interest on dates to detect real chemistry.',
    description:
      'VibeCheck runs quietly in the background during audio or video calls. It evaluates acoustic resonance, speech cadence, and mutual laughter duration to generate a hilarious & insightful "Chemistry Breakdown".',
    problem: 'Gen-Z and millennials struggle to tell if their online dating matches are genuinely interested or just being polite.',
    solution: 'Real-time acoustic sentiment engine that detects micro-signals of attraction and boredom.',
    category: 'Consumer Apps & B2C',
    startupType: 'B2C',
    stage: '2_PROTOTYPE',
    founderName: 'Siddharth Roy',
    companyName: 'VibeCheck AI',
    founderEmail: 'sid@vibecheck.app',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    ],
    price: 149,
    expectedPrice: 499,
    discountPrice: 99,
    logisticsModel: 'SELF_FULFILLED',
    shippingEstimateDays: 'Instant Beta App Access',
    shippingFee: 0,

    inventoryTotal: 1000,
    inventorySold: 840,
    recommendedBatchSize: 5000,
    breakevenUnits: 300,
    manufacturingStatus: 'iOS & Android TestFlight Active — 840 Beta Testers',

    targetAudience: 'Dating app users, Gen-Z singles, podcasters',
    validationObjective: 'Test viral signup rate & ₹149 beta access fee',
    estimatedLaunchDate: '2026-08-25',
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: true,
    isFeatured: true,
    isSponsored: false,
    createdAt: '2026-08-04T08:00:00Z',

    // FOMO & Waitlist
    limitedBatchSize: 1000,
    batchClaimedCount: 840,
    priceLockExpiry: new Date(Date.now() + 16 * 3600 * 1000).toISOString(),
    currentViewersCount: 420,
    waitlistCount: 4200,
    vipWaitlistSlots: 20,

    // Analytics
    views: 89000,
    uniqueVisitors: 67000,
    cartAdditionsCount: 3100,
    checkoutInitiatedCount: 1200,
    preOrdersCount: 840,
    ordersCount: 840,
    totalRevenue: 125160,

    cartPurchaseRate: 27.1, // Viral high CPR
    cartAbandonmentRate: 61.3,
    checkoutIntentRate: 38.7,
    willingnessToPayScore: 97,
    cac: 25,
    aov: 149,
    conversionRate: 7.2,
    refundRate: 0.1,
    commissionRate: 5,

    adMetrics: {
      activePackage: 'SCALE',
      adSpend: 34999,
      impressions: 890000,
      clicks: 35600,
      ctr: 4.0,
      cpc: 0.98,
      cac: 25,
      roas: 6.8,
    },

    validationScore: {
      overall: 96,
      demand: 99,
      conversion: 95,
      customerSatisfaction: 94,
      unitEconomics: 96,
      fomoUrgency: 96,
    },
    recommendations: [],
    feedbackThemes: [
      {
        category: 'POSITIVE',
        title: 'Told me my date was 89% interested before I even asked!',
        percentage: 97,
        quotes: ['Going viral on TikTok!', 'The laughter duration metric is spot on.'],
      },
    ],
  },
];

export function getProducts(): Product[] {
  return INITIAL_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return INITIAL_PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return INITIAL_PRODUCTS.find((p) => p.slug === slug);
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'limitedBatchSize' | 'batchClaimedCount' | 'currentViewersCount' | 'waitlistCount' | 'views' | 'uniqueVisitors' | 'cartAdditionsCount' | 'checkoutInitiatedCount' | 'preOrdersCount' | 'ordersCount' | 'totalRevenue' | 'cartPurchaseRate' | 'cartAbandonmentRate' | 'checkoutIntentRate' | 'willingnessToPayScore' | 'cac' | 'aov' | 'conversionRate' | 'refundRate' | 'commissionRate' | 'adMetrics' | 'validationScore' | 'recommendations' | 'feedbackThemes'>): Product {
  const newProduct: Product = {
    ...product,
    id: `prod_${Date.now()}`,
    createdAt: new Date().toISOString(),
    limitedBatchSize: product.inventoryTotal || 50,
    batchClaimedCount: 0,
    currentViewersCount: Math.floor(Math.random() * 50) + 10,
    waitlistCount: 0,
    views: 0,
    uniqueVisitors: 0,
    cartAdditionsCount: 0,
    checkoutInitiatedCount: 0,
    preOrdersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    cartPurchaseRate: 0,
    cartAbandonmentRate: 0,
    checkoutIntentRate: 0,
    willingnessToPayScore: 75,
    cac: 150,
    aov: product.price,
    conversionRate: 0,
    refundRate: 0,
    commissionRate: 6,
    priceLockExpiry: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    adMetrics: {
      activePackage: 'STARTER',
      adSpend: 4999,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cpc: 0,
      cac: 0,
      roas: 0,
    },
    validationScore: {
      overall: 75,
      demand: 75,
      conversion: 70,
      customerSatisfaction: 80,
      unitEconomics: 75,
      fomoUrgency: 75,
    },
    recommendations: [],
    feedbackThemes: [],
  };

  INITIAL_PRODUCTS.unshift(newProduct);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const index = INITIAL_PRODUCTS.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  INITIAL_PRODUCTS[index] = { ...INITIAL_PRODUCTS[index], ...updates };
  return INITIAL_PRODUCTS[index];
}

// In-Memory Waitlist store
const waitlistsStore: WaitlistEntry[] = [
  {
    id: 'wl_1',
    productId: 'prod_1',
    productName: 'ZenRing Glow — Biometric Mood Ring',
    customerEmail: 'aarav@gmail.com',
    customerName: 'Aarav Sharma',
    referralCode: 'AARAV-VIP',
    referralCount: 4,
    rank: 3,
    createdAt: '2026-08-10T10:00:00Z',
  },
  {
    id: 'wl_2',
    productId: 'prod_2',
    productName: 'BioShine Lumino-Plant — Bioluminescent Indoor Fern',
    customerEmail: 'meera@yahoo.com',
    customerName: 'Meera Kapoor',
    referralCode: 'MEERA-VIP',
    referralCount: 7,
    rank: 1,
    createdAt: '2026-08-12T14:30:00Z',
  },
];

export function getWaitlist(productId: string): WaitlistEntry[] {
  return waitlistsStore.filter((w) => w.productId === productId);
}

export function getWaitlists(): WaitlistEntry[] {
  return waitlistsStore;
}

export function addWaitlistEntry(entry: Omit<WaitlistEntry, 'id' | 'createdAt' | 'referralCode' | 'referralCount' | 'rank'>): WaitlistEntry {
  const productWaitlist = getWaitlist(entry.productId);
  const newEntry: WaitlistEntry = {
    ...entry,
    id: `wl_${Date.now()}`,
    referralCode: `${(entry.customerName || 'USER').substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    referralCount: 0,
    rank: productWaitlist.length + 1,
    createdAt: new Date().toISOString(),
  };

  waitlistsStore.unshift(newEntry);
  const prod = getProductById(entry.productId);
  if (prod) {
    prod.waitlistCount += 1;
  }
  return newEntry;
}

// Orders store
const ordersStore: Order[] = [
  {
    id: 'ord_101',
    orderNumber: 'VNT-BLR-8849',
    productId: 'prod_1',
    productName: 'ZenRing Glow — Biometric Mood Ring',
    customerName: 'Ananya Roy',
    customerEmail: 'ananya@gmail.com',
    shippingAddress: '42 Indiranagar 100ft Road, Bengaluru, KA',
    amount: 548,
    quantity: 1,
    logisticsModel: 'VENTURELY_SUPPORTED',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    trackingNumber: 'VNT-BLR-8849',
    isPreOrder: true,
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
  {
    id: 'ord_102',
    orderNumber: 'VNT-MUM-9921',
    productId: 'prod_3',
    productName: 'GhostWriter AI Deskbot — Mechanical Handwriting Arm',
    customerName: 'Vikram Seth',
    customerEmail: 'vikram@startup.in',
    shippingAddress: '12 Powai Tech Park, Mumbai, MH',
    amount: 1048,
    quantity: 1,
    logisticsModel: 'VENTURELY_SUPPORTED',
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    trackingNumber: 'VNT-MUM-9921',
    isPreOrder: true,
    createdAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
  },
];

export function getOrders(): Order[] {
  return ordersStore;
}

export function addOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'orderNumber'>): Order {
  const newOrder: Order = {
    ...orderData,
    id: `ord_${Date.now()}`,
    orderNumber: `VNT-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
  };
  ordersStore.unshift(newOrder);

  const prod = getProductById(orderData.productId);
  if (prod) {
    prod.inventorySold += orderData.quantity;
    prod.batchClaimedCount += orderData.quantity;
    prod.preOrdersCount += orderData.quantity;
    prod.ordersCount += orderData.quantity;
    prod.totalRevenue += orderData.amount;
  }
  return newOrder;
}

export function recordCartAdd(productId: string) {
  const prod = getProductById(productId);
  if (prod) {
    prod.cartAdditionsCount += 1;
    if (prod.cartAdditionsCount > 0) {
      prod.cartPurchaseRate = Math.round((prod.preOrdersCount / prod.cartAdditionsCount) * 1000) / 10;
    }
  }
}
