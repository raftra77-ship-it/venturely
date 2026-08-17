"""
Venturely Backend Data Models
Matches the core schema:
- sellers
- products
- campaigns
- metrics
- validation_scores
- marketplace_listings
- orders
- saas_subscriptions
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum


class BusinessStage(str, Enum):
    IDEA = "idea"
    PROTOTYPE = "prototype"
    LOW_INVENTORY = "low_inventory"


class InventoryMode(str, Enum):
    ZERO = "zero"
    LIMITED = "limited"
    FULL = "full"


class ProductStatus(str, Enum):
    DRAFT = "draft"
    VALIDATING = "validating"
    VALIDATED = "validated"
    LAUNCHED = "launched"
    REJECTED = "rejected"


class AdPlatform(str, Enum):
    META = "meta"
    GOOGLE = "google"


class CampaignStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"


class ValidationStatus(str, Enum):
    GREEN = "green"    # Scale-ready (>=75)
    YELLOW = "yellow"  # Iterate (50-74)
    RED = "red"        # Don't scale / Pivot (<50)


class LogisticsPartner(str, Enum):
    SHIPROCKET = "shiprocket"
    DELHIVERY = "delhivery"
    SELF = "self"


class SaaSTier(str, Enum):
    STARTER = "Starter"
    GROWTH = "Growth"
    SCALE = "Scale"


# --- Schemas ---

class SellerBase(BaseModel):
    name: str
    email: str
    business_stage: BusinessStage = BusinessStage.PROTOTYPE


class SellerCreate(SellerBase):
    pass


class Seller(SellerBase):
    id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ProductBase(BaseModel):
    seller_id: str
    title: str
    slug: str
    tagline: str
    description: str
    problem: Optional[str] = None
    solution: Optional[str] = None
    images: List[str] = []
    price: float
    expected_price: Optional[float] = None
    inventory_mode: InventoryMode = InventoryMode.ZERO
    category: str = "D2C Physical Brands"
    target_audience: Optional[str] = None
    validation_budget: float = 14999.0
    status: ProductStatus = ProductStatus.VALIDATING


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    views: int = 0
    unique_visitors: int = 0
    cart_additions: int = 0
    pre_orders: int = 0
    waitlist_count: int = 0


class CampaignBase(BaseModel):
    product_id: str
    ad_platform: AdPlatform = AdPlatform.META
    budget: float
    target_audience: str
    creative_headline: str
    creative_image_url: Optional[str] = None
    status: CampaignStatus = CampaignStatus.ACTIVE


class CampaignCreate(CampaignBase):
    pass


class Campaign(CampaignBase):
    id: str
    started_at: datetime = Field(default_factory=datetime.utcnow)
    ended_at: Optional[datetime] = None


class MetricBase(BaseModel):
    campaign_id: str
    impressions: int = 0
    clicks: int = 0
    ctr: float = 0.0  # percentage e.g. 4.2%
    cpc: float = 0.0  # e.g. 18.5
    add_to_cart: int = 0
    purchases: int = 0
    waitlist_signups: int = 0
    geo_breakdown: Dict[str, float] = {}
    demographics: Dict[str, float] = {}


class Metric(MetricBase):
    id: str
    recorded_at: datetime = Field(default_factory=datetime.utcnow)


class ValidationScoreBreakdown(BaseModel):
    conversion_rate_score: float  # 0-100
    ctr_score: float             # 0-100
    waitlist_velocity_score: float # 0-100
    benchmark_comparison_score: float # 0-100
    unit_economics_score: float   # 0-100


class ValidationScore(BaseModel):
    id: str
    product_id: str
    score: float  # 0-100 composite
    status: ValidationStatus
    breakdown: ValidationScoreBreakdown
    recommendation_title: str
    recommendation_details: str
    next_step_action: str
    batch_recommendation_units: int
    computed_at: datetime = Field(default_factory=datetime.utcnow)


class MarketplaceListingBase(BaseModel):
    product_id: str
    commission_rate: float = 6.0  # 5% - 7%
    logistics_partner: LogisticsPartner = LogisticsPartner.SHIPROCKET
    is_live: bool = True


class MarketplaceListing(MarketplaceListingBase):
    id: str
    total_orders: int = 0
    gross_merchandise_value: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)


class OrderCreate(BaseModel):
    listing_id: str
    product_id: str
    buyer_name: str
    buyer_email: str
    shipping_address: str
    pincode: str
    amount: float
    quantity: int = 1
    logistics_partner: LogisticsPartner = LogisticsPartner.SHIPROCKET


class Order(OrderCreate):
    id: str
    order_number: str
    commission_amount: float
    net_payout: float
    status: str = "CONFIRMED"
    tracking_number: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class SaaSSubscription(BaseModel):
    id: str
    seller_id: str
    tier: SaaSTier
    status: str = "active"
    monthly_price: float
    features: List[str]
    started_at: datetime = Field(default_factory=datetime.utcnow)
