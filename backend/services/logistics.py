"""
Partner Logistics Interface (Shiprocket / Delhivery Integration Stub)
Provides serviceability check, AWB generation, and shipment status tracking.
"""

from typing import Dict, Any
import random
from datetime import datetime


class ShiprocketLogisticsService:
    def __init__(self, api_key: str = "mock_shiprocket_venturely_key"):
        self.api_key = api_key
        self.flat_surface_fee = 49.0
        self.express_air_fee = 89.0

    def check_serviceability(self, pickup_pincode: str, delivery_pincode: str, weight_kg: float = 0.5) -> Dict[str, Any]:
        """Checks courier availability and transit time estimates."""
        return {
            "pickup_pincode": pickup_pincode,
            "delivery_pincode": delivery_pincode,
            "is_serviceable": True,
            "couriers": [
                {
                    "courier_name": "Delhivery Surface",
                    "estimated_days": "3-4 business days",
                    "rate": self.flat_surface_fee,
                    "tracking_available": True
                },
                {
                    "courier_name": "BlueDart Express Air",
                    "estimated_days": "1-2 business days",
                    "rate": self.express_air_fee,
                    "tracking_available": True
                }
            ]
        }

    def generate_awb_and_pickup(self, order_id: str, buyer_name: str, delivery_address: str, pincode: str) -> Dict[str, Any]:
        """Generates mock AWB tracking number and schedules courier doorstep pickup."""
        awb = f"SR_VNT_{random.randint(10000000, 99999999)}"
        return {
            "success": True,
            "order_id": order_id,
            "courier_partner": "Shiprocket Fulfilled",
            "awb_number": awb,
            "pickup_scheduled_date": datetime.utcnow().strftime("%Y-%m-%d"),
            "tracking_url": f"https://track.venturely.io/{awb}",
            "status": "MANIFESTED_PICKUP_QUEUED"
        }


logistics_service = ShiprocketLogisticsService()
