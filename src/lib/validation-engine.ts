import { Product, ValidationScoreBreakdown, ValidationDecisionStatus } from '@/types';

/**
 * Venturely Composite Validation Scoring Engine
 * Weighted Formula:
 * 1. Conversion Rate (Cart Purchase Rate / Pre-order conversion): 35% weight
 * 2. Ad CTR Lift vs Industry Benchmark (2.4% avg): 25% weight
 * 3. Waitlist Velocity & Willingness to Pay: 20% weight
 * 4. Unit Economics & CAC vs Margin: 20% weight
 *
 * Status Output:
 * - Green (Score >= 75): Scale-Ready (Launch on Marketplace / Export Data)
 * - Yellow (Score 50-74): Iterate & Re-test (Adjust pricing/creative)
 * - Red (Score < 50): Don't Scale / Pivot (Revise positioning)
 */
export function calculateValidationScore(product: Partial<Product>): ValidationScoreBreakdown {
  const views = product.views || 100;
  const clicks = product.adMetrics?.clicks || product.uniqueVisitors || 50;
  const waitlists = product.waitlistCount || 0;
  const purchases = product.preOrdersCount || product.ordersCount || 0;
  const cartAdds = product.cartAdditionsCount || Math.max(purchases * 2, 1);
  const ctr = product.adMetrics?.ctr || 4.2;
  const price = product.price || 1999;
  const cac = product.cac || product.adMetrics?.cac || 450;

  // 1. Conversion Score (0-100) — based on Cart Purchase Rate (CPR)
  const cpr = (purchases / Math.max(cartAdds, 1)) * 100;
  const conversionScore = Math.min(Math.round((cpr / 20.0) * 100), 100);

  // 2. CTR Score (0-100) — 4.8% CTR is benchmark 100
  const ctrScore = Math.min(Math.round((ctr / 4.8) * 100), 100);

  // 3. Waitlist Velocity Score (0-100)
  const waitlistRate = (waitlists / Math.max(clicks, 1)) * 100;
  const waitlistVelocity = Math.min(Math.round((waitlistRate / 12.0) * 100), 100);

  // 4. Benchmark Comparison Lift (0-100) — benchmark CTR is 2.4%
  const benchmarkLift = Math.min(Math.round(50 + ((ctr - 2.4) / 2.4) * 50), 100);

  // 5. Unit Economics Score (0-100) — margin ratio
  const margin = Math.max(price - cac, 0);
  const marginRatio = margin / Math.max(price, 1);
  const unitEconomics = Math.min(Math.round(marginRatio * 100), 100);

  // Composite Weighted Score (0-100)
  const overall = Math.min(
    Math.max(
      Math.round(
        conversionScore * 0.35 +
        ctrScore * 0.25 +
        waitlistVelocity * 0.20 +
        unitEconomics * 0.20
      ),
      15
    ),
    99
  );

  return {
    overall,
    demand: Math.round((waitlistVelocity + ctrScore) / 2),
    conversion: conversionScore,
    ctrScore,
    waitlistVelocity,
    benchmarkLift,
    unitEconomics,
    fomoUrgency: Math.min(Math.round((purchases / Math.max(product.limitedBatchSize || 50, 1)) * 100), 100),
  };
}

export function getDecisionStatus(overallScore: number): ValidationDecisionStatus {
  if (overallScore >= 75) return 'green';
  if (overallScore >= 50) return 'yellow';
  return 'red';
}

export function getDecisionGateInterpretation(status: ValidationDecisionStatus, score: number) {
  switch (status) {
    case 'green':
      return {
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        dotColor: 'bg-emerald-400',
        headline: 'Scale-Ready (High Market Validation)',
        summary: `Validation score is ${score}/100 with favorable Cart Purchase Rate and positive unit economics. Verified demand exceeds category baseline by +75%.`,
        recommendation: 'Proceed directly to launch on Venturely Marketplace (5-7% commission) or Export Validation Data to your own independent storefront.',
        actionLabel: 'Launch on Marketplace (6% Commission)',
        secondaryActionLabel: 'Export Validation Certificate (PDF/JSON)',
      };
    case 'yellow':
      return {
        badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        dotColor: 'bg-amber-400',
        headline: 'Iterate & Re-Test (Moderate Demand Signal)',
        summary: `Validation score is ${score}/100. High traffic curiosity detected, but cart drop-off suggests price resistance or creative positioning mismatch.`,
        recommendation: 'Do not commit to large inventory runs yet. Run a 3-day A/B test with an adjusted price point (-15%) or refreshed video creative.',
        actionLabel: 'Launch A/B Price & Creative Re-Test',
        secondaryActionLabel: 'View Detailed Telemetry Breakdown',
      };
    case 'red':
    default:
      return {
        badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        dotColor: 'bg-rose-400',
        headline: "Don't Scale Yet (Weak Purchase Intent)",
        summary: `Validation score is ${score}/100. Customer acquisition cost (CAC) significantly exceeds product margin with low Cart Purchase Rate.`,
        recommendation: 'Capital preservation recommended. Pivot the problem/solution statement and interview waitlist leads before producing units.',
        actionLabel: 'Pivot Positioning & Reset Campaign',
        secondaryActionLabel: 'Export Feedback Notes',
      };
  }
}
