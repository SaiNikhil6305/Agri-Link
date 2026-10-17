import sqlite3
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "agri_link.db")

def migrate():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print(f"Connecting to database at {DB_PATH}...")

    # 1. Update farmer_submissions table with available_quantity and allocated_quantity
    cursor.execute("PRAGMA table_info(farmer_submissions)")
    cols = [c[1] for c in cursor.fetchall()]
    
    if 'available_quantity' not in cols:
        print("Adding available_quantity column to farmer_submissions...")
        cursor.execute("ALTER TABLE farmer_submissions ADD COLUMN available_quantity REAL")
        cursor.execute("UPDATE farmer_submissions SET available_quantity = quantity WHERE available_quantity IS NULL")

    if 'allocated_quantity' not in cols:
        print("Adding allocated_quantity column to farmer_submissions...")
        cursor.execute("ALTER TABLE farmer_submissions ADD COLUMN allocated_quantity REAL DEFAULT 0")
        cursor.execute("UPDATE farmer_submissions SET allocated_quantity = 0 WHERE allocated_quantity IS NULL")

    if 'farmer_id' not in cols:
        print("Adding farmer_id column to farmer_submissions...")
        cursor.execute("ALTER TABLE farmer_submissions ADD COLUMN farmer_id TEXT DEFAULT 'FARMER-01'")
        cursor.execute("UPDATE farmer_submissions SET farmer_id = 'FARMER-01' WHERE farmer_id IS NULL")

    if 'unit' not in cols:
        print("Adding unit column to farmer_submissions...")
        cursor.execute("ALTER TABLE farmer_submissions ADD COLUMN unit TEXT DEFAULT 'kg'")
        cursor.execute("UPDATE farmer_submissions SET unit = 'kg' WHERE unit IS NULL")

    if 'procurement_price_per_unit' not in cols:
        print("Adding procurement_price_per_unit column to farmer_submissions...")
        cursor.execute("ALTER TABLE farmer_submissions ADD COLUMN procurement_price_per_unit REAL DEFAULT 22.0")
        cursor.execute("UPDATE farmer_submissions SET procurement_price_per_unit = 22.0 WHERE procurement_price_per_unit IS NULL")

    # 2. Buyer Requests Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS buyer_requests (
            request_id TEXT PRIMARY KEY,
            buyer_id TEXT NOT NULL,
            buyer_name TEXT NOT NULL,
            crop TEXT NOT NULL,
            variety TEXT,
            requested_quantity REAL NOT NULL,
            unit TEXT DEFAULT 'kg',
            quality_requirements TEXT,
            delivery_location TEXT NOT NULL,
            required_delivery_date TEXT NOT NULL,
            target_price REAL NOT NULL,
            estimated_value REAL NOT NULL,
            accepted_quantity REAL DEFAULT 0,
            allocated_quantity REAL DEFAULT 0,
            remaining_quantity REAL DEFAULT 0,
            additional_requirements TEXT,
            status TEXT NOT NULL,
            rejection_reason TEXT,
            created_at TEXT NOT NULL
        )
    ''')

    # 3. Commercial Lots Table (Add extra fields if missing)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS commercial_lots (
            id TEXT PRIMARY KEY,
            crop TEXT NOT NULL,
            variety TEXT NOT NULL,
            qty REAL NOT NULL,
            grade TEXT NOT NULL,
            moisture TEXT NOT NULL,
            farmers TEXT NOT NULL,
            fpo TEXT NOT NULL,
            base_price_per_qtl REAL NOT NULL,
            msp_per_qtl REAL NOT NULL,
            gross_value REAL NOT NULL,
            status TEXT NOT NULL,
            location TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    ''')

    cursor.execute("PRAGMA table_info(commercial_lots)")
    lot_cols = [c[1] for c in cursor.fetchall()]

    additional_lot_cols = {
        'lot_name': 'TEXT',
        'aggregator_id': "TEXT DEFAULT 'AGG-01'",
        'buyer_request_id': 'TEXT',
        'allocated_quantity': 'REAL DEFAULT 0',
        'remaining_quantity': 'REAL',
        'unit': "TEXT DEFAULT 'kg'",
        'procurement_price': 'REAL DEFAULT 20.0',
        'selling_price': 'REAL DEFAULT 25.0',
        'harvest_date': 'TEXT',
        'procurement_location': 'TEXT',
        'storage_location': 'TEXT',
        'expected_dispatch_date': 'TEXT',
        'expected_delivery_date': 'TEXT',
        'description': 'TEXT'
    }

    for col_name, col_type in additional_lot_cols.items():
        if col_name not in lot_cols:
            print(f"Adding {col_name} column to commercial_lots...")
            cursor.execute(f"ALTER TABLE commercial_lots ADD COLUMN {col_name} {col_type}")

    # 4. Lot Allocations Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lot_allocations (
            allocation_id TEXT PRIMARY KEY,
            lot_id TEXT NOT NULL,
            buyer_request_id TEXT,
            farmer_id TEXT NOT NULL,
            farmer_name TEXT NOT NULL,
            submission_id TEXT NOT NULL,
            crop TEXT NOT NULL,
            farmer_available_quantity REAL NOT NULL,
            allocated_quantity REAL NOT NULL,
            unit TEXT DEFAULT 'kg',
            farmer_price_per_unit REAL NOT NULL,
            gross_farmer_payment REAL NOT NULL,
            quality_grade TEXT,
            procurement_date TEXT NOT NULL,
            allocation_status TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    ''')

    # 5. Transactions / Procurement Settlements Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            transaction_id TEXT PRIMARY KEY,
            buyer_request_id TEXT,
            buyer_id TEXT NOT NULL,
            buyer_name TEXT NOT NULL,
            aggregator_id TEXT NOT NULL,
            aggregator_name TEXT NOT NULL,
            lot_id TEXT NOT NULL,
            crop TEXT NOT NULL,
            delivered_quantity REAL NOT NULL,
            unit TEXT DEFAULT 'kg',
            crop_price_per_unit REAL NOT NULL,
            crop_sales_revenue REAL NOT NULL,
            farmer_procurement_cost REAL NOT NULL,
            transport_charges REAL NOT NULL,
            other_charges REAL DEFAULT 0,
            aggregator_gross_margin REAL NOT NULL,
            aggregator_net_earnings REAL NOT NULL,
            total_buyer_cost REAL NOT NULL,
            transport_payer TEXT DEFAULT 'buyer',
            transaction_status TEXT NOT NULL,
            payment_status TEXT NOT NULL,
            completed_at TEXT,
            created_at TEXT NOT NULL
        )
    ''')

    # 6. Farmer Payments Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS farmer_payments (
            payment_id TEXT PRIMARY KEY,
            transaction_id TEXT NOT NULL,
            lot_id TEXT NOT NULL,
            buyer_request_id TEXT,
            farmer_id TEXT NOT NULL,
            farmer_name TEXT NOT NULL,
            crop TEXT NOT NULL,
            quantity_supplied REAL NOT NULL,
            unit TEXT DEFAULT 'kg',
            agreed_price_per_unit REAL NOT NULL,
            gross_amount REAL NOT NULL,
            deductions REAL DEFAULT 0,
            deduction_reason TEXT,
            net_amount_payable REAL NOT NULL,
            amount_paid REAL DEFAULT 0,
            outstanding_balance REAL NOT NULL,
            payment_status TEXT NOT NULL,
            payment_date TEXT,
            created_at TEXT NOT NULL
        )
    ''')

    # 7. Buyer Payments Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS buyer_payments (
            payment_id TEXT PRIMARY KEY,
            transaction_id TEXT NOT NULL,
            buyer_id TEXT NOT NULL,
            buyer_name TEXT NOT NULL,
            amount_due REAL NOT NULL,
            amount_paid REAL DEFAULT 0,
            outstanding_balance REAL NOT NULL,
            payment_status TEXT NOT NULL,
            payment_date TEXT,
            created_at TEXT NOT NULL
        )
    ''')

    # 8. Notifications Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS notifications (
            notification_id TEXT PRIMARY KEY,
            recipient_role TEXT NOT NULL,
            recipient_id TEXT,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            category TEXT,
            link TEXT,
            is_read INTEGER DEFAULT 0,
            created_at TEXT NOT NULL
        )
    ''')

    # SEED INITIAL DATA IF TABLES ARE EMPTY
    cursor.execute("SELECT COUNT(*) FROM buyer_requests")
    if cursor.fetchone()[0] == 0:
        print("Seeding initial Buyer Requests...")
        seed_requests = [
            (
                'REQ-1001', 'BUYER-01', 'ITC Agri-Business Division', 'Rice', 'Super Basmati Export Grade',
                1000.0, 'kg', 'Grade A Premium, Moisture < 12%, Zero broken grains',
                'ITC Agro Terminal, Karnal, Haryana', '2026-10-25', 25.0, 25000.0,
                1000.0, 1000.0, 0.0, 'Food-grade packaging mandatory. Organic certification preferred.',
                'Completed', None, '2026-10-10 09:30:00'
            ),
            (
                'REQ-1002', 'BUYER-02', 'Cargill India Foods', 'Wheat', 'Sharbati HD-3086',
                2000.0, 'kg', 'Grade A (Premium), Protein > 12.5%',
                'Cargill Storage Terminal, Ludhiana, Punjab', '2026-10-30', 26.0, 52000.0,
                2000.0, 1000.0, 1000.0, 'Split delivery across 2 certified commercial lots acceptable.',
                'Partially Allocated', None, '2026-10-11 11:15:00'
            ),
            (
                'REQ-1003', 'BUYER-03', 'Adani Wilmar Agri Hub', 'Maize', 'Yellow Feed Grain Grade-1',
                1500.0, 'kg', 'Grade B Standard, Moisture < 14%',
                'Adani Grain Silos, Neemuch, MP', '2026-11-05', 22.0, 33000.0,
                1500.0, 0.0, 1500.0, 'Aflatoxin test certificate required prior to dispatch.',
                'Accepted', None, '2026-10-12 14:00:00'
            ),
            (
                'REQ-1004', 'BUYER-04', 'Reliance Retail Mandi', 'Cotton', 'Long Staple 32mm',
                800.0, 'kg', 'Grade A Premium',
                'Reliance Supply Hub, Ahmedabad, Gujarat', '2026-11-10', 75.0, 60000.0,
                0.0, 0.0, 800.0, 'Moisture under 8% strictly tested upon arrival.',
                'Pending', None, '2026-10-13 08:45:00'
            )
        ]
        cursor.executemany('''
            INSERT INTO buyer_requests VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', seed_requests)

    cursor.execute("SELECT COUNT(*) FROM lot_allocations")
    if cursor.fetchone()[0] == 0:
        print("Seeding initial Lot Allocations...")
        seed_allocations = [
            (
                'ALC-1001', 'LOT-1001', 'REQ-1001', 'FARMER-01', 'Ramesh Kumar', 'SUB-101', 'Rice',
                400.0, 400.0, 'kg', 20.0, 8000.0, 'Grade A (Premium)', '2026-10-11', 'Completed', '2026-10-11 10:00:00'
            ),
            (
                'ALC-1002', 'LOT-1001', 'REQ-1001', 'FARMER-02', 'Gurpreet Singh', 'SUB-102', 'Rice',
                350.0, 350.0, 'kg', 20.0, 7000.0, 'Grade A (Premium)', '2026-10-11', 'Completed', '2026-10-11 10:15:00'
            ),
            (
                'ALC-1003', 'LOT-1001', 'REQ-1001', 'FARMER-03', 'Harvinder Kaur', 'SUB-103', 'Rice',
                500.0, 250.0, 'kg', 20.0, 5000.0, 'Grade A (Premium)', '2026-10-11', 'Completed', '2026-10-11 10:30:00'
            ),
            (
                'ALC-1004', 'LOT-1002', 'REQ-1002', 'FARMER-04', 'Baldev Ram', 'SUB-104', 'Wheat',
                1200.0, 1000.0, 'kg', 22.0, 22000.0, 'Grade A (Premium)', '2026-10-12', 'Confirmed', '2026-10-12 11:00:00'
            )
        ]
        cursor.executemany('''
            INSERT INTO lot_allocations VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', seed_allocations)

    cursor.execute("SELECT COUNT(*) FROM transactions")
    if cursor.fetchone()[0] == 0:
        print("Seeding initial completed Transparent Transaction (REQ-1001 / LOT-1001)...")
        seed_transactions = [
            (
                'TXN-1001', 'REQ-1001', 'BUYER-01', 'ITC Agri-Business Division',
                'AGG-01', 'Malwa Kisan Producer Co. (FPO)', 'LOT-1001', 'Rice',
                1000.0, 'kg', 25.0, 25000.0, 20000.0, 1000.0, 0.0,
                5000.0, 4000.0, 26000.0, 'buyer', 'Completed', 'Completed',
                '2026-10-12 16:30:00', '2026-10-11 10:00:00'
            )
        ]
        cursor.executemany('''
            INSERT INTO transactions VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', seed_transactions)

    cursor.execute("SELECT COUNT(*) FROM farmer_payments")
    if cursor.fetchone()[0] == 0:
        print("Seeding initial Farmer Payment records...")
        seed_farmer_payments = [
            (
                'FPAY-1001', 'TXN-1001', 'LOT-1001', 'REQ-1001', 'FARMER-01', 'Ramesh Kumar', 'Rice',
                400.0, 'kg', 20.0, 8000.0, 0.0, None, 8000.0, 8000.0, 0.0,
                'Completed', '2026-10-12', '2026-10-11 10:00:00'
            ),
            (
                'FPAY-1002', 'TXN-1001', 'LOT-1001', 'REQ-1001', 'FARMER-02', 'Gurpreet Singh', 'Rice',
                350.0, 'kg', 20.0, 7000.0, 0.0, None, 7000.0, 7000.0, 0.0,
                'Completed', '2026-10-12', '2026-10-11 10:15:00'
            ),
            (
                'FPAY-1003', 'TXN-1001', 'LOT-1001', 'REQ-1001', 'FARMER-03', 'Harvinder Kaur', 'Rice',
                250.0, 'kg', 20.0, 5000.0, 0.0, None, 5000.0, 5000.0, 0.0,
                'Completed', '2026-10-12', '2026-10-11 10:30:00'
            )
        ]
        cursor.executemany('''
            INSERT INTO farmer_payments VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', seed_farmer_payments)

    cursor.execute("SELECT COUNT(*) FROM buyer_payments")
    if cursor.fetchone()[0] == 0:
        print("Seeding initial Buyer Payment record...")
        seed_buyer_payments = [
            (
                'BPAY-1001', 'TXN-1001', 'BUYER-01', 'ITC Agri-Business Division',
                26000.0, 26000.0, 0.0, 'Completed', '2026-10-12', '2026-10-12 16:00:00'
            )
        ]
        cursor.executemany('''
            INSERT INTO buyer_payments VALUES (?,?,?,?,?,?,?,?,?,?)
        ''', seed_buyer_payments)

    cursor.execute("SELECT COUNT(*) FROM notifications")
    if cursor.fetchone()[0] == 0:
        print("Seeding initial Notifications...")
        seed_notifications = [
            ('NOTIF-01', 'buyer', 'BUYER-01', 'Order Completed & Delivered', 'Your order for 1,000 kg Rice (LOT-1001) has been fully settled and delivered.', 'order', 'REQ-1001', 0, '2026-10-12 16:35:00'),
            ('NOTIF-02', 'aggregator', 'AGG-01', 'New Buyer Request Received', 'ITC Agri-Business submitted REQ-1001 for 1,000 kg Rice.', 'request', 'REQ-1001', 1, '2026-10-10 09:30:00'),
            ('NOTIF-03', 'aggregator', 'AGG-01', 'Lot 1001 Fully Allocated', 'Lot LOT-1001 reached 100% allocation across 3 farmers.', 'allocation', 'LOT-1001', 1, '2026-10-11 11:00:00'),
            ('NOTIF-04', 'farmer', 'FARMER-01', 'Produce Allocated to Commercial Lot', '400 kg Rice allocated to LOT-1001 at agreed rate ₹20/kg.', 'allocation', 'LOT-1001', 0, '2026-10-11 10:00:00'),
            ('NOTIF-05', 'farmer', 'FARMER-01', 'Payment Disbursed to Bank', 'Direct MSP Settlement: ₹8,000 credited for LOT-1001.', 'payment', 'TXN-1001', 0, '2026-10-12 17:00:00')
        ]
        cursor.executemany('''
            INSERT INTO notifications VALUES (?,?,?,?,?,?,?,?,?)
        ''', seed_notifications)

    # Update or insert LOT-1001 and LOT-1002 in commercial_lots
    cursor.execute("SELECT COUNT(*) FROM commercial_lots WHERE id = 'LOT-1001'")
    if cursor.fetchone()[0] == 0:
        cursor.execute('''
            INSERT INTO commercial_lots 
            (id, crop, variety, qty, grade, moisture, farmers, fpo, base_price_per_qtl, msp_per_qtl, gross_value, status, location, created_at,
             lot_name, aggregator_id, buyer_request_id, allocated_quantity, remaining_quantity, unit, procurement_price, selling_price,
             harvest_date, procurement_location, storage_location, expected_dispatch_date, expected_delivery_date, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            'LOT-1001', 'Rice', 'Super Basmati Export Grade', 1000.0, 'Grade A (Premium)', '11.0%',
            'Ramesh Kumar, Gurpreet Singh, Harvinder Kaur', 'Malwa Kisan Producer Co. (FPO)',
            2500.0, 2200.0, 25000.0, 'Completed', 'Ludhiana Central Agro Hub', '2026-10-10 10:00:00',
            'Basmati Export Pool A-1', 'AGG-01', 'REQ-1001', 1000.0, 0.0, 'kg', 20.0, 25.0,
            '2026-10-08', 'Ludhiana Mandi', 'Karnal Terminal', '2026-10-11', '2026-10-12',
            'Certified Grade A export pool for ITC Agro contract.'
        ))

    cursor.execute("SELECT COUNT(*) FROM commercial_lots WHERE id = 'LOT-1002'")
    if cursor.fetchone()[0] == 0:
        cursor.execute('''
            INSERT INTO commercial_lots 
            (id, crop, variety, qty, grade, moisture, farmers, fpo, base_price_per_qtl, msp_per_qtl, gross_value, status, location, created_at,
             lot_name, aggregator_id, buyer_request_id, allocated_quantity, remaining_quantity, unit, procurement_price, selling_price,
             harvest_date, procurement_location, storage_location, expected_dispatch_date, expected_delivery_date, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            'LOT-1002', 'Wheat', 'Sharbati HD-3086', 1000.0, 'Grade A (Premium)', '10.5%',
            'Baldev Ram', 'Malwa Kisan Producer Co. (FPO)',
            2600.0, 2275.0, 26000.0, 'Fully Allocated', 'Patiala APMC Terminal', '2026-10-11 12:00:00',
            'Sharbati Premium Batch 1', 'AGG-01', 'REQ-1002', 1000.0, 0.0, 'kg', 22.0, 26.0,
            '2026-10-10', 'Patiala Yard #3', 'Patiala Hub', '2026-10-28', '2026-10-30',
            'First lot of Cargill 2,000 kg order. Fully allocated and preparing for dispatch.'
        ))

    conn.commit()
    conn.close()
    print("Database migration and seeding completed successfully!")

if __name__ == '__main__':
    migrate()
