"""
Post-Launch Scale SaaS Suite
Provides tools for validated and marketplace sellers:
1. Unified CRM: buyer contacts, repeat customer tags, order history
2. Retention & Repeat-Purchase Automation
3. Lead Gen & Early Adopter Engagement
"""

from typing import List, Dict, Any
from datetime import datetime
from backend.models import SaaSTier


class SaaSCrmService:
    def get_tier_features(self, tier: SaaSTier) -> Dict[str, Any]:
        features_map = {
            SaaSTier.STARTER: {
                "monthly_price": 2499.0,
                "crm_contacts_limit": 1000,
                "automated_emails_limit": 5000,
                "features": [
                    "Basic Customer CRM & Order History",
                    "Automated Post-Purchase Review Request",
                    "Abandonment Email Sequence (1 step)",
                    "Basic Export (CSV)"
                ]
            },
            SaaSTier.GROWTH: {
                "monthly_price": 5999.0,
                "crm_contacts_limit": 10000,
                "automated_emails_limit": 50000,
                "features": [
                    "Multi-tier CRM Segmentation (VIP, At-Risk, Repeat Buyers)",
                    "3-Step Automated Retention & Re-order Triggers",
                    "SMS & WhatsApp Notification Integrations",
                    "Lead-gen Popups & Referral Reward Engine",
                    "Cohort Retention & LTV Analytics"
                ]
            },
            SaaSTier.SCALE: {
                "monthly_price": 14999.0,
                "crm_contacts_limit": 100000,
                "automated_emails_limit": 500000,
                "features": [
                    "Full Omnichannel Customer Data Platform (CDP)",
                    "Predictive Repurchase Timing AI Trigger",
                    "Dedicated Account Growth Manager",
                    "Custom Webhooks & ERP Sync",
                    "Priority Shiprocket Warehouse Allocation"
                ]
            }
        }
        return features_map.get(tier, features_map[SaaSTier.STARTER])

    def get_mock_crm_contacts(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "crm_1",
                "name": "Aarav Sharma",
                "email": "aarav.s@gmail.com",
                "phone": "+91 98451 22345",
                "total_orders": 3,
                "total_spent": 8997,
                "segment": "VIP_REPEAT_BUYER",
                "last_active": "2 hours ago",
                "stage": "Advocate"
            },
            {
                "id": "crm_2",
                "name": "Priya Menon",
                "email": "priya.m@techcorp.in",
                "phone": "+91 99120 44512",
                "total_orders": 1,
                "total_spent": 2999,
                "segment": "FIRST_TIME_BUYER",
                "last_active": "1 day ago",
                "stage": "Customer"
            },
            {
                "id": "crm_3",
                "name": "Rohan Deshmukh",
                "email": "rohan.d@startup.io",
                "phone": "+91 97321 88910",
                "total_orders": 0,
                "total_spent": 0,
                "segment": "VIP_WAITLIST",
                "last_active": "3 hours ago",
                "stage": "Hot Lead"
            }
        ]


saas_service = SaaSCrmService()
