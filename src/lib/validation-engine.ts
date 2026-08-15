import { Product, ValidationScoreBreakdown } from '@/types';

/**
 * Platform Validation Score Engine
 * Computes a transparent, data-driven validation signal (0-100)
 * based on empirical customer interaction data.
 */
export function calculateValidationScore(product: Partial<Product>): ValidationScoreBreakdown {
  const views = product.views || 1;
  const waitlists = product.waitlistCount || 0;
  const orders = product.ordersCount || 0;
  const inventoryTotal = product.inventoryTotal || 100;
  const inventorySold = product.inventorySold || 0;
  const conversionRate = product.conversionRate || (orders / Math.max(views, 1)) * 100;

  // 1. Demand Score (0-100)
  // Based on views, waitlist velocity, and overall traffic interest ratio
  const waitlistRatio = Math.min((waitlists / Math.max(views, 50)) * 500, 100);
  const rawDemand = Math.min(views / 300, 40) + waitlistRatio * 0.6;
  const demand = Math.round(Math.min(Math.max(rawDemand, 35), 98));

  // 2. Conversion Score (0-100)
  // Evaluates how effectively impressions turn into waitlists, preorders, or paid orders
  const targetConversionBenchmark = 4.0; // 4% is strong for early products
  const conversionScore = Math.round(Math.min((conversionRate / targetConversionBenchmark) * 75, 96));

  // 3. Customer Satisfaction (0-100)
  // Based on refund rate and ratings (defaulting to robust baseline if early stage)
  const refundPenalty = (product.refundRate || 1.2) * 10;
  const customerSatisfaction = Math.round(Math.max(90 - refundPenalty, 40));

  // 4. Unit Economics (0-100)
  // Based on CAC efficiency and sell-through margin
  const sellThrough = inventoryTotal > 0 ? (inventorySold / inventoryTotal) * 100 : 0;
  const unitEconomics = Math.round(Math.min(sellThrough * 0.8 + 20, 95));

  // 5. Momentum Score (0-100)
  // Sales velocity per day & recent interest surge
  const velocity = product.salesVelocityPerDay || 4;
  const momentum = Math.round(Math.min(velocity * 8 + 30, 94));

  // Overall Weighted Score calculation:
  // Demand (30%), Conversion (25%), Satisfaction (20%), Economics (15%), Momentum (10%)
  const overall = Math.round(
    demand * 0.3 + conversionScore * 0.25 + customerSatisfaction * 0.2 + unitEconomics * 0.15 + momentum * 0.1
  );

  return {
    overall: Math.min(Math.max(overall, 10), 99),
    demand,
    conversion: conversionScore,
    customerSatisfaction,
    unitEconomics,
    momentum,
  };
}

export function getScoreInterpretation(score: number): {
  label: string;
  badgeColor: string;
  description: string;
} {
  if (score >= 80) {
    return {
      label: 'High Market Demand',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Strong conversion signals, robust customer sentiment, and optimal sell-through metrics.',
    };
  } else if (score >= 65) {
    return {
      label: 'Moderate Validation',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Healthy interest detected. Refining pricing or targeting could boost conversion.',
    };
  } else if (score >= 50) {
    return {
      label: 'Early Traction',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Initial audience engagement recorded. Further message alignment recommended.',
    };
  } else {
    return {
      label: 'Under Evaluation',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      description: 'Collecting baseline metrics. Additional validation campaign traffic required.',
    };
  }
}
