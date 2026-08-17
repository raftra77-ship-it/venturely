import { ProductStage, StageInfo, PlatformConfig, StartupCategory, SaaSSubscriptionPlan, CrmContact } from '@/types';

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
    label: 'Zero / Low Inventory Pre-Order',
    shortLabel: 'PRE-ORDER',
    description: 'Zero/micro inventory run — testing real checkout intent & unit economics before mass tooling.',
    actionText: 'Lock Founder Pre-Order',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200',
  },
  '5_VALIDATED': {
    key: '5_VALIDATED',
    label: 'Validated Product (Scale-Ready)',
    shortLabel: 'VALIDATED',
    description: 'Met composite validation benchmark (Score ≥ 75, Green Status) — ready to manufacture.',
    actionText: 'Order Validated',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800 font-semibold',
    badgeBorder: 'border-emerald-300',
  },
  '6_MARKETPLACE': {
    key: '6_MARKETPLACE',
    label: 'Marketplace Curated',
    shortLabel: 'MARKETPLACE',
    description: 'Live in curated public marketplace — 5% to 7% platform commission + Shiprocket dispatch.',
    actionText: 'Buy Now',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800 font-semibold',
    badgeBorder: 'border-slate-300',
  },
};

export const STARTUP_CATEGORIES: { key: StartupCategory; label: string; badge: string; description: string }[] = [
  { key: 'D2C', label: 'D2C Physical Brands', badge: 'bg-emerald-100 text-emerald-800', description: 'Zero-inventory physical products, 3D prototypes, sample kits, and micro-batches.' },
  { key: 'SAAS', label: 'SaaS & Digital Software', badge: 'bg-blue-100 text-blue-800', description: 'Interactive demo signups, waitlists, pricing tier demand, and ACV validation.' },
  { key: 'B2B', label: 'B2B & Wholesale', badge: 'bg-purple-100 text-purple-800', description: 'Sample kit orders, MOQ validation, and Request for Quote (RFQ) intent.' },
  { key: 'B2C', label: 'B2C Apps & Consumer Tech', badge: 'bg-rose-100 text-rose-800', description: 'Beta access signups, pilot reservations, and early consumer testing.' },
];

export const PRODUCT_CATEGORIES = [
  'Consumer Hardware & Wearables',
  'Health, Wellness & Biohacking',
  'Workspace & Productivity Gear',
  'Smart Home & IoT Devices',
  'Specialty Beverages & D2C Food',
  'SaaS & Digital Productivity',
  'Apparel & Sustainable Goods',
  'B2B Hardware & Components',
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
      'Targeted Meta Ad Execution (₹3,500 ad credit)',
      'Up to 1,000 Verified Audience Visits',
      'Micro-Landing Page Auto-Generator (/v/your-brand)',
      'Real-time Cart Purchase Rate (CPR) Analytics',
      'Basic Customer Sentiment & Feedback Report',
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
      'Multi-channel Ad Targeting (Meta Ads + Lookalikes)',
      'Up to 5,000 Verified Target Audience Visits',
      'A/B Creative & Pricing Elasticity Testing',
      'Proprietary Validation Score & Decision Gate UI',
      'Automated 500-Unit Batch Manufacturing Signal',
      'Priority Verified Trust Badge Review',
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
      'Full Scale Ad Campaign (₹28,000 Ad Injection)',
      '15,000+ Verified High-Intent Shopper Traffic',
      'Pre-Order Deposit & Full Funnel Conversion Tracking',
      'Direct Decision Gate: 1-Click Launch on Marketplace (6% Fee)',
      'Shiprocket VIP Logistics Partner Fulfillment',
      'Post-Launch SaaS Retention Suite Access',
    ],
  },
};

export const SAAS_SUBSCRIPTION_PLANS: SaaSSubscriptionPlan[] = [
  {
    tier: 'Starter',
    name: 'Starter Retention',
    priceMonthly: 2499,
    description: 'Essential CRM and automated review collection for newly graduated marketplace brands.',
    features: [
      'Up to 1,000 Customer CRM Contacts',
      'Automated Post-Purchase Review Sequence',
      '1-Step Cart Abandonment Email Workflow',
      'Basic Sales & Order Data Export (CSV)',
      'Standard Email Support',
    ],
  },
  {
    tier: 'Growth',
    name: 'Growth Automation',
    priceMonthly: 5999,
    description: 'Advanced lifecycle automation, repeat-purchase triggers, and lead capture engine.',
    features: [
      'Up to 10,000 Customer CRM Contacts',
      'Multi-tier Segmentation (VIP, At-Risk, Repeat)',
      '3-Step Automated Re-order Drip Engine',
      'SMS & WhatsApp Alert Webhooks',
      'Lead-Gen Exit Intent & Referral Engine',
      'Cohort Retention & LTV Telemetry',
    ],
    recommended: true,
  },
  {
    tier: 'Scale',
    name: 'Scale CDP & AI',
    priceMonthly: 14999,
    description: 'Omnichannel customer data platform with predictive re-purchase timing for scaling brands.',
    features: [
      'Up to 100,000 Customer CRM Contacts',
      'Predictive Re-order AI Triggers',
      'Dedicated Growth Account Manager',
      'Custom n8n & Zapier Webhook Integrations',
      'Shiprocket Multi-Hub Warehouse Priority',
      'Custom White-Label Email Domain',
    ],
  },
];

export const LOGISTICS_OPTIONS = {
  SELF_FULFILLED: {
    key: 'SELF_FULFILLED' as const,
    label: 'Merchant Self-Fulfillment',
    description: 'You handle packaging and ship directly using your own courier account.',
    fee: 0,
  },
  VENTURELY_SUPPORTED: {
    key: 'VENTURELY_SUPPORTED' as const,
    label: 'Shiprocket Partner Logistics',
    description: 'Automated shipping labels, doorstep courier pickup (Delhivery/BlueDart), and end-to-end buyer tracking.',
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

export const MOCK_CRM_CONTACTS: CrmContact[] = [
  {
    id: 'crm_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98451 22345',
    totalOrders: 3,
    totalSpent: 10497,
    segment: 'VIP_REPEAT_BUYER',
    lastActive: '2 hours ago',
    stage: 'Brand Advocate',
  },
  {
    id: 'crm_2',
    name: 'Priya Menon',
    email: 'priya.menon@techcorp.in',
    phone: '+91 99120 44512',
    totalOrders: 1,
    totalSpent: 3499,
    segment: 'FIRST_TIME_BUYER',
    lastActive: '1 day ago',
    stage: 'Active Customer',
  },
  {
    id: 'crm_3',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@startup.io',
    phone: '+91 97321 88910',
    totalOrders: 0,
    totalSpent: 0,
    segment: 'VIP_WAITLIST',
    lastActive: '3 hours ago',
    stage: 'Hot Pre-Launch Lead',
  },
  {
    id: 'crm_4',
    name: 'Sneha Kapoor',
    email: 'sneha.k@designco.com',
    phone: '+91 98110 55432',
    totalOrders: 2,
    totalSpent: 6998,
    segment: 'VIP_REPEAT_BUYER',
    lastActive: '4 days ago',
    stage: 'Repeat Buyer',
  },
  {
    id: 'crm_5',
    name: 'Vikram Joshi',
    email: 'vikram.j@gmail.com',
    phone: '+91 98200 11984',
    totalOrders: 0,
    totalSpent: 0,
    segment: 'CART_ABANDONER',
    lastActive: '6 hours ago',
    stage: 'Abandoned at Payment',
  },
];

export const LIVE_FOMO_EVENTS = [
  { id: '1', customerName: 'Aarav M.', city: 'Bengaluru', productName: 'NerveBand Pro Recovery', actionText: 'pre-ordered Zero-Inventory Batch #43', timeAgo: '12 sec ago', startupType: 'D2C' as const },
  { id: '2', customerName: 'Priya S.', city: 'Mumbai', productName: 'FlowDesk SaaS', actionText: 'joined VIP Early Access Waitlist (#14 rank)', timeAgo: '34 sec ago', startupType: 'SAAS' as const },
  { id: '3', customerName: 'Rohan K.', city: 'Delhi NCR', productName: 'HydroPure UV Flask', actionText: 'placed ₹999 Pre-Order Deposit', timeAgo: '1 min ago', startupType: 'D2C' as const },
  { id: '4', customerName: 'Sneha T.', city: 'Pune', productName: 'Zenith AI B2B ERP', actionText: 'requested Bulk Sample Kit (MOQ 100)', timeAgo: '2 mins ago', startupType: 'B2B' as const },
  { id: '5', customerName: 'Vikram R.', city: 'Hyderabad', productName: 'AuraSound Frames', actionText: 'locked-in Prototype Price before timer expiry', timeAgo: '3 mins ago', startupType: 'D2C' as const },
];
