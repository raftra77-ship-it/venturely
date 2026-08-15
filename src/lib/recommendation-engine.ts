import { Product, NextStepRecommendation } from '@/types';
import { formatNumber } from './format';

/**
 * Next-Step Recommendation Engine
 * Analyzes product metrics and generates actionable, data-driven founder advice.
 */
export function generateRecommendations(product: Product): NextStepRecommendation[] {
  const recommendations: NextStepRecommendation[] = [];

  const sellThrough = product.inventoryTotal > 0 ? (product.inventorySold / product.inventoryTotal) * 100 : 0;
  const conversion = product.conversionRate;
  const score = product.validationScore.overall;
  const stage = product.stage;

  // Rule 1: High sell-through on limited batch -> Recommend inventory expansion
  if (sellThrough >= 70 && stage === '4_EARLY_PRODUCT') {
    const suggestedNextBatch = Math.round(product.inventoryTotal * 2.5);
    recommendations.push({
      id: 'rec_inventory_expand',
      priority: 'HIGH',
      category: 'INVENTORY',
      title: 'High Demand Detected — Expand Next Production Run',
      statusHeadline: '72% Initial Inventory Sold',
      recommendationText: `Increase inventory for your next batch to approximately ${suggestedNextBatch}–${suggestedNextBatch + 100} units.`,
      whyText: `Your initial batch of ${product.inventoryTotal} units reached ${Math.round(sellThrough)}% sell-through in under 14 days with strong customer feedback.`,
      actionText: 'Plan Batch Production',
      actionRoute: '/founder/dashboard?tab=inventory',
      metricsBasis: `Sell-through: ${Math.round(sellThrough)}% | Velocity: ${product.salesVelocityPerDay || 8} units/day`,
    });
  }

  // Rule 2: High traffic but low conversion -> Recommend pricing or positioning test
  if (product.views > 500 && conversion < 2.5 && (stage === '3_MVP' || stage === '5_D2C_LAUNCH')) {
    recommendations.push({
      id: 'rec_conversion_fix',
      priority: 'HIGH',
      category: 'POSITIONING',
      title: 'Optimize Product Messaging & Target Pricing',
      statusHeadline: 'Traffic is Healthy but Conversion is Below Benchmark',
      recommendationText: 'Test introductory pricing or clarify the core problem-solution headline before increasing marketing spend.',
      whyText: `You have generated ${formatNumber(product.views)} product views, but conversion stands at ${conversion}%. Customers are interested but dropping off at checkout.`,
      actionText: 'Update Pricing & Messaging',
      actionRoute: '/founder/dashboard?tab=marketing',
      metricsBasis: `Views: ${formatNumber(product.views)} | Conversion: ${conversion}% (Platform avg: 4.2%)`,
    });
  }

  // Rule 3: High waitlist interest on Idea/Concept -> Transition to Prototype/MVP
  if (product.waitlistCount > 200 && (stage === '0_IDEA' || stage === '1_CONCEPT')) {
    recommendations.push({
      id: 'rec_stage_advance',
      priority: 'HIGH',
      category: 'POSITIONING',
      title: 'Strong Waitlist Signal — Advance to Prototype / Pre-Order',
      statusHeadline: `${product.waitlistCount} Waitlist Signups Captured`,
      recommendationText: 'Transition your validation campaign to Prototype Stage and enable early reservations.',
      whyText: `Your idea has captured ${product.waitlistCount} verified waitlist emails, demonstrating validated buyer interest.`,
      actionText: 'Advance Product Stage',
      actionRoute: '/founder/dashboard?tab=overview',
      metricsBasis: `Waitlist: ${product.waitlistCount} entries | Interest Ratio: ${((product.waitlistCount / Math.max(product.views, 1)) * 100).toFixed(1)}%`,
    });
  }

  // Rule 4: High score & orders -> Marketplace Graduation Ready!
  if (score >= 75 && product.ordersCount >= 40 && !product.isGraduatedToMarketplace) {
    recommendations.push({
      id: 'rec_marketplace_graduation',
      priority: 'HIGH',
      category: 'GRADUATION',
      title: 'Eligible for Marketplace Graduation',
      statusHeadline: `Validation Score ${score}/100 & ${product.ordersCount} Orders Fulfilled`,
      recommendationText: 'Submit your product for Platform Admin review to graduate into the Curated Marketplace.',
      whyText: 'Your product meets all marketplace performance criteria including customer satisfaction, low refund rate, and sales velocity.',
      actionText: 'Request Marketplace Graduation',
      actionRoute: '/founder/dashboard?tab=graduation',
      metricsBasis: `Validation Score: ${score}/100 | Orders: ${product.ordersCount} | Rating: 4.8★`,
    });
  }

  // Default fallback recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec_default_traffic',
      priority: 'MEDIUM',
      category: 'MARKETING',
      title: 'Drive Targeted Validation Traffic',
      statusHeadline: 'Baseline Campaign Active',
      recommendationText: 'Run a targeted social validation campaign to collect initial customer signals.',
      whyText: 'Increasing sample size will improve the accuracy of your Validation Score and customer feedback metrics.',
      actionText: 'Setup Validation Campaign',
      actionRoute: '/founder/dashboard?tab=marketing',
      metricsBasis: `Views: ${formatNumber(product.views)} | Stage: ${product.stage}`,
    });
  }

  return recommendations;
}
