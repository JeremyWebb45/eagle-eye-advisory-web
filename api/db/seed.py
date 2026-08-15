import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from app import app
from db.db import db
from db.models.Leads import Leads
from utils.get_env_values import get_env_values

MOCK_LEADS = [
    {
        "name": "Avery Holt",
        "email": "avery.holt@example.com",
        "title": "VP of Operations",
        "phone": "555-0123",
        "company": "Northwind Analytics",
        "message": "Interested in a data-driven advisory partnership.",
    },
    {
        "name": "Jordan Park",
        "email": "jordan.park@example.com",
        "title": "Founder",
        "phone": "555-0456",
        "company": "BrightLoop Labs",
        "message": "Looking for custom automation and AI solutions.",
    },
    {
        "name": "Mia Chen",
        "email": "mia.chen@example.com",
        "title": "Director of Product",
        "phone": "555-0789",
        "company": "Atlas Commerce",
        "message": "Need help turning product signals into growth strategy.",
    },
    {
        "name": "Noah Benson",
        "email": "noah.benson@example.com",
        "title": "Head of Marketing",
        "phone": "555-1012",
        "company": "Emerald Insights",
        "message": "Curious about advisory work for launching a new campaign.",
    },
    {
        "name": "Sofia Patel",
        "email": "sofia.patel@example.com",
        "title": "Chief Revenue Officer",
        "phone": "555-1314",
        "company": "Velocity Ventures",
        "message": "Interested in improving sales operations with analytics.",
    },
    {
        "name": "Liam Scott",
        "email": "liam.scott@example.com",
        "title": "Senior Analyst",
        "phone": "555-1516",
        "company": "Summit Edge",
        "message": "Need support with lead qualification and pipeline reporting.",
    },
    {
        "name": "Emma Rivera",
        "email": "emma.rivera@example.com",
        "title": "Business Development Lead",
        "phone": "555-1718",
        "company": "Pioneer Systems",
        "message": "Looking for advisory services on customer acquisition.",
    },
    {
        "name": "Ethan Brooks",
        "email": "ethan.brooks@example.com",
        "title": "Operations Manager",
        "phone": "555-1920",
        "company": "Crescent Technologies",
        "message": "Exploring CRM and workflow automation improvements.",
    },
    {
        "name": "Olivia Kim",
        "email": "olivia.kim@example.com",
        "title": "Strategy Consultant",
        "phone": "555-2122",
        "company": "Foresight Partners",
        "message": "Would like to test a pilot advisory engagement.",
    },
    {
        "name": "Noelle Rivera",
        "email": "noelle.rivera@example.com",
        "title": "Product Marketing Manager",
        "phone": "555-2324",
        "company": "Radiant Labs",
        "message": "Requesting assistance with product launch positioning.",
    },
]


def seed_leads():
    env_values = get_env_values()
    if env_values.get("TIER") == "production":
        raise RuntimeError("Seed script must not be run in production.")

    with app.app_context():
        existing_count = Leads.query.count()
        if existing_count > 0:
            print(f"Skipping seed. Leads table already contains {existing_count} record(s).")
            return

        new_leads = [
            Leads(
                name=lead["name"],
                email=lead["email"],
                title=lead["title"],
                phone=lead["phone"],
                company=lead["company"],
                message=lead["message"],
            )
            for lead in MOCK_LEADS
        ]

        db.session.add_all(new_leads)
        db.session.commit()
        print(f"Inserted {len(new_leads)} mock leads into the leads table.")


if __name__ == "__main__":
    seed_leads()
