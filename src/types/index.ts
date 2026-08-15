export type UserRole = 'FOUNDER' | 'CUSTOMER' | 'ADMIN';

export type ProductStage =
  | '0_IDEA'
  | '1_CONCEPT'
  | '2_PROTOTYPE'
  | '3_MVP'
  | '4_EARLY_PRODUCT'
  | '5_D2C_LAUNCH'
  | '6_VALIDATED'
  | '7_MARKETPLACE';

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
  momentum: number; // 0-100
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

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  category: string;
  subcategory?: string;
  stage: ProductStage;
  founderName: string;
  companyName: string;
  founderEmail: string;
  images: string[];
  videoUrl?: string;
  price: number;
  expectedPrice?: number;
  discountPrice?: number;
  inventoryTotal: number;
  inventorySold: number;
  manufacturingStatus: string;
  targetAudience: string;
  validationObjective: string;
  estimatedLaunchDate?: string;
  isApprovedByAdmin: boolean;
  isGraduatedToMarketplace: boolean;
  isFeatured: boolean;
  isSponsored: boolean;
  createdAt: string;

  // Smytten-inspired Trial Sample System
  hasTrialOption?: boolean;
  trialPointsCost?: number; // e.g. 1 point or 2 points
  trialSizeDescription?: string; // e.g. "15ml Trial Pack" or "7-Day Discovery Kit"
  trialInventoryTotal?: number;
  trialInventoryClaimed?: number;

  // Validation & Analytics metrics
  views: number;
  uniqueVisitors: number;
  waitlistCount: number;
  interestVotes: number;
  preOrdersCount: number;
  ordersCount: number;
  totalRevenue: number;
  cac: number;
  aov: number;
  roas: number;
  conversionRate: number;
  refundRate: number;
  sellThroughRate: number;
  salesVelocityPerDay: number;

  // Proprietary score
  validationScore: ValidationScoreBreakdown;
  recommendations: NextStepRecommendation[];
  feedbackThemes: CustomerFeedbackTheme[];
}

export interface TrialCartItem {
  product: Product;
  pointsCost: number;
}

export interface WaitlistEntry {
  id: string;
  productId: string;
  productName: string;
  customerEmail: string;
  customerName?: string;
  customerPersona?: string;
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
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  trackingNumber?: string;
  isTrialOrder?: boolean;
  trialPointsSpent?: number;
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

export interface MarketingCampaign {
  id: string;
  productId: string;
  name: string;
  objective: string;
  targetAudience: string;
  adSpend: number;
  platformFee: number;
  totalBudget: number;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  impressions: number;
  clicks: number;
  conversions: number;
  cac: number;
  roas: number;
  startDate: string;
}

export interface PlatformConfig {
  defaultCommissionRate: number; // 7%
  availableCommissionRates: number[];
  validationPackages: {
    idea: number;
    launch: number;
    growth: number;
  };
  graduationCriteria: {
    minOrders: number;
    minValidationScore: number;
    minCustomerRating: number;
    maxRefundRate: number;
  };
}
