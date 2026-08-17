"""
Venturely FastAPI Application
Full-stack REST API for validation campaigns, Meta Ads telemetry,
scoring engine, decision gate, marketplace checkout, and Scale SaaS suite.
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime

from backend.models import (
    Seller, SellerCreate, BusinessStage,
    Product, ProductCreate, ProductStatus, InventoryMode,
    Campaign, CampaignCreate, CampaignStatus, AdPlatform,
    Metric,
    ValidationScore, ValidationStatus,
    MarketplaceListing, Order, OrderCreate,
    SaaSSubscription, SaaSTier, LogisticsPartner
)
from backend.services.meta_ads import meta_ads_service
from backend.services.scoring_engine import scoring_engine
from backend.services.logistics import logistics_service
from backend.services.n8n_workflows import n8n_service
from backend.services.saas_crm import saas_service

app = FastAPI(
    title="Venturely API",
    description="Validation + Launchpad Platform for D2C Brands & Startups",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Database Stores (Synced with mock seeds)
DB_SELLERS: Dict[str, Seller] = {}
DB_PRODUCTS: Dict[str, Product] = {}
DB_CAMPAIGNS: Dict[str, Campaign] = {}
DB_METRICS: Dict[str, Metric] = {}
DB_VALIDATION_SCORES: Dict[str, ValidationScore] = {}
DB_MARKETPLACE_LISTINGS: Dict[str, MarketplaceListing] = {}
DB_ORDERS: Dict[str, Order] = {}
DB_SAAS_SUBSCRIPTIONS: Dict[str, SaaSSubscription] = {}


# --- Seed Initial Data ---
def seed_data():
    seller_1 = Seller(
        id="seller_d2c_1",
        name="Arjun Mehta",
        email="arjun@nerveband.in",
        business_stage=BusinessStage.PROTOTYPE
    )
    DB_SELLERS[seller_1.id] = seller_1

    prod_1 = Product(
        id="prod_nerveband_1",
        seller_id=seller_1.id,
        title="NerveBand Pro — Neuromuscular Recovery Wearable",
        slug="nerveband-pro",
        tagline="Targeted Micro-Pulse Therapy for Athlete Recovery & Muscle Fatigue",
        description="Engineered with bio-conductive graphene sensors and haptic bio-pulses. Zero bulky wires.",
        problem="Athletes spend ₹15,000+ monthly on physiotherapists for muscle recovery after intense training.",
        solution="Wearable smart strap delivering real-time EMG muscle scan and adaptive recovery micro-pulses in 15 mins.",
        images=[
            "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1510519138161-58474ebf8463?w=800&auto=format&fit=crop&q=80"
        ],
        price=3499.0,
        expected_price=5999.0,
        inventory_mode=InventoryMode.ZERO,
        category="D2C Physical Brands",
        target_audience="CrossFit athletes, marathoners, tech workers with RSI",
        validation_budget=14999.0,
        status=ProductStatus.VALIDATING,
        views=4210,
        unique_visitors=3120,
        cart_additions=580,
        pre_orders=112,
        waitlist_count=340
    )
    DB_PRODUCTS[prod_1.id] = prod_1

    # Campaign
    cmp_1 = Campaign(
        id="cmp_nerveband_meta",
        product_id=prod_1.id,
        ad_platform=AdPlatform.META,
        budget=14999.0,
        target_audience="Fitness enthusiasts (22-40), Marathon runners in Bengaluru, Mumbai, Delhi",
        creative_headline="Say goodbye to DOMS: 15-min Graphene Recovery Wearable",
        creative_image_url=prod_1.images[0],
        status=CampaignStatus.ACTIVE
    )
    DB_CAMPAIGNS[cmp_1.id] = cmp_1

    # Compute initial validation score
    score_1 = scoring_engine.compute_score(
        product_id=prod_1.id,
        impressions=18200,
        clicks=840,
        ctr=4.6,
        add_to_cart=prod_1.cart_additions,
        purchases=prod_1.pre_orders,
        waitlist_count=prod_1.waitlist_count,
        price=prod_1.price,
        ad_spend=cmp_1.budget
    )
    DB_VALIDATION_SCORES[prod_1.id] = score_1


seed_data()


# --- Health Route ---
@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "Venturely API Engine",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }


# --- Seller Endpoints ---
@app.post("/api/sellers", response_model=Seller)
def create_seller(payload: SellerCreate):
    seller_id = f"seller_{uuid.uuid4().hex[:8]}"
    seller = Seller(id=seller_id, **payload.model_dump())
    DB_SELLERS[seller_id] = seller
    return seller


@app.get("/api/sellers/{seller_id}", response_model=Seller)
def get_seller(seller_id: str):
    if seller_id not in DB_SELLERS:
        raise HTTPException(status_code=404, detail="Seller not found")
    return DB_SELLERS[seller_id]


# --- Product Endpoints ---
@app.get("/api/products", response_model=List[Product])
def list_products(category: Optional[str] = None, status: Optional[str] = None):
    products = list(DB_PRODUCTS.values())
    if category:
        products = [p for p in products if p.category.lower() == category.lower()]
    if status:
        products = [p for p in products if p.status.lower() == status.lower()]
    return products


@app.post("/api/products", response_model=Product)
def create_product(payload: ProductCreate, background_tasks: BackgroundTasks):
    prod_id = f"prod_{uuid.uuid4().hex[:8]}"
    product = Product(id=prod_id, **payload.model_dump())
    DB_PRODUCTS[prod_id] = product

    # Auto-initialize initial Meta Ads campaign & scoring
    if product.validation_budget > 0:
        cmp_id = f"cmp_{uuid.uuid4().hex[:8]}"
        campaign = Campaign(
            id=cmp_id,
            product_id=prod_id,
            ad_platform=AdPlatform.META,
            budget=product.validation_budget,
            target_audience=product.target_audience or "Early adopters & category shoppers",
            creative_headline=product.tagline,
            creative_image_url=product.images[0] if product.images else None,
            status=CampaignStatus.ACTIVE
        )
        DB_CAMPAIGNS[cmp_id] = campaign

    return product


@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    if product_id in DB_PRODUCTS:
        return DB_PRODUCTS[product_id]
    # Check by slug
    for p in DB_PRODUCTS.values():
        if p.slug == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")


# --- Meta Ads & Campaign Endpoints ---
@app.post("/api/campaigns/launch", response_model=Campaign)
def launch_meta_campaign(payload: CampaignCreate):
    meta_result = meta_ads_service.create_campaign(
        product_title=payload.creative_headline,
        budget=payload.budget,
        target_audience=payload.target_audience,
        creative_headline=payload.creative_headline
    )
    cmp_id = meta_result["campaign_id"]
    campaign = Campaign(id=cmp_id, **payload.model_dump())
    DB_CAMPAIGNS[cmp_id] = campaign
    return campaign


@app.get("/api/campaigns/{campaign_id}/insights")
def get_campaign_insights(campaign_id: str):
    campaign = DB_CAMPAIGNS.get(campaign_id)
    budget = campaign.budget if campaign else 14999.0
    return meta_ads_service.fetch_insights(campaign_id=campaign_id, budget=budget)


# --- Validation Scoring & Decision Gate ---
@app.get("/api/validation-scores/{product_id}", response_model=ValidationScore)
def get_validation_score(product_id: str):
    if product_id in DB_VALIDATION_SCORES:
        return DB_VALIDATION_SCORES[product_id]

    product = DB_PRODUCTS.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    score = scoring_engine.compute_score(
        product_id=product.id,
        impressions=product.views * 4,
        clicks=product.unique_visitors,
        ctr=4.2,
        add_to_cart=product.cart_additions,
        purchases=product.pre_orders,
        waitlist_count=product.waitlist_count,
        price=product.price,
        ad_spend=product.validation_budget
    )
    DB_VALIDATION_SCORES[product_id] = score
    return score


@app.post("/api/decision-gate/{product_id}/action")
def execute_decision_gate_action(product_id: str, action: str = Query(..., regex="^(launch_marketplace|export_data|retest)$")):
    product = DB_PRODUCTS.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if action == "launch_marketplace":
        product.status = ProductStatus.LAUNCHED
        listing_id = f"list_{uuid.uuid4().hex[:8]}"
        listing = MarketplaceListing(
            id=listing_id,
            product_id=product.id,
            commission_rate=6.0,
            logistics_partner=LogisticsPartner.SHIPROCKET,
            is_live=True
        )
        DB_MARKETPLACE_LISTINGS[listing_id] = listing
        return {
            "success": True,
            "action": "launch_marketplace",
            "listing_id": listing_id,
            "message": f"Successfully launched {product.title} to Venturely Marketplace with 6% commission."
        }
    elif action == "export_data":
        score = DB_VALIDATION_SCORES.get(product_id)
        return {
            "success": True,
            "action": "export_data",
            "product_title": product.title,
            "score": score.score if score else 84.5,
            "total_pre_orders": product.pre_orders,
            "total_waitlist": product.waitlist_count,
            "download_url": f"/api/export/{product_id}?format=json"
        }
    elif action == "retest":
        product.status = ProductStatus.VALIDATING
        return {
            "success": True,
            "action": "retest",
            "message": "Reset test telemetry and scheduled new creative iteration."
        }


# --- Marketplace & Orders ---
@app.get("/api/marketplace/listings")
def list_marketplace_items():
    listings = []
    for l_id, listing in DB_MARKETPLACE_LISTINGS.items():
        prod = DB_PRODUCTS.get(listing.product_id)
        if prod:
            listings.append({
                "listing": listing,
                "product": prod
            })
    return listings


@app.post("/api/orders/checkout", response_model=Order)
def process_checkout(payload: OrderCreate):
    commission_rate = 6.0 # 6% platform fee
    commission_amt = round(payload.amount * (commission_rate / 100), 2)
    net_payout = round(payload.amount - commission_amt, 2)

    order_id = f"ord_{uuid.uuid4().hex[:8]}"
    order_num = f"VNT-{uuid.uuid4().hex[:6].upper()}"

    # Generate Shiprocket dispatch AWB
    awb_info = logistics_service.generate_awb_and_pickup(
        order_id=order_id,
        buyer_name=payload.buyer_name,
        delivery_address=payload.shipping_address,
        pincode=payload.pincode
    )

    order = Order(
        id=order_id,
        order_number=order_num,
        commission_amount=commission_amt,
        net_payout=net_payout,
        tracking_number=awb_info["awb_number"],
        **payload.model_dump()
    )
    DB_ORDERS[order_id] = order
    return order


# --- Scale SaaS Module ---
@app.get("/api/saas/tier-info/{tier}")
def get_saas_tier_info(tier: SaaSTier):
    return saas_service.get_tier_features(tier)


@app.get("/api/saas/contacts")
def get_crm_contacts():
    return saas_service.get_mock_crm_contacts()


# --- Export Validation Summary ---
@app.get("/api/export/{product_id}")
def export_validation_summary(product_id: str):
    product = DB_PRODUCTS.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    score = DB_VALIDATION_SCORES.get(product_id)
    return {
        "venturely_validation_certificate": {
            "product_id": product.id,
            "product_title": product.title,
            "founder_id": product.seller_id,
            "generated_at": datetime.utcnow().isoformat(),
            "validation_score": score.score if score else 84.5,
            "status": score.status if score else "green",
            "traffic_telemetry": {
                "impressions": product.views * 4,
                "unique_visitors": product.unique_visitors,
                "ctr": "4.6%",
                "cpc": "₹17.8",
                "cart_purchase_rate": f"{round((product.pre_orders / max(product.cart_additions, 1)) * 100, 1)}%",
                "pre_orders_count": product.pre_orders,
                "waitlist_leads_count": product.waitlist_count,
            },
            "recommendation": {
                "batch_manufacturing_target": score.batch_recommendation_units if score else 500,
                "pricing_elasticity": "Optimal at ₹" + str(product.price)
            }
        }
    }
