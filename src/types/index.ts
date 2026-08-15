export type UserRole = 'FOUNDER' | 'CUSTOMER' | 'ADMIN';

export type StartupCategory = 'D2C' | 'SAAS' | 'B2B' | 'B2C';

export type LogisticsModel = 'SELF_FULFILLED' | 'VENTURELY_SUPPORTED';

export type ValidationPackageTier = 'STARTER' | 'GROWTH' | 'SCALE';

export type ProductStage =
  | '0_IDEA'
  | '1_CONCEPT'
  | '2_PROTOTYPE'
  | '3_MVP'
  | '4_EARLY_PRODUCT'
  | '5_VALIDATED'
  | '6_MARKETPLACE';

export interface StageInfo {
  key: ProductStage;
  label: string;
  shortLabel: string;
  description: string;
  actionText: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export interface ValidationScoreBreakdown {
  overall: number; // 0-100
  demand: number; // 0-100
  conversion: number; // 0-100
  customerSatisfaction: number; // 0-100
  unitEconomics: number; // 0-100
  fomoUrgency: number; // 0-100
}

export interface NextStepRecommendation {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'INVENTORY' | 'PRICING' | 'POSITIONING' | 'MARKETING' | 'GRADUATION';
  title: string;
  statusHeadline: string;
  recommendationText: string;
  whyText: string;
  actionText: string;
  actionRoute?: string;
  metricsBasis: string;
}

export interface CustomerFeedbackTheme {
  category: 'POSITIVE' | 'IMPROVEMENT' | 'FEATURE_REQUEST' | 'PRICING';
  title: string;
  percentage: number;
  quotes: string[];
}

export interface AdMetrics {
  adSpend: number;
  impressions: number;
  clicks: number;
  ctr: number; // e.g. 3.4%
  cpc: number; // e.g. ₹18
  cac: number; // Cost Per Acquisition / Validation
  roas: number;
  activePackage?: ValidationPackageTier;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  category: string;
  startupType: StartupCategory; // D2C, SAAS, B2B, B2C
  stage: ProductStage;
  founderName: string;
  companyName: string;
  founderEmail: string;
  images: string[];
  videoUrl?: string;
  price: number; // Current validation / pre-order price
  expectedPrice?: number; // Retail price after mass launch
  discountPrice?: number;
  
  // Logistics & Fulfillment Choice
  logisticsModel: LogisticsModel;
  shippingEstimateDays?: string;
  shippingFee?: number;

  // Inventory & Manufacturing Forecast
  inventoryTotal: number;
  inventorySold: number;
  recommendedBatchSize: number; // e.g. 500 units for next manufacturing run
  breakevenUnits: number;
  manufacturingStatus: string;

  // Validation Objectives & Target Audience
  targetAudience: string;
  validationObjective: string;
  estimatedLaunchDate?: string;
  isApprovedByAdmin: boolean;
  isGraduatedToMarketplace: boolean;
  isFeatured: boolean;
  isSponsored: boolean;
  createdAt: string;

  // Waitlist & FOMO Urgency Engine
  limitedBatchSize: number; // e.g. 50 prototype units
  batchClaimedCount: number; // e.g. 43 claimed
  priceLockExpiry?: string; // ISO string for countdown timer
  currentViewersCount: number; // Live viewer counter e.g. 94 people viewing
  waitlistCount: number;
  vipWaitlistSlots?: number;

  // Conversion & Analytics factors
  views: number;
  uniqueVisitors: number;
  cartAdditionsCount: number;
  checkoutInitiatedCount: number;
  preOrdersCount: number;
  ordersCount: number;
  totalRevenue: number;
  
  // Ratios & Rates
  cartPurchaseRate: number; // Percentage of cart adds that purchase (e.g. 18.5%)
  cartAbandonmentRate: number;
  checkoutIntentRate: number;
  willingnessToPayScore: number; // 0 - 100
  cac: number;
  aov: number;
  conversionRate: number;
  refundRate: number;

  // Ad Campaign Integration
  adMetrics: AdMetrics;

  // Financial Economics
  commissionRate: number; // 5% - 7% platform fee

  // Proprietary score & recommendations
  validationScore: ValidationScoreBreakdown;
  recommendations: NextStepRecommendation[];
  feedbackThemes: CustomerFeedbackTheme[];
}

export interface ValidationCartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
  isPreOrder?: boolean;
}

export interface WaitlistEntry {
  id: string;
  productId: string;
  productName: string;
  customerEmail: string;
  customerName?: string;
  referralCode: string;
  referralCount: number;
  rank: number;
  willingnessToPay?: number;
  feedbackNote?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  amount: number;
  quantity: number;
  logisticsModel: LogisticsModel;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  trackingNumber?: string;
  courierName?: string;
  isPreOrder?: boolean;
  createdAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  wouldRecommend: boolean;
  priceRating: 'TOO_HIGH' | 'FAIR' | 'GREAT_VALUE';
  createdAt: string;
}

export interface MarketingCampaignPackage {
  id: string;
  productId: string;
  tier: ValidationPackageTier;
  packageName: string;
  adSpendAllocation: number;
  platformFee: number;
  totalBudget: number;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  targetAudience: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cac: number;
  roas: number;
  startDate: string;
}

export interface PlatformConfig {
  defaultCommissionRate: number; // 6%
  availableCommissionRates: number[]; // [5, 6, 7]
  validationPackages: {
    starter: { price: number; adSpend: number; targetVisitors: number };
    growth: { price: number; adSpend: number; targetVisitors: number };
    scale: { price: number; adSpend: number; targetVisitors: number };
  };
  graduationCriteria: {
    minOrders: number;
    minValidationScore: number;
    minCartPurchaseRate: number;
    minCustomerRating: number;
    maxRefundRate: number;
  };
}

export interface LiveFomoEvent {
  id: string;
  customerName: string;
  city: string;
  productName: string;
  actionText: string; // e.g. "pre-ordered Prototype #42" or "joined VIP Waitlist"
  timeAgo: string;
  startupType: StartupCategory;
}
