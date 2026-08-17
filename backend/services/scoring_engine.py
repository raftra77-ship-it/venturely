"""
Proprietary Validation Score Calculation Engine
Calculates composite demand score using weighted factors:
1. Conversion Rate (Cart Purchase Rate / Pre-order conversion): 35% weight
2. CTR Lift vs Industry Benchmark: 25% weight
3. Waitlist Velocity & Willingness to Pay: 20% weight
4. Unit Economics & CAC vs Margin: 20% weight

Outputs:
- Score: 0 - 100
- Status: GREEN (Scale-Ready >=75), YELLOW (Iterate 50-74), RED (Don't Scale <50)
- Decision Gate Recommendations
- Batch Manufacturing Forecast
"""

from typing import Dict, Any
from datetime import datetime
from backend.models import ValidationStatus, ValidationScoreBreakdown, ValidationScore


class ValidationScoringEngine:
    # Benchmarks for D2C Physical & Consumer Tech
    BENCHMARK_CTR = 2.4       # 2.4% average CTR for Meta ads
    BENCHMARK_CONVERSION = 10.0 # 10.0% benchmark cart purchase rate
    BENCHMARK_CAC = 650.0     # ₹650 benchmark CAC

    def compute_score(
        self,
        product_id: str,
        impressions: int,
        clicks: int,
        ctr: float,
        add_to_cart: int,
        purchases: int,
        waitlist_count: int,
        price: float,
        ad_spend: float
    ) -> ValidationScore:
        # 1. Conversion Rate Score (0 - 100)
        cpr = (purchases / max(add_to_cart, 1)) * 100 if add_to_cart > 0 else 0
        conversion_score = min(max((cpr / 20.0) * 100, 0), 100)

        # 2. CTR Lift Score (0 - 100)
        # 4.8% CTR is considered 100 score (2x benchmark)
        ctr_score = min(max((ctr / 4.8) * 100, 0), 100)

        # 3. Waitlist Velocity Score (0 - 100)
        waitlist_rate = (waitlist_count / max(clicks, 1)) * 100
        waitlist_score = min(max((waitlist_rate / 15.0) * 100, 0), 100)

        # 4. Benchmark Comparison Score (0 - 100)
        benchmark_lift = ((ctr - self.BENCHMARK_CTR) / self.BENCHMARK_CTR) * 100
        benchmark_score = min(max(50 + (benchmark_lift * 0.5), 0), 100)

        # 5. Unit Economics Score (0 - 100)
        cac = ad_spend / max(purchases, 1) if purchases > 0 else ad_spend
        # Margin ratio
        margin_ratio = (price - cac) / max(price, 1)
        unit_economics_score = min(max((margin_ratio + 0.5) * 100, 0), 100)

        # Composite Weighted Score
        composite_score = round(
            (conversion_score * 0.35) +
            (ctr_score * 0.25) +
            (waitlist_score * 0.20) +
            (unit_economics_score * 0.20),
            1
        )

        # Status Decision Gate
        if composite_score >= 75.0:
            status = ValidationStatus.GREEN
            rec_title = "Scale-Ready: Validated High Demand"
            rec_details = f"Strong Cart Purchase Rate ({round(cpr, 1)}%) and high CTR ({ctr}%) outperform category benchmark by {round(benchmark_lift, 1)}%. Unit economics are favorable for mass manufacturing."
            next_action = "Launch to Curated Marketplace (5-7% fee) or Export Validation Data"
            recommended_batch = max(int(purchases * 4.5 / 50) * 50, 500)
        elif composite_score >= 50.0:
            status = ValidationStatus.YELLOW
            rec_title = "Iterate & Optimize: Moderate Demand Signal"
            rec_details = f"Good CTR ({ctr}%), but Add-to-Cart or Pre-Order drop-off indicates price sensitivity or unclear value proposition. Recommend A/B testing a 15% discount price or refined creative."
            next_action = "Re-test with new Ad Creative / Price Variant"
            recommended_batch = 150
        else:
            status = ValidationStatus.RED
            rec_title = "Pivot Recommended: Low Real-Market Intent"
            rec_details = f"Conversion rate ({round(cpr, 1)}%) and high CAC indicate weak product-market fit at current positioning. Do not commit capital to inventory before redefining problem/solution."
            next_action = "Revise Core Value Proposition & Positioning"
            recommended_batch = 0

        breakdown = ValidationScoreBreakdown(
            conversion_rate_score=round(conversion_score, 1),
            ctr_score=round(ctr_score, 1),
            waitlist_velocity_score=round(waitlist_score, 1),
            benchmark_comparison_score=round(benchmark_score, 1),
            unit_economics_score=round(unit_economics_score, 1)
        )

        return ValidationScore(
            id=f"val_score_{product_id}",
            product_id=product_id,
            score=composite_score,
            status=status,
            breakdown=breakdown,
            recommendation_title=rec_title,
            recommendation_details=rec_details,
            next_step_action=next_action,
            batch_recommendation_units=recommended_batch,
            computed_at=datetime.utcnow()
        )


scoring_engine = ValidationScoringEngine()
