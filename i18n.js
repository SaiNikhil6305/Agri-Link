// ========================================================
// AGRI-LINK: COMPREHENSIVE INTERNATIONALIZATION SYSTEM (i18n)
// Supports all 13 National & Regional Indian Languages:
// en, hi, te, ta, mr, bn, gu, kn, ml, or, pa, ur, as
// ========================================================

export const SUPPORTED_LANGUAGES = [
    { code: 'en', native: 'English', label: 'English', dir: 'ltr' },
    { code: 'hi', native: 'हिन्दी', label: 'Hindi', dir: 'ltr' },
    { code: 'te', native: 'తెలుగు', label: 'Telugu', dir: 'ltr' },
    { code: 'ta', native: 'தமிழ்', label: 'Tamil', dir: 'ltr' },
    { code: 'mr', native: 'मराठी', label: 'Marathi', dir: 'ltr' },
    { code: 'bn', native: 'বাংলা', label: 'Bengali', dir: 'ltr' },
    { code: 'gu', native: 'ગુજરાતી', label: 'Gujarati', dir: 'ltr' },
    { code: 'kn', native: 'ಕನ್ನಡ', label: 'Kannada', dir: 'ltr' },
    { code: 'ml', native: 'മലയാളം', label: 'Malayalam', dir: 'ltr' },
    { code: 'or', native: 'ଓଡ଼ିଆ', label: 'Odia', dir: 'ltr' },
    { code: 'pa', native: 'ਪੰਜਾਬੀ', label: 'Punjabi', dir: 'ltr' },
    { code: 'ur', native: 'اردو', label: 'Urdu', dir: 'rtl' },
    { code: 'as', native: 'অসমীয়া', label: 'Assamese', dir: 'ltr' }
];

export const TRANSLATIONS = {
    // --------------------------------------------------------
    // 1. ENGLISH (Default fallback)
    // --------------------------------------------------------
    en: {
        app_name: "Agri-Link",
        app_tagline: "Autonomous Agricultural Quality & Fair Trade Network",
        switch_role: "Switch Role",
        logout: "Logout",
        language_select: "Language",
        select_language: "Select Language / भाषा चुनें",
        
        // Navigation
        nav_overview: "Overview",
        nav_weather: "Weather & Advisory",
        nav_scanner: "AI Crop Scanner",
        nav_produce: "Register Produce",
        nav_ledger: "My Yard Batches",
        nav_allocations: "Commercial Lots",
        nav_earnings: "Payouts & Earnings",
        nav_centers: "Procurement Centres",
        nav_mandi: "Live Mandi Rates",
        nav_news: "Krishi News",
        nav_flowchart: "Process Flow",
        nav_inflow: "Farmer Inflow",
        nav_lots: "Lot Management",
        nav_buyer_orders: "Buyer Demand",
        nav_marketplace: "Commercial Lots",
        nav_post_demand: "Post Request",
        nav_matching: "Smart Matching",
        nav_traceability: "Provenance Audit",
        nav_spending: "Spend Analytics",
        nav_login_page: "Login Page",

        // Auth
        auth_portal_title: "Agri-Link Secure Access Gateway",
        auth_portal_subtitle: "Select your operational role to enter your dedicated workstation",
        auth_login_tab: "Sign In",
        auth_register_tab: "Create New Account",
        auth_email_or_phone: "Email Address or Mobile Number",
        auth_email_placeholder: "e.g. farmer@agrilink.in or 9876543210",
        auth_password: "Password",
        auth_password_placeholder: "Enter your secure password",
        auth_confirm_password: "Confirm Password",
        auth_confirm_password_placeholder: "Re-enter your password",
        auth_full_name: "Full Name / Organization",
        auth_full_name_placeholder: "e.g. Ramesh Kumar",
        auth_location: "District / Location",
        auth_location_placeholder: "e.g. Ludhiana, Punjab",
        auth_auto_detect: "Auto Detect",
        auth_auto_detecting: "Detecting...",
        auth_location_detected: "Location Detected",
        auth_preferred_role: "Operational Role",
        auth_btn_login: "Sign In to Workstation",
        auth_btn_register: "Register & Enter Workstation",
        auth_demo_header: "1-Click Demonstration Login:",
        demo_farmer: "🌾 Demo Farmer (Ramesh Kumar)",
        demo_aggregator: "📦 Demo Aggregator (Malwa FPO)",
        demo_buyer: "🏢 Demo Buyer (AgroCorp)",
        auth_role_farmer_desc: "Real-time weather station, AI crop quality grading, produce registration, and transparent payout ledger.",
        auth_role_aggregator_desc: "Regional farmer inflow queue, produce pooling, certified lot creation, and wholesale dispatch.",
        auth_role_buyer_desc: "Certified lot marketplace, automated procurement matching engine, and transparent settlement invoicing.",

        // Role Badges
        role_farmer: "FARMER PORTAL",
        role_aggregator: "AGGREGATOR DESK",
        role_buyer: "BUYER DESK",
        role_farmer_sub: "Kisan Quality & Fair Market Hub",
        role_aggregator_sub: "Regional FPO Lot Aggregation & Certification",
        role_buyer_sub: "Institutional Bulk Procurement & Settlement Engine",

        // Farmer Portal
        farmer_hero_badge: "Kisan Producer Hub",
        farmer_hero_title: "Empowering Farmers with AI Grading & Fair MSP Assurance",
        farmer_hero_desc: "Eliminate middleman exploitation. Upload grain harvest images for instant scientific quality analysis, transparent lot allocations, and direct MSP settlement.",
        btn_scan_produce: "AI Quality Scan",
        btn_register_produce: "Register Produce",

        // Weather
        weather_title: "Live Agricultural Weather Station",
        weather_subtitle: "Real-time agro-meteorological observations & 7-day precipitation forecasts powered by Open-Meteo",
        weather_search_btn: "Fetch Forecast",
        weather_gps_btn: "My GPS Location",
        spray_advisory: "Spraying Advisory",
        irrigation_advisory: "Irrigation Window",
        harvest_advisory: "Harvest Protection",

        // AI Scanner
        scanner_title: "Autonomous AI Crop Quality & Defect Scanner",
        scanner_subtitle: "Multi-Model Deep Learning Inference Calibrated to Government AGMARK Standards",
        drop_zone_heading: "Drag & Drop Produce Photo Here",
        drop_zone_sub: "or tap to capture via device camera (Supports JPG, PNG, WEBP)",
        quick_samples: "Quick Test Samples:",
        inspecting_text: "AI Inspecting...",
        btn_use_scan: "Use This Grade in My Produce Registration",
        disqualified_notice: "PRODUCE DISQUALIFIED: Exceeds maximum permissible insect & moisture defect tolerance.",

        // Produce Registration
        produce_reg_title: "Register Verified Harvest for FPO Lot Pooling",
        produce_reg_desc: "Submit your harvested grain into the regional FPO aggregation queue with guaranteed MSP baseline pricing.",
        crop_type: "Crop Commodity",
        variety: "Grain Variety",
        quantity_qtl: "Quantity (Quintals - 1 Qtl = 100 kg)",
        yard_location: "Depot / Yard Location",
        btn_submit_produce: "Register Produce with Guaranteed MSP",

        // Ledger & Allocations
        ledger_title: "Farmer Harvest Ledger & QC Status",
        ledger_desc: "Live status of all grain batches registered at regional aggregation yards",
        allocations_title: "Commercial Lot Allocations & Provenance",
        allocations_desc: "Track which FPO commercial lot your harvest has been pooled into and buyer dispatch status",
        earnings_title: "Farmer Earnings & Payout Ledger",
        earnings_desc: "Verifiable direct bank transfer settlements without commission agent deductions",

        // Aggregator Portal
        agg_hero_badge: "FPO Aggregator & Trade Desk",
        agg_hero_title: "Regional Cooperative Lot Pooling & Wholesale Fulfillment",
        agg_hero_desc: "Consolidate smallholder farmer batches into standardized, high-volume commercial lots with complete quality transparency and instant buyer matching.",
        inflow_title: "Regional Farmer Harvest Inflow Queue",
        inflow_desc: "Individual farmer batches awaiting quality verification and lot pooling",
        create_lot_title: "Assemble Commercial Lot",
        create_lot_desc: "Combine verified farmer produce into a unified, tradeable commercial lot",
        btn_create_lot: "Create Commercial Lot",
        manage_lots_title: "Active Commercial Lots & Allocations",
        manage_lots_desc: "Manage lot lifecycle, allocate farmer produce, and initiate buyer dispatches",

        // Buyer Portal
        buyer_hero_badge: "Institutional Procurement Desk",
        buyer_hero_title: "Certified Agricultural Commodities with Farm-Gate Provenance",
        buyer_hero_desc: "Procure verified, high-volume lots directly from regional FPOs with laboratory-grade computer vision verification and transparent tripartite escrow settlement.",
        post_request_title: "Broadcast Procurement Demand Order",
        post_request_desc: "Specify your required commodity, volume, quality parameters, and target price",
        marketplace_title: "Certified Commercial Lots Marketplace",
        marketplace_desc: "Browse verified, aggregated lots available for immediate contract execution",
        btn_procure_lot: "Procure via Smart Escrow",
        provenance_modal_title: "Farm-Gate Traceability Audit",

        // Procurement Centres Directory (All 28 States & 8 UTs)
        proc_centers_badge: "All-India Agricultural Infrastructure Directory",
        proc_centers_title: "Agricultural Procurement Centres & Mandis Across India",
        proc_centers_desc: "Explore verified procurement hubs, APMC wholesale mandis, FCI depots, and eNAM market yards across all 28 States and 8 Union Territories.",
        filter_state_all: "All States & Union Territories (36)",
        filter_district_all: "All Districts",
        filter_crop_all: "All Crops & Commodities",
        filter_type_all: "All Facility Types",
        search_centers_placeholder: "Search by center name, city, district, address...",
        view_grid: "Grid View",
        view_table: "Table View",
        col_center_name: "Procurement Centre Name",
        col_state_district: "State & District",
        col_type: "Facility Type",
        col_crops: "Supported Crops",
        col_status: "Operational Status",
        col_contact: "Contact & Hours",
        col_source: "Authority / Source",
        empty_centers: "No procurement centres match your selected filters. Try broadening your criteria.",
        verified_coverage_note: "Verified coverage across all 28 States & 8 Union Territories. Sourced from DMI (Agmarknet), FCI, and e-NAM.",

        // Agmarknet & Mandi
        mandi_title: "Wholesale Mandi Benchmark Prices",
        mandi_subtitle: "Official Government Minimum Support Prices (MSP 2026-27) & Live APMC Mandi Rates",
        query_mandi_btn: "Query Mandi Records",
        col_market: "Market (Mandi)",
        col_commodity: "Commodity",
        col_variety: "Variety",
        col_min: "Min Price (₹/Qtl)",
        col_max: "Max Price (₹/Qtl)",
        col_modal: "Modal Price (₹/Qtl)",
        col_msp: "Official MSP (₹/Qtl)",

        // Common Statuses
        status_pending: "Pending",
        status_review: "Under Review",
        status_accepted: "Accepted",
        status_rejected: "Rejected",
        status_open: "Open for Allocation",
        status_part_alloc: "Partially Allocated",
        status_full_alloc: "Fully Allocated",
        status_dispatch: "Ready for Dispatch",
        status_transit: "In Transit",
        status_delivered: "Delivered",
        status_completed: "Completed"
    },

    // --------------------------------------------------------
    // 2. HINDI (हिन्दी)
    // --------------------------------------------------------
    hi: {
        app_name: "एग्री-लिंक",
        app_tagline: "स्वायत्त कृषि गुणवत्ता एवं पारदर्शी खरीद नेटवर्क",
        switch_role: "भूमिका बदलें",
        logout: "लॉग आउट",
        language_select: "भाषा",
        select_language: "भाषा चुनें",
        
        nav_overview: "अवलोकन",
        nav_weather: "मौसम व कृषि सलाह",
        nav_scanner: "एआई फसल स्कैनर",
        nav_produce: "उपज पंजीकरण",
        nav_ledger: "मेरे यार्ड बैच",
        nav_allocations: "व्यापारिक लॉट",
        nav_earnings: "भुगतान व कमाई",
        nav_centers: "खरीद केंद्र निर्देशिका",
        nav_mandi: "लाइव मंडी भाव",
        nav_news: "कृषि समाचार",
        nav_flowchart: "प्रक्रिया प्रवाह",
        nav_inflow: "किसान आवक",
        nav_lots: "लॉट प्रबंधन",
        nav_buyer_orders: "खरीदार मांग",
        nav_marketplace: "व्यापारिक लॉट बाजार",
        nav_post_demand: "मांग अनुरोध भेजें",
        nav_matching: "स्मार्ट मिलान",
        nav_traceability: "मूल स्रोत सत्यापन",
        nav_spending: "खर्च विश्लेषण",

        auth_portal_title: "एग्री-लिंक सुरक्षित प्रवेश द्वार",
        auth_portal_subtitle: "अपने समर्पित वर्कस्टेशन में प्रवेश करने के लिए अपनी परिचालन भूमिका चुनें",
        auth_login_tab: "साइन इन करें",
        auth_register_tab: "नया खाता बनाएं",
        auth_email_or_phone: "ईमेल पता या मोबाइल नंबर",
        auth_email_placeholder: "उदा. farmer@agrilink.in या 9876543210",
        auth_password: "पासवर्ड",
        auth_password_placeholder: "अपना सुरक्षित पासवर्ड दर्ज करें",
        auth_confirm_password: "पासवर्ड की पुष्टि करें",
        auth_confirm_password_placeholder: "अपना पासवर्ड पुनः दर्ज करें",
        auth_full_name: "पूरा नाम / संस्था का नाम",
        auth_full_name_placeholder: "उदा. रमेश कुमार",
        auth_location: "जिला / क्षेत्र",
        auth_location_placeholder: "उदा. लुधियाना, पंजाब",
        auth_preferred_role: "परिचालन भूमिका",
        auth_btn_login: "वर्कस्टेशन में प्रवेश करें",
        auth_btn_register: "पंजीकरण करें और प्रवेश करें",
        auth_demo_header: "1-क्लिक डेमो लॉगिन:",
        demo_farmer: "🌾 डेमो किसान (रमेश कुमार)",
        demo_aggregator: "📦 डेमो एग्रीगेटर (मालवा एफपीओ)",
        demo_buyer: "🏢 डेमो खरीदार (एग्रोकॉर्प)",
        auth_role_farmer_desc: "सटीक मौसम सलाह, एआई फसल गुणवत्ता ग्रेडिंग, उपज पंजीकरण और पारदर्शी भुगतान बहीखाता।",
        auth_role_aggregator_desc: "क्षेत्रीय किसान उपज आवक, ग्रेडिंग अनुसार लॉट निर्माण, और थोक बाजार प्रेषण।",
        auth_role_buyer_desc: "प्रमाणित लॉट बाजार, स्वचालित मिलान प्रणाली, और पारदर्शी भुगतान चालान।",

        role_farmer: "किसान पोर्टल",
        role_aggregator: "एफपीओ एग्रीगेटर डेस्क",
        role_buyer: "संस्थागत खरीदार डेस्क",
        role_farmer_sub: "किसान गुणवत्ता एवं उचित मूल्य केंद्र",
        role_aggregator_sub: "क्षेत्रीय एफपीओ लॉट एकत्रीकरण व प्रमाणीकरण",
        role_buyer_sub: "संस्थागत थोक खरीद एवं निपटान इंजन",

        farmer_hero_badge: "किसान उत्पादक केंद्र",
        farmer_hero_title: "एआई ग्रेडिंग और उचित एमएसपी आश्वासन से किसानों का सशक्तिकरण",
        farmer_hero_desc: "बिचौलियों के शोषण को समाप्त करें। सटीक वैज्ञानिक गुणवत्ता विश्लेषण, पारदर्शी लॉट आवंटन और सीधे एमएसपी भुगतान के लिए अपनी फसल की फोटो अपलोड करें।",
        btn_scan_produce: "एआई गुणवत्ता जांच",
        btn_register_produce: "उपज पंजीकृत करें",

        weather_title: "लाइव कृषि मौसम केंद्र",
        weather_subtitle: "ओपन-मेटियो द्वारा संचालित रीयल-टाइम मौसम पूर्वानुमान एवं 7-दिवसीय वर्षा अनुमान",
        weather_search_btn: "पूर्वानुमान खोजें",
        weather_gps_btn: "मेरा वर्तमान स्थान (GPS)",
        spray_advisory: "कीटनाशक छिड़काव सलाह",
        irrigation_advisory: "सिंचाई समय खिड़की",
        harvest_advisory: "कटाई सुरक्षा सलाह",

        scanner_title: "स्वायत्त एआई फसल गुणवत्ता एवं दोष स्कैनर",
        scanner_subtitle: "सरकारी एगमार्क (AGMARK) मानकों के अनुरूप बहु-मॉडल डीप लर्निंग विश्लेषण",
        drop_zone_heading: "अनाज की फोटो यहाँ खींचकर छोड़ें",
        drop_zone_sub: "या कैमरा द्वारा फोटो लें (JPG, PNG, WEBP समर्थित)",
        quick_samples: "त्वरित परीक्षण नमूने:",
        inspecting_text: "एआई गुणवत्ता की जांच कर रहा है...",
        btn_use_scan: "इस ग्रेड को मेरे उपज पंजीकरण में उपयोग करें",
        disqualified_notice: "उपज अयोग्य: कीट क्षति या नमी सीमा सरकारी मानकों से अधिक है।",

        produce_reg_title: "एफपीओ लॉट के लिए सत्यापित उपज पंजीकृत करें",
        produce_reg_desc: "न्यूनतम समर्थन मूल्य (MSP) गारंटी के साथ अपनी फसल को एफपीओ लॉट एकत्रीकरण में जमा करें।",
        crop_type: "फसल का प्रकार",
        variety: "अनाज की किस्म",
        quantity_qtl: "मात्रा (क्विंटल - 1 क्विंटल = 100 किग्रा)",
        yard_location: "मंडी यार्ड / डिपो स्थान",
        btn_submit_produce: "एमएसपी गारंटी के साथ उपज दर्ज करें",

        ledger_title: "किसान उपज बहीखाता एवं स्थिति",
        ledger_desc: "मंडी यार्डों में जमा किए गए सभी अनाज बैचों की लाइव स्थिति",
        allocations_title: "व्यापारिक लॉट आवंटन एवं स्रोत",
        allocations_desc: "देखें कि आपकी फसल किस एफपीओ लॉट में जोड़ी गई है और खरीदार प्रेषण स्थिति",
        earnings_title: "किसान कमाई एवं प्रत्यक्ष भुगतान बहीखाता",
        earnings_desc: "बिना किसी आढ़ती/कमीशन कटौती के बैंक खाते में सीधा भुगतान",

        agg_hero_badge: "एफपीओ एग्रीगेटर एवं व्यापार डेस्क",
        agg_hero_title: "क्षेत्रीय सहकारी लॉट पूलिंग एवं थोक आपूर्ति",
        agg_hero_desc: "छोटे किसानों की उपज को प्रमाणित उच्च-मात्रा वाले व्यापारिक लॉट में संयोजित करें।",
        inflow_title: "क्षेत्रीय किसान उपज आवक कतार",
        inflow_desc: "सत्यापन एवं लॉट एकत्रीकरण की प्रतीक्षा कर रहे किसान बैच",
        create_lot_title: "नया व्यापारिक लॉट बनाएं",
        create_lot_desc: "सत्यापित किसान उपज को एक व्यापारिक लॉट में जोड़ें",
        btn_create_lot: "व्यापारिक लॉट तैयार करें",
        manage_lots_title: "सक्रिय व्यापारिक लॉट एवं आवंटन",
        manage_lots_desc: "लॉट स्थिति प्रबंधित करें और खरीदार को प्रेषण शुरू करें",

        buyer_hero_badge: "संस्थागत खरीद डेस्क",
        buyer_hero_title: "पूर्ण स्रोत सत्यापन के साथ प्रमाणित कृषि उपज की खरीद",
        buyer_hero_desc: "बिचौलियों के बिना सीधे एफपीओ से उच्च गुणवत्ता वाले लॉट खरीदें।",
        post_request_title: "फसल खरीद मांग आदेश जारी करें",
        post_request_desc: "अपनी आवश्यक फसल, मात्रा, गुणवत्ता विनिर्देश और लक्षित मूल्य दर्ज करें",
        marketplace_title: "प्रमाणित व्यापारिक लॉट बाजार",
        marketplace_desc: "अनुबंध निष्पादन के लिए उपलब्ध प्रमाणित लॉट देखें",
        btn_procure_lot: "एस्क्रो द्वारा सुरक्षित खरीद करें",
        provenance_modal_title: "खेत-से-बाजार स्रोत सत्यापन ऑडिट",

        proc_centers_badge: "अखिल भारतीय कृषि अवसंरचना निर्देशिका",
        proc_centers_title: "भारत भर के कृषि खरीद केंद्र एवं मंडियां",
        proc_centers_desc: "सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में फैले सत्यापित खरीद केंद्रों, एपीएमसी मंडियों और एफसीआई डिपो का अन्वेषण करें।",
        filter_state_all: "सभी राज्य एवं केंद्र शासित प्रदेश (36)",
        filter_district_all: "सभी जिले",
        filter_crop_all: "सभी फसलें व जिंस",
        filter_type_all: "सभी केंद्र प्रकार",
        search_centers_placeholder: "केंद्र का नाम, शहर, जिला या पते से खोजें...",
        view_grid: "ग्रिड दृश्य",
        view_table: "तालिका दृश्य",
        col_center_name: "खरीद केंद्र का नाम",
        col_state_district: "राज्य व जिला",
        col_type: "केंद्र प्रकार",
        col_crops: "स्वीकृत फसलें",
        col_status: "परिचालन स्थिति",
        col_contact: "संपर्क व समय",
        col_source: "स्रोत प्राधिकरण",
        empty_centers: "चयनित फिल्टर से कोई खरीद केंद्र नहीं मिला। कृपया अन्य विकल्प चुनें।",
        verified_coverage_note: "सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में सत्यापित कवरेज। स्रोत: DMI (Agmarknet), FCI और e-NAM।",

        mandi_title: "थोक मंडी मानक भाव",
        mandi_subtitle: "आधिकारिक सरकारी न्यूनतम समर्थन मूल्य (MSP 2026-27) एवं लाइव एपीएमसी मंडी दरें",
        query_mandi_btn: "मंडी रिकॉर्ड खोजें",
        col_market: "मंडी (बाजार)",
        col_commodity: "जिंस (फसल)",
        col_variety: "किस्म",
        col_min: "न्यूनतम भाव (₹/क्विंटल)",
        col_max: "अधिकतम भाव (₹/क्विंटल)",
        col_modal: "मॉडल भाव (₹/क्विंटल)",
        col_msp: "सरकारी एमएसपी (₹/क्विंटल)",

        status_pending: "लंबित",
        status_review: "समीक्षाधीन",
        status_accepted: "स्वीकृत",
        status_rejected: "अस्वीकृत",
        status_open: "आवंटन हेतु खुला",
        status_part_alloc: "आंशिक आवंटित",
        status_full_alloc: "पूर्ण आवंटित",
        status_dispatch: "प्रेषण हेतु तैयार",
        status_transit: "परिवहन में",
        status_delivered: "वितरित",
        status_completed: "पूर्ण"
    },

    // --------------------------------------------------------
    // 3. MARATHI (मराठी) - Specifically highlighted in user request!
    // --------------------------------------------------------
    mr: {
        app_name: "अ‍ॅग्री-लिंक",
        app_tagline: "स्वायत्त कृषी गुणवत्ता व पारदर्शक खरेदी नेटवर्क",
        switch_role: "भूमिका बदला",
        logout: "बाहेर पडा (Logout)",
        language_select: "भाषा",
        select_language: "भाषा निवडा / Select Language",
        
        nav_overview: "आढावा",
        nav_weather: "हवामान व सल्ला",
        nav_scanner: "एआय पीक स्कॅनर",
        nav_produce: "माल नोंदणी",
        nav_ledger: "माझ्या यार्ड बॅचेस",
        nav_allocations: "व्यापारी लॉट्स",
        nav_earnings: "पेआउट्स व कमाई",
        nav_centers: "खरेदी केंद्र निर्देशिका",
        nav_mandi: "थेट बाजारभाव",
        nav_news: "कृषी वार्ता",
        nav_flowchart: "प्रक्रिया प्रवाह",
        nav_inflow: "शेतकरी आवक",
        nav_lots: "लॉट व्यवस्थापन",
        nav_buyer_orders: "खरेदीदार मागणी",
        nav_marketplace: "व्यापारी लॉट्स बाजार",
        nav_post_demand: "मागणी नोंदवा",
        nav_matching: "स्मार्ट मॅचिंग",
        nav_traceability: "मूळ स्त्रोत पडताळणी",
        nav_spending: "खर्च विश्लेषण",
        nav_login_page: "लॉगिन पृष्ठ",

        auth_portal_title: "अ‍ॅग्री-लिंक सुरक्षित प्रवेश पोर्टल",
        auth_portal_subtitle: "आपल्या समर्पित कार्यकक्षेत प्रवेश करण्यासाठी आपली भूमिका निवडा",
        auth_login_tab: "साइन इन करा",
        auth_register_tab: "नवीन खाते तयार करा",
        auth_email_or_phone: "ईमेल किंवा मोबाइल नंबर",
        auth_email_placeholder: "उदा. farmer@agrilink.in किंवा 9876543210",
        auth_password: "पासवर्ड",
        auth_password_placeholder: "सुरक्षित पासवर्ड टाका",
        auth_confirm_password: "पासवर्ड पुन्हा टाका",
        auth_confirm_password_placeholder: "पासवर्डची पुष्टी करा",
        auth_full_name: "पूर्ण नाव / संस्थेचे नाव",
        auth_full_name_placeholder: "उदा. रमेश कुमार / शेतकरी गट",
        auth_location: "जिल्हा / परिसर",
        auth_location_placeholder: "उदा. नाशिक, महाराष्ट्र",
        auth_preferred_role: "कार्यकारी भूमिका",
        auth_btn_login: "पोर्टलमध्ये प्रवेश करा",
        auth_btn_register: "नोंदणी करा व प्रवेश करा",
        auth_demo_header: "१-क्लिक डेमो लॉगिन:",
        demo_farmer: "🌾 डेमो शेतकरी (रमेश कुमार)",
        demo_aggregator: "📦 डेमो अ‍ॅग्रिगेटर (मालवा एफपीओ)",
        demo_buyer: "🏢 डेमो खरेदीदार (अ‍ॅग्रोकॉर्प)",
        auth_role_farmer_desc: "थेट कृषी हवामान अंदाज, एआय पीक प्रतवारी, माल नोंदणी आणि हमीभाव पेआउट खातेवही.",
        auth_role_aggregator_desc: "शेतकरी आवक संकलन, प्रतवारीनुसार लॉट निर्मिती आणि घाऊक बाजारपेठ प्रेषण.",
        auth_role_buyer_desc: "प्रमाणित लॉट्स खरेदी, थेट शेतकरी स्त्रोत पडताळणी आणि सुरक्षित व्यवहार.",

        role_farmer: "शेतकरी पोर्टल",
        role_aggregator: "एफपीओ अ‍ॅग्रिगेटर डेस्क",
        role_buyer: "संस्थात्मक खरेदीदार डेस्क",
        role_farmer_sub: "शेतकरी गुणवत्ता व रास्त बाजारपेठ केंद्र",
        role_aggregator_sub: "प्रादेशिक एफपीओ लॉट एकत्रीकरण व प्रमाणीकरण",
        role_buyer_sub: "घाऊक खरेदी व सुरक्षित देयक प्रणाली",

        farmer_hero_badge: "शेतकरी उत्पादक केंद्र",
        farmer_hero_title: "एआय प्रतवारी आणि रास्त हमीभावासह शेतकऱ्यांचे सक्षमीकरण",
        farmer_hero_desc: "दलालांचे शोषण थांबवा. अचूक वैज्ञानिक गुणवत्ता तपासणी, पारदर्शक लॉट वाटप आणि थेट हमीभावासाठी आपल्या धान्याचा फोटो अपलोड करा.",
        btn_scan_produce: "एआय गुणवत्ता तपासणी",
        btn_register_produce: "मालाची नोंदणी करा",

        weather_title: "थेट कृषी हवामान केंद्र",
        weather_subtitle: "ओपन-मेटिओद्वारे रिअल-टाइम हवामान अंदाज आणि ७ दिवसांचा पाऊस अंदाज",
        weather_search_btn: "हवामान शोधा",
        weather_gps_btn: "माझे चालू स्थान (GPS)",
        spray_advisory: "औषध फवारणी सल्ला",
        irrigation_advisory: "पाणी व्यवस्थापन",
        harvest_advisory: "कापणी संरक्षण सल्ला",

        scanner_title: "स्वयंचलित एआय पीक प्रतवारी व दोष स्कॅनर",
        scanner_subtitle: "शासकीय अ‍ॅगमार्क (AGMARK) मानकांनुसार डीप लर्निंग संगणकीय विश्लेषण",
        drop_zone_heading: "धान्याचा फोटो येथे ड्रॅग करून टाका",
        drop_zone_sub: "किंवा कॅमेऱ्याने फोटो काढा (JPG, PNG, WEBP समर्थित)",
        quick_samples: "चाचणी नमुने:",
        inspecting_text: "एआय तपासणी सुरू आहे...",
        btn_use_scan: "हा ग्रेड माझ्या नोंदणीत वापरा",
        disqualified_notice: "माल अपात्र: कीड किंवा ओलावा प्रमाण शासकीय मानकांपेक्षा जास्त आहे.",

        produce_reg_title: "एफपीओ लॉटसाठी प्रमाणित मालाची नोंदणी",
        produce_reg_desc: "किमान हमीभाव (MSP) सुरक्षिततेसह आपला माल एफपीओ संकलन केंद्रावर नोंदवा.",
        crop_type: "पिकाचा प्रकार",
        variety: "वाण / जात",
        quantity_qtl: "प्रमाण (क्विंटल - १ क्विंटल = १०० किलो)",
        yard_location: "मंडी यार्ड / केंद्र",
        btn_submit_produce: "हमीभावासह माल नोंदवा",

        ledger_title: "शेतकरी माल नोंदवही व सद्यस्थिती",
        ledger_desc: "संकलन केंद्रावर नोंदवलेल्या धान्याची थेट स्थिती",
        allocations_title: "व्यापारी लॉट वाटप व पारदर्शकता",
        allocations_desc: "आपला माल कोणत्या व्यापारी लॉटमध्ये जोडला गेला आहे ते तपासा",
        earnings_title: "शेतकरी उत्पन्न व थेट बँक खात्यात पेआउट",
        earnings_desc: "कोणतीही दलाली किंवा कमिशन कपात न करता थेट मोबदला",

        agg_hero_badge: "एफपीओ अ‍ॅग्रिगेटर व व्यापार डेस्क",
        agg_hero_title: "प्रादेशिक सहकारी लॉट एकत्रीकरण व पुरवठा",
        agg_hero_desc: "अनेक लहान शेतकऱ्यांचा माल प्रमाणित मोठ्या व्यापारी लॉटमध्ये रूपांतरित करा.",
        inflow_title: "शेतकरी माल आवक रांग",
        inflow_desc: "तपासणी व लॉट वाटपाची वाट पाहत असलेल्या शेतकऱ्यांच्या नोंदी",
        create_lot_title: "नवीन व्यापारी लॉट तयार करा",
        create_lot_desc: "सत्यापित शेतकरी मालाचा एक मोठा व्यापारी लॉट तयार करा",
        btn_create_lot: "लॉट तयार करा",
        manage_lots_title: "सक्रिय व्यापारी लॉट्स",
        manage_lots_desc: "लॉट स्थिती अद्ययावत करा आणि खरेदीदाराकडे पाठवा",

        buyer_hero_badge: "संस्थात्मक खरेदीदार डेस्क",
        buyer_hero_title: "थेट शेतकरी स्त्रोत पडताळणीसह प्रमाणित कृषी माल खरेदी",
        buyer_hero_desc: "दलालांशिवाय थेट एफपीओकडून उच्च दर्जाचा माल खरेदी करा.",
        post_request_title: "खरेदी मागणी नोंदवा",
        post_request_desc: "हवे असलेले पीक, प्रमाण, गुणवत्ता निकष आणि दर नोंदवा",
        marketplace_title: "प्रमाणित व्यापारी लॉट्स बाजारपेठ",
        marketplace_desc: "खरेदीसाठी उपलब्ध प्रमाणित लॉट्स पहा",
        btn_procure_lot: "एस्क्रोद्वारे सुरक्षित खरेदी करा",
        provenance_modal_title: "शेतकरी मूळ स्त्रोत पडताळणी ऑडिट",

        proc_centers_badge: "अखिल भारतीय कृषी पायाभूत सुविधा निर्देशिका",
        proc_centers_title: "भारतातील कृषी खरेदी केंद्रे व बाजार समित्या (APMC)",
        proc_centers_desc: "भारतातील सर्व २८ राज्ये व ८ केंद्रशासित प्रदेशांमधील अधिकृत खरेदी केंद्रे, कृषी उत्पन्न बाजार समित्या (APMC) आणि एफसीआय गोदामांची माहिती.",
        filter_state_all: "सर्व राज्ये व केंद्रशासित प्रदेश (३६)",
        filter_district_all: "सर्व जिल्हे",
        filter_crop_all: "सर्व पिके व धान्ये",
        filter_type_all: "सर्व केंद्र प्रकार",
        search_centers_placeholder: "केंद्राचे नाव, शहर, जिल्हा किंवा पत्त्यावरून शोधा...",
        view_grid: "कार्ड दृश्य",
        view_table: "तक्ता दृश्य",
        col_center_name: "खरेदी केंद्राचे नाव",
        col_state_district: "राज्य व जिल्हा",
        col_type: "केंद्र प्रकार",
        col_crops: "स्वीकृत पिके",
        col_status: "कार्यरत स्थिती",
        col_contact: "संपर्क व वेळ",
        col_source: "माहिती स्त्रोत प्राधिकरण",
        empty_centers: "निवडलेल्या फिल्टरनुसार कोणतेही खरेदी केंद्र सापडले नाही.",
        verified_coverage_note: "सर्व २८ राज्ये आणि ८ केंद्रशासित प्रदेशांमध्ये अधिकृत कव्हरेज. स्त्रोत: DMI (Agmarknet), FCI आणि e-NAM.",

        mandi_title: "घाऊक बाजारभाव व हमीभाव दर",
        mandi_subtitle: "अधिकृत शासकीय किमान हमीभाव (MSP 2026-27) व थेट कृषी उत्पन्न बाजार समिती दर",
        query_mandi_btn: "बाजारभाव शोधा",
        col_market: "बाजार समिती (मंडी)",
        col_commodity: "पीक / जिन्नस",
        col_variety: "जात / वाण",
        col_min: "किमान दर (₹/क्विंटल)",
        col_max: "कमाल दर (₹/क्विंटल)",
        col_modal: "सरासरी भाव (₹/क्विंटल)",
        col_msp: "शासकीय हमीभाव (₹/क्विंटल)",

        status_pending: "प्रलंबित",
        status_review: "तपासणी सुरू",
        status_accepted: "मंजूर",
        status_rejected: "नाकारले",
        status_open: "वाटपासाठी खुले",
        status_part_alloc: "अंशतः वाटप",
        status_full_alloc: "पूर्ण वाटप",
        status_dispatch: "पाठवण्यासाठी सज्ज",
        status_transit: "मार्गावर",
        status_delivered: "पोहोचवले",
        status_completed: "पूर्ण"
    },

    // --------------------------------------------------------
    // 4. TELUGU (తెలుగు)
    // --------------------------------------------------------
    te: {
        app_name: "అగ్రి-లింక్",
        app_tagline: "స్వయంప్రతిపత్తి కలిగిన వ్యవసాయ నాణ్యత & న్యాయమైన వ్యాపార వేదిక",
        switch_role: "పాత్రను మార్చండి",
        logout: "లాగ్ అవుట్",
        language_select: "భాష",
        select_language: "భాషను ఎంచుకోండి",

        nav_overview: "అవలోకనం",
        nav_weather: "వాతావరణం & సలహాలు",
        nav_scanner: "AI పంట స్కానర్",
        nav_produce: "దిగుబడి నమోదు",
        nav_ledger: "నా పంట నిల్వలు",
        nav_allocations: "వాణిజ్య లాట్లు",
        nav_earnings: "చెల్లింపులు & సంపాదన",
        nav_centers: "కొనుగోలు కేంద్రాల డైరెక్టరీ",
        nav_mandi: "మార్కెట్ ధరలు",
        nav_news: "వ్యవసాయ వార్తలు",
        nav_flowchart: "ప్రక్రియ ప్రవాహం",
        nav_inflow: "రైతు రాకలు",
        nav_lots: "లాట్ నిర్వహణ",
        nav_buyer_orders: "కొనుగోలుదారుల డిమాండ్",
        nav_marketplace: "వాణిజ్య లాట్ల మార్కెట్",
        nav_post_demand: "కొనుగోలు ఆర్డర్ ఇవ్వండి",
        nav_matching: "స్మార్ట్ సరిపోలిక",
        nav_traceability: "రైతు మూలాల ఆడిట్",
        nav_spending: "ఖర్చుల విశ్లేషణ",

        auth_portal_title: "అగ్రి-లింక్ సురక్షిత ప్రవేశ ద్వారం",
        auth_portal_subtitle: "మీ సంబంధిత వర్క్‌స్టేషన్‌లోకి ప్రవేశించడానికి మీ పాత్రను ఎంచుకోండి",
        auth_login_tab: "సైన్ ఇన్ చేయండి",
        auth_register_tab: "కొత్త ఖాతాను సృష్టించండి",
        auth_email_or_phone: "ఈమెయిల్ లేదా మొబైల్ నంబర్",
        auth_email_placeholder: "ఉదా. farmer@agrilink.in లేదా 9876543210",
        auth_password: "పాస్‌వర్డ్",
        auth_password_placeholder: "మీ పాస్‌వర్డ్ నమోదు చేయండి",
        auth_confirm_password: "పాస్‌వర్డ్ నిర్ధారణ",
        auth_confirm_password_placeholder: "పాస్‌వర్డ్‌ను మళ్లీ నమోదు చేయండి",
        auth_full_name: "పూర్తి పేరు / సంస్థ పేరు",
        auth_full_name_placeholder: "ఉదా. రమేష్ కుమార్",
        auth_location: "జిల్లా / ప్రాంతం",
        auth_location_placeholder: "ఉదా. గుంటూరు, ఆంధ్రప్రదేశ్",
        auth_preferred_role: "కార్యాచరణ పాత్ర",
        auth_btn_login: "వర్క్‌స్టేషన్‌లోకి ప్రవేశించండి",
        auth_btn_register: "నమోదు చేసుకొని ప్రవేశించండి",
        auth_demo_header: "1-క్లిక్ డెమో లాగిన్:",
        demo_farmer: "🌾 డెమో రైతు (రమేష్ కుమార్)",
        demo_aggregator: "📦 డెమో అగ్రిగేటర్ (మాల్వా ఎఫ్‌పీఓ)",
        demo_buyer: "🏢 డెమో కొనుగోలుదారు (ఆగ్రోకార్ప్)",
        auth_role_farmer_desc: "నిజ సమయ వాతావరణం, AI పంట గ్రేడింగ్, దిగుబడి నమోదు మరియు కనీస మద్దతు ధర (MSP) చెల్లింపులు.",
        auth_role_aggregator_desc: "ప్రాంతీయ రైతుల పంట రాకలు, లాట్ పూలింగ్ మరియు మార్కెట్ సరఫరా.",
        auth_role_buyer_desc: "ధృవీకరించబడిన లాట్ల మార్కెట్, రైతు మూలాల పారదర్శకత మరియు సురక్షిత చెల్లింపులు.",

        role_farmer: "రైతు పోర్టల్",
        role_aggregator: "ఎఫ్‌పీఓ అగ్రిగేటర్ డెస్క్",
        role_buyer: "సంస్థాగత కొనుగోలుదారు డెస్క్",
        role_farmer_sub: "రైతు నాణ్యత & న్యాయమైన మార్కెట్ కేంద్రం",
        role_aggregator_sub: "ప్రాంతీయ ఎఫ్‌పీఓ లాట్ పూలింగ్ & ధృవీకరణ",
        role_buyer_sub: "మొత్తం కొనుగోలు & సురక్షిత పరిష్కార వేదిక",

        farmer_hero_badge: "రైతు ఉత్పత్తి కేంద్రం",
        farmer_hero_title: "AI గ్రేడింగ్ మరియు హామీ ఇవ్వబడిన MSP ధరతో రైతులకు సాధికారత",
        farmer_hero_desc: "దళారుల దోపిడీని అరికట్టండి. శాస్త్రీయ నాణ్యత విశ్లేషణ, లాట్ కేటాయింపు మరియు ప్రత్యక్ష MSP చెల్లింపుల కోసం మీ పంట ఫోటోను అప్‌లోడ్ చేయండి.",
        btn_scan_produce: "AI నాణ్యత స్కానింగ్",
        btn_register_produce: "దిగుబడి నమోదు చేయండి",

        weather_title: "ప్రత్యక్ష వ్యవసాయ వాతావరణ కేంద్రం",
        weather_subtitle: "ఓపెన్-మెటియో ద్వారా అందించబడే నిజ సమయ వాతావరణం మరియు 7 రోజుల వర్ష సూచన",
        weather_search_btn: "వాతావరణం చూడండి",
        weather_gps_btn: "నా ప్రస్తుత స్థానం (GPS)",
        spray_advisory: "పురుగుమందుల పిచికారీ సలహా",
        irrigation_advisory: "నీటిపారుదల సమయం",
        harvest_advisory: "కోత రక్షణ సలహా",

        scanner_title: "AI పంట నాణ్యత మరియు లోపాల స్కానర్",
        scanner_subtitle: "భారత ప్రభుత్వ AGMARK ప్రమాణాలకు అనుగుణంగా కంప్యూటర్ విజన్ విశ్లేషణ",
        drop_zone_heading: "ధాన్యం ఫోటోను ఇక్కడ లాగి వదలండి",
        drop_zone_sub: "లేదా కెమెరా ద్వారా ఫోటో తీయండి (JPG, PNG మద్దతు)",
        quick_samples: "శాంపిల్ నమూనాలు:",
        inspecting_text: "AI నాణ్యతను పరీక్షిస్తోంది...",
        btn_use_scan: "ఈ గ్రేడ్‌ను నా దిగుబడి నమోదులో ఉపయోగించండి",
        disqualified_notice: "దిగుబడి అనర్హమైనది: పురుగు తెగులు లేదా తేమ శాతం అనుమతించబడిన పరిమితిని మించింది.",

        proc_centers_badge: "అఖిల భారత వ్యవసాయ మౌలిక సదుపాయాల డైరెక్టరీ",
        proc_centers_title: "భారతదేశం అంతటా వ్యవసాయ కొనుగోలు కేంద్రాలు & మార్కెట్ యార్డులు",
        proc_centers_desc: "అన్ని 28 రాష్ట్రాలు మరియు 8 కేంద్రపాలిత ప్రాంతాలలో విస్తరించి ఉన్న అధీకృత కొనుగోలు కేంద్రాలు, APMC మార్కెట్లు మరియు FCI డిపోలు.",
        filter_state_all: "అన్ని రాష్ట్రాలు & కేంద్రపాలిత ప్రాంతాలు (36)",
        filter_district_all: "అన్ని జిల్లాలు",
        filter_crop_all: "అన్ని పంటలు",
        filter_type_all: "అన్ని కేంద్ర రకాలు",
        search_centers_placeholder: "కేంద్రం పేరు, నగరం, జిల్లా లేదా చిరునామా ద్వారా వెతకండి...",
        view_grid: "గ్రిడ్ వీక్షణ",
        view_table: "పట్టిక వీక్షణ",
        col_center_name: "కొనుగోలు కేంద్రం పేరు",
        col_state_district: "రాష్ట్రం & జిల్లా",
        col_type: "కేంద్రం రకం",
        col_crops: "స్వీకరించే పంటలు",
        col_status: "కార్యాచరణ స్థితి",
        col_contact: "సంప్రదింపు వివరాలు",
        col_source: "సమాచార మూలం",
        empty_centers: "ఎంచుకున్న ఫిల్టర్‌లకు సరిపోలే కేంద్రాలు ఏవీ కనుగొనబడలేదు.",
        verified_coverage_note: "అన్ని 28 రాష్ట్రాలు మరియు 8 కేంద్రపాలిత ప్రాంతాలలో ధృవీకరించబడిన సమాచారం.",

        mandi_title: "హోల్‌సేల్ మార్కెట్ ధరలు & ప్రభుత్వ MSP",
        mandi_subtitle: "అధికారిక కనీస మద్దతు ధరలు (MSP 2026-27) మరియు APMC మార్కెట్ ధరలు",
        query_mandi_btn: "మార్కెట్ రికార్డులను శోధించండి",
        col_market: "మార్కెట్ యార్డ్ (మండి)",
        col_commodity: "పంట రకం",
        col_variety: "రకం",
        col_min: "కనిష్ట ధర (₹/క్వింటా)",
        col_max: "గరిష్ట ధర (₹/క్వింటా)",
        col_modal: "సగటు మోడల్ ధర (₹/క్వింటా)",
        col_msp: "ప్రభుత్వ MSP (₹/క్వింటా)",

        status_pending: "పెండింగ్‌లో ఉంది",
        status_review: "సమీక్షలో ఉంది",
        status_accepted: "ఆమోదించబడింది",
        status_rejected: "తిరస్కరించబడింది",
        status_open: "కేటాయింపుకు సిద్ధం",
        status_part_alloc: "పాక్షికంగా కేటాయించబడింది",
        status_full_alloc: "పూర్తిగా కేటాయించబడింది",
        status_dispatch: "రవాణాకు సిద్ధంగా ఉంది",
        status_transit: "రవాణాలో ఉంది",
        status_delivered: "చేరవేయబడింది",
        status_completed: "పూర్తయింది"
    },

    // --------------------------------------------------------
    // 5. TAMIL (தமிழ்)
    // --------------------------------------------------------
    ta: {
        app_name: "அக்ரி-லிங்க்",
        app_tagline: "தன்னாட்சி வேளாண்மைத் தரம் மற்றும் நியாயமான வர்த்தக நெட்வொர்க்",
        switch_role: "பங்கு மாற்றம்",
        logout: "வெளியேறு (Logout)",
        language_select: "மொழி",
        select_language: "மொழியைத் தேர்ந்தெடுக்கவும்",

        nav_overview: "மேலோட்டம்",
        nav_weather: "வானிலை & வழிகாட்டுதல்",
        nav_scanner: "AI பயிர் ஸ்கேனர்",
        nav_produce: "விளைச்சல் பதிவு",
        nav_ledger: "எனது பயிர் இருப்பு",
        nav_allocations: "வணிக லாட்கள்",
        nav_earnings: "வருவாய் & பணம்",
        nav_centers: "கொள்முதல் மையங்கள்",
        nav_mandi: "சந்தை நிலவரம்",
        nav_news: "வேளாண் செய்திகள்",
        nav_flowchart: "செயல்முறை ஓட்டம்",
        nav_inflow: "விவசாயிகள் வரத்து",
        nav_lots: "லாட் மேலாண்மை",
        nav_buyer_orders: "வாங்குபவர் தேவை",
        nav_marketplace: "வணிகச் சந்தை",
        nav_post_demand: "தேவை பதிவு",
        nav_matching: "ஸ்மார்ட் பொருத்தம்",
        nav_traceability: "மூலத் தணிக்கை",
        nav_spending: "செலவு பகுப்பாய்வு",

        auth_portal_title: "அக்ரி-லிங்க் பாதுகாப்பான நுழைவு வாயில்",
        auth_portal_subtitle: "உங்கள் பிரத்யேக தளத்தில் நுழைய உங்கள் பொறுப்பைத் தேர்ந்தெடுக்கவும்",
        auth_login_tab: "உள்நுழைவு",
        auth_register_tab: "புதிய கணக்கு உருவாக்கு",
        auth_email_or_phone: "மின்னஞ்சல் அல்லது மொபைல் எண்",
        auth_password: "கடவுச்சொல்",
        auth_full_name: "முழுப் பெயர் / நிறுவனத்தின் பெயர்",
        auth_location: "மாவட்டம் / இருப்பிடம்",
        auth_preferred_role: "செயல்பாட்டுப் பொறுப்பு",
        auth_btn_login: "தளத்தில் நுழையவும்",
        auth_btn_register: "பதிவு செய்து நுழையவும்",
        demo_farmer: "🌾 மாதிரி விவசாயி",
        demo_aggregator: "📦 மாதிரி திரட்டுநர்",
        demo_buyer: "🏢 மாதிரி வாங்குபவர்",

        role_farmer: "விவசாயிகள் தளம்",
        role_aggregator: "FPO திரட்டுநர் தளம்",
        role_buyer: "நிறுவன வாங்குபவர் தளம்",
        role_farmer_sub: "விவசாயிகள் தரம் மற்றும் நியாய விலை மையம்",

        farmer_hero_title: "AI தர நிர்ணயம் மற்றும் MSP மூலம் விவசாயிகளுக்கு அதிகாரமளித்தல்",
        farmer_hero_desc: "இடைத்தரகர்கள் சுரண்டலைத் தடுக்கவும். தானியப் புகைப்படத்தைப் பதிவேற்றி அறிவியல் பூர்வமான தரம் மற்றும் நியாயமான MSP பெறவும்.",
        btn_scan_produce: "AI தர ஆய்வு",
        btn_register_produce: "விளைச்சலை பதிவு செய்",

        weather_title: "நேரலை வேளாண் வானிலை மையம்",
        scanner_title: "AI பயிர் தரம் மற்றும் குறைபாடு ஸ்கேனர்",
        proc_centers_title: "இந்தியா முழுவதிலும் உள்ள வேளாண் கொள்முதல் மையங்கள் & சந்தைகள்",
        filter_state_all: "அனைத்து மாநிலங்கள் & யூனியன் பிரதேசங்கள் (36)",
        filter_district_all: "அனைத்து மாவட்டங்கள்",
        filter_crop_all: "அனைத்து பயிர்கள்",
        filter_type_all: "அனைத்து மைய வகைகள்",
        mandi_title: "மொத்த விற்பனை சந்தை விலைகள் & அரசு MSP",
        status_pending: "நிலுவையில்",
        status_accepted: "ஏற்றுக்கொள்ளப்பட்டது",
        status_rejected: "நிராகரிக்கப்பட்டது",
        status_completed: "முடிந்தது"
    },

    // --------------------------------------------------------
    // 6. PUNJABI (ਪੰਜਾਬੀ)
    // --------------------------------------------------------
    pa: {
        app_name: "ਐਗਰੀ-ਲਿੰਕ",
        app_tagline: "ਖੁਦਮੁਖਤਿਆਰ ਖੇਤੀਬਾੜੀ ਗੁਣਵੱਤਾ ਅਤੇ ਪਾਰਦਰਸ਼ੀ ਖਰੀਦ ਨੈੱਟਵਰਕ",
        switch_role: "ਭੂਮਿਕਾ ਬਦਲੋ",
        logout: "ਲਾਗ ਆਉਟ",
        language_select: "ਭਾਸ਼ਾ",
        select_language: "ਭਾਸ਼ਾ ਚੁਣੋ",

        nav_overview: "ਸੰਖੇਪ",
        nav_weather: "ਮੌਸਮ ਤੇ ਸਲਾਹ",
        nav_scanner: "ਏਆਈ ਫਸਲ ਸਕੈਨਰ",
        nav_produce: "ਫਸਲ ਦਰਜ ਕਰੋ",
        nav_ledger: "ਮੇਰੇ ਯਾਰਡ ਬੈਚ",
        nav_allocations: "ਵਪਾਰਕ ਲਾਟ",
        nav_earnings: "ਭੁਗਤਾਨ ਤੇ ਕਮਾਈ",
        nav_centers: "ਖਰੀਦ ਕੇਂਦਰ ਸੂਚੀ",
        nav_mandi: "ਮੰਡੀ ਦੇ ਭਾਅ",
        nav_news: "ਖੇਤੀ ਖ਼ਬਰਾਂ",
        nav_flowchart: "ਪ੍ਰਕਿਰਿਆ ਪ੍ਰਵਾਹ",
        nav_inflow: "ਕਿਸਾਨ ਆਮਦ",
        nav_lots: "ਲਾਟ ਪ੍ਰਬੰਧਨ",
        nav_buyer_orders: "ਖਰੀਦਦਾਰ ਮੰਗ",
        nav_marketplace: "ਵਪਾਰਕ ਲਾਟ ਮੰਡੀ",
        nav_post_demand: "ਮੰਗ ਆਰਡਰ ਭੇਜੋ",
        nav_matching: "ਸਮਾਰਟ ਮਿਲਾਨ",
        nav_traceability: "ਸਰੋਤ ਪੜਤਾਲ",
        nav_spending: "ਖਰਚਾ ਵਿਸ਼ਲੇਸ਼ਣ",

        auth_portal_title: "ਐਗਰੀ-ਲਿੰਕ ਸੁਰੱਖਿਅਤ ਪੋਰਟਲ",
        auth_portal_subtitle: "ਆਪਣੇ ਵਰਕਸਟੇਸ਼ਨ ਵਿੱਚ ਦਾਖਲ ਹੋਣ ਲਈ ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ",
        auth_login_tab: "ਸਾਈਨ ਇਨ ਕਰੋ",
        auth_register_tab: "ਨਵਾਂ ਖਾਤਾ ਬਣਾਓ",
        auth_email_or_phone: "ਈਮੇਲ ਜਾਂ ਮੋਬਾਈਲ ਨੰਬਰ",
        auth_password: "ਪਾਸਵਰਡ",
        auth_full_name: "ਪੂਰਾ ਨਾਮ / ਸੰਸਥਾ",
        auth_location: "ਜ਼ਿਲ੍ਹਾ / ਸਥਾਨ",
        auth_preferred_role: "ਕਾਰਜਕਾਰੀ ਭੂਮਿਕਾ",
        auth_btn_login: "ਪੋਰਟਲ ਵਿੱਚ ਦਾਖਲ ਹੋਵੋ",
        auth_btn_register: "ਰਜਿਸਟਰ ਕਰੋ ਤੇ ਦਾਖਲ ਹੋਵੋ",
        demo_farmer: "🌾 ਡੈਮੋ ਕਿਸਾਨ (ਰਮੇਸ਼ ਕੁਮਾਰ)",
        demo_aggregator: "📦 ਡੈਮੋ ਐਗਰੀਗੇਟਰ (ਮਾਲਵਾ FPO)",
        demo_buyer: "🏢 ਡੈਮੋ ਖਰੀਦਦਾਰ (ਐਗਰੋਕਾਰਪ)",

        role_farmer: "ਕਿਸਾਨ ਪੋਰਟਲ",
        role_aggregator: "FPO ਐਗਰੀਗੇਟਰ ਡੈਸਕ",
        role_buyer: "ਖਰੀਦਦਾਰ ਡੈਸਕ",
        role_farmer_sub: "ਕਿਸਾਨ ਗੁਣਵੱਤਾ ਅਤੇ ਵਾਜਬ ਮੰਡੀ ਕੇਂਦਰ",

        farmer_hero_title: "ਏਆਈ ਗਰੇਡਿੰਗ ਅਤੇ ਸਰਕਾਰੀ ਐਮਐਸਪੀ ਨਾਲ ਕਿਸਾਨਾਂ ਦੀ ਖੁਸ਼ਹਾਲੀ",
        farmer_hero_desc: "ਆੜ੍ਹਤੀਆਂ ਦੀ ਲੁੱਟ ਬੰਦ ਕਰੋ। ਵਿਗਿਆਨਕ ਗੁਣਵੱਤਾ ਜਾਂਚ ਅਤੇ ਸਿੱਧੇ ਐਮਐਸਪੀ ਭੁਗਤਾਨ ਲਈ ਆਪਣੀ ਫਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ।",
        btn_scan_produce: "ਏਆਈ ਕੁਆਲਿਟੀ ਸਕੈਨ",
        btn_register_produce: "ਫਸਲ ਰਜਿਸਟਰ ਕਰੋ",

        weather_title: "ਲਾਈਵ ਖੇਤੀਬਾੜੀ ਮੌਸਮ ਸਟੇਸ਼ਨ",
        scanner_title: "ਏਆਈ ਫਸਲ ਗੁਣਵੱਤਾ ਅਤੇ ਨੁਕਸ ਸਕੈਨਰ",
        proc_centers_title: "ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਖੇਤੀਬਾੜੀ ਖਰੀਦ ਕੇਂਦਰ ਅਤੇ ਮੰਡੀਆਂ",
        filter_state_all: "ਸਾਰੇ ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਤ ਪ੍ਰਦੇਸ਼ (36)",
        mandi_title: "ਥੋਕ ਮੰਡੀ ਭਾਅ ਅਤੇ ਸਰਕਾਰੀ ਐਮਐਸਪੀ",
        status_pending: "ਬਕਾਇਆ",
        status_accepted: "ਮਨਜ਼ੂਰ",
        status_rejected: "ਰੱਦ",
        status_completed: "ਮੁਕੰਮਲ"
    },

    // --------------------------------------------------------
    // 7. GUJARATI (ગુજરાતી)
    // --------------------------------------------------------
    gu: {
        app_name: "એગ્રી-લિંક",
        app_tagline: "સ્વાયત્ત કૃષિ ગુણવત્તા અને પારદર્શક પ્રાપ્તિ નેટવર્ક",
        switch_role: "ભૂમિકા બદલો",
        logout: "લૉગ આઉટ",
        language_select: "ભાષા",
        select_language: "ભાષા પસંદ કરો",
        nav_overview: "ઝાંખી",
        nav_weather: "હવામાન અને સલાહ",
        nav_scanner: "AI પાક સ્કેનર",
        nav_produce: "ઉપજ નોંધણી",
        nav_ledger: "મારા યાર્ડ બેચ",
        nav_allocations: "વાણિજ્યિક લૉટ",
        nav_earnings: "ચુકવણી અને કમાણી",
        nav_centers: "ખરીદ કેન્દ્રો",
        nav_mandi: "લાઈવ માર્કેટ ભાવ",
        nav_news: "કૃષિ સમાચાર",
        auth_portal_title: "એગ્રી-લિંક સુરક્ષિત પ્રવેશ દ્વાર",
        role_farmer: "ખેડૂત પોર્ટલ",
        role_aggregator: "FPO એગ્રીગેટર ડેસ્ક",
        role_buyer: "સંસ્થાકીય ખરીદદાર ડેસ્ક",
        farmer_hero_title: "AI ગ્રેડિંગ અને યોગ્ય ટેકાના ભાવ (MSP) સાથે ખેડૂતોનું સશક્તિકરણ",
        proc_centers_title: "સમગ્ર ભારતમાં કૃષિ ખરીદ કેન્દ્રો અને માર્કેટ યાર્ડ",
        filter_state_all: "બધા રાજ્યો અને કેન્દ્રશાસિત પ્રદેશો (36)",
        mandi_title: "જથ્થાબંધ મંડી ભાવ અને સરકારી MSP"
    },

    // --------------------------------------------------------
    // 8. BENGALI (বাংলা)
    // --------------------------------------------------------
    bn: {
        app_name: "এগ্রি-লিংক",
        app_tagline: "স্বায়ত্তশাসিত কৃষি গুণমান এবং স্বচ্ছ সংগ্রহ নেটওয়ার্ক",
        switch_role: "ভূমিকা পরিবর্তন",
        logout: "লগ আউট",
        language_select: "ভাষা",
        select_language: "ভাষা নির্বাচন করুন",
        nav_overview: "সংক্ষিপ্ত বিবরণ",
        nav_weather: "আবহাওয়া ও পরামর্শ",
        nav_scanner: "এআই শস্য স্ক্যানার",
        nav_produce: "ফসল নিবন্ধন",
        nav_ledger: "আমার ইয়ার্ড ব্যাচ",
        nav_allocations: "বাণিজ্যিক লট",
        nav_earnings: "আয় ও পেমেন্ট",
        nav_centers: "সংগ্রহ কেন্দ্র ডিরেক্টরি",
        nav_mandi: "লাইভ পাইকারি দর",
        nav_news: "কৃষি সংবাদ",
        auth_portal_title: "এগ্রি-লিংক সুরক্ষিত প্রবেশদ্বার",
        role_farmer: "কৃষক পোর্টাল",
        role_aggregator: "এফপিও এগ্রিগেটর ডেস্ক",
        role_buyer: "ক্রেতা ডেস্ক",
        farmer_hero_title: "এআই গ্রেডিং এবং ন্যায্য এমএসপি সহায়তায় কৃষকদের ক্ষমতায়ন",
        proc_centers_title: "ভারত জুড়ে কৃষি সংগ্রহ কেন্দ্র ও নিয়ন্ত্রিত বাজার",
        filter_state_all: "সমস্ত রাজ্য ও কেন্দ্রশাসিত অঞ্চল (৩৬)",
        mandi_title: "পাইকারি বাজার দর ও সরকারি এমএসপি"
    },

    // --------------------------------------------------------
    // 9. KANNADA (ಕನ್ನಡ)
    // --------------------------------------------------------
    kn: {
        app_name: "ಅಗ್ರಿ-ಲಿಂಕ್",
        app_tagline: "ಸ್ವಾಯತ್ತ ಕೃಷಿ ಗುಣಮಟ್ಟ ಮತ್ತು ಪಾರದರ್ಶಕ ಖರೀದಿ ಜಾಲ",
        switch_role: "ಪಾತ್ರ ಬದಲಾಯಿಸಿ",
        logout: "ಲಾಗ್ ಔಟ್",
        language_select: "ಭಾಷೆ",
        select_language: "ಭಾಷೆಯನ್ನು ಆರಿಸಿ",
        nav_overview: "ಅವಲೋಕನ",
        nav_weather: "ಹವಾಮಾನ ಮತ್ತು ಸಲಹೆ",
        nav_scanner: "AI ಬೆಳೆ ಸ್ಕ್ಯಾನರ್",
        nav_produce: "ಬೆಳೆ ನೋಂದಣಿ",
        nav_ledger: "ನನ್ನ ಯಾರ್ಡ್ ಬ್ಯಾಚ್‌ಗಳು",
        nav_allocations: "ವಾಣಿಜ್ಯ ಲಾಟ್‌ಗಳು",
        nav_earnings: "ಗಳಿಕೆ ಮತ್ತು ಪಾವತಿಗಳು",
        nav_centers: "ಖರೀದಿ ಕೇಂದ್ರಗಳ ಕೋಶ",
        nav_mandi: "ಮಾರುಕಟ್ಟೆ ದರಗಳು",
        nav_news: "ಕೃಷಿ ಸುದ್ದಿ",
        auth_portal_title: "ಅಗ್ರಿ-ಲಿಂಕ್ ಸುರಕ್ಷಿತ ಪ್ರವೇಶ ದ್ವಾರ",
        role_farmer: "ರೈತ ಪೋರ್ಟಲ್",
        role_aggregator: "FPO ಸಂಗ್ರಾಹಕ ಡೆಸ್ಕ್",
        role_buyer: "ಖರೀದಿದಾರರ ಡೆಸ್ಕ್",
        farmer_hero_title: "AI ಗ್ರೇಡಿಂಗ್ ಮತ್ತು ನ್ಯಾಯಯುತ MSP ಯೊಂದಿಗೆ ರೈತರ ಸಬಲೀಕರಣ",
        proc_centers_title: "ಭಾರತದಾದ್ಯಂತ ಕೃಷಿ ಖರೀದಿ ಕೇಂದ್ರಗಳು ಮತ್ತು ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಗಳು",
        filter_state_all: "ಎಲ್ಲಾ ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು (36)",
        mandi_title: "ಸಗಟು ಮಂಡಿ ದರಗಳು ಮತ್ತು ಅಧಿಕೃತ MSP"
    },

    // --------------------------------------------------------
    // 10. MALAYALAM (മലയാളം)
    // --------------------------------------------------------
    ml: {
        app_name: "അഗ്രി-ലിങ്ക്",
        app_tagline: "സ്വയംഭരണ കാർഷിക ഗുണനിലവാരവും സുതാര്യമായ സംഭരണ ശൃംഖലയും",
        switch_role: "റോൾ മാറ്റുക",
        logout: "ലോഗ് ഔട്ട്",
        language_select: "ഭാഷ",
        select_language: "ഭാഷ തിരഞ്ഞെടുക്കുക",
        nav_overview: "അവലോകനം",
        nav_weather: "കാലാവസ്ഥയും നിർദ്ദേശങ്ങളും",
        nav_scanner: "AI വിള സ്കാനർ",
        nav_produce: "ഉൽപ്പന്ന രജിസ്ട്രേഷൻ",
        nav_ledger: "എന്റെ ബാച്ചുകൾ",
        nav_allocations: "വാണിജ്യ ലോട്ടുകൾ",
        nav_earnings: "വരുമാനവും പേയ്‌മെന്റുകളും",
        nav_centers: "സംഭരണ കേന്ദ്രങ്ങൾ",
        nav_mandi: "മാർക്കറ്റ് നിരക്കുകൾ",
        nav_news: "കാർഷിക വാർത്തകൾ",
        auth_portal_title: "അഗ്രി-ലിങ്ക് സുരക്ഷിത പ്രവേശന പോർട്ടൽ",
        role_farmer: "കർഷക പോർട്ടൽ",
        role_aggregator: "എഫ്‌പിഒ അഗ്രിഗേറ്റർ ഡെസ്ക്",
        role_buyer: "വാങ്ങുന്നയാളുടെ ഡെസ്ക്",
        farmer_hero_title: "AI ഗ്രേഡിംഗും ന്യായമായ താങ്ങുവിലയും വഴി കർഷക ശാക്തീകരണം",
        proc_centers_title: "ഇന്ത്യയിലുടനീളമുള്ള കാർഷിക സംഭരണ കേന്ദ്രങ്ങളും മാർക്കറ്റുകളും",
        filter_state_all: "എല്ലാ സംസ്ഥാനങ്ങളും കേന്ദ്രഭരണ പ്രദേശങ്ങളും (36)",
        mandi_title: "മൊത്തവ്യാപാര വിപണി നിരക്കുകളും ഔദ്യോഗിക MSP യും"
    },

    // --------------------------------------------------------
    // 11. ODIA (ଓଡ଼ିଆ)
    // --------------------------------------------------------
    or: {
        app_name: "ଏଗ୍ରି-ଲିଙ୍କ୍",
        app_tagline: "ସ୍ୱୟଂଶାସିତ କୃଷି ଗୁଣବତ୍ତା ଏବଂ ସ୍ୱଚ୍ଛ ସଂଗ୍ରହ ନେଟୱାର୍କ",
        switch_role: "ଭୂମିକା ପରିବର୍ତ୍ତନ",
        logout: "ଲଗ୍ ଆଉଟ୍",
        language_select: "ଭାଷା",
        select_language: "ଭାଷା ଚୟନ କରନ୍ତୁ",
        nav_overview: "ସମୀକ୍ଷା",
        nav_weather: "ପାଣିପାଗ ଓ ପରାମର୍ଶ",
        nav_scanner: "AI ଫସଲ ସ୍କାନର",
        nav_produce: "ଫସଲ ପଞ୍ଜୀକରଣ",
        nav_ledger: "ମୋର ଫସଲ ବ୍ୟାଚ୍",
        nav_allocations: "ବାଣିଜ୍ୟିକ ଲଟ୍",
        nav_earnings: "ଆୟ ଓ ପେମେଣ୍ଟ",
        nav_centers: "ସଂଗ୍ରହ କେନ୍ଦ୍ର ତାଲିକା",
        nav_mandi: "ମଣ୍ଡି ଦର",
        nav_news: "କୃଷି ସମ୍ବାଦ",
        auth_portal_title: "ଏଗ୍ରି-ଲିଙ୍କ୍ ସୁରକ୍ଷିତ ପ୍ରବେଶ ଦ୍ୱାର",
        role_farmer: "କୃଷକ ପୋର୍ଟାଲ୍",
        role_aggregator: "FPO ସଂଗ୍ରାହକ ଡେସ୍କ",
        role_buyer: "କ୍ରେତା ଡେସ୍କ",
        farmer_hero_title: "AI ଗ୍ରେଡିଂ ଏବଂ ଉପଯୁକ୍ତ MSP ସହାୟତାରେ କୃଷକଙ୍କ ସଶକ୍ତିକରଣ",
        proc_centers_title: "ସମଗ୍ର ଭାରତରେ କୃଷି ସଂଗ୍ରହ କେନ୍ଦ୍ର ଏବଂ ମଣ୍ଡି",
        filter_state_all: "ସମସ୍ତ ରାଜ୍ୟ ଓ କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ (୩୬)",
        mandi_title: "ପାଇକାରୀ ମଣ୍ଡି ଦର ଏବଂ ସରକାରୀ MSP"
    },

    // --------------------------------------------------------
    // 12. URDU (اردو) - with RTL layout support!
    // --------------------------------------------------------
    ur: {
        app_name: "ایگری-لنک",
        app_tagline: "زرعی معیار اور شفاف تجارتی نیٹ ورک",
        switch_role: "کردار تبدیل کریں",
        logout: "لاگ آؤٹ",
        language_select: "زبان",
        select_language: "زبان منتخب کریں",
        nav_overview: "جائزہ",
        nav_weather: "موسم اور زراعت مشورے",
        nav_scanner: "اے آئی فصل اسکینر",
        nav_produce: "پیداوار کا اندراج",
        nav_ledger: "میرے بیجز",
        nav_allocations: "تجارتی لاٹس",
        nav_earnings: "ادائیگیاں اور کمائی",
        nav_centers: "خریداری مراکز",
        nav_mandi: "منڈی ریٹس",
        nav_news: "زرعی خبریں",
        auth_portal_title: "ایگری-لنک محفوظ پورٹل",
        role_farmer: "کسان پورٹل",
        role_aggregator: "ایف پی او ایگریگیٹر",
        role_buyer: "خریدار ڈیسک",
        farmer_hero_title: "اے آئی گریڈنگ اور منصفانہ ایم ایس پی کے ساتھ کسانوں کی خوشحالی",
        proc_centers_title: "پورے ہندوستان میں زرعی خریداری مراکز اور منڈیاں",
        filter_state_all: "تمام ریاستیں اور یونین علاقے (36)",
        mandi_title: "تھوک منڈی ریٹس اور سرکاری ایم ایس پی"
    },

    // --------------------------------------------------------
    // 13. ASSAMESE (অসমীয়া)
    // --------------------------------------------------------
    as: {
        app_name: "এগ্ৰি-লিংক",
        app_tagline: "স্বায়ত্তশাসিত কৃষি গুণমান আৰু স্বচ্ছ ক্ৰয় নেটৱৰ্ক",
        switch_role: "ভূমিকা সলনি কৰক",
        logout: "লগ আউট",
        language_select: "ভাষা",
        select_language: "ভাষা বাছক",
        nav_overview: "অৱলোকন",
        nav_weather: "বতৰ আৰু পৰামৰ্শ",
        nav_scanner: "AI শস্য স্কেনাৰ",
        nav_produce: "উৎপাদন পঞ্জীয়ন",
        nav_ledger: "মোৰ শস্যৰ বেচ",
        nav_allocations: "বাণিজ্যিক লট",
        nav_earnings: "উপাৰ্জন আৰু পেমেণ্ট",
        nav_centers: "ক্ৰয় কেন্দ্ৰ নিৰ্দেশিকা",
        nav_mandi: "লাইভ পাইকাৰী দৰ",
        nav_news: "কৃষি বাৰ্তা",
        auth_portal_title: "এগ্ৰি-লিংক সুৰক্ষিত প্ৰৱেশদ্বাৰ",
        role_farmer: "কৃষক পৰ্টেল",
        role_aggregator: "FPO সংগ্ৰাহক ডেস্ক",
        role_buyer: "ক্ৰেতা ডেস্ক",
        farmer_hero_title: "AI গ্ৰেডিং আৰু ন্যায্য MSP ৰ সৈতে কৃষক সবলীকৰণ",
        proc_centers_title: "সমগ্ৰ ভাৰতত কৃষি ক্ৰয় কেন্দ্ৰ আৰু বজাৰসমূহ",
        filter_state_all: "সকলো ৰাজ্য আৰু কেন্দ্ৰীয় শাসিত অঞ্চল (৩৬)",
        mandi_title: "পাইকাৰী বজাৰ দৰ আৰু চৰকাৰী MSP"
    }
};

// ========================================================
// CORE i18n MANAGER CLASS
// ========================================================
class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('agrilink_site_lang') || 'en';
        if (!TRANSLATIONS[this.currentLang]) {
            this.currentLang = 'en';
        }
    }

    getLang() {
        return this.currentLang;
    }

    t(key, fallback = '') {
        const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
        if (dict && dict[key] !== undefined) {
            return dict[key];
        }
        // Fallback to English
        if (TRANSLATIONS.en && TRANSLATIONS.en[key] !== undefined) {
            return TRANSLATIONS.en[key];
        }
        return fallback || key;
    }

    setLanguage(langCode) {
        if (!TRANSLATIONS[langCode]) {
            console.warn(`[i18n] Language ${langCode} not supported, falling back to English.`);
            langCode = 'en';
        }

        this.currentLang = langCode;
        localStorage.setItem('agrilink_site_lang', langCode);

        // Configure document HTML attributes
        document.documentElement.lang = langCode;
        const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
        const isRtl = langMeta && langMeta.dir === 'rtl';
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

        if (isRtl) {
            document.body.classList.add('rtl-layout');
        } else {
            document.body.classList.remove('rtl-layout');
        }

        // Apply translations across all marked DOM elements
        this.translateDOM();

        // Update active states on language selectors
        this.syncLanguageSelectors(langCode);

        // Fire custom event
        window.dispatchEvent(new CustomEvent('agrilink:languageChanged', { detail: { lang: langCode } }));

        console.log(`[i18n] Website language synchronized to: ${langCode} (${langMeta ? langMeta.native : langCode})`);
    }

    translateDOM(root = document) {
        // 1. Text elements with data-i18n
        const textElements = root.querySelectorAll('[data-i18n]');
        textElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                // If element has nested icons or elements, replace only text nodes or innerHTML appropriately
                if (el.querySelector('i, svg')) {
                    const icon = el.querySelector('i, svg').outerHTML;
                    el.innerHTML = `${icon} <span>${translation}</span>`;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // 2. Placeholder inputs with data-i18n-placeholder
        const placeholderElements = root.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation) {
                el.placeholder = translation;
            }
        });

        // 3. Title/Tooltip elements with data-i18n-title
        const titleElements = root.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation) {
                el.title = translation;
            }
        });
    }

    syncLanguageSelectors(langCode) {
        const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === langCode) || SUPPORTED_LANGUAGES[0];

        // Update Header and Floating Buttons
        const curLabel = document.getElementById('lang-current-label');
        const floatLabel = document.getElementById('floating-lang-text');
        const loginLangLabel = document.getElementById('login-lang-label');

        if (curLabel) curLabel.textContent = langMeta.native;
        if (floatLabel) floatLabel.textContent = langMeta.native;
        if (loginLangLabel) loginLangLabel.textContent = langMeta.native;

        // Update button active states in all language dropdowns
        document.querySelectorAll('.lang-opt-btn').forEach(btn => {
            if (btn.dataset.lang === langCode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Sync hidden select if present
        const siteLangSelect = document.getElementById('site-language-select');
        if (siteLangSelect && siteLangSelect.value !== langCode) {
            siteLangSelect.value = langCode;
        }
    }
}

export const i18n = new I18nManager();
window.i18n = i18n;
window.t = (key, fallback) => i18n.t(key, fallback);
