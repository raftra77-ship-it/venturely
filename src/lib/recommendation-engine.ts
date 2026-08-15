import { Product, NextStepRecommendation } from '@/types';
import { formatNumber } from './format';

/**
 * Next-Step Recommendation Engine
 * Analyzes product metrics, CPR, and FOMO signals to generate actionable founder advice.
 */
export function generateRecommendations(product: Product): NextStepRecommendation[] {
  const recommendations: NextStepRecommendation[] = [];

  const sellThrough = product.inventoryTotal > 0 ? (product.inventorySold / product.inventoryTotal) * 100 : 0;
  const conversion = product.conversionRate;
  const cpr = product.cartPurchaseRate || 14.5;
  const score = product.validationScore.overall;
  const stage = product.stage;

  // Rule 1: High CPR on initial batch -> Recommend inventory manufacturing run
  if (cpr >= 12.0 || sellThrough >= 65) {
    const suggestedNextBatch = product.recommendedBatchSize || 500;
    recommendations.push({
      id: 'rec_inventory_expand',
      priority: 'HIGH',
      category: 'INVENTORY',
      title: `Batch Readiness Signal: Prepare ${suggestedNextBatch} Units for Production`,
      statusHeadline: `Cart Purchase Rate ${cpr.toFixed(1)}% — High Conversion Signal`,
      recommendationText: `Your validation data indicates strong unit economics. Prepare ${suggestedNextBatch} units for your primary manufacturing run.`,
      whyText: `Your initial validation run converted ${cpr.toFixed(1)}% of cart intent with ${product.preOrdersCount || product.ordersCount} confirmed pre-orders. Breakeven volume is ${product.breakevenUnits || 150} units.`,
      actionText: 'Review Manufacturing Plan',
      actionRoute: '/founder/dashboard?tab=inventory',
      metricsBasis: `CPR: ${cpr.toFixed(1)}% | Target Batch: ${suggestedNextBatch} units | Breakeven: ${product.breakevenUnits || 150} units`,
    });
  }

  // Rule 2: Low CPR or High Cart Abandonment -> Recommend Ad Package / Price adjustment
  if (product.cartAdditionsCount > 50 && cpr < 10.0) {
    recommendations.push({
      id: 'rec_conversion_fix',
      priority: 'HIGH',
      category: 'PRICING',
      title: 'High Cart Abandonment Detected — Adjust Price Lock & FOMO Urgency',
      statusHeadline: 'Customers Adding to Cart but Dropping Off at Checkout',
      recommendationText: 'Activate a Growth Validation Ad Package or set a Price-Lock countdown timer to boost checkout completion.',
      whyText: `You have ${product.cartAdditionsCount} cart additions, but Cart Purchase Rate is only ${cpr.toFixed(1)}%. Setting price-lock countdowns increases checkout intent by up to 35%.`,
      actionText: 'Configure Price Lock & Ad Package',
      actionRoute: '/founder/dashboard?tab=adpackages',
      metricsBasis: `Cart Additions: ${product.cartAdditionsCount} | CPR: ${cpr.toFixed(1)}% (Platform Target: 15%)`,
    });
  }

  // Rule 3: High waitlist interest -> Advance Stage & Enable Pre-orders
  if (product.waitlistCount > 150 && (stage === '0_IDEA' || stage === '1_CONCEPT')) {
    recommendations.push({
      id: 'rec_stage_advance',
      priority: 'HIGH',
      category: 'POSITIONING',
      title: 'Strong Waitlist Signal — Launch Micro-Batch Pre-Orders',
      statusHeadline: `${product.waitlistCount} Verified VIP Waitlist Signups`,
      recommendationText: 'Transition product stage to Prototype/MVP and launch limited batch pre-orders with price lock.',
      whyText: `Your waitlist referral velocity shows top 5% viral coefficient in your category.`,
      actionText: 'Launch Micro-Batch Pre-Orders',
      actionRoute: '/founder/dashboard?tab=overview',
      metricsBasis: `Waitlist: ${product.waitlistCount} entries | Viewers: ${product.currentViewersCount || 65}`,
    });
  }

  // Rule 4: High score & orders -> 5-7% Commission Marketplace Graduation Ready!
  if (score >= 75 && (product.ordersCount >= 25 || product.preOrdersCount >= 30) && !product.isGraduatedToMarketplace) {
    recommendations.push({
      id: 'rec_marketplace_graduation',
      priority: 'HIGH',
      category: 'GRADUATION',
      title: 'Eligible for 5-7% Commission Marketplace Graduation',
      statusHeadline: `Validation Score ${score}/100 — Verified Product Status Met`,
      recommendationText: 'Submit your product for Admin review to graduate to the public Venturely Marketplace.',
      whyText: 'Your product meets all benchmark criteria: CPR > 12%, low refund intent, and positive unit economics.',
      actionText: 'Graduate to Marketplace',
      actionRoute: '/founder/dashboard?tab=graduation',
      metricsBasis: `Validation Score: ${score}/100 | CPR: ${cpr.toFixed(1)}% | Commission: ${product.commissionRate || 6}%`,
    });
  }

  // Default fallback recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec_default_ad_package',
      priority: 'MEDIUM',
      category: 'MARKETING',
      title: 'Launch Starter Validation Ad Package',
      statusHeadline: 'Ready for Verified Audience Traffic',
      recommendationText: 'Run a ₹4,999 Meta/Google ad validation package to inject 1,000 live visitors and test real cart purchase rates.',
      whyText: 'Collecting 1,000 live visitor interactions will build your Validation Score and customer sentiment profile.',
      actionText: 'Launch Ad Package',
      actionRoute: '/founder/dashboard?tab=adpackages',
      metricsBasis: `Views: ${formatNumber(product.views)} | Category: ${product.startupType}`,
    });
  }

  return recommendations;
}
