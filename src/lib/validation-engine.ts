import { Product, ValidationScoreBreakdown } from '@/types';

/**
 * Platform Validation Score Engine
 * Computes a transparent, data-driven validation signal (0-100)
 * based on empirical customer interaction data, CPR, and FOMO urgency.
 */
export function calculateValidationScore(product: Partial<Product>): ValidationScoreBreakdown {
  const views = product.views || 1;
  const waitlists = product.waitlistCount || 0;
  const orders = product.ordersCount || product.preOrdersCount || 0;
  const inventoryTotal = product.inventoryTotal || 100;
  const inventorySold = product.inventorySold || 0;
  const cpr = product.cartPurchaseRate || 14.5;
  const conversionRate = product.conversionRate || (orders / Math.max(views, 1)) * 100;
  const batchClaimed = product.batchClaimedCount || 40;
  const batchTotal = product.limitedBatchSize || 50;

  // 1. Demand Score (0-100)
  const waitlistRatio = Math.min((waitlists / Math.max(views, 50)) * 500, 100);
  const rawDemand = Math.min(views / 300, 40) + waitlistRatio * 0.6;
  const demand = Math.round(Math.min(Math.max(rawDemand, 35), 98));

  // 2. Conversion & CPR Score (0-100)
  const targetCprBenchmark = 15.0; // 15% Cart Purchase Rate benchmark
  const cprScore = Math.min((cpr / targetCprBenchmark) * 80, 96);
  const conversionScore = Math.round(Math.min((conversionRate / 4.0) * 20 + cprScore, 98));

  // 3. Customer Satisfaction (0-100)
  const refundPenalty = (product.refundRate || 1.2) * 10;
  const customerSatisfaction = Math.round(Math.max(92 - refundPenalty, 40));

  // 4. Unit Economics (0-100)
  const sellThrough = inventoryTotal > 0 ? (inventorySold / inventoryTotal) * 100 : 0;
  const unitEconomics = Math.round(Math.min(sellThrough * 0.8 + 20, 95));

  // 5. FOMO & Urgency Score (0-100)
  const batchFillRatio = batchTotal > 0 ? (batchClaimed / batchTotal) * 100 : 70;
  const viewerSurge = Math.min((product.currentViewersCount || 45) * 0.5, 30);
  const fomoUrgency = Math.round(Math.min(batchFillRatio * 0.7 + viewerSurge, 98));

  // Overall Weighted Score calculation:
  // Demand (25%), Conversion (25%), Economics (20%), Satisfaction (15%), FOMO Urgency (15%)
  const overall = Math.round(
    demand * 0.25 + conversionScore * 0.25 + unitEconomics * 0.2 + customerSatisfaction * 0.15 + fomoUrgency * 0.15
  );

  return {
    overall: Math.min(Math.max(overall, 15), 99),
    demand,
    conversion: conversionScore,
    customerSatisfaction,
    unitEconomics,
    fomoUrgency,
  };
}

export function getScoreInterpretation(score: number): {
  label: string;
  badgeColor: string;
  description: string;
} {
  if (score >= 80) {
    return {
      label: 'Validated Demand (Ready for Marketplace)',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
      description: 'Strong cart purchase rate (CPR), high conversion momentum, and clear unit economics. Ready for 5-7% commission marketplace graduation.',
    };
  } else if (score >= 65) {
    return {
      label: 'High Validation Potential',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 font-semibold',
      description: 'Healthy interest detected. Running a Growth Ad Package can unlock target cart conversion thresholds.',
    };
  } else if (score >= 50) {
    return {
      label: 'Early Prototype Traction',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Initial audience engagement recorded. Refining value proposition or price tiers recommended.',
    };
  } else {
    return {
      label: 'Validation Underway',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      description: 'Collecting baseline metrics. Additional validation campaign traffic recommended.',
    };
  }
}
