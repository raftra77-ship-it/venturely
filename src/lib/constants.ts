import { ProductStage, StageInfo, PlatformConfig, StartupCategory } from '@/types';

export const STAGES: Record<ProductStage, StageInfo> = {
  '0_IDEA': {
    key: '0_IDEA',
    label: 'Idea Validation',
    shortLabel: 'IDEA',
    description: 'Concept phase — measuring baseline market curiosity and audience interest.',
    actionText: 'Join VIP Waitlist',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-200',
  },
  '1_CONCEPT': {
    key: '1_CONCEPT',
    label: 'Concept Design',
    shortLabel: 'CONCEPT',
    description: 'Detailed specs & 3D visual concept — testing feature prioritization and positioning.',
    actionText: 'Vote & Request Demo',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-200',
  },
  '2_PROTOTYPE': {
    key: '2_PROTOTYPE',
    label: 'Prototype Testing',
    shortLabel: 'PROTOTYPE',
    description: 'Functional prototype — validating usability, early feedback, and target pricing.',
    actionText: 'Reserve Prototype Slot',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    badgeBorder: 'border-purple-200',
  },
  '3_MVP': {
    key: '3_MVP',
    label: 'Minimum Viable Product',
    shortLabel: 'MVP',
    description: 'Working v1 product — testing conversion funnel, pre-orders, and buyer intent.',
    actionText: 'Pre-order MVP',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-200',
  },
  '4_EARLY_PRODUCT': {
    key: '4_EARLY_PRODUCT',
    label: 'Limited Batch Launch',
    shortLabel: 'LIMITED LAUNCH',
    description: 'Initial production run (e.g. 50-100 units) — testing sell-through rate & CAC.',
    actionText: 'Claim Limited Unit',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200',
  },
  '5_VALIDATED': {
    key: '5_VALIDATED',
    label: 'Validated Product',
    shortLabel: 'VALIDATED',
    description: 'Met platform validation benchmarks — backed by real customer demand & CPR metrics.',
    actionText: 'Order Validated',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800 font-semibold',
    badgeBorder: 'border-emerald-300',
  },
  '6_MARKETPLACE': {
    key: '6_MARKETPLACE',
    label: 'Marketplace Curated',
    shortLabel: 'MARKETPLACE',
    description: 'Graduated into curated public marketplace — 5-7% platform commission model.',
    actionText: 'Buy Now',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800 font-semibold',
    badgeBorder: 'border-slate-300',
  },
};

export const STARTUP_CATEGORIES: { key: StartupCategory; label: string; badge: string; description: string }[] = [
  { key: 'D2C', label: 'D2C Physical Brands', badge: 'bg-emerald-100 text-emerald-800', description: 'Low-inventory physical products, 3D prototypes, sample kits, and micro-batches.' },
  { key: 'SAAS', label: 'SaaS & Digital Software', badge: 'bg-blue-100 text-blue-800', description: 'Interactive demo signups, waitlists, pricing tier demand, and ACV validation.' },
  { key: 'B2B', label: 'B2B & Wholesale', badge: 'bg-purple-100 text-purple-800', description: 'Sample kit orders, MOQ validation, and Request for Quote (RFQ) intent.' },
  { key: 'B2C', label: 'B2C Apps & Consumer Tech', badge: 'bg-rose-100 text-rose-800', description: 'Beta access signups, pilot reservations, and early consumer testing.' },
];

export const PRODUCT_CATEGORIES = [
  'Consumer Hardware',
  'Health & Wellness',
  'Workspace & Productivity',
  'Audio & Wearables',
  'Home & Kitchen',
  'SaaS & Software',
  'Apparel & D2C',
  'B2B & Wholesale',
];

export const VALIDATION_PACKAGE_TIERS = {
  STARTER: {
    tier: 'STARTER' as const,
    packageName: 'Starter Validation Pack',
    price: 4999,
    adSpendAllocation: 3500,
    platformFee: 1499,
    targetVisitors: 1000,
    features: [
      'Targeted Meta & Google Ad Execution (₹3,500 ad credit)',
      'Up to 1,000 Verified Audience Visits',
      'Real-time Cart Purchase Rate (CPR) Analytics',
      'Basic Customer Sentiment & Feedback Report',
      'Merchant Self-Logistics or Platform Logistics',
    ],
  },
  GROWTH: {
    tier: 'GROWTH' as const,
    packageName: 'Growth Validation Engine',
    price: 14999,
    adSpendAllocation: 11000,
    platformFee: 3999,
    targetVisitors: 5000,
    features: [
      'Multi-channel Ads (Meta, Google & LinkedIn)',
      'Up to 5,000 Verified Target Audience Visits',
      'A/B Ad Creative & Landing Page Variant Testing',
      'Willingness to Pay (WTP) & Price Elasticity Curve',
      'Batch Inventory Recommendation Signal (500 units)',
      'Priority Verified Badge Assessment',
    ],
  },
  SCALE: {
    tier: 'SCALE' as const,
    packageName: 'Scale & Marketplace Launch',
    price: 34999,
    adSpendAllocation: 28000,
    platformFee: 6999,
    targetVisitors: 15000,
    features: [
      'Omnichannel Scale Campaign (₹28,000 ad budget)',
      '15,000+ Target Customer Traffic Injection',
      'Pre-Order Deposit & Full Funnel Conversion Tracking',
      '1-on-1 Unit Economics & CAC/AOV Optimization',
      'Accelerated Marketplace Graduation (5-7% Commission)',
      'Venturely Platform Logistics VIP Onboarding',
    ],
  },
};

export const LOGISTICS_OPTIONS = {
  SELF_FULFILLED: {
    key: 'SELF_FULFILLED' as const,
    label: 'Merchant Self-Fulfillment',
    description: 'You handle packaging and ship directly using your own courier (Shiprocket, Delhivery, etc.).',
    fee: 0,
  },
  VENTURELY_SUPPORTED: {
    key: 'VENTURELY_SUPPORTED' as const,
    label: 'Venturely Platform Logistics',
    description: 'Use Venturely integrated dispatch with automated shipping labels, doorstep pickup & tracking.',
    flatSurfaceFee: 49,
    expressAirFee: 89,
  },
};

export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  defaultCommissionRate: 6, // 6%
  availableCommissionRates: [5, 6, 7],
  validationPackages: {
    starter: { price: 4999, adSpend: 3500, targetVisitors: 1000 },
    growth: { price: 14999, adSpend: 11000, targetVisitors: 5000 },
    scale: { price: 34999, adSpend: 28000, targetVisitors: 15000 },
  },
  graduationCriteria: {
    minOrders: 30,
    minValidationScore: 75,
    minCartPurchaseRate: 12, // 12% CPR minimum
    minCustomerRating: 4.2,
    maxRefundRate: 3.0,
  },
};

export const LIVE_FOMO_EVENTS = [
  { id: '1', customerName: 'Aarav M.', city: 'Bengaluru', productName: 'NerveBand Pro 3D', actionText: 'pre-ordered Prototype #43', timeAgo: '12 sec ago', startupType: 'D2C' as const },
  { id: '2', customerName: 'Priya S.', city: 'Mumbai', productName: 'FlowDesk SaaS', actionText: 'joined VIP Early Access Waitlist (#14 rank)', timeAgo: '34 sec ago', startupType: 'SAAS' as const },
  { id: '3', customerName: 'Rohan K.', city: 'Delhi', productName: 'HydroPure UV Flask', actionText: 'placed ₹999 Validation Pre-Order', timeAgo: '1 min ago', startupType: 'D2C' as const },
  { id: '4', customerName: 'Sneha T.', city: 'Pune', productName: 'Zenith AI B2B ERP', actionText: 'requested Bulk Sample Kit (MOQ 100)', timeAgo: '2 mins ago', startupType: 'B2B' as const },
  { id: '5', customerName: 'Vikram R.', city: 'Hyderabad', productName: 'AuraSound Frames', actionText: 'locked-in Prototype Price before timer expiry', timeAgo: '3 mins ago', startupType: 'D2C' as const },
];
