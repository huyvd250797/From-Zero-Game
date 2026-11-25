// Generated from master-data/*.json. Do not edit.
export default {
  "version": "2.0.0",
  "catalogs": {
    "Game_Config": [
      {
        "id": "CFG_DEFAULT",
        "name": "Mặc định",
        "age": 18,
        "cash": 500000,
        "minutes": 420,
        "energy": 100,
        "hunger": 85,
        "happy": 60,
        "dayMinutes": 1440,
        "realSecondsPerMinute": 1,
        "walkSpeed": 6,
        "bikeSpeed": 12,
        "lowEnergyThreshold": 15,
        "lowEnergyMultiplier": 0.55,
        "movementDecayInterval": 15,
        "rentMinutes": 1440,
        "spawn": "NAV_SPAWN",
        "startYear": 2026,
        "criticalHealthThreshold": 20,
        "criticalNeedThreshold": 15,
        "inventoryCapacity": 30,
        "dailyWorkLimit": 480,
        "povertyThreshold": 60000,
        "dailyStudyLimit": 240,
        "xpPerLevel": 100,
        "initialEducation": "EDU_HIGH"
      }
    ],
    "Difficulty": [
      {
        "id": "DIF_NORMAL",
        "name": "Bình thường",
        "startingCash": 500000,
        "expenseMultiplier": 1,
        "incomeMultiplier": 1
      },
      {
        "id": "DIF_EASY",
        "name": "Dễ",
        "startingCash": 800000,
        "expenseMultiplier": 0.85,
        "incomeMultiplier": 1.1
      },
      {
        "id": "DIF_HARD",
        "name": "Khó",
        "startingCash": 300000,
        "expenseMultiplier": 1.2,
        "incomeMultiplier": 0.9
      }
    ],
    "Character_Origins": [
      {
        "id": "ORG_ZERO",
        "name": "Từ hai bàn tay trắng",
        "cash": 500000,
        "description": "Không nhà, không việc ổn định.",
        "traits": [
          "TRA_DETERMINED"
        ]
      },
      {
        "id": "ORG_RURAL",
        "name": "Rời quê lên phố",
        "cash": 400000,
        "description": "Ít kinh nghiệm, có ý chí học nghề.",
        "traits": [
          "TRA_CURIOUS"
        ]
      },
      {
        "id": "ORG_WORKER",
        "name": "Gia đình lao động",
        "cash": 700000,
        "description": "Có kinh nghiệm phụ việc.",
        "traits": [
          "TRA_DISCIPLINED"
        ]
      }
    ],
    "Character_Traits": [
      {
        "id": "TRA_DETERMINED",
        "name": "Kiên trì",
        "description": "Ít bỏ cuộc trước khó khăn."
      },
      {
        "id": "TRA_CURIOUS",
        "name": "Ham học",
        "description": "Thích khám phá kiến thức mới."
      },
      {
        "id": "TRA_DISCIPLINED",
        "name": "Kỷ luật",
        "description": "Duy trì lịch sinh hoạt."
      },
      {
        "id": "TRA_SOCIAL",
        "name": "Hòa đồng",
        "description": "Dễ kết nối NPC."
      },
      {
        "id": "TRA_IMPULSIVE",
        "name": "Bốc đồng",
        "description": "Dễ quyết định thiếu cân nhắc."
      },
      {
        "id": "TRA_CAREFUL",
        "name": "Thận trọng",
        "description": "Cân nhắc hậu quả."
      }
    ],
    "Character_Attributes": [
      {
        "id": "ATR_HEALTH",
        "name": "Sức khỏe",
        "min": 0,
        "max": 100,
        "initial": 100,
        "unit": "score"
      },
      {
        "id": "ATR_ENERGY",
        "name": "Năng lượng",
        "min": 0,
        "max": 100,
        "initial": 100,
        "unit": "score"
      },
      {
        "id": "ATR_HUNGER",
        "name": "Độ no",
        "min": 0,
        "max": 100,
        "initial": 85,
        "unit": "score"
      },
      {
        "id": "ATR_HYGIENE",
        "name": "Vệ sinh",
        "min": 0,
        "max": 100,
        "initial": 80,
        "unit": "score"
      },
      {
        "id": "ATR_HAPPY",
        "name": "Hạnh phúc",
        "min": 0,
        "max": 100,
        "initial": 60,
        "unit": "score"
      },
      {
        "id": "ATR_STRESS",
        "name": "Căng thẳng",
        "min": 0,
        "max": 100,
        "initial": 20,
        "unit": "score"
      },
      {
        "id": "ATR_KNOWLEDGE",
        "name": "Kiến thức",
        "min": 0,
        "max": 1000000,
        "initial": 0,
        "unit": "xp"
      },
      {
        "id": "ATR_FITNESS",
        "name": "Thể lực",
        "min": 0,
        "max": 100,
        "initial": 50,
        "unit": "score"
      },
      {
        "id": "ATR_DISCIPLINE",
        "name": "Kỷ luật",
        "min": 0,
        "max": 100,
        "initial": 50,
        "unit": "score"
      },
      {
        "id": "ATR_SOCIAL",
        "name": "Giao tiếp",
        "min": 0,
        "max": 100,
        "initial": 30,
        "unit": "score"
      },
      {
        "id": "ATR_REPUTATION",
        "name": "Uy tín",
        "min": 0,
        "max": 100,
        "initial": 50,
        "unit": "score"
      },
      {
        "id": "ATR_INTEGRITY",
        "name": "Chính trực",
        "min": 0,
        "max": 100,
        "initial": 75,
        "unit": "score"
      },
      {
        "id": "ATR_EXPERIENCE",
        "name": "Kinh nghiệm",
        "min": 0,
        "max": 1000000,
        "initial": 0,
        "unit": "xp"
      },
      {
        "id": "ATR_HYDRATION",
        "name": "Đủ nước",
        "min": 0,
        "max": 100,
        "initial": 85,
        "unit": "score"
      }
    ],
    "Life_Stages": [
      {
        "id": "LIF_YOUNG",
        "name": "Khởi đầu",
        "minAge": 18,
        "maxAge": 24
      },
      {
        "id": "LIF_ADULT",
        "name": "Xây dựng",
        "minAge": 25,
        "maxAge": 39
      },
      {
        "id": "LIF_MATURE",
        "name": "Trưởng thành",
        "minAge": 40,
        "maxAge": 59
      },
      {
        "id": "LIF_SENIOR",
        "name": "Tuổi già",
        "minAge": 60,
        "maxAge": 120
      }
    ],
    "Needs_Rules": [
      {
        "id": "NEE_ENERGY",
        "name": "Tiêu hao năng lượng",
        "attribute": "ATR_ENERGY",
        "intervalMinutes": 30,
        "delta": -1,
        "warningBelow": 15
      },
      {
        "id": "NEE_HUNGER",
        "name": "Tiêu hao độ no",
        "attribute": "ATR_HUNGER",
        "intervalMinutes": 30,
        "delta": -1,
        "warningBelow": 20
      },
      {
        "id": "NEE_HYGIENE",
        "name": "Giảm vệ sinh",
        "attribute": "ATR_HYGIENE",
        "intervalMinutes": 45,
        "delta": -1,
        "warningBelow": 20
      },
      {
        "id": "NEE_HYDRATION",
        "name": "Tiêu hao nước",
        "attribute": "ATR_HYDRATION",
        "intervalMinutes": 45,
        "delta": -2,
        "warningBelow": 20
      }
    ],
    "Cities": [
      {
        "id": "CTY_ANLAC",
        "name": "An Lạc",
        "size": 192,
        "currency": "VND",
        "description": "Thành phố An Lạc mở rộng, gồm 10 khu chức năng.",
        "chunkSize": 32
      }
    ],
    "Districts": [
      {
        "id": "DST_RESIDENTIAL",
        "name": "Dân cư",
        "city": "CTY_ANLAC",
        "description": "Nhà trọ, nhà phố và sinh hoạt.",
        "minX": 0,
        "minZ": 0,
        "maxX": 48,
        "maxZ": 48,
        "color": "#a6bc92"
      },
      {
        "id": "DST_CENTER",
        "name": "Trung tâm",
        "city": "CTY_ANLAC",
        "description": "Văn phòng và ngân hàng.",
        "minX": 48,
        "minZ": 0,
        "maxX": 96,
        "maxZ": 48,
        "color": "#a9bec1"
      },
      {
        "id": "DST_LEISURE",
        "name": "Giải trí",
        "city": "CTY_ANLAC",
        "description": "Công viên và khu vui chơi.",
        "minX": 0,
        "minZ": 48,
        "maxX": 48,
        "maxZ": 96,
        "color": "#8fb485"
      },
      {
        "id": "DST_SERVICE",
        "name": "Dịch vụ",
        "city": "CTY_ANLAC",
        "description": "Cửa hàng và phòng khám.",
        "minX": 48,
        "minZ": 48,
        "maxX": 96,
        "maxZ": 96,
        "color": "#bcb99e"
      },
      {
        "id": "DST_COMMERCIAL",
        "name": "Thương mại",
        "city": "CTY_ANLAC",
        "description": "Siêu thị, thương mại và văn phòng.",
        "minX": 96,
        "minZ": 0,
        "maxX": 144,
        "maxZ": 96,
        "color": "#c8bd9e"
      },
      {
        "id": "DST_INDUSTRIAL",
        "name": "Công nghiệp",
        "city": "CTY_ANLAC",
        "description": "Nhà máy, kho và logistics.",
        "minX": 144,
        "minZ": 0,
        "maxX": 192,
        "maxZ": 96,
        "color": "#b5b3a4"
      },
      {
        "id": "DST_EDUCATION",
        "name": "Giáo dục",
        "city": "CTY_ANLAC",
        "description": "Trường học, thư viện và đào tạo.",
        "minX": 0,
        "minZ": 96,
        "maxX": 96,
        "maxZ": 144,
        "color": "#b1b8c7"
      },
      {
        "id": "DST_OUTSKIRTS",
        "name": "Ngoại ô",
        "city": "CTY_ANLAC",
        "description": "Nông trại, nhà vườn và không gian xanh.",
        "minX": 0,
        "minZ": 144,
        "maxX": 96,
        "maxZ": 192,
        "color": "#9dbd83"
      },
      {
        "id": "DST_CIVIC",
        "name": "Hành chính",
        "city": "CTY_ANLAC",
        "description": "Tòa án, hành chính, công an và nhà tù.",
        "minX": 96,
        "minZ": 96,
        "maxX": 144,
        "maxZ": 192,
        "color": "#b4b9be"
      },
      {
        "id": "DST_HEALTH",
        "name": "Y tế & dân cư mới",
        "city": "CTY_ANLAC",
        "description": "Bệnh viện và khu căn hộ mới.",
        "minX": 144,
        "minZ": 96,
        "maxX": 192,
        "maxZ": 192,
        "color": "#a8c4b6"
      }
    ],
    "Building_Types": [
      {
        "id": "BTY_SHOP",
        "name": "Cửa hàng",
        "description": "Nhu yếu phẩm và việc làm.",
        "style": "retail"
      },
      {
        "id": "BTY_ROOM",
        "name": "Phòng trọ",
        "description": "Nơi nghỉ ngơi.",
        "style": "rowhouse"
      },
      {
        "id": "BTY_CAFE",
        "name": "Cà phê",
        "description": "Gặp gỡ và giải trí.",
        "style": "retail"
      },
      {
        "id": "BTY_PARK",
        "name": "Công viên",
        "description": "Không gian công cộng.",
        "style": "park"
      },
      {
        "id": "BTY_OFFICE",
        "name": "Văn phòng",
        "description": "Nơi làm việc.",
        "style": "tower"
      },
      {
        "id": "BTY_BANK",
        "name": "Ngân hàng",
        "description": "Dịch vụ tài chính.",
        "style": "civic"
      },
      {
        "id": "BTY_BIKE",
        "name": "Cửa hàng xe",
        "description": "Mua phương tiện.",
        "style": "retail"
      },
      {
        "id": "BTY_CLINIC",
        "name": "Phòng khám",
        "description": "Chăm sóc sức khỏe.",
        "style": "medical"
      },
      {
        "id": "BTY_DECOR",
        "name": "Công trình nền",
        "description": "Trang trí thành phố.",
        "style": "rowhouse"
      },
      {
        "id": "BTY_SCHOOL",
        "name": "Trường học",
        "description": "Đào tạo.",
        "style": "school"
      },
      {
        "id": "BTY_COURT",
        "name": "Tòa án",
        "description": "Xét xử.",
        "style": "civic"
      },
      {
        "id": "BTY_PRISON",
        "name": "Nhà tù",
        "description": "Thi hành án.",
        "style": "industrial"
      },
      {
        "id": "BTY_HOUSE",
        "name": "Nhà ở",
        "description": "Nhà có thể sở hữu.",
        "style": "house"
      },
      {
        "id": "BTY_FACTORY",
        "name": "Nhà máy",
        "description": "Sản xuất.",
        "style": "industrial"
      },
      {
        "id": "BTY_MALL",
        "name": "Trung tâm thương mại",
        "description": "Mua sắm và dịch vụ.",
        "style": "retail"
      },
      {
        "id": "BTY_APARTMENT",
        "name": "Chung cư",
        "description": "Nhà ở cao tầng.",
        "style": "tower"
      },
      {
        "id": "BTY_WAREHOUSE",
        "name": "Kho hàng",
        "description": "Logistics.",
        "style": "industrial"
      },
      {
        "id": "BTY_LIBRARY",
        "name": "Thư viện",
        "description": "Đọc và học tập.",
        "style": "school"
      },
      {
        "id": "BTY_HOSPITAL",
        "name": "Bệnh viện",
        "description": "Chăm sóc y tế.",
        "style": "medical"
      },
      {
        "id": "BTY_POLICE",
        "name": "Công an",
        "description": "Dịch vụ công.",
        "style": "civic"
      },
      {
        "id": "BTY_FARM",
        "name": "Nông trại",
        "description": "Sản xuất nông nghiệp.",
        "style": "farm"
      },
      {
        "id": "BTY_SPORT",
        "name": "Thể thao",
        "description": "Rèn luyện thể chất.",
        "style": "sport"
      },
      {
        "id": "BTY_CITYHALL",
        "name": "Trung tâm hành chính",
        "description": "Dịch vụ công.",
        "style": "civic"
      },
      {
        "id": "BTY_GARAGE",
        "name": "Bãi đỗ xe",
        "description": "Đỗ phương tiện.",
        "style": "parking"
      }
    ],
    "Building_Instances": [
      {
        "id": "BLD_SHOP",
        "name": "Cửa hàng tiện lợi",
        "legacyId": "shop",
        "type": "BTY_SHOP",
        "district": "DST_RESIDENTIAL",
        "icon": "▣",
        "x": 26,
        "z": 26,
        "w": 10,
        "d": 9,
        "h": 5,
        "color": "#e8c08a",
        "door": "NAV_SHOP",
        "interactive": true
      },
      {
        "id": "BLD_ROOM",
        "name": "Khu phòng trọ",
        "legacyId": "room",
        "type": "BTY_ROOM",
        "district": "DST_RESIDENTIAL",
        "icon": "⌂",
        "x": 6,
        "z": 31,
        "w": 8,
        "d": 12,
        "h": 5,
        "color": "#d6b49b",
        "door": "NAV_ROOM",
        "interactive": true
      },
      {
        "id": "BLD_CAFE",
        "name": "Quán cà phê",
        "legacyId": "cafe",
        "type": "BTY_CAFE",
        "district": "DST_RESIDENTIAL",
        "icon": "☕",
        "x": 37,
        "z": 38,
        "w": 10,
        "d": 8,
        "h": 4,
        "color": "#c99469",
        "door": "NAV_CAFE",
        "interactive": true
      },
      {
        "id": "BLD_PARK",
        "name": "Công viên An Lạc",
        "legacyId": "park",
        "type": "BTY_PARK",
        "district": "DST_LEISURE",
        "icon": "♣",
        "x": 27,
        "z": 63,
        "w": 13,
        "d": 13,
        "h": 0,
        "color": "#8db67b",
        "door": "NAV_PARK",
        "interactive": true
      },
      {
        "id": "BLD_OFFICE",
        "name": "Công ty An Phát",
        "legacyId": "office",
        "type": "BTY_OFFICE",
        "district": "DST_CENTER",
        "icon": "▥",
        "x": 60,
        "z": 27,
        "w": 13,
        "d": 12,
        "h": 13,
        "color": "#87aebd",
        "door": "NAV_OFFICE",
        "interactive": true
      },
      {
        "id": "BLD_BANK",
        "name": "Ngân hàng",
        "legacyId": "bank",
        "type": "BTY_BANK",
        "district": "DST_CENTER",
        "icon": "▤",
        "x": 69,
        "z": 39,
        "w": 12,
        "d": 8,
        "h": 7,
        "color": "#d8d3ba",
        "door": "NAV_BANK",
        "interactive": true
      },
      {
        "id": "BLD_BIKE",
        "name": "Cửa hàng phương tiện",
        "legacyId": "bike",
        "type": "BTY_BIKE",
        "district": "DST_SERVICE",
        "icon": "◇",
        "x": 60,
        "z": 58,
        "w": 11,
        "d": 9,
        "h": 5,
        "color": "#b1b7ce",
        "door": "NAV_BIKE",
        "interactive": true
      },
      {
        "id": "BLD_CLINIC",
        "name": "Phòng khám",
        "legacyId": "clinic",
        "type": "BTY_CLINIC",
        "district": "DST_SERVICE",
        "icon": "✚",
        "x": 70,
        "z": 70,
        "w": 11,
        "d": 10,
        "h": 6,
        "color": "#d9e4dd",
        "door": "NAV_CLINIC",
        "interactive": true
      },
      {
        "id": "BLD_DECOR_00",
        "name": "Công trình nền 1",
        "legacyId": "b0",
        "type": "BTY_DECOR",
        "district": "DST_RESIDENTIAL",
        "icon": "",
        "x": 6,
        "z": 6,
        "w": 8,
        "d": 9,
        "h": 4,
        "color": "#d4c4a9",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_01",
        "name": "Công trình nền 2",
        "legacyId": "b1",
        "type": "BTY_DECOR",
        "district": "DST_RESIDENTIAL",
        "icon": "",
        "x": 29,
        "z": 6,
        "w": 16,
        "d": 9,
        "h": 7,
        "color": "#b2c2bc",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_02",
        "name": "Công trình nền 3",
        "legacyId": "b2",
        "type": "BTY_DECOR",
        "district": "DST_CENTER",
        "icon": "",
        "x": 61,
        "z": 6,
        "w": 16,
        "d": 9,
        "h": 8,
        "color": "#c3aeb0",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_03",
        "name": "Công trình nền 4",
        "legacyId": "b3",
        "type": "BTY_DECOR",
        "district": "DST_CENTER",
        "icon": "",
        "x": 90,
        "z": 7,
        "w": 8,
        "d": 11,
        "h": 6,
        "color": "#a9bdca",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_04",
        "name": "Công trình nền 5",
        "legacyId": "b4",
        "type": "BTY_DECOR",
        "district": "DST_LEISURE",
        "icon": "",
        "x": 6,
        "z": 60,
        "w": 8,
        "d": 14,
        "h": 5,
        "color": "#d4c4a9",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_05",
        "name": "Công trình nền 6",
        "legacyId": "b5",
        "type": "BTY_DECOR",
        "district": "DST_LEISURE",
        "icon": "",
        "x": 6,
        "z": 91,
        "w": 8,
        "d": 7,
        "h": 4,
        "color": "#b2c2bc",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_06",
        "name": "Công trình nền 7",
        "legacyId": "b6",
        "type": "BTY_DECOR",
        "district": "DST_LEISURE",
        "icon": "",
        "x": 31,
        "z": 90,
        "w": 18,
        "d": 8,
        "h": 5,
        "color": "#c3aeb0",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_07",
        "name": "Công trình nền 8",
        "legacyId": "b7",
        "type": "BTY_DECOR",
        "district": "DST_SERVICE",
        "icon": "",
        "x": 60,
        "z": 90,
        "w": 13,
        "d": 8,
        "h": 9,
        "color": "#a9bdca",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_08",
        "name": "Công trình nền 9",
        "legacyId": "b8",
        "type": "BTY_DECOR",
        "district": "DST_CENTER",
        "icon": "",
        "x": 90,
        "z": 26,
        "w": 8,
        "d": 12,
        "h": 7,
        "color": "#d4c4a9",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_09",
        "name": "Công trình nền 10",
        "legacyId": "b9",
        "type": "BTY_DECOR",
        "district": "DST_SERVICE",
        "icon": "",
        "x": 90,
        "z": 60,
        "w": 8,
        "d": 14,
        "h": 5,
        "color": "#b2c2bc",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_10",
        "name": "Công trình nền 11",
        "legacyId": "b10",
        "type": "BTY_DECOR",
        "district": "DST_SERVICE",
        "icon": "",
        "x": 90,
        "z": 90,
        "w": 8,
        "d": 8,
        "h": 4,
        "color": "#c3aeb0",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_11",
        "name": "Công trình nền 12",
        "legacyId": "b11",
        "type": "BTY_DECOR",
        "district": "DST_RESIDENTIAL",
        "icon": "",
        "x": 38,
        "z": 25,
        "w": 8,
        "d": 8,
        "h": 8,
        "color": "#a9bdca",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_DECOR_12",
        "name": "Công trình nền 13",
        "legacyId": "b12",
        "type": "BTY_DECOR",
        "district": "DST_SERVICE",
        "icon": "",
        "x": 68,
        "z": 57,
        "w": 5,
        "d": 7,
        "h": 5,
        "color": "#d4c4a9",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_MALL",
        "name": "Trung tâm thương mại Ánh Dương",
        "legacyId": "mall",
        "type": "BTY_MALL",
        "district": "DST_COMMERCIAL",
        "icon": "▣",
        "x": 128,
        "z": 32,
        "w": 18,
        "d": 16,
        "h": 8,
        "color": "#d7b48d",
        "door": "NAV_MALL",
        "interactive": true
      },
      {
        "id": "BLD_MARKET",
        "name": "Siêu thị An Lạc",
        "legacyId": "market",
        "type": "BTY_SHOP",
        "district": "DST_COMMERCIAL",
        "icon": "▣",
        "x": 128,
        "z": 64,
        "w": 17,
        "d": 15,
        "h": 5,
        "color": "#d4ab73",
        "door": "NAV_MARKET",
        "interactive": true
      },
      {
        "id": "BLD_FACTORY",
        "name": "Nhà máy Đông An",
        "legacyId": "factory",
        "type": "BTY_FACTORY",
        "district": "DST_INDUSTRIAL",
        "icon": "▥",
        "x": 160,
        "z": 32,
        "w": 17,
        "d": 16,
        "h": 7,
        "color": "#a7b4b8",
        "door": "NAV_FACTORY",
        "interactive": true
      },
      {
        "id": "BLD_WAREHOUSE",
        "name": "Kho logistics",
        "legacyId": "warehouse",
        "type": "BTY_WAREHOUSE",
        "district": "DST_INDUSTRIAL",
        "icon": "▥",
        "x": 160,
        "z": 64,
        "w": 18,
        "d": 16,
        "h": 6,
        "color": "#9daab5",
        "door": "NAV_WAREHOUSE",
        "interactive": true
      },
      {
        "id": "BLD_SCHOOL",
        "name": "Trường nghề An Lạc",
        "legacyId": "school",
        "type": "BTY_SCHOOL",
        "district": "DST_EDUCATION",
        "icon": "▥",
        "x": 32,
        "z": 128,
        "w": 17,
        "d": 16,
        "h": 7,
        "color": "#d9bc91",
        "door": "NAV_SCHOOL",
        "interactive": true
      },
      {
        "id": "BLD_LIBRARY",
        "name": "Thư viện thành phố",
        "legacyId": "library",
        "type": "BTY_LIBRARY",
        "district": "DST_EDUCATION",
        "icon": "▤",
        "x": 64,
        "z": 128,
        "w": 16,
        "d": 15,
        "h": 7,
        "color": "#b9c5d5",
        "door": "NAV_LIBRARY",
        "interactive": true
      },
      {
        "id": "BLD_FARM",
        "name": "Nông trại Bình An",
        "legacyId": "farm",
        "type": "BTY_FARM",
        "district": "DST_OUTSKIRTS",
        "icon": "♣",
        "x": 32,
        "z": 160,
        "w": 17,
        "d": 16,
        "h": 0,
        "color": "#91b779",
        "door": "NAV_FARM",
        "interactive": true
      },
      {
        "id": "BLD_SPORT",
        "name": "Sân thể thao",
        "legacyId": "sport",
        "type": "BTY_SPORT",
        "district": "DST_OUTSKIRTS",
        "icon": "◇",
        "x": 64,
        "z": 160,
        "w": 17,
        "d": 16,
        "h": 0,
        "color": "#8eb69b",
        "door": "NAV_SPORT",
        "interactive": true
      },
      {
        "id": "BLD_CITYHALL",
        "name": "Trung tâm hành chính",
        "legacyId": "cityhall",
        "type": "BTY_CITYHALL",
        "district": "DST_CIVIC",
        "icon": "▤",
        "x": 128,
        "z": 128,
        "w": 17,
        "d": 16,
        "h": 9,
        "color": "#d4cbb5",
        "door": "NAV_CITYHALL",
        "interactive": true
      },
      {
        "id": "BLD_COURT",
        "name": "Tòa án An Lạc",
        "legacyId": "court",
        "type": "BTY_COURT",
        "district": "DST_CIVIC",
        "icon": "▤",
        "x": 128,
        "z": 160,
        "w": 17,
        "d": 15,
        "h": 8,
        "color": "#d4c7a8",
        "door": "NAV_COURT",
        "interactive": true
      },
      {
        "id": "BLD_HOSPITAL",
        "name": "Bệnh viện An Lạc",
        "legacyId": "hospital",
        "type": "BTY_HOSPITAL",
        "district": "DST_HEALTH",
        "icon": "✚",
        "x": 160,
        "z": 128,
        "w": 17,
        "d": 16,
        "h": 12,
        "color": "#d7e1df",
        "door": "NAV_HOSPITAL",
        "interactive": true
      },
      {
        "id": "BLD_APARTMENT",
        "name": "Chung cư Bình Minh",
        "legacyId": "apartment",
        "type": "BTY_APARTMENT",
        "district": "DST_HEALTH",
        "icon": "⌂",
        "x": 160,
        "z": 160,
        "w": 16,
        "d": 16,
        "h": 19,
        "color": "#96b7c0",
        "door": "NAV_APARTMENT",
        "interactive": true
      },
      {
        "id": "BLD_PARK_EAST",
        "name": "Công viên phía Đông",
        "legacyId": "park_east",
        "type": "BTY_PARK",
        "district": "DST_HEALTH",
        "icon": "♣",
        "x": 160,
        "z": 96,
        "w": 16,
        "d": 14,
        "h": 0,
        "color": "#87b67d",
        "door": "NAV_PARK_EAST",
        "interactive": true
      },
      {
        "id": "BLD_POLICE",
        "name": "Công an thành phố",
        "legacyId": "police",
        "type": "BTY_POLICE",
        "district": "DST_CIVIC",
        "icon": "▤",
        "x": 128,
        "z": 96,
        "w": 17,
        "d": 14,
        "h": 6,
        "color": "#a9beca",
        "door": "NAV_POLICE",
        "interactive": true
      },
      {
        "id": "BLD_PRISON",
        "name": "Trại cải tạo An Lạc",
        "legacyId": "prison",
        "type": "BTY_PRISON",
        "district": "DST_CIVIC",
        "icon": "",
        "x": 128,
        "z": 187,
        "w": 15,
        "d": 7,
        "h": 5,
        "color": "#9da6a4",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_4",
        "name": "Cửa hàng 100-4",
        "legacyId": "lot_100_4",
        "type": "BTY_SHOP",
        "district": "DST_COMMERCIAL",
        "icon": "",
        "x": 100,
        "z": 4,
        "w": 7,
        "d": 6,
        "h": 5,
        "color": "#cba98e",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_124_4",
        "name": "Trung tâm thương mại 124-4",
        "legacyId": "lot_124_4",
        "type": "BTY_MALL",
        "district": "DST_COMMERCIAL",
        "icon": "",
        "x": 124,
        "z": 4,
        "w": 7,
        "d": 6,
        "h": 5,
        "color": "#d8b88b",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_156_4",
        "name": "Kho hàng 156-4",
        "legacyId": "lot_156_4",
        "type": "BTY_WAREHOUSE",
        "district": "DST_INDUSTRIAL",
        "icon": "",
        "x": 156,
        "z": 4,
        "w": 7,
        "d": 5,
        "h": 5,
        "color": "#b0b4b4",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_164_4",
        "name": "Nhà máy 164-4",
        "legacyId": "lot_164_4",
        "type": "BTY_FACTORY",
        "district": "DST_INDUSTRIAL",
        "icon": "",
        "x": 164,
        "z": 4,
        "w": 6,
        "d": 5,
        "h": 5,
        "color": "#a0aeb0",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_4",
        "name": "Bãi đỗ xe 188-4",
        "legacyId": "lot_188_4",
        "type": "BTY_GARAGE",
        "district": "DST_INDUSTRIAL",
        "icon": "",
        "x": 188,
        "z": 4,
        "w": 5,
        "d": 6,
        "h": 0,
        "color": "#8d9899",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_28",
        "name": "Bãi đỗ xe 100-28",
        "legacyId": "lot_100_28",
        "type": "BTY_GARAGE",
        "district": "DST_COMMERCIAL",
        "icon": "",
        "x": 100,
        "z": 28,
        "w": 7,
        "d": 7,
        "h": 0,
        "color": "#8d9899",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_28",
        "name": "Kho hàng 188-28",
        "legacyId": "lot_188_28",
        "type": "BTY_WAREHOUSE",
        "district": "DST_INDUSTRIAL",
        "icon": "",
        "x": 188,
        "z": 28,
        "w": 5,
        "d": 7,
        "h": 6,
        "color": "#b0b4b4",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_36",
        "name": "Cửa hàng 100-36",
        "legacyId": "lot_100_36",
        "type": "BTY_SHOP",
        "district": "DST_COMMERCIAL",
        "icon": "",
        "x": 100,
        "z": 36,
        "w": 7,
        "d": 6,
        "h": 5,
        "color": "#cba98e",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_60",
        "name": "Cửa hàng 100-60",
        "legacyId": "lot_100_60",
        "type": "BTY_SHOP",
        "district": "DST_COMMERCIAL",
        "icon": "",
        "x": 100,
        "z": 60,
        "w": 7,
        "d": 7,
        "h": 5,
        "color": "#cba98e",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_60",
        "name": "Nhà máy 188-60",
        "legacyId": "lot_188_60",
        "type": "BTY_FACTORY",
        "district": "DST_INDUSTRIAL",
        "icon": "",
        "x": 188,
        "z": 60,
        "w": 5,
        "d": 5,
        "h": 6,
        "color": "#a0aeb0",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_68",
        "name": "Bãi đỗ xe 188-68",
        "legacyId": "lot_188_68",
        "type": "BTY_GARAGE",
        "district": "DST_INDUSTRIAL",
        "icon": "",
        "x": 188,
        "z": 68,
        "w": 7,
        "d": 5,
        "h": 0,
        "color": "#8d9899",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_92",
        "name": "Cửa hàng 100-92",
        "legacyId": "lot_100_92",
        "type": "BTY_SHOP",
        "district": "DST_COMMERCIAL",
        "icon": "",
        "x": 100,
        "z": 92,
        "w": 6,
        "d": 5,
        "h": 4,
        "color": "#cba98e",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_92",
        "name": "Nhà máy 188-92",
        "legacyId": "lot_188_92",
        "type": "BTY_FACTORY",
        "district": "DST_INDUSTRIAL",
        "icon": "",
        "x": 188,
        "z": 92,
        "w": 5,
        "d": 6,
        "h": 8,
        "color": "#a0aeb0",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_4_100",
        "name": "Trường học 4-100",
        "legacyId": "lot_4_100",
        "type": "BTY_SCHOOL",
        "district": "DST_EDUCATION",
        "icon": "",
        "x": 4,
        "z": 100,
        "w": 7,
        "d": 5,
        "h": 7,
        "color": "#d9c29f",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_28_100",
        "name": "Thư viện 28-100",
        "legacyId": "lot_28_100",
        "type": "BTY_LIBRARY",
        "district": "DST_EDUCATION",
        "icon": "",
        "x": 28,
        "z": 100,
        "w": 7,
        "d": 7,
        "h": 7,
        "color": "#bdc5d5",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_36_100",
        "name": "Nhà nhỏ An Bình",
        "legacyId": "lot_36_100",
        "type": "BTY_HOUSE",
        "district": "DST_EDUCATION",
        "icon": "⌂",
        "x": 36,
        "z": 100,
        "w": 6,
        "d": 6,
        "h": 3,
        "color": "#dfc3a4",
        "door": "NAV_HOME_SMALL",
        "interactive": true
      },
      {
        "id": "BLD_LOT_60_100",
        "name": "Nhà phố Hòa Phát",
        "legacyId": "lot_60_100",
        "type": "BTY_HOUSE",
        "district": "DST_EDUCATION",
        "icon": "⌂",
        "x": 60,
        "z": 100,
        "w": 5,
        "d": 5,
        "h": 6,
        "color": "#dfc3a4",
        "door": "NAV_HOME_TOWN",
        "interactive": true
      },
      {
        "id": "BLD_LOT_68_100",
        "name": "Thư viện 68-100",
        "legacyId": "lot_68_100",
        "type": "BTY_LIBRARY",
        "district": "DST_EDUCATION",
        "icon": "",
        "x": 68,
        "z": 100,
        "w": 7,
        "d": 6,
        "h": 8,
        "color": "#bdc5d5",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_92_100",
        "name": "Trường học 92-100",
        "legacyId": "lot_92_100",
        "type": "BTY_SCHOOL",
        "district": "DST_EDUCATION",
        "icon": "",
        "x": 92,
        "z": 100,
        "w": 7,
        "d": 5,
        "h": 5,
        "color": "#d9c29f",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_100",
        "name": "Công viên 188-100",
        "legacyId": "lot_188_100",
        "type": "BTY_PARK",
        "district": "DST_HEALTH",
        "icon": "",
        "x": 188,
        "z": 100,
        "w": 6,
        "d": 6,
        "h": 0,
        "color": "#8db67b",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_4_124",
        "name": "Trường học 4-124",
        "legacyId": "lot_4_124",
        "type": "BTY_SCHOOL",
        "district": "DST_EDUCATION",
        "icon": "",
        "x": 4,
        "z": 124,
        "w": 7,
        "d": 5,
        "h": 6,
        "color": "#d9c29f",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_92_124",
        "name": "Trường học 92-124",
        "legacyId": "lot_92_124",
        "type": "BTY_SCHOOL",
        "district": "DST_EDUCATION",
        "icon": "",
        "x": 92,
        "z": 124,
        "w": 6,
        "d": 7,
        "h": 7,
        "color": "#d9c29f",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_124",
        "name": "Công an 100-124",
        "legacyId": "lot_100_124",
        "type": "BTY_POLICE",
        "district": "DST_CIVIC",
        "icon": "",
        "x": 100,
        "z": 124,
        "w": 7,
        "d": 7,
        "h": 7,
        "color": "#9eb4bd",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_124",
        "name": "Chung cư 188-124",
        "legacyId": "lot_188_124",
        "type": "BTY_APARTMENT",
        "district": "DST_HEALTH",
        "icon": "",
        "x": 188,
        "z": 124,
        "w": 6,
        "d": 7,
        "h": 20,
        "color": "#a5b8c9",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_4_132",
        "name": "Công viên 4-132",
        "legacyId": "lot_4_132",
        "type": "BTY_PARK",
        "district": "DST_EDUCATION",
        "icon": "",
        "x": 4,
        "z": 132,
        "w": 5,
        "d": 7,
        "h": 0,
        "color": "#8db67b",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_132",
        "name": "Công an 100-132",
        "legacyId": "lot_100_132",
        "type": "BTY_POLICE",
        "district": "DST_CIVIC",
        "icon": "",
        "x": 100,
        "z": 132,
        "w": 7,
        "d": 5,
        "h": 5,
        "color": "#9eb4bd",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_132",
        "name": "Phòng khám 188-132",
        "legacyId": "lot_188_132",
        "type": "BTY_CLINIC",
        "district": "DST_HEALTH",
        "icon": "",
        "x": 188,
        "z": 132,
        "w": 5,
        "d": 6,
        "h": 6,
        "color": "#d7dfd8",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_4_156",
        "name": "Nông trại 4-156",
        "legacyId": "lot_4_156",
        "type": "BTY_FARM",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 4,
        "z": 156,
        "w": 7,
        "d": 7,
        "h": 0,
        "color": "#92b47d",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_92_156",
        "name": "Nông trại 92-156",
        "legacyId": "lot_92_156",
        "type": "BTY_FARM",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 92,
        "z": 156,
        "w": 7,
        "d": 7,
        "h": 0,
        "color": "#92b47d",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_156",
        "name": "Trung tâm hành chính 100-156",
        "legacyId": "lot_100_156",
        "type": "BTY_CITYHALL",
        "district": "DST_CIVIC",
        "icon": "",
        "x": 100,
        "z": 156,
        "w": 6,
        "d": 5,
        "h": 9,
        "color": "#d4cbb5",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_156",
        "name": "Phòng khám 188-156",
        "legacyId": "lot_188_156",
        "type": "BTY_CLINIC",
        "district": "DST_HEALTH",
        "icon": "",
        "x": 188,
        "z": 156,
        "w": 7,
        "d": 7,
        "h": 6,
        "color": "#d7dfd8",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_4_164",
        "name": "Nông trại 4-164",
        "legacyId": "lot_4_164",
        "type": "BTY_FARM",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 4,
        "z": 164,
        "w": 6,
        "d": 6,
        "h": 0,
        "color": "#92b47d",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_164",
        "name": "Trung tâm hành chính 100-164",
        "legacyId": "lot_100_164",
        "type": "BTY_CITYHALL",
        "district": "DST_CIVIC",
        "icon": "",
        "x": 100,
        "z": 164,
        "w": 6,
        "d": 7,
        "h": 8,
        "color": "#d4cbb5",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_4_188",
        "name": "Công viên 4-188",
        "legacyId": "lot_4_188",
        "type": "BTY_PARK",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 4,
        "z": 188,
        "w": 6,
        "d": 6,
        "h": 0,
        "color": "#8db67b",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_28_188",
        "name": "Công viên 28-188",
        "legacyId": "lot_28_188",
        "type": "BTY_PARK",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 28,
        "z": 188,
        "w": 7,
        "d": 6,
        "h": 0,
        "color": "#8db67b",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_36_188",
        "name": "Nông trại 36-188",
        "legacyId": "lot_36_188",
        "type": "BTY_FARM",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 36,
        "z": 188,
        "w": 5,
        "d": 7,
        "h": 0,
        "color": "#92b47d",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_60_188",
        "name": "Biệt thự Vườn Xanh",
        "legacyId": "lot_60_188",
        "type": "BTY_HOUSE",
        "district": "DST_OUTSKIRTS",
        "icon": "⌂",
        "x": 60,
        "z": 188,
        "w": 6,
        "d": 5,
        "h": 4,
        "color": "#dfc3a4",
        "door": "NAV_HOME_VILLA",
        "interactive": true
      },
      {
        "id": "BLD_LOT_68_188",
        "name": "Nông trại 68-188",
        "legacyId": "lot_68_188",
        "type": "BTY_FARM",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 68,
        "z": 188,
        "w": 7,
        "d": 5,
        "h": 0,
        "color": "#92b47d",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_92_188",
        "name": "Nông trại 92-188",
        "legacyId": "lot_92_188",
        "type": "BTY_FARM",
        "district": "DST_OUTSKIRTS",
        "icon": "",
        "x": 92,
        "z": 188,
        "w": 6,
        "d": 7,
        "h": 0,
        "color": "#92b47d",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_100_188",
        "name": "Công an 100-188",
        "legacyId": "lot_100_188",
        "type": "BTY_POLICE",
        "district": "DST_CIVIC",
        "icon": "",
        "x": 100,
        "z": 188,
        "w": 7,
        "d": 7,
        "h": 6,
        "color": "#9eb4bd",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_156_188",
        "name": "Chung cư 156-188",
        "legacyId": "lot_156_188",
        "type": "BTY_APARTMENT",
        "district": "DST_HEALTH",
        "icon": "",
        "x": 156,
        "z": 188,
        "w": 5,
        "d": 7,
        "h": 13,
        "color": "#a5b8c9",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_164_188",
        "name": "Chung cư 164-188",
        "legacyId": "lot_164_188",
        "type": "BTY_APARTMENT",
        "district": "DST_HEALTH",
        "icon": "",
        "x": 164,
        "z": 188,
        "w": 6,
        "d": 5,
        "h": 16,
        "color": "#a5b8c9",
        "door": null,
        "interactive": false
      },
      {
        "id": "BLD_LOT_188_188",
        "name": "Phòng khám 188-188",
        "legacyId": "lot_188_188",
        "type": "BTY_CLINIC",
        "district": "DST_HEALTH",
        "icon": "",
        "x": 188,
        "z": 188,
        "w": 5,
        "d": 5,
        "h": 4,
        "color": "#d7dfd8",
        "door": null,
        "interactive": false
      }
    ],
    "Road_Network": [
      {
        "id": "ROD_X_16",
        "name": "Đường X 16",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 16,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      },
      {
        "id": "ROD_X_48",
        "name": "Đường X 48",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 48,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      },
      {
        "id": "ROD_X_80",
        "name": "Đường X 80",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 80,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      },
      {
        "id": "ROD_Z_16",
        "name": "Đường Z 16",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 16,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      },
      {
        "id": "ROD_Z_48",
        "name": "Đường Z 48",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 48,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      },
      {
        "id": "ROD_Z_80",
        "name": "Đường Z 80",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 80,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      },
      {
        "id": "ROD_X_112",
        "name": "Đại lộ X 112",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 112,
        "width": 9,
        "lanes": 4,
        "kind": "avenue"
      },
      {
        "id": "ROD_X_144",
        "name": "Đại lộ X 144",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 144,
        "width": 11,
        "lanes": 4,
        "kind": "avenue"
      },
      {
        "id": "ROD_X_176",
        "name": "Đường X 176",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 176,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      },
      {
        "id": "ROD_Z_112",
        "name": "Đại lộ Z 112",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 112,
        "width": 9,
        "lanes": 4,
        "kind": "avenue"
      },
      {
        "id": "ROD_Z_144",
        "name": "Đại lộ Z 144",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 144,
        "width": 11,
        "lanes": 4,
        "kind": "avenue"
      },
      {
        "id": "ROD_Z_176",
        "name": "Đường Z 176",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 176,
        "width": 7,
        "lanes": 2,
        "kind": "local"
      }
    ],
    "Navigation_Nodes": [
      {
        "id": "NAV_SPAWN",
        "name": "Điểm xuất phát",
        "city": "CTY_ANLAC",
        "x": 21,
        "z": 36
      },
      {
        "id": "NAV_SHOP",
        "name": "Cửa Cửa hàng tiện lợi",
        "city": "CTY_ANLAC",
        "x": 26,
        "z": 32
      },
      {
        "id": "NAV_ROOM",
        "name": "Cửa Khu phòng trọ",
        "city": "CTY_ANLAC",
        "x": 11,
        "z": 32
      },
      {
        "id": "NAV_CAFE",
        "name": "Cửa Quán cà phê",
        "city": "CTY_ANLAC",
        "x": 37,
        "z": 43
      },
      {
        "id": "NAV_PARK",
        "name": "Cửa Công viên An Lạc",
        "city": "CTY_ANLAC",
        "x": 27,
        "z": 54
      },
      {
        "id": "NAV_OFFICE",
        "name": "Cửa Công ty An Phát",
        "city": "CTY_ANLAC",
        "x": 60,
        "z": 34
      },
      {
        "id": "NAV_BANK",
        "name": "Cửa Ngân hàng",
        "city": "CTY_ANLAC",
        "x": 69,
        "z": 44
      },
      {
        "id": "NAV_BIKE",
        "name": "Cửa Cửa hàng xe đạp",
        "city": "CTY_ANLAC",
        "x": 60,
        "z": 52
      },
      {
        "id": "NAV_CLINIC",
        "name": "Cửa Phòng khám",
        "city": "CTY_ANLAC",
        "x": 70,
        "z": 64
      },
      {
        "id": "NAV_MALL",
        "name": "Lối vào Trung tâm thương mại Ánh Dương",
        "city": "CTY_ANLAC",
        "x": 128,
        "z": 42
      },
      {
        "id": "NAV_MARKET",
        "name": "Lối vào Siêu thị An Lạc",
        "city": "CTY_ANLAC",
        "x": 128,
        "z": 73
      },
      {
        "id": "NAV_FACTORY",
        "name": "Lối vào Nhà máy Đông An",
        "city": "CTY_ANLAC",
        "x": 160,
        "z": 42
      },
      {
        "id": "NAV_WAREHOUSE",
        "name": "Lối vào Kho logistics",
        "city": "CTY_ANLAC",
        "x": 160,
        "z": 74
      },
      {
        "id": "NAV_SCHOOL",
        "name": "Lối vào Trường nghề An Lạc",
        "city": "CTY_ANLAC",
        "x": 32,
        "z": 138
      },
      {
        "id": "NAV_LIBRARY",
        "name": "Lối vào Thư viện thành phố",
        "city": "CTY_ANLAC",
        "x": 64,
        "z": 137
      },
      {
        "id": "NAV_FARM",
        "name": "Lối vào Nông trại Bình An",
        "city": "CTY_ANLAC",
        "x": 32,
        "z": 170
      },
      {
        "id": "NAV_SPORT",
        "name": "Lối vào Sân thể thao",
        "city": "CTY_ANLAC",
        "x": 64,
        "z": 170
      },
      {
        "id": "NAV_CITYHALL",
        "name": "Lối vào Trung tâm hành chính",
        "city": "CTY_ANLAC",
        "x": 128,
        "z": 138
      },
      {
        "id": "NAV_COURT",
        "name": "Lối vào Tòa án An Lạc",
        "city": "CTY_ANLAC",
        "x": 128,
        "z": 169
      },
      {
        "id": "NAV_HOSPITAL",
        "name": "Lối vào Bệnh viện An Lạc",
        "city": "CTY_ANLAC",
        "x": 160,
        "z": 138
      },
      {
        "id": "NAV_APARTMENT",
        "name": "Lối vào Chung cư Bình Minh",
        "city": "CTY_ANLAC",
        "x": 160,
        "z": 170
      },
      {
        "id": "NAV_PARK_EAST",
        "name": "Lối vào Công viên phía Đông",
        "city": "CTY_ANLAC",
        "x": 160,
        "z": 105
      },
      {
        "id": "NAV_POLICE",
        "name": "Lối vào Công an thành phố",
        "city": "CTY_ANLAC",
        "x": 128,
        "z": 105
      },
      {
        "id": "NAV_HOME_SMALL",
        "name": "Lối vào Nhà nhỏ An Bình",
        "city": "CTY_ANLAC",
        "x": 36,
        "z": 105
      },
      {
        "id": "NAV_HOME_TOWN",
        "name": "Lối vào Nhà phố Hòa Phát",
        "city": "CTY_ANLAC",
        "x": 60,
        "z": 105
      },
      {
        "id": "NAV_HOME_VILLA",
        "name": "Lối vào Biệt thự Vườn Xanh",
        "city": "CTY_ANLAC",
        "x": 60,
        "z": 183
      }
    ],
    "World_Schedules": [
      {
        "id": "SCH_SHOP",
        "name": "Cửa hàng tiện lợi",
        "building": "BLD_SHOP",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_ROOM",
        "name": "Khu phòng trọ",
        "building": "BLD_ROOM",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_CAFE",
        "name": "Quán cà phê",
        "building": "BLD_CAFE",
        "opens": 360,
        "closes": 1320
      },
      {
        "id": "SCH_PARK",
        "name": "Công viên An Lạc",
        "building": "BLD_PARK",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_OFFICE",
        "name": "Công ty An Phát",
        "building": "BLD_OFFICE",
        "opens": 480,
        "closes": 1020
      },
      {
        "id": "SCH_BANK",
        "name": "Ngân hàng",
        "building": "BLD_BANK",
        "opens": 480,
        "closes": 1020
      },
      {
        "id": "SCH_BIKE",
        "name": "Cửa hàng xe đạp",
        "building": "BLD_BIKE",
        "opens": 480,
        "closes": 1200
      },
      {
        "id": "SCH_CLINIC",
        "name": "Phòng khám",
        "building": "BLD_CLINIC",
        "opens": 420,
        "closes": 1260
      },
      {
        "id": "SCH_MALL",
        "name": "Trung tâm thương mại Ánh Dương",
        "building": "BLD_MALL",
        "opens": 540,
        "closes": 1320
      },
      {
        "id": "SCH_MARKET",
        "name": "Siêu thị An Lạc",
        "building": "BLD_MARKET",
        "opens": 420,
        "closes": 1320
      },
      {
        "id": "SCH_FACTORY",
        "name": "Nhà máy Đông An",
        "building": "BLD_FACTORY",
        "opens": 360,
        "closes": 1320
      },
      {
        "id": "SCH_WAREHOUSE",
        "name": "Kho logistics",
        "building": "BLD_WAREHOUSE",
        "opens": 360,
        "closes": 1320
      },
      {
        "id": "SCH_SCHOOL",
        "name": "Trường nghề An Lạc",
        "building": "BLD_SCHOOL",
        "opens": 420,
        "closes": 1080
      },
      {
        "id": "SCH_LIBRARY",
        "name": "Thư viện thành phố",
        "building": "BLD_LIBRARY",
        "opens": 480,
        "closes": 1200
      },
      {
        "id": "SCH_FARM",
        "name": "Nông trại Bình An",
        "building": "BLD_FARM",
        "opens": 360,
        "closes": 1080
      },
      {
        "id": "SCH_SPORT",
        "name": "Sân thể thao",
        "building": "BLD_SPORT",
        "opens": 300,
        "closes": 1320
      },
      {
        "id": "SCH_CITYHALL",
        "name": "Trung tâm hành chính",
        "building": "BLD_CITYHALL",
        "opens": 480,
        "closes": 1020
      },
      {
        "id": "SCH_COURT",
        "name": "Tòa án An Lạc",
        "building": "BLD_COURT",
        "opens": 480,
        "closes": 1020
      },
      {
        "id": "SCH_HOSPITAL",
        "name": "Bệnh viện An Lạc",
        "building": "BLD_HOSPITAL",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_APARTMENT",
        "name": "Chung cư Bình Minh",
        "building": "BLD_APARTMENT",
        "opens": 480,
        "closes": 1200
      },
      {
        "id": "SCH_PARK_EAST",
        "name": "Công viên phía Đông",
        "building": "BLD_PARK_EAST",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_POLICE",
        "name": "Công an thành phố",
        "building": "BLD_POLICE",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_HOME_SMALL",
        "name": "Nhà nhỏ An Bình",
        "building": "BLD_LOT_36_100",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_HOME_TOWN",
        "name": "Nhà phố Hòa Phát",
        "building": "BLD_LOT_60_100",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_HOME_VILLA",
        "name": "Biệt thự Vườn Xanh",
        "building": "BLD_LOT_60_188",
        "opens": 0,
        "closes": 1440
      }
    ],
    "Location_Actions": [
      {
        "id": "ACT_WORK",
        "name": "Làm việc thời vụ",
        "legacyId": "work",
        "building": "BLD_SHOP",
        "detail": "4 giờ · +200.000đ",
        "cash": 200000,
        "time": 240,
        "energy": -25,
        "hunger": -20,
        "happy": -3,
        "log": "Hoàn thành ca làm việc thời vụ.",
        "rule": "work",
        "job": "JOB_TEMP",
        "asset": null,
        "hygiene": -5,
        "health": 0,
        "stress": 8,
        "hydration": -5
      },
      {
        "id": "ACT_MEAL",
        "name": "Mua cơm hộp",
        "legacyId": "meal",
        "building": "BLD_SHOP",
        "detail": "30.000đ · +35 độ no",
        "cash": -30000,
        "time": 20,
        "energy": 2,
        "hunger": 35,
        "happy": 3,
        "log": "Ăn một bữa cơm hộp.",
        "rule": "none",
        "job": null,
        "asset": "FOOD_MEAL",
        "hygiene": 0,
        "health": 3,
        "stress": 0,
        "hydration": 5
      },
      {
        "id": "ACT_RENT",
        "name": "Thuê phòng một đêm",
        "legacyId": "rent",
        "building": "BLD_ROOM",
        "detail": "120.000đ · 24 giờ",
        "cash": -120000,
        "time": 10,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Thuê phòng trọ trong 24 giờ.",
        "rule": "rent",
        "job": null,
        "asset": "PROP_ROOM",
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_SLEEP",
        "name": "Ngủ trong phòng",
        "legacyId": "sleep",
        "building": "BLD_ROOM",
        "detail": "8 giờ · phục hồi năng lượng",
        "cash": 0,
        "time": 480,
        "energy": 100,
        "hunger": -5,
        "happy": 5,
        "log": "Nghỉ ngơi trong phòng trọ.",
        "rule": "sleep",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 8,
        "stress": -20,
        "hydration": 0
      },
      {
        "id": "ACT_COFFEE",
        "name": "Uống cà phê",
        "legacyId": "coffee",
        "building": "BLD_CAFE",
        "detail": "35.000đ · +15 năng lượng",
        "cash": -35000,
        "time": 30,
        "energy": 15,
        "hunger": -3,
        "happy": 8,
        "log": "Thư giãn tại quán cà phê.",
        "rule": "none",
        "job": null,
        "asset": "FOOD_COFFEE",
        "hygiene": 0,
        "health": 0,
        "stress": -5,
        "hydration": 10
      },
      {
        "id": "ACT_REST",
        "name": "Nghỉ tại công viên",
        "legacyId": "rest",
        "building": "BLD_PARK",
        "detail": "Miễn phí · 1 giờ",
        "cash": 0,
        "time": 60,
        "energy": 12,
        "hunger": -5,
        "happy": 12,
        "log": "Nghỉ ngơi tại công viên.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 5,
        "stress": -10,
        "hydration": 0
      },
      {
        "id": "ACT_ASK",
        "name": "Hỏi cơ hội việc làm",
        "legacyId": "ask",
        "building": "BLD_OFFICE",
        "detail": "30 phút",
        "cash": 0,
        "time": 30,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Công ty yêu cầu bằng cấp hoặc kinh nghiệm. Hệ nghề nghiệp sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_BANKINFO",
        "name": "Hỏi thông tin ngân hàng",
        "legacyId": "bankinfo",
        "building": "BLD_BANK",
        "detail": "15 phút",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Tìm hiểu ngân hàng. Giao dịch sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_BUYBIKE",
        "name": "Mua xe đạp cũ",
        "legacyId": "buybike",
        "building": "BLD_BIKE",
        "detail": "350.000đ · có thể sử dụng ngay",
        "cash": -350000,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Mua chiếc xe đạp đầu tiên.",
        "rule": "buybike",
        "job": null,
        "asset": "VEH_BIKE",
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_RIDE",
        "name": "Lên / xuống xe đạp",
        "legacyId": "ride",
        "building": "BLD_BIKE",
        "detail": "Đổi chế độ di chuyển",
        "cash": 0,
        "time": 0,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Đổi phương tiện di chuyển.",
        "rule": "ride",
        "job": null,
        "asset": "VEH_BIKE",
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_CLINICINFO",
        "name": "Hỏi thông tin khám bệnh",
        "legacyId": "clinicinfo",
        "building": "BLD_CLINIC",
        "detail": "15 phút",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Phòng khám sẽ hỗ trợ điều trị trong phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_MALL",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_mall",
        "building": "BLD_MALL",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Trung tâm thương mại Ánh Dương. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_MARKET",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_market",
        "building": "BLD_MARKET",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Siêu thị An Lạc. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_FACTORY",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_factory",
        "building": "BLD_FACTORY",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Nhà máy Đông An. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_WAREHOUSE",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_warehouse",
        "building": "BLD_WAREHOUSE",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Kho logistics. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_SCHOOL",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_school",
        "building": "BLD_SCHOOL",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã tìm hiểu các cơ hội học tập tại Trường nghề An Lạc và cụm đào tạo chung.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_LIBRARY",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_library",
        "building": "BLD_LIBRARY",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã tìm hiểu các cơ hội học tập tại thư viện thành phố.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_FARM",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_farm",
        "building": "BLD_FARM",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Nông trại Bình An. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_SPORT",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_sport",
        "building": "BLD_SPORT",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Sân thể thao. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_CITYHALL",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_cityhall",
        "building": "BLD_CITYHALL",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Trung tâm hành chính. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_COURT",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_court",
        "building": "BLD_COURT",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Tòa án An Lạc. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_HOSPITAL",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_hospital",
        "building": "BLD_HOSPITAL",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Bệnh viện An Lạc. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_APARTMENT",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_apartment",
        "building": "BLD_APARTMENT",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Chung cư Bình Minh. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_PARK_EAST",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_park_east",
        "building": "BLD_PARK_EAST",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Công viên phía Đông. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_VISIT_POLICE",
        "name": "Tham quan / tìm hiểu",
        "legacyId": "visit_police",
        "building": "BLD_POLICE",
        "detail": "15 phút · không mất phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "log": "Bạn đã ghé Công an thành phố. Các dịch vụ chuyên sâu sẽ mở ở phiên bản sau.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_SHOWER",
        "name": "Tắm rửa trong phòng",
        "legacyId": "shower",
        "building": "BLD_ROOM",
        "detail": "20 phút · phục hồi vệ sinh",
        "cash": 0,
        "time": 20,
        "energy": 0,
        "hunger": 0,
        "happy": 3,
        "hygiene": 100,
        "health": 2,
        "stress": -5,
        "log": "Tắm rửa trong phòng.",
        "rule": "room",
        "job": null,
        "asset": null,
        "hydration": 0
      },
      {
        "id": "ACT_WASH",
        "name": "Rửa mặt tại công viên",
        "legacyId": "wash",
        "building": "BLD_PARK",
        "detail": "15 phút · miễn phí",
        "cash": 0,
        "time": 15,
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "hygiene": 35,
        "health": 0,
        "stress": -2,
        "log": "Rửa mặt tại công viên.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hydration": 0
      },
      {
        "id": "ACT_AID",
        "name": "Nhận suất ăn hỗ trợ",
        "legacyId": "aid",
        "building": "BLD_PARK",
        "detail": "30 phút · chỉ khi thiếu tiền hoặc quá đói",
        "cash": 0,
        "time": 30,
        "energy": 0,
        "hunger": 35,
        "happy": 2,
        "hygiene": 0,
        "health": 5,
        "stress": -3,
        "log": "Nhận suất ăn hỗ trợ.",
        "rule": "aid",
        "job": null,
        "asset": null,
        "hydration": 15
      },
      {
        "id": "ACT_NAP",
        "name": "Chợp mắt tại công viên",
        "legacyId": "nap",
        "building": "BLD_PARK",
        "detail": "2 giờ · nghỉ tạm miễn phí",
        "cash": 0,
        "time": 120,
        "energy": 25,
        "hunger": 0,
        "happy": 0,
        "hygiene": 0,
        "health": 5,
        "stress": -5,
        "log": "Chợp mắt tại công viên.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hydration": 0
      },
      {
        "id": "ACT_TREATMENT",
        "name": "Khám và nghỉ phục hồi",
        "legacyId": "treatment",
        "building": "BLD_CLINIC",
        "detail": "1 giờ · 50.000đ",
        "cash": -50000,
        "time": 60,
        "energy": 10,
        "hunger": 0,
        "happy": 0,
        "hygiene": 0,
        "health": 30,
        "stress": -10,
        "log": "Khám và nghỉ phục hồi.",
        "rule": "none",
        "job": null,
        "asset": null,
        "hydration": 0
      },
      {
        "id": "ACT_CAFE_SHIFT",
        "legacyId": "cafe_shift",
        "name": "Phụ quán cà phê",
        "building": "BLD_CAFE",
        "detail": "2 giờ · +95.000đ",
        "cash": 95000,
        "time": 120,
        "rule": "work",
        "job": "JOB_CAFE_SHIFT",
        "asset": null,
        "log": "Phụ quán cà phê.",
        "energy": -12,
        "hunger": -10,
        "happy": -2,
        "hygiene": -2,
        "health": 0,
        "stress": 4,
        "hydration": -6
      },
      {
        "id": "ACT_MARKET_SHIFT",
        "legacyId": "market_shift",
        "name": "Xếp hàng siêu thị",
        "building": "BLD_MARKET",
        "detail": "3 giờ · +160.000đ",
        "cash": 160000,
        "time": 180,
        "rule": "work",
        "job": "JOB_MARKET_SHIFT",
        "asset": null,
        "log": "Xếp hàng siêu thị.",
        "energy": -18,
        "hunger": -14,
        "happy": -2,
        "hygiene": -4,
        "health": 0,
        "stress": 6,
        "hydration": -6
      },
      {
        "id": "ACT_WAREHOUSE_SHIFT",
        "legacyId": "warehouse_shift",
        "name": "Bốc xếp kho",
        "building": "BLD_WAREHOUSE",
        "detail": "5 giờ · +260.000đ",
        "cash": 260000,
        "time": 300,
        "rule": "work",
        "job": "JOB_WAREHOUSE_SHIFT",
        "asset": null,
        "log": "Bốc xếp kho.",
        "energy": -35,
        "hunger": -25,
        "happy": -2,
        "hygiene": -10,
        "health": 0,
        "stress": 12,
        "hydration": -6
      },
      {
        "id": "ACT_FARM_SHIFT",
        "legacyId": "farm_shift",
        "name": "Phụ việc nông trại",
        "building": "BLD_FARM",
        "detail": "4 giờ · +180.000đ",
        "cash": 180000,
        "time": 240,
        "rule": "work",
        "job": "JOB_FARM_SHIFT",
        "asset": null,
        "log": "Phụ việc nông trại.",
        "energy": -25,
        "hunger": -20,
        "happy": -2,
        "hygiene": -8,
        "health": 0,
        "stress": 6,
        "hydration": -6
      },
      {
        "id": "ACT_EXERCISE",
        "legacyId": "exercise",
        "name": "Tập thể dục ngoài trời",
        "building": "BLD_SPORT",
        "detail": "45 phút · miễn phí",
        "cash": 0,
        "time": 45,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Tập thể dục ngoài trời.",
        "energy": -12,
        "hunger": -8,
        "happy": 8,
        "hygiene": -5,
        "health": 6,
        "stress": -10,
        "hydration": -10
      },
      {
        "id": "ACT_WALK_PARK",
        "legacyId": "walk_park",
        "name": "Đi dạo công viên",
        "building": "BLD_PARK_EAST",
        "detail": "30 phút · miễn phí",
        "cash": 0,
        "time": 30,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Đi dạo công viên.",
        "energy": -3,
        "hunger": 0,
        "happy": 9,
        "hygiene": 0,
        "health": 0,
        "stress": -8,
        "hydration": 0
      },
      {
        "id": "ACT_CINEMA",
        "legacyId": "cinema",
        "name": "Xem phim",
        "building": "BLD_MALL",
        "detail": "2 giờ · 100.000đ",
        "cash": -100000,
        "time": 120,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Xem phim.",
        "energy": 0,
        "hunger": 0,
        "happy": 25,
        "hygiene": 0,
        "health": 0,
        "stress": -15,
        "hydration": 0
      },
      {
        "id": "ACT_FREE_WATER",
        "legacyId": "free_water",
        "name": "Uống nước tại vòi công cộng",
        "building": "BLD_PARK",
        "detail": "5 phút · miễn phí",
        "cash": 0,
        "time": 5,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Uống nước tại vòi công cộng.",
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 40
      },
      {
        "id": "ACT_SHELTER",
        "legacyId": "shelter",
        "name": "Nghỉ đêm tại khu hỗ trợ",
        "building": "BLD_PARK",
        "detail": "6 giờ · miễn phí, phục hồi một phần",
        "cash": 0,
        "time": 360,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Nghỉ đêm tại khu hỗ trợ.",
        "energy": 70,
        "hunger": 0,
        "happy": -2,
        "hygiene": -10,
        "health": 8,
        "stress": -8,
        "hydration": 0
      },
      {
        "id": "ACT_RELIEF",
        "legacyId": "relief",
        "name": "Khám hỗ trợ khó khăn",
        "building": "BLD_CLINIC",
        "detail": "30 phút · miễn phí nếu nguy kịch và thiếu tiền",
        "cash": 0,
        "time": 30,
        "rule": "relief",
        "job": null,
        "asset": null,
        "log": "Khám hỗ trợ khó khăn.",
        "energy": 12,
        "hunger": 0,
        "happy": 0,
        "hygiene": 0,
        "health": 35,
        "stress": -10,
        "hydration": 0
      },
      {
        "id": "ACT_HOME_SMALL",
        "legacyId": "visit_home_small",
        "name": "Xem khu nhà",
        "building": "BLD_LOT_36_100",
        "detail": "5 phút · tham quan bên ngoài",
        "cash": 0,
        "time": 5,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Tham quan Nhà nhỏ An Bình.",
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_HOME_TOWN",
        "legacyId": "visit_home_town",
        "name": "Xem khu nhà",
        "building": "BLD_LOT_60_100",
        "detail": "5 phút · tham quan bên ngoài",
        "cash": 0,
        "time": 5,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Tham quan Nhà phố Hòa Phát.",
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      },
      {
        "id": "ACT_HOME_VILLA",
        "legacyId": "visit_home_villa",
        "name": "Xem khu nhà",
        "building": "BLD_LOT_60_188",
        "detail": "5 phút · tham quan bên ngoài",
        "cash": 0,
        "time": 5,
        "rule": "none",
        "job": null,
        "asset": null,
        "log": "Tham quan Biệt thự Vườn Xanh.",
        "energy": 0,
        "hunger": 0,
        "happy": 0,
        "hygiene": 0,
        "health": 0,
        "stress": 0,
        "hydration": 0
      }
    ],
    "NPC_Master": [
      {
        "id": "NPC_LAN",
        "name": "Lan",
        "personality": "TRA_SOCIAL",
        "behavior": "service",
        "homeDistrict": "DST_RESIDENTIAL",
        "workplace": "BLD_SHOP",
        "description": "Quản lý cửa hàng, hỗ trợ việc thời vụ.",
        "fullName": "Nguyễn Ngọc Lan",
        "age": 29,
        "gender": "female",
        "occupation": "Quản lý cửa hàng",
        "home": "BLD_DECOR_00",
        "leisure": "BLD_PARK",
        "workStart": 480,
        "workEnd": 960,
        "color": "#c97879",
        "dialogue": "Khởi đầu khó khăn, nhưng chăm chỉ rồi sẽ có cơ hội."
      },
      {
        "id": "NPC_NAM",
        "name": "Nam",
        "personality": "TRA_DISCIPLINED",
        "behavior": "work",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_OFFICE",
        "description": "Nhân viên văn phòng.",
        "fullName": "Trần Hoài Nam",
        "age": 25,
        "gender": "male",
        "occupation": "Nhân viên văn phòng",
        "home": "BLD_DECOR_02",
        "leisure": "BLD_CAFE",
        "workStart": 480,
        "workEnd": 960,
        "color": "#517fb5",
        "dialogue": "Tôi từng làm thời vụ trước khi vào công ty."
      },
      {
        "id": "NPC_THAO",
        "name": "Thảo",
        "personality": "TRA_CURIOUS",
        "behavior": "study",
        "homeDistrict": "DST_RESIDENTIAL",
        "workplace": "BLD_SCHOOL",
        "description": "Bạn trẻ đang học nghề.",
        "fullName": "Lê Minh Thảo",
        "age": 19,
        "gender": "female",
        "occupation": "Học viên trường nghề",
        "home": "BLD_DECOR_01",
        "leisure": "BLD_LIBRARY",
        "workStart": 480,
        "workEnd": 900,
        "color": "#a879b3",
        "dialogue": "Tôi đang học nghề. Có kiến thức thì dễ tìm cơ hội hơn."
      },
      {
        "id": "NPC_HUNG",
        "name": "Hùng",
        "personality": "TRA_CAREFUL",
        "behavior": "service",
        "homeDistrict": "DST_SERVICE",
        "workplace": "BLD_BIKE",
        "description": "Chủ cửa hàng xe.",
        "fullName": "Phạm Quốc Hùng",
        "age": 39,
        "gender": "male",
        "occupation": "Chủ cửa hàng xe",
        "home": "BLD_DECOR_07",
        "leisure": "BLD_PARK",
        "workStart": 480,
        "workEnd": 1080,
        "color": "#b18c55",
        "dialogue": "Có xe đi làm sẽ thuận tiện hơn, nhưng nhớ tính chi phí."
      },
      {
        "id": "NPC_MAI",
        "name": "Mai",
        "personality": "TRA_SOCIAL",
        "behavior": "service",
        "homeDistrict": "DST_RESIDENTIAL",
        "workplace": "BLD_CAFE",
        "description": "Nhân viên cà phê.",
        "fullName": "Vũ Thanh Mai",
        "age": 23,
        "gender": "female",
        "occupation": "Nhân viên cà phê",
        "home": "BLD_DECOR_11",
        "leisure": "BLD_PARK",
        "workStart": 420,
        "workEnd": 900,
        "color": "#d290a5",
        "dialogue": "Một ngày nghỉ ngơi đúng lúc cũng có ích lắm."
      },
      {
        "id": "NPC_DUC",
        "name": "Đức",
        "personality": "TRA_DETERMINED",
        "behavior": "work",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_BANK",
        "description": "Nhân viên ngân hàng.",
        "fullName": "Đỗ Anh Đức",
        "age": 31,
        "gender": "male",
        "occupation": "Nhân viên ngân hàng",
        "home": "BLD_DECOR_03",
        "leisure": "BLD_CAFE",
        "workStart": 480,
        "workEnd": 960,
        "color": "#627e9c",
        "dialogue": "Tôi luôn để riêng một khoản dự phòng."
      },
      {
        "id": "NPC_LINH",
        "name": "Linh",
        "personality": "TRA_CAREFUL",
        "behavior": "service",
        "homeDistrict": "DST_SERVICE",
        "workplace": "BLD_CLINIC",
        "description": "Nhân viên y tế.",
        "fullName": "Ngô Khánh Linh",
        "age": 27,
        "gender": "female",
        "occupation": "Nhân viên y tế",
        "home": "BLD_DECOR_09",
        "leisure": "BLD_PARK_EAST",
        "workStart": 480,
        "workEnd": 960,
        "color": "#8cc4b5",
        "dialogue": "Đừng quên chăm sóc sức khỏe khi bận rộn."
      },
      {
        "id": "NPC_AN",
        "name": "An",
        "personality": "TRA_IMPULSIVE",
        "behavior": "visit",
        "homeDistrict": "DST_LEISURE",
        "workplace": "BLD_PARK",
        "description": "Người bạn có lối sống phóng khoáng.",
        "fullName": "Bùi Gia An",
        "age": 21,
        "gender": "male",
        "occupation": "Lao động tự do",
        "home": "BLD_DECOR_04",
        "leisure": "BLD_CAFE",
        "workStart": 540,
        "workEnd": 960,
        "color": "#da9b55",
        "dialogue": "Tôi thích đi dạo và gặp gỡ những người mới."
      },
      {
        "id": "NPC_PHUC",
        "name": "Hoàng Minh Phúc",
        "personality": "TRA_DETERMINED",
        "behavior": "work",
        "description": "Công nhân tại thành phố An Lạc.",
        "fullName": "Hoàng Minh Phúc",
        "age": 33,
        "gender": "male",
        "occupation": "Công nhân",
        "home": "BLD_DECOR_08",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_FACTORY",
        "leisure": "BLD_PARK_EAST",
        "workStart": 420,
        "workEnd": 900,
        "color": "#789a76",
        "dialogue": "Làm việc ở nhà máy cần sức khỏe và tính kỷ luật."
      },
      {
        "id": "NPC_VY",
        "name": "Đặng Tường Vy",
        "personality": "TRA_SOCIAL",
        "behavior": "work",
        "description": "Nhân viên siêu thị tại thành phố An Lạc.",
        "fullName": "Đặng Tường Vy",
        "age": 24,
        "gender": "female",
        "occupation": "Nhân viên siêu thị",
        "home": "BLD_DECOR_12",
        "homeDistrict": "DST_SERVICE",
        "workplace": "BLD_MARKET",
        "leisure": "BLD_MALL",
        "workStart": 480,
        "workEnd": 960,
        "color": "#b9678b",
        "dialogue": "Tôi luôn so sánh giá trước khi mua sắm."
      },
      {
        "id": "NPC_KHOA",
        "name": "Phan Đăng Khoa",
        "personality": "TRA_DISCIPLINED",
        "behavior": "work",
        "description": "Kỹ thuật viên kho tại thành phố An Lạc.",
        "fullName": "Phan Đăng Khoa",
        "age": 28,
        "gender": "male",
        "occupation": "Kỹ thuật viên kho",
        "home": "BLD_DECOR_10",
        "homeDistrict": "DST_SERVICE",
        "workplace": "BLD_WAREHOUSE",
        "leisure": "BLD_PARK_EAST",
        "workStart": 480,
        "workEnd": 960,
        "color": "#a67a58",
        "dialogue": "Kho hàng lúc nào cũng có việc cần làm."
      },
      {
        "id": "NPC_YEN",
        "name": "Dương Hải Yến",
        "personality": "TRA_CURIOUS",
        "behavior": "work",
        "description": "Giảng viên tại thành phố An Lạc.",
        "fullName": "Dương Hải Yến",
        "age": 35,
        "gender": "female",
        "occupation": "Giảng viên",
        "home": "BLD_LOT_60_100",
        "homeDistrict": "DST_EDUCATION",
        "workplace": "BLD_SCHOOL",
        "leisure": "BLD_LIBRARY",
        "workStart": 480,
        "workEnd": 960,
        "color": "#688dba",
        "dialogue": "Kiến thức cần được áp dụng vào thực tế."
      },
      {
        "id": "NPC_QUAN",
        "name": "Võ Minh Quân",
        "personality": "TRA_CAREFUL",
        "behavior": "work",
        "description": "Nông dân tại thành phố An Lạc.",
        "fullName": "Võ Minh Quân",
        "age": 45,
        "gender": "male",
        "occupation": "Nông dân",
        "home": "BLD_DECOR_05",
        "homeDistrict": "DST_LEISURE",
        "workplace": "BLD_FARM",
        "leisure": "BLD_SPORT",
        "workStart": 420,
        "workEnd": 900,
        "color": "#83975d",
        "dialogue": "Mỗi vụ mùa đều cần sự kiên nhẫn."
      },
      {
        "id": "NPC_TRANG",
        "name": "Hồ Huyền Trang",
        "personality": "TRA_CURIOUS",
        "behavior": "work",
        "description": "Thủ thư tại thành phố An Lạc.",
        "fullName": "Hồ Huyền Trang",
        "age": 30,
        "gender": "female",
        "occupation": "Thủ thư",
        "home": "BLD_LOT_36_100",
        "homeDistrict": "DST_EDUCATION",
        "workplace": "BLD_LIBRARY",
        "leisure": "BLD_SPORT",
        "workStart": 480,
        "workEnd": 960,
        "color": "#d3a35c",
        "dialogue": "Thư viện có nhiều tài liệu miễn phí cho bạn."
      },
      {
        "id": "NPC_BINH",
        "name": "Lý Thanh Bình",
        "personality": "TRA_DISCIPLINED",
        "behavior": "work",
        "description": "Nhân viên hành chính tại thành phố An Lạc.",
        "fullName": "Lý Thanh Bình",
        "age": 42,
        "gender": "male",
        "occupation": "Nhân viên hành chính",
        "home": "BLD_LOT_156_188",
        "homeDistrict": "DST_HEALTH",
        "workplace": "BLD_CITYHALL",
        "leisure": "BLD_PARK_EAST",
        "workStart": 480,
        "workEnd": 960,
        "color": "#6d8a9f",
        "dialogue": "Giữ lời hứa rất quan trọng trong công việc."
      },
      {
        "id": "NPC_NHI",
        "name": "Tạ Hà Nhi",
        "personality": "TRA_CAREFUL",
        "behavior": "work",
        "description": "Điều dưỡng tại thành phố An Lạc.",
        "fullName": "Tạ Hà Nhi",
        "age": 26,
        "gender": "female",
        "occupation": "Điều dưỡng",
        "home": "BLD_APARTMENT",
        "homeDistrict": "DST_HEALTH",
        "workplace": "BLD_HOSPITAL",
        "leisure": "BLD_PARK_EAST",
        "workStart": 480,
        "workEnd": 960,
        "color": "#b7a0cc",
        "dialogue": "Tôi thích giúp mọi người cảm thấy tốt hơn."
      }
    ],
    "Relationships": [
      {
        "id": "REL_ACQUAINTANCE",
        "name": "Quen biết",
        "minTrust": 0,
        "description": "Mới gặp."
      },
      {
        "id": "REL_FRIEND",
        "name": "Bạn bè",
        "minTrust": 30,
        "description": "Có sự tin tưởng."
      },
      {
        "id": "REL_CLOSE",
        "name": "Bạn thân",
        "minTrust": 70,
        "description": "Có thể giúp đỡ nhau."
      },
      {
        "id": "REL_PARTNER",
        "name": "Đối tác",
        "minTrust": 50,
        "description": "Quan hệ công việc."
      },
      {
        "id": "REL_SPOUSE",
        "name": "Vợ/chồng",
        "minTrust": 75,
        "description": "Quan hệ gia đình."
      }
    ],
    "Relationship_Events": [
      {
        "id": "REV_HELP",
        "name": "Giúp đỡ",
        "relationship": "REL_FRIEND",
        "trustDelta": 10,
        "description": "Giúp bạn khi khó khăn."
      },
      {
        "id": "REV_PROMISE",
        "name": "Giữ lời hứa",
        "relationship": "REL_PARTNER",
        "trustDelta": 8,
        "description": "Hoàn thành cam kết."
      },
      {
        "id": "REV_NEGLECT",
        "name": "Bỏ bê",
        "relationship": "REL_SPOUSE",
        "trustDelta": -15,
        "description": "Không dành thời gian cho gia đình."
      },
      {
        "id": "REV_CONFLICT",
        "name": "Mâu thuẫn",
        "relationship": "REL_CLOSE",
        "trustDelta": -10,
        "description": "Bất đồng quan điểm."
      }
    ],
    "Family_Rules": [
      {
        "id": "FAM_MARRIAGE",
        "name": "Kết hôn",
        "minAge": 18,
        "minTrust": 75,
        "description": "Hai nhân vật trưởng thành đồng thuận, đã đính hôn và có nhà đủ sức chứa.",
        "minAffection": 80,
        "minDays": 7,
        "minutes": 120,
        "cost": 5000000,
        "dailyCost": 45000
      },
      {
        "id": "FAM_CHILD",
        "name": "Nuôi con",
        "minAge": 18,
        "minTrust": 75,
        "description": "Kế hoạch đón con tự nguyện; 270 ngày mô phỏng, cần nơi ở đủ sức chứa.",
        "minAffection": 75,
        "minDays": 270,
        "minutes": 30,
        "cost": 1000000,
        "dailyCost": 35000
      },
      {
        "id": "FAM_SEPARATION",
        "name": "Chia tay",
        "minAge": 18,
        "minTrust": 0,
        "description": "Chấm dứt quan hệ; con và nghĩa vụ chi phí vẫn được giữ.",
        "minAffection": 0,
        "minDays": 0,
        "minutes": 30,
        "cost": 0,
        "dailyCost": 0
      },
      {
        "id": "FAM_FLIRT",
        "name": "Bày tỏ sự quan tâm",
        "minAge": 18,
        "minTrust": 30,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 15,
        "cost": 0,
        "dailyCost": 0,
        "description": "Tăng tình cảm với một NPC đã quen."
      },
      {
        "id": "FAM_DATE",
        "name": "Hẹn hò đi dạo",
        "minAge": 18,
        "minTrust": 30,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 60,
        "cost": 0,
        "dailyCost": 0,
        "description": "Đi dạo cùng người đang tìm hiểu tại vị trí gặp mặt."
      },
      {
        "id": "FAM_GIFT",
        "name": "Tặng quà",
        "minAge": 18,
        "minTrust": 30,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 10,
        "cost": 100000,
        "dailyCost": 0,
        "description": "Mua và tặng quà trực tiếp."
      },
      {
        "id": "FAM_CONFESS",
        "name": "Tỏ tình",
        "minAge": 18,
        "minTrust": 50,
        "minAffection": 45,
        "minDays": 2,
        "minutes": 15,
        "cost": 0,
        "dailyCost": 0,
        "description": "NPC đồng ý khi đủ điều kiện."
      },
      {
        "id": "FAM_PROPOSE",
        "name": "Cầu hôn",
        "minAge": 18,
        "minTrust": 75,
        "minAffection": 80,
        "minDays": 7,
        "minutes": 30,
        "cost": 500000,
        "dailyCost": 0,
        "description": "Đính hôn nếu đủ điều kiện."
      },
      {
        "id": "FAM_TIME",
        "name": "Dành thời gian cho gia đình",
        "minAge": 18,
        "minTrust": 0,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 60,
        "cost": 0,
        "dailyCost": 0,
        "description": "Sinh hoạt chung tại nhà."
      },
      {
        "id": "FAM_ARGUMENT",
        "name": "Cãi vã",
        "minAge": 18,
        "minTrust": 0,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 10,
        "cost": 0,
        "dailyCost": 0,
        "description": "Mâu thuẫn ảnh hưởng tình cảm."
      },
      {
        "id": "FAM_RECONCILE",
        "name": "Hòa giải",
        "minAge": 18,
        "minTrust": 0,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 30,
        "cost": 0,
        "dailyCost": 0,
        "description": "Giải quyết mâu thuẫn."
      },
      {
        "id": "FAM_CARE",
        "name": "Chăm sóc con",
        "minAge": 18,
        "minTrust": 0,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 45,
        "cost": 0,
        "dailyCost": 0,
        "description": "Chăm sóc tại nhà hoặc khu hỗ trợ."
      },
      {
        "id": "FAM_DATE_CAFE",
        "name": "Hẹn hò tại quán cà phê",
        "minAge": 18,
        "minTrust": 30,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 60,
        "cost": 70000,
        "dailyCost": 0,
        "description": "Cả hai có mặt gần địa điểm, đủ giờ phục vụ."
      },
      {
        "id": "FAM_DATE_CINEMA",
        "name": "Hẹn hò xem phim",
        "minAge": 18,
        "minTrust": 30,
        "minAffection": 0,
        "minDays": 0,
        "minutes": 120,
        "cost": 200000,
        "dailyCost": 0,
        "description": "Cả hai có mặt gần địa điểm, đủ giờ phục vụ."
      }
    ],
    "Social_Reputation": [
      {
        "id": "REP_LOW",
        "name": "Uy tín thấp",
        "min": 0,
        "max": 29
      },
      {
        "id": "REP_NORMAL",
        "name": "Bình thường",
        "min": 30,
        "max": 69
      },
      {
        "id": "REP_HIGH",
        "name": "Được tin tưởng",
        "min": 70,
        "max": 100
      }
    ],
    "Education_Levels": [
      {
        "id": "EDU_NONE",
        "name": "Chưa có bằng chuyên môn",
        "rank": 0
      },
      {
        "id": "EDU_HIGH",
        "name": "THPT",
        "rank": 1
      },
      {
        "id": "EDU_VOC",
        "name": "Học nghề",
        "rank": 2
      },
      {
        "id": "EDU_COLLEGE",
        "name": "Cao đẳng",
        "rank": 3
      },
      {
        "id": "EDU_UNI",
        "name": "Đại học",
        "rank": 4
      },
      {
        "id": "EDU_POST",
        "name": "Sau đại học",
        "rank": 5
      }
    ],
    "Schools": [
      {
        "id": "SCHL_VOC",
        "name": "Trường nghề An Lạc",
        "district": "DST_EDUCATION",
        "level": "EDU_VOC",
        "building": "BLD_SCHOOL"
      },
      {
        "id": "SCHL_UNI",
        "name": "Đại học An Lạc",
        "district": "DST_EDUCATION",
        "level": "EDU_UNI",
        "building": "BLD_SCHOOL"
      },
      {
        "id": "SCHL_CENTER",
        "name": "Trung tâm kỹ năng",
        "district": "DST_EDUCATION",
        "level": "EDU_NONE",
        "building": "BLD_LIBRARY"
      }
    ],
    "Skills": [
      {
        "id": "SKL_SERVICE",
        "name": "Phục vụ",
        "maxLevel": 10,
        "description": "Chăm sóc khách hàng."
      },
      {
        "id": "SKL_SALES",
        "name": "Bán hàng",
        "maxLevel": 10,
        "description": "Tư vấn sản phẩm."
      },
      {
        "id": "SKL_IT",
        "name": "Lập trình",
        "maxLevel": 10,
        "description": "Xây dựng phần mềm."
      },
      {
        "id": "SKL_ACCOUNT",
        "name": "Kế toán",
        "maxLevel": 10,
        "description": "Quản lý sổ sách."
      },
      {
        "id": "SKL_MANAGE",
        "name": "Quản lý",
        "maxLevel": 10,
        "description": "Điều hành nhân sự."
      },
      {
        "id": "SKL_COOK",
        "name": "Nấu ăn",
        "maxLevel": 10,
        "description": "Chế biến món ăn."
      },
      {
        "id": "SKL_DRIVE",
        "name": "Lái xe",
        "maxLevel": 10,
        "description": "Điều khiển phương tiện."
      },
      {
        "id": "SKL_REPAIR",
        "name": "Sửa chữa",
        "maxLevel": 10,
        "description": "Bảo trì thiết bị."
      },
      {
        "id": "SKL_COMM",
        "name": "Giao tiếp",
        "maxLevel": 10,
        "description": "Tương tác xã hội."
      },
      {
        "id": "SKL_FINANCE",
        "name": "Tài chính",
        "maxLevel": 10,
        "description": "Quản lý tiền."
      },
      {
        "id": "SKL_TEACH",
        "name": "Giảng dạy",
        "maxLevel": 10,
        "description": "Truyền đạt kiến thức."
      },
      {
        "id": "SKL_MED",
        "name": "Y tế",
        "maxLevel": 10,
        "description": "Chăm sóc bệnh nhân."
      },
      {
        "id": "SKL_DESIGN",
        "name": "Thiết kế",
        "maxLevel": 10,
        "description": "Sáng tạo hình ảnh."
      },
      {
        "id": "SKL_BUILD",
        "name": "Xây dựng",
        "maxLevel": 10,
        "description": "Thi công cơ bản."
      },
      {
        "id": "SKL_FARM",
        "name": "Nông nghiệp",
        "maxLevel": 10,
        "description": "Canh tác."
      }
    ],
    "Courses": [
      {
        "id": "CRS_SERVICE",
        "name": "Phục vụ cơ bản",
        "school": "SCHL_CENTER",
        "skill": "SKL_SERVICE",
        "fee": 300000,
        "durationDays": 7,
        "gain": 1,
        "kind": "certificate",
        "awardLevel": null,
        "requiresLevel": "EDU_HIGH",
        "sessions": 3,
        "sessionMinutes": 60
      },
      {
        "id": "CRS_IT",
        "name": "Lập trình nhập môn",
        "school": "SCHL_VOC",
        "skill": "SKL_IT",
        "fee": 3000000,
        "durationDays": 60,
        "gain": 2,
        "kind": "certificate",
        "awardLevel": null,
        "requiresLevel": "EDU_HIGH",
        "sessions": 12,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_ACCOUNT",
        "name": "Kế toán cơ bản",
        "school": "SCHL_CENTER",
        "skill": "SKL_ACCOUNT",
        "fee": 1500000,
        "durationDays": 30,
        "gain": 2,
        "kind": "certificate",
        "awardLevel": null,
        "requiresLevel": "EDU_HIGH",
        "sessions": 8,
        "sessionMinutes": 60
      },
      {
        "id": "CRS_COOK",
        "name": "Nghề bếp",
        "school": "SCHL_VOC",
        "skill": "SKL_COOK",
        "fee": 2000000,
        "durationDays": 45,
        "gain": 2,
        "kind": "certificate",
        "awardLevel": null,
        "requiresLevel": "EDU_HIGH",
        "sessions": 10,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_MANAGE",
        "name": "Quản trị",
        "school": "SCHL_UNI",
        "skill": "SKL_MANAGE",
        "fee": 12000000,
        "durationDays": 180,
        "gain": 3,
        "kind": "certificate",
        "awardLevel": null,
        "requiresLevel": "EDU_HIGH",
        "sessions": 24,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_REPAIR",
        "name": "Sửa chữa xe",
        "school": "SCHL_VOC",
        "skill": "SKL_REPAIR",
        "fee": 2500000,
        "durationDays": 60,
        "gain": 2,
        "kind": "certificate",
        "awardLevel": null,
        "requiresLevel": "EDU_HIGH",
        "sessions": 12,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_VOC_IT",
        "name": "Chương trình nghề CNTT",
        "school": "SCHL_VOC",
        "skill": "SKL_IT",
        "fee": 6000000,
        "durationDays": 90,
        "gain": 3,
        "kind": "degree",
        "awardLevel": "EDU_VOC",
        "requiresLevel": "EDU_HIGH",
        "sessions": 18,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_VOC_COOK",
        "name": "Chương trình nghề đầu bếp",
        "school": "SCHL_VOC",
        "skill": "SKL_COOK",
        "fee": 4500000,
        "durationDays": 90,
        "gain": 3,
        "kind": "degree",
        "awardLevel": "EDU_VOC",
        "requiresLevel": "EDU_HIGH",
        "sessions": 18,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_COL_ACCOUNT",
        "name": "Cao đẳng kế toán",
        "school": "SCHL_VOC",
        "skill": "SKL_ACCOUNT",
        "fee": 10000000,
        "durationDays": 180,
        "gain": 4,
        "kind": "degree",
        "awardLevel": "EDU_COLLEGE",
        "requiresLevel": "EDU_HIGH",
        "sessions": 36,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_UNI_MANAGE",
        "name": "Đại học quản trị kinh doanh",
        "school": "SCHL_UNI",
        "skill": "SKL_MANAGE",
        "fee": 24000000,
        "durationDays": 365,
        "gain": 5,
        "kind": "degree",
        "awardLevel": "EDU_UNI",
        "requiresLevel": "EDU_HIGH",
        "sessions": 72,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_UNI_TEACH",
        "name": "Đại học sư phạm",
        "school": "SCHL_UNI",
        "skill": "SKL_TEACH",
        "fee": 22000000,
        "durationDays": 365,
        "gain": 5,
        "kind": "degree",
        "awardLevel": "EDU_UNI",
        "requiresLevel": "EDU_HIGH",
        "sessions": 72,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_COL_MED",
        "name": "Cao đẳng điều dưỡng",
        "school": "SCHL_VOC",
        "skill": "SKL_MED",
        "fee": 14000000,
        "durationDays": 180,
        "gain": 4,
        "kind": "degree",
        "awardLevel": "EDU_COLLEGE",
        "requiresLevel": "EDU_HIGH",
        "sessions": 36,
        "sessionMinutes": 120
      },
      {
        "id": "CRS_VOC_DESIGN",
        "name": "Chương trình nghề thiết kế",
        "school": "SCHL_VOC",
        "skill": "SKL_DESIGN",
        "fee": 6500000,
        "durationDays": 90,
        "gain": 3,
        "kind": "degree",
        "awardLevel": "EDU_VOC",
        "requiresLevel": "EDU_HIGH",
        "sessions": 18,
        "sessionMinutes": 120
      }
    ],
    "Industries": [
      {
        "id": "IND_LABOR",
        "name": "Lao động",
        "description": "Việc phổ thông."
      },
      {
        "id": "IND_SERVICE",
        "name": "Dịch vụ",
        "description": "Bán lẻ và ăn uống."
      },
      {
        "id": "IND_IT",
        "name": "Công nghệ",
        "description": "Phần mềm và IT."
      },
      {
        "id": "IND_FIN",
        "name": "Tài chính",
        "description": "Kế toán, ngân hàng."
      },
      {
        "id": "IND_TRANSPORT",
        "name": "Vận tải",
        "description": "Vận chuyển."
      },
      {
        "id": "IND_EDU",
        "name": "Giáo dục",
        "description": "Giảng dạy."
      },
      {
        "id": "IND_MED",
        "name": "Y tế",
        "description": "Chăm sóc sức khỏe."
      },
      {
        "id": "IND_BUILD",
        "name": "Xây dựng",
        "description": "Thi công."
      },
      {
        "id": "IND_MEDIA",
        "name": "Truyền thông",
        "description": "Sáng tạo."
      },
      {
        "id": "IND_FARM",
        "name": "Nông nghiệp",
        "description": "Canh tác."
      }
    ],
    "Jobs": [
      {
        "id": "JOB_TEMP",
        "name": "Lao động thời vụ",
        "industry": "IND_LABOR",
        "education": "EDU_NONE",
        "skills": [],
        "pay": 200000,
        "payPeriod": "shift",
        "shiftMinutes": 240,
        "stress": 25,
        "minSkillLevel": 0,
        "practiceSkill": "SKL_SERVICE",
        "practiceXp": 10
      },
      {
        "id": "JOB_WORKER",
        "name": "Công nhân",
        "industry": "IND_LABOR",
        "education": "EDU_NONE",
        "skills": [],
        "pay": 7000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 40,
        "minSkillLevel": 0,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_CASHIER",
        "name": "Thu ngân",
        "industry": "IND_SERVICE",
        "education": "EDU_HIGH",
        "skills": [
          "SKL_SERVICE"
        ],
        "pay": 6500000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 30,
        "minSkillLevel": 1,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_SALES",
        "name": "Nhân viên bán hàng",
        "industry": "IND_SERVICE",
        "education": "EDU_HIGH",
        "skills": [
          "SKL_SALES"
        ],
        "pay": 8000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 45,
        "minSkillLevel": 1,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_COOK",
        "name": "Đầu bếp",
        "industry": "IND_SERVICE",
        "education": "EDU_VOC",
        "skills": [
          "SKL_COOK"
        ],
        "pay": 11000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 50,
        "minSkillLevel": 2,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_DEV",
        "name": "Lập trình viên",
        "industry": "IND_IT",
        "education": "EDU_VOC",
        "skills": [
          "SKL_IT"
        ],
        "pay": 16000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 55,
        "minSkillLevel": 2,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_LEAD",
        "name": "Trưởng nhóm kỹ thuật",
        "industry": "IND_IT",
        "education": "EDU_VOC",
        "skills": [
          "SKL_IT",
          "SKL_MANAGE"
        ],
        "pay": 26000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 65,
        "minSkillLevel": 3,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_ACCOUNT",
        "name": "Kế toán",
        "industry": "IND_FIN",
        "education": "EDU_COLLEGE",
        "skills": [
          "SKL_ACCOUNT"
        ],
        "pay": 11000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 45,
        "minSkillLevel": 2,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_MANAGER",
        "name": "Quản lý",
        "industry": "IND_SERVICE",
        "education": "EDU_COLLEGE",
        "skills": [
          "SKL_MANAGE"
        ],
        "pay": 18000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 60,
        "minSkillLevel": 3,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_DRIVER",
        "name": "Tài xế",
        "industry": "IND_TRANSPORT",
        "education": "EDU_NONE",
        "skills": [
          "SKL_DRIVE"
        ],
        "pay": 10000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 45,
        "minSkillLevel": 1,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_TEACHER",
        "name": "Giáo viên",
        "industry": "IND_EDU",
        "education": "EDU_UNI",
        "skills": [
          "SKL_TEACH"
        ],
        "pay": 12000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 40,
        "minSkillLevel": 2,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_NURSE",
        "name": "Điều dưỡng",
        "industry": "IND_MED",
        "education": "EDU_COLLEGE",
        "skills": [
          "SKL_MED"
        ],
        "pay": 11000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 55,
        "minSkillLevel": 2,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_BUILDER",
        "name": "Thợ xây",
        "industry": "IND_BUILD",
        "education": "EDU_NONE",
        "skills": [
          "SKL_BUILD"
        ],
        "pay": 9000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 45,
        "minSkillLevel": 1,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_DESIGNER",
        "name": "Thiết kế",
        "industry": "IND_MEDIA",
        "education": "EDU_VOC",
        "skills": [
          "SKL_DESIGN"
        ],
        "pay": 12000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 45,
        "minSkillLevel": 2,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_FARMER",
        "name": "Nông dân",
        "industry": "IND_FARM",
        "education": "EDU_NONE",
        "skills": [
          "SKL_FARM"
        ],
        "pay": 7000000,
        "payPeriod": "month",
        "shiftMinutes": 480,
        "stress": 35,
        "minSkillLevel": 1,
        "practiceSkill": null,
        "practiceXp": 0
      },
      {
        "id": "JOB_CAFE_SHIFT",
        "name": "Phụ quán cà phê",
        "industry": "IND_LABOR",
        "education": "EDU_NONE",
        "skills": [],
        "pay": 95000,
        "payPeriod": "shift",
        "shiftMinutes": 120,
        "stress": 15,
        "minSkillLevel": 0,
        "practiceSkill": "SKL_SERVICE",
        "practiceXp": 6
      },
      {
        "id": "JOB_MARKET_SHIFT",
        "name": "Xếp hàng siêu thị",
        "industry": "IND_LABOR",
        "education": "EDU_NONE",
        "skills": [],
        "pay": 160000,
        "payPeriod": "shift",
        "shiftMinutes": 180,
        "stress": 20,
        "minSkillLevel": 0,
        "practiceSkill": "SKL_SALES",
        "practiceXp": 8
      },
      {
        "id": "JOB_WAREHOUSE_SHIFT",
        "name": "Bốc xếp kho",
        "industry": "IND_LABOR",
        "education": "EDU_NONE",
        "skills": [],
        "pay": 260000,
        "payPeriod": "shift",
        "shiftMinutes": 300,
        "stress": 35,
        "minSkillLevel": 0,
        "practiceSkill": "SKL_BUILD",
        "practiceXp": 12
      },
      {
        "id": "JOB_FARM_SHIFT",
        "name": "Phụ việc nông trại",
        "industry": "IND_LABOR",
        "education": "EDU_NONE",
        "skills": [],
        "pay": 180000,
        "payPeriod": "shift",
        "shiftMinutes": 240,
        "stress": 25,
        "minSkillLevel": 0,
        "practiceSkill": "SKL_FARM",
        "practiceXp": 10
      }
    ],
    "Employers": [
      {
        "id": "EMP_SHOP",
        "name": "Cửa hàng tiện lợi",
        "building": "BLD_SHOP",
        "jobs": [
          "JOB_TEMP",
          "JOB_CASHIER",
          "JOB_SALES",
          "JOB_MANAGER"
        ]
      },
      {
        "id": "EMP_ANPHAT",
        "name": "Công ty An Phát",
        "building": "BLD_OFFICE",
        "jobs": [
          "JOB_DEV",
          "JOB_LEAD",
          "JOB_ACCOUNT",
          "JOB_MANAGER",
          "JOB_DESIGNER"
        ]
      },
      {
        "id": "EMP_CAFE",
        "name": "Cà phê An Lạc",
        "building": "BLD_CAFE",
        "jobs": [
          "JOB_COOK",
          "JOB_TEMP"
        ]
      },
      {
        "id": "EMP_CLINIC",
        "name": "Phòng khám An Lạc",
        "building": "BLD_CLINIC",
        "jobs": [
          "JOB_NURSE"
        ]
      },
      {
        "id": "EMP_FACTORY",
        "name": "Nhà máy Đông An",
        "building": "BLD_FACTORY",
        "jobs": [
          "JOB_WORKER",
          "JOB_BUILDER"
        ]
      },
      {
        "id": "EMP_LOGISTICS",
        "name": "Kho logistics",
        "building": "BLD_WAREHOUSE",
        "jobs": [
          "JOB_DRIVER"
        ]
      },
      {
        "id": "EMP_SCHOOL",
        "name": "Trường nghề An Lạc",
        "building": "BLD_SCHOOL",
        "jobs": [
          "JOB_TEACHER"
        ]
      },
      {
        "id": "EMP_FARM",
        "name": "Nông trại Bình An",
        "building": "BLD_FARM",
        "jobs": [
          "JOB_FARMER"
        ]
      },
      {
        "id": "EMP_MARKET",
        "name": "Siêu thị An Lạc",
        "building": "BLD_MARKET",
        "jobs": [
          "JOB_CASHIER",
          "JOB_SALES",
          "JOB_MANAGER"
        ]
      },
      {
        "id": "EMP_HOSPITAL",
        "name": "Bệnh viện An Lạc",
        "building": "BLD_HOSPITAL",
        "jobs": [
          "JOB_NURSE"
        ]
      }
    ],
    "Career_Paths": [
      {
        "id": "CAR_TEMP_CASH",
        "name": "Thời vụ → Thu ngân",
        "from": "JOB_TEMP",
        "to": "JOB_CASHIER",
        "experienceMonths": 3
      },
      {
        "id": "CAR_CASH_SALES",
        "name": "Thu ngân → Bán hàng",
        "from": "JOB_CASHIER",
        "to": "JOB_SALES",
        "experienceMonths": 6
      },
      {
        "id": "CAR_SALES_MANAGER",
        "name": "Bán hàng → Quản lý",
        "from": "JOB_SALES",
        "to": "JOB_MANAGER",
        "experienceMonths": 24
      },
      {
        "id": "CAR_DEV_LEAD",
        "name": "Lập trình viên → Trưởng nhóm",
        "from": "JOB_DEV",
        "to": "JOB_LEAD",
        "experienceMonths": 36
      }
    ],
    "Items": [
      {
        "id": "ITM_PHONE",
        "name": "Điện thoại cũ",
        "price": 500000,
        "category": "personal",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_BAG",
        "name": "Ba lô",
        "price": 150000,
        "category": "personal",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_BOOK",
        "name": "Sách học nghề",
        "price": 80000,
        "category": "study",
        "shops": [
          "BLD_LIBRARY",
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_LAPTOP",
        "name": "Laptop cơ bản",
        "price": 7000000,
        "category": "study",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_HELMET",
        "name": "Mũ bảo hiểm",
        "price": 250000,
        "category": "utility",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_RICE",
        "name": "Gạo (1 phần)",
        "price": 6000,
        "category": "ingredient",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_EGG",
        "name": "Trứng (1 quả)",
        "price": 4000,
        "category": "ingredient",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_VEG",
        "name": "Rau (1 phần)",
        "price": 5000,
        "category": "ingredient",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_DRY_NOODLE",
        "name": "Mì gói chưa nấu",
        "price": 5000,
        "category": "ingredient",
        "shops": [
          "BLD_MARKET"
        ],
        "useMinutes": 0,
        "hygiene": 0
      },
      {
        "id": "ITM_WIPES",
        "name": "Khăn ướt",
        "price": 8000,
        "category": "utility",
        "shops": [
          "BLD_MARKET",
          "BLD_SHOP"
        ],
        "useMinutes": 5,
        "hygiene": 25
      }
    ],
    "Food_Drinks": [
      {
        "id": "FOOD_MEAL",
        "name": "Cơm hộp",
        "price": 30000,
        "hunger": 35,
        "energy": 2,
        "happy": 3,
        "shops": [
          "BLD_SHOP",
          "BLD_MARKET"
        ],
        "useMinutes": 15,
        "hydration": 5,
        "ingredients": [],
        "cookMinutes": 0
      },
      {
        "id": "FOOD_COFFEE",
        "name": "Cà phê",
        "price": 35000,
        "hunger": -3,
        "energy": 15,
        "happy": 8,
        "shops": [
          "BLD_CAFE"
        ],
        "useMinutes": 5,
        "hydration": 10,
        "ingredients": [],
        "cookMinutes": 0
      },
      {
        "id": "FOOD_WATER",
        "name": "Nước uống",
        "price": 10000,
        "hunger": 0,
        "energy": 2,
        "happy": 0,
        "shops": [
          "BLD_SHOP",
          "BLD_MARKET"
        ],
        "useMinutes": 5,
        "hydration": 40,
        "ingredients": [],
        "cookMinutes": 0
      },
      {
        "id": "FOOD_NOODLES",
        "name": "Mì",
        "price": 25000,
        "hunger": 25,
        "energy": 1,
        "happy": 2,
        "shops": [
          "BLD_SHOP",
          "BLD_MARKET"
        ],
        "useMinutes": 15,
        "hydration": 5,
        "ingredients": [],
        "cookMinutes": 0
      },
      {
        "id": "FOOD_FRUIT",
        "name": "Trái cây",
        "price": 20000,
        "hunger": 15,
        "energy": 2,
        "happy": 2,
        "shops": [
          "BLD_SHOP",
          "BLD_MARKET"
        ],
        "useMinutes": 15,
        "hydration": 10,
        "ingredients": [],
        "cookMinutes": 0
      },
      {
        "id": "FOOD_BREAD",
        "name": "Bánh mì",
        "price": 12000,
        "hunger": 23,
        "energy": 2,
        "happy": 2,
        "hydration": 0,
        "shops": [
          "BLD_SHOP",
          "BLD_MARKET"
        ],
        "useMinutes": 15,
        "ingredients": [],
        "cookMinutes": 0
      },
      {
        "id": "FOOD_MILK",
        "name": "Sữa hộp",
        "price": 15000,
        "hunger": 12,
        "energy": 5,
        "happy": 3,
        "hydration": 20,
        "shops": [
          "BLD_SHOP",
          "BLD_MARKET"
        ],
        "useMinutes": 15,
        "ingredients": [],
        "cookMinutes": 0
      },
      {
        "id": "FOOD_HOME_RICE",
        "name": "Cơm trứng rau tự nấu",
        "price": 25000,
        "hunger": 50,
        "energy": 4,
        "happy": 6,
        "hydration": 8,
        "shops": [],
        "useMinutes": 15,
        "ingredients": [
          "ITM_RICE",
          "ITM_EGG",
          "ITM_VEG"
        ],
        "cookMinutes": 35
      },
      {
        "id": "FOOD_HOME_NOODLES",
        "name": "Mì trứng tự nấu",
        "price": 18000,
        "hunger": 38,
        "energy": 3,
        "happy": 4,
        "hydration": 12,
        "shops": [],
        "useMinutes": 15,
        "ingredients": [
          "ITM_DRY_NOODLE",
          "ITM_EGG"
        ],
        "cookMinutes": 20
      }
    ],
    "Activities": [
      {
        "id": "ATV_PARK",
        "name": "Nghỉ ở công viên",
        "minutes": 60,
        "price": 0,
        "happy": 12,
        "description": "Hoạt động miễn phí."
      },
      {
        "id": "ATV_CINEMA",
        "name": "Xem phim",
        "minutes": 120,
        "price": 100000,
        "happy": 18,
        "description": "Giải trí."
      },
      {
        "id": "ATV_GYM",
        "name": "Tập thể dục",
        "minutes": 60,
        "price": 50000,
        "happy": 8,
        "description": "Rèn thể lực."
      },
      {
        "id": "ATV_PARTY",
        "name": "Tiệc tùng",
        "minutes": 180,
        "price": 600000,
        "happy": 20,
        "description": "Chi phí cao, vui ngắn hạn."
      },
      {
        "id": "ATV_STUDY",
        "name": "Đọc sách",
        "minutes": 60,
        "price": 0,
        "happy": 2,
        "description": "Tự học."
      }
    ],
    "Properties": [
      {
        "id": "PROP_ROOM",
        "name": "Phòng trọ",
        "type": "BTY_ROOM",
        "price": 0,
        "rentDaily": 120000,
        "maintenanceMonthly": 0,
        "capacity": 1,
        "building": "BLD_ROOM",
        "utilitiesMonthly": 0
      },
      {
        "id": "PROP_SMALL",
        "name": "Nhà nhỏ",
        "type": "BTY_HOUSE",
        "price": 500000000,
        "rentDaily": 250000,
        "maintenanceMonthly": 600000,
        "capacity": 2,
        "building": "BLD_LOT_36_100",
        "utilitiesMonthly": 200000
      },
      {
        "id": "PROP_APT",
        "name": "Căn hộ",
        "type": "BTY_APARTMENT",
        "price": 1500000000,
        "rentDaily": 450000,
        "maintenanceMonthly": 1500000,
        "capacity": 4,
        "building": "BLD_APARTMENT",
        "utilitiesMonthly": 350000
      },
      {
        "id": "PROP_TOWN",
        "name": "Nhà phố",
        "type": "BTY_HOUSE",
        "price": 3000000000,
        "rentDaily": 800000,
        "maintenanceMonthly": 2500000,
        "capacity": 5,
        "building": "BLD_LOT_60_100",
        "utilitiesMonthly": 500000
      },
      {
        "id": "PROP_VILLA",
        "name": "Biệt thự",
        "type": "BTY_HOUSE",
        "price": 10000000000,
        "rentDaily": 2000000,
        "maintenanceMonthly": 8000000,
        "capacity": 8,
        "building": "BLD_LOT_60_188",
        "utilitiesMonthly": 1000000
      }
    ],
    "Vehicles": [
      {
        "id": "VEH_BIKE",
        "name": "Xe đạp cũ",
        "price": 350000,
        "speed": 12,
        "energyType": "none",
        "maintenanceMonthly": 10000,
        "seats": 1,
        "capacity": 0,
        "consumption": 0,
        "unitPrice": 0
      },
      {
        "id": "VEH_MOTO",
        "name": "Xe máy",
        "price": 22000000,
        "speed": 20,
        "energyType": "petrol",
        "maintenanceMonthly": 200000,
        "seats": 2,
        "capacity": 5,
        "consumption": 0.003,
        "unitPrice": 23000
      },
      {
        "id": "VEH_CAR",
        "name": "Ô tô phổ thông",
        "price": 550000000,
        "speed": 30,
        "energyType": "petrol",
        "maintenanceMonthly": 1800000,
        "seats": 5,
        "capacity": 45,
        "consumption": 0.025,
        "unitPrice": 23000
      },
      {
        "id": "VEH_EV",
        "name": "Ô tô điện",
        "price": 650000000,
        "speed": 30,
        "energyType": "electric",
        "maintenanceMonthly": 1500000,
        "seats": 5,
        "capacity": 55,
        "consumption": 0.035,
        "unitPrice": 3500
      },
      {
        "id": "VEH_LUX",
        "name": "Ô tô cao cấp",
        "price": 1800000000,
        "speed": 32,
        "energyType": "petrol",
        "maintenanceMonthly": 4500000,
        "seats": 5,
        "capacity": 60,
        "consumption": 0.035,
        "unitPrice": 23000
      },
      {
        "id": "VEH_TRUCK",
        "name": "Xe tải",
        "price": 850000000,
        "speed": 22,
        "energyType": "petrol",
        "maintenanceMonthly": 3000000,
        "seats": 2,
        "capacity": 80,
        "consumption": 0.05,
        "unitPrice": 23000
      }
    ],
    "Furniture": [
      {
        "id": "FUR_BED",
        "name": "Giường",
        "price": 1500000,
        "comfort": 40
      },
      {
        "id": "FUR_DESK",
        "name": "Bàn học",
        "price": 600000,
        "comfort": 15
      },
      {
        "id": "FUR_FRIDGE",
        "name": "Tủ lạnh",
        "price": 4500000,
        "comfort": 25
      },
      {
        "id": "FUR_AC",
        "name": "Máy lạnh",
        "price": 7000000,
        "comfort": 35
      },
      {
        "id": "FUR_SOFA",
        "name": "Sofa",
        "price": 3500000,
        "comfort": 25
      }
    ],
    "Maintenance": [
      {
        "id": "MNT_BIKE",
        "name": "Bảo dưỡng xe đạp",
        "asset": "VEH_BIKE",
        "intervalDays": 30,
        "cost": 10000
      },
      {
        "id": "MNT_MOTO",
        "name": "Bảo dưỡng xe máy",
        "asset": "VEH_MOTO",
        "intervalDays": 30,
        "cost": 200000
      },
      {
        "id": "MNT_CAR",
        "name": "Bảo dưỡng ô tô",
        "asset": "VEH_CAR",
        "intervalDays": 30,
        "cost": 1800000
      },
      {
        "id": "MNT_APT",
        "name": "Phí căn hộ",
        "asset": "PROP_APT",
        "intervalDays": 30,
        "cost": 1500000
      }
    ],
    "Income_Types": [
      {
        "id": "INC_WAGE",
        "name": "Lương",
        "description": "Thu nhập từ việc làm."
      },
      {
        "id": "INC_TEMP",
        "name": "Thời vụ",
        "description": "Thu nhập theo ca."
      },
      {
        "id": "INC_BUSINESS",
        "name": "Kinh doanh",
        "description": "Lợi nhuận hoạt động."
      },
      {
        "id": "INC_INTEREST",
        "name": "Lãi tiền gửi",
        "description": "Thu nhập tài chính."
      },
      {
        "id": "INC_DIVIDEND",
        "name": "Cổ tức",
        "description": "Phân phối lợi nhuận."
      },
      {
        "id": "INC_RENT",
        "name": "Cho thuê",
        "description": "Thu nhập tài sản."
      },
      {
        "id": "INC_BONUS",
        "name": "Thưởng hiệu suất",
        "description": "Thưởng theo kỳ lương chính thức."
      },
      {
        "id": "INC_LEGACY",
        "name": "Thu nhập lịch sử chưa phân loại",
        "description": "Tổng thu theo ngày được chuyển từ save cũ, không suy đoán nguồn."
      },
      {
        "id": "INC_PROPERTY_SALE",
        "name": "Bán nhà",
        "description": "Tiền thu từ thanh lý bất động sản."
      },
      {
        "id": "INC_VEHICLE_SALE",
        "name": "Bán phương tiện",
        "description": "Tiền thu thanh lý xe."
      }
    ],
    "Expense_Types": [
      {
        "id": "EXP_FOOD",
        "name": "Ăn uống",
        "description": "Chi phí thực phẩm."
      },
      {
        "id": "EXP_RENT",
        "name": "Thuê nhà",
        "description": "Chi phí nơi ở."
      },
      {
        "id": "EXP_TRANSPORT",
        "name": "Đi lại",
        "description": "Chi phí phương tiện."
      },
      {
        "id": "EXP_EDU",
        "name": "Học tập",
        "description": "Học phí."
      },
      {
        "id": "EXP_HEALTH",
        "name": "Y tế",
        "description": "Điều trị."
      },
      {
        "id": "EXP_FUN",
        "name": "Giải trí",
        "description": "Hoạt động vui chơi."
      },
      {
        "id": "EXP_DEBT",
        "name": "Trả nợ",
        "description": "Nghĩa vụ khoản vay."
      },
      {
        "id": "EXP_TAX",
        "name": "Thuế phí",
        "description": "Nghĩa vụ tài chính."
      },
      {
        "id": "EXP_PENALTY",
        "name": "Tiền phạt",
        "description": "Hậu quả pháp lý."
      },
      {
        "id": "EXP_SUPPLIES",
        "name": "Nhu yếu phẩm",
        "description": "Vật phẩm và đồ dùng cá nhân."
      },
      {
        "id": "EXP_PROPERTY",
        "name": "Mua nhà",
        "description": "Chi mua bất động sản."
      },
      {
        "id": "EXP_HOME",
        "name": "Điện nước & bảo trì",
        "description": "Chi phí nhà ở."
      },
      {
        "id": "EXP_FURNITURE",
        "name": "Nội thất",
        "description": "Mua nội thất."
      },
      {
        "id": "EXP_SOCIAL",
        "name": "Quan hệ xã hội",
        "description": "Chi phí giúp đỡ và giao lưu xã hội."
      },
      {
        "id": "EXP_FAMILY",
        "name": "Gia đình",
        "description": "Đám cưới, hẹn hò, nuôi con và sinh hoạt gia đình."
      }
    ],
    "Banks": [
      {
        "id": "BNK_ANLAC",
        "name": "Ngân hàng An Lạc",
        "building": "BLD_BANK"
      },
      {
        "id": "BNK_THINHVUONG",
        "name": "Ngân hàng Thịnh Vượng",
        "building": null
      }
    ],
    "Loan_Products": [
      {
        "id": "LOAN_SMALL",
        "name": "Vay tiêu dùng",
        "bank": "BNK_ANLAC",
        "annualRate": 0.16,
        "maxPrincipal": 50000000,
        "months": 12
      },
      {
        "id": "LOAN_HOME",
        "name": "Vay mua nhà",
        "bank": "BNK_ANLAC",
        "annualRate": 0.09,
        "maxPrincipal": 2000000000,
        "months": 240
      },
      {
        "id": "LOAN_BIZ",
        "name": "Vay kinh doanh",
        "bank": "BNK_THINHVUONG",
        "annualRate": 0.11,
        "maxPrincipal": 500000000,
        "months": 60
      }
    ],
    "Saving_Products": [
      {
        "id": "SAV_SHORT",
        "name": "Tiết kiệm ngắn hạn",
        "bank": "BNK_ANLAC",
        "annualRate": 0.04,
        "months": 3,
        "minimum": 1000000
      },
      {
        "id": "SAV_LONG",
        "name": "Tiết kiệm dài hạn",
        "bank": "BNK_THINHVUONG",
        "annualRate": 0.055,
        "months": 12,
        "minimum": 1000000
      }
    ],
    "Investment_Assets": [
      {
        "id": "INV_TECH",
        "name": "Cổ phiếu công nghệ",
        "type": "stock",
        "price": 25000,
        "risk": 65
      },
      {
        "id": "INV_BANK",
        "name": "Cổ phiếu ngân hàng",
        "type": "stock",
        "price": 22000,
        "risk": 50
      },
      {
        "id": "INV_GOLD",
        "name": "Vàng giả lập",
        "type": "gold",
        "price": 10000000,
        "risk": 35
      },
      {
        "id": "INV_LAND",
        "name": "Đất ngoại ô",
        "type": "property",
        "price": 400000000,
        "risk": 55
      }
    ],
    "Economy_Events": [
      {
        "id": "ECO_INFLATION",
        "name": "Lạm phát",
        "durationMonths": 12,
        "priceMultiplier": 1.1,
        "wageMultiplier": 1.02,
        "description": "Chi phí sinh hoạt tăng."
      },
      {
        "id": "ECO_RECESSION",
        "name": "Suy thoái",
        "durationMonths": 6,
        "priceMultiplier": 1.02,
        "wageMultiplier": 0.9,
        "description": "Cơ hội việc làm giảm."
      },
      {
        "id": "ECO_BOOM",
        "name": "Tăng trưởng",
        "durationMonths": 12,
        "priceMultiplier": 1.04,
        "wageMultiplier": 1.1,
        "description": "Nhu cầu lao động tăng."
      }
    ],
    "Business_Types": [
      {
        "id": "BIZ_STALL",
        "name": "Quầy hàng",
        "industry": "IND_SERVICE",
        "capital": 5000000,
        "maxStaff": 2
      },
      {
        "id": "BIZ_CAFE",
        "name": "Quán cà phê",
        "industry": "IND_SERVICE",
        "capital": 80000000,
        "maxStaff": 8
      },
      {
        "id": "BIZ_SHOP",
        "name": "Cửa hàng bán lẻ",
        "industry": "IND_SERVICE",
        "capital": 150000000,
        "maxStaff": 12
      },
      {
        "id": "BIZ_SOFT",
        "name": "Công ty phần mềm",
        "industry": "IND_IT",
        "capital": 200000000,
        "maxStaff": 50
      },
      {
        "id": "BIZ_FACTORY",
        "name": "Nhà máy",
        "industry": "IND_BUILD",
        "capital": 1000000000,
        "maxStaff": 100
      },
      {
        "id": "BIZ_FARM",
        "name": "Trang trại",
        "industry": "IND_FARM",
        "capital": 300000000,
        "maxStaff": 20
      }
    ],
    "Business_Products": [
      {
        "id": "PRD_COFFEE",
        "name": "Cà phê",
        "business": "BIZ_CAFE",
        "unitCost": 12000,
        "salePrice": 35000
      },
      {
        "id": "PRD_MEAL",
        "name": "Suất ăn",
        "business": "BIZ_STALL",
        "unitCost": 18000,
        "salePrice": 30000
      },
      {
        "id": "PRD_GOODS",
        "name": "Hàng tiêu dùng",
        "business": "BIZ_SHOP",
        "unitCost": 60000,
        "salePrice": 90000
      },
      {
        "id": "PRD_SOFT",
        "name": "Dịch vụ phần mềm",
        "business": "BIZ_SOFT",
        "unitCost": 4000000,
        "salePrice": 6500000
      },
      {
        "id": "PRD_CROP",
        "name": "Nông sản",
        "business": "BIZ_FARM",
        "unitCost": 15000,
        "salePrice": 25000
      }
    ],
    "Business_Roles": [
      {
        "id": "BROL_OWNER",
        "name": "Quản lý",
        "skill": "SKL_MANAGE",
        "monthlyPay": 18000000
      },
      {
        "id": "BROL_SELLER",
        "name": "Bán hàng",
        "skill": "SKL_SALES",
        "monthlyPay": 7000000
      },
      {
        "id": "BROL_ACCOUNT",
        "name": "Kế toán",
        "skill": "SKL_ACCOUNT",
        "monthlyPay": 11000000
      },
      {
        "id": "BROL_DEV",
        "name": "Lập trình",
        "skill": "SKL_IT",
        "monthlyPay": 16000000
      },
      {
        "id": "BROL_COOK",
        "name": "Bếp",
        "skill": "SKL_COOK",
        "monthlyPay": 10000000
      }
    ],
    "Business_Operations": [
      {
        "id": "BOP_STALL",
        "name": "Vận hành quầy",
        "business": "BIZ_STALL",
        "monthlyFixedCost": 1500000,
        "risk": "medium",
        "riskDescription": "Nhu cầu biến động."
      },
      {
        "id": "BOP_CAFE",
        "name": "Vận hành cà phê",
        "business": "BIZ_CAFE",
        "monthlyFixedCost": 12000000,
        "risk": "medium",
        "riskDescription": "Chi phí mặt bằng."
      },
      {
        "id": "BOP_SHOP",
        "name": "Vận hành bán lẻ",
        "business": "BIZ_SHOP",
        "monthlyFixedCost": 18000000,
        "risk": "medium",
        "riskDescription": "Hàng tồn kho."
      },
      {
        "id": "BOP_SOFT",
        "name": "Vận hành phần mềm",
        "business": "BIZ_SOFT",
        "monthlyFixedCost": 50000000,
        "risk": "high",
        "riskDescription": "Mất hợp đồng."
      },
      {
        "id": "BOP_FACTORY",
        "name": "Vận hành nhà máy",
        "business": "BIZ_FACTORY",
        "monthlyFixedCost": 120000000,
        "risk": "high",
        "riskDescription": "An toàn lao động và chi phí."
      },
      {
        "id": "BOP_FARM",
        "name": "Vận hành trang trại",
        "business": "BIZ_FARM",
        "monthlyFixedCost": 15000000,
        "risk": "high",
        "riskDescription": "Thời tiết và mùa vụ."
      }
    ],
    "Diseases": [
      {
        "id": "DIS_COLD",
        "name": "Cảm nhẹ",
        "healthDelta": -5,
        "durationDays": 3
      },
      {
        "id": "DIS_FATIGUE",
        "name": "Kiệt sức",
        "healthDelta": -15,
        "durationDays": 7
      },
      {
        "id": "DIS_CHRONIC",
        "name": "Bệnh mạn tính giả lập",
        "healthDelta": -20,
        "durationDays": 30
      }
    ],
    "Treatments": [
      {
        "id": "TRT_COLD",
        "name": "Khám cảm nhẹ",
        "disease": "DIS_COLD",
        "cost": 150000,
        "healthGain": 5
      },
      {
        "id": "TRT_FATIGUE",
        "name": "Phục hồi",
        "disease": "DIS_FATIGUE",
        "cost": 500000,
        "healthGain": 15
      },
      {
        "id": "TRT_CHRONIC",
        "name": "Theo dõi điều trị",
        "disease": "DIS_CHRONIC",
        "cost": 1000000,
        "healthGain": 10
      }
    ],
    "Lifestyle_Habits": [
      {
        "id": "HAB_EXERCISE",
        "name": "Tập luyện",
        "weeklyCost": 50000,
        "healthDelta": 4,
        "disciplineDelta": 2
      },
      {
        "id": "HAB_SAVING",
        "name": "Tiết kiệm",
        "weeklyCost": 0,
        "healthDelta": 0,
        "disciplineDelta": 3
      },
      {
        "id": "HAB_PARTY",
        "name": "Ăn chơi quá mức",
        "weeklyCost": 2000000,
        "healthDelta": -5,
        "disciplineDelta": -5
      },
      {
        "id": "HAB_DRINK",
        "name": "Uống rượu thường xuyên",
        "weeklyCost": 1000000,
        "healthDelta": -6,
        "disciplineDelta": -3
      },
      {
        "id": "HAB_OVERWORK",
        "name": "Làm việc quá sức",
        "weeklyCost": 0,
        "healthDelta": -5,
        "disciplineDelta": -1
      }
    ],
    "Addiction_Rules": [
      {
        "id": "ADD_PARTY",
        "name": "Lệ thuộc giải trí",
        "habit": "HAB_PARTY",
        "threshold": 70,
        "description": "Chi tiêu và thời gian tăng, có nhánh phục hồi."
      },
      {
        "id": "ADD_DRINK",
        "name": "Lệ thuộc rượu",
        "habit": "HAB_DRINK",
        "threshold": 65,
        "description": "Tác động sức khỏe và quan hệ, có nhánh hỗ trợ."
      }
    ],
    "Legal_Offenses": [
      {
        "id": "OFF_TAX",
        "name": "Gian lận thuế",
        "severity": "major",
        "penalty": "PEN_MAJOR",
        "description": "Hành vi bất chính trong kinh doanh."
      },
      {
        "id": "OFF_FRAUD",
        "name": "Lừa đảo",
        "severity": "serious",
        "penalty": "PEN_SERIOUS",
        "description": "Gây thiệt hại cho người khác."
      },
      {
        "id": "OFF_FAKE",
        "name": "Hàng giả",
        "severity": "major",
        "penalty": "PEN_MAJOR",
        "description": "Vi phạm chất lượng và quyền lợi khách hàng."
      },
      {
        "id": "OFF_BRIBE",
        "name": "Hối lộ",
        "severity": "serious",
        "penalty": "PEN_SERIOUS",
        "description": "Lợi ích không chính đáng."
      },
      {
        "id": "OFF_SAFETY",
        "name": "Vi phạm an toàn",
        "severity": "major",
        "penalty": "PEN_MAJOR",
        "description": "Gây rủi ro lao động."
      },
      {
        "id": "OFF_LICENSE",
        "name": "Thiếu giấy phép",
        "severity": "minor",
        "penalty": "PEN_MINOR",
        "description": "Không đáp ứng điều kiện giả lập."
      }
    ],
    "Legal_Proceedings": [
      {
        "id": "LGL_REPORTED",
        "name": "Tố cáo",
        "next": [
          "LGL_INVESTIGATE",
          "LGL_CLOSED"
        ],
        "description": "Tiếp nhận vụ việc."
      },
      {
        "id": "LGL_INVESTIGATE",
        "name": "Điều tra",
        "next": [
          "LGL_TRIAL",
          "LGL_CLOSED"
        ],
        "description": "Đánh giá chứng cứ, không mặc định có tội."
      },
      {
        "id": "LGL_TRIAL",
        "name": "Xét xử",
        "next": [
          "LGL_SENTENCE",
          "LGL_CLOSED"
        ],
        "description": "Đưa ra kết quả."
      },
      {
        "id": "LGL_SENTENCE",
        "name": "Thi hành án",
        "next": [
          "LGL_CLOSED"
        ],
        "description": "Hoàn thành nghĩa vụ."
      },
      {
        "id": "LGL_CLOSED",
        "name": "Kết thúc",
        "next": [],
        "description": "Vụ việc đã kết thúc."
      }
    ],
    "Penalties": [
      {
        "id": "PEN_MINOR",
        "name": "Xử phạt giả lập",
        "fine": 5000000,
        "prisonMonths": 0,
        "reputationDelta": -5,
        "description": "Mức phạt dùng để cân bằng game."
      },
      {
        "id": "PEN_MAJOR",
        "name": "Xử lý nghiêm trọng",
        "fine": 100000000,
        "prisonMonths": 12,
        "reputationDelta": -30,
        "description": "Có thể áp dụng tù tùy kết quả xét xử giả lập."
      },
      {
        "id": "PEN_SERIOUS",
        "name": "Hậu quả nặng",
        "fine": 300000000,
        "prisonMonths": 48,
        "reputationDelta": -60,
        "description": "Thông số hư cấu, không phải mức án thực tế."
      }
    ],
    "Prison_Rehabilitation": [
      {
        "id": "REH_READ",
        "name": "Đọc sách",
        "minutes": 60,
        "disciplineDelta": 2,
        "description": "Duy trì học tập."
      },
      {
        "id": "REH_TRAIN",
        "name": "Học nghề",
        "minutes": 180,
        "disciplineDelta": 4,
        "description": "Chuẩn bị tái hòa nhập."
      },
      {
        "id": "REH_FAMILY",
        "name": "Liên lạc gia đình",
        "minutes": 30,
        "disciplineDelta": 1,
        "description": "Duy trì quan hệ."
      },
      {
        "id": "REH_SUPPORT",
        "name": "Hỗ trợ phục hồi",
        "minutes": 60,
        "disciplineDelta": 3,
        "description": "Xây dựng kế hoạch sống hợp pháp."
      }
    ],
    "Story_Chapters": [
      {
        "id": "CHP_01",
        "name": "A New Beginning",
        "order": 1,
        "description": "Đến thành phố"
      },
      {
        "id": "CHP_02",
        "name": "Survival",
        "order": 2,
        "description": "Sinh tồn"
      },
      {
        "id": "CHP_03",
        "name": "First Opportunity",
        "order": 3,
        "description": "Cơ hội đầu tiên"
      },
      {
        "id": "CHP_04",
        "name": "Building a Future",
        "order": 4,
        "description": "Xây dựng tương lai"
      },
      {
        "id": "CHP_05",
        "name": "Crossroads",
        "order": 5,
        "description": "Ngã rẽ"
      },
      {
        "id": "CHP_06",
        "name": "Ambition",
        "order": 6,
        "description": "Tham vọng"
      },
      {
        "id": "CHP_07",
        "name": "Temptation",
        "order": 7,
        "description": "Cám dỗ"
      },
      {
        "id": "CHP_08",
        "name": "Consequences",
        "order": 8,
        "description": "Hậu quả"
      },
      {
        "id": "CHP_09",
        "name": "Rise or Fall",
        "order": 9,
        "description": "Thăng trầm"
      },
      {
        "id": "CHP_10",
        "name": "Second Chance",
        "order": 10,
        "description": "Làm lại"
      },
      {
        "id": "CHP_11",
        "name": "The Final Years",
        "order": 11,
        "description": "Tuổi già"
      },
      {
        "id": "CHP_12",
        "name": "Legacy",
        "order": 12,
        "description": "Di sản"
      }
    ],
    "Story_Events": [
      {
        "id": "EVT_ARRIVE",
        "name": "Đến An Lạc",
        "chapter": "CHP_01",
        "minAge": 18,
        "maxAge": 18,
        "trigger": "arrival",
        "repeatable": false,
        "description": "Tìm cách sinh sống."
      },
      {
        "id": "EVT_SHIFT",
        "name": "Ca làm đầu tiên",
        "chapter": "CHP_03",
        "minAge": 18,
        "maxAge": 80,
        "trigger": "first_shift",
        "repeatable": false,
        "description": "Bắt đầu tích lũy."
      },
      {
        "id": "EVT_FRIEND",
        "name": "Bạn cần giúp đỡ",
        "chapter": "CHP_05",
        "minAge": 18,
        "maxAge": 80,
        "trigger": "friend_request",
        "repeatable": false,
        "description": "Một người bạn gặp khó khăn."
      },
      {
        "id": "EVT_CRISIS",
        "name": "Ngã rẽ doanh nghiệp",
        "chapter": "CHP_07",
        "minAge": 18,
        "maxAge": 80,
        "trigger": "business_crisis",
        "repeatable": false,
        "description": "Đối mặt đề xuất gian lận."
      },
      {
        "id": "EVT_PARTY",
        "name": "Chi tiêu mất kiểm soát",
        "chapter": "CHP_08",
        "minAge": 18,
        "maxAge": 100,
        "trigger": "overspending",
        "repeatable": true,
        "description": "Tài sản suy giảm do chi tiêu."
      },
      {
        "id": "EVT_LEGAL",
        "name": "Vụ việc pháp lý",
        "chapter": "CHP_08",
        "minAge": 18,
        "maxAge": 120,
        "trigger": "legal_case",
        "repeatable": false,
        "description": "Kết quả phụ thuộc quá trình xét xử."
      },
      {
        "id": "EVT_RELEASE",
        "name": "Cơ hội làm lại",
        "chapter": "CHP_10",
        "minAge": 18,
        "maxAge": 120,
        "trigger": "release",
        "repeatable": false,
        "description": "Tái hòa nhập xã hội."
      },
      {
        "id": "EVT_RETIRE",
        "name": "Nghỉ hưu",
        "chapter": "CHP_11",
        "minAge": 60,
        "maxAge": 120,
        "trigger": "retirement",
        "repeatable": false,
        "description": "Tổng kết mục tiêu sống."
      }
    ],
    "Event_Choices": [
      {
        "id": "CHO_ARRIVE_WORK",
        "name": "Tìm việc",
        "event": "EVT_ARRIVE",
        "cashDelta": 0,
        "happyDelta": 0,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": "EVT_SHIFT",
        "delayDays": 0,
        "consequence": "Mở cơ hội làm thuê."
      },
      {
        "id": "CHO_ARRIVE_REST",
        "name": "Tìm nơi nghỉ",
        "event": "EVT_ARRIVE",
        "cashDelta": 0,
        "happyDelta": 3,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Ưu tiên sức khỏe."
      },
      {
        "id": "CHO_SHIFT_SAVE",
        "name": "Tiết kiệm",
        "event": "EVT_SHIFT",
        "cashDelta": 0,
        "happyDelta": 0,
        "reputationDelta": 1,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Giữ lại thu nhập."
      },
      {
        "id": "CHO_SHIFT_FUN",
        "name": "Đi chơi",
        "event": "EVT_SHIFT",
        "cashDelta": -100000,
        "happyDelta": 10,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Tăng vui vẻ, giảm tiền."
      },
      {
        "id": "CHO_FRIEND_HELP",
        "name": "Hỗ trợ một phần",
        "event": "EVT_FRIEND",
        "cashDelta": -1000000,
        "happyDelta": 5,
        "reputationDelta": 5,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Củng cố tình bạn."
      },
      {
        "id": "CHO_FRIEND_NO",
        "name": "Từ chối",
        "event": "EVT_FRIEND",
        "cashDelta": 0,
        "happyDelta": -2,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Giữ tài chính."
      },
      {
        "id": "CHO_CRISIS_REFORM",
        "name": "Tái cấu trúc",
        "event": "EVT_CRISIS",
        "cashDelta": -5000000,
        "happyDelta": -5,
        "reputationDelta": 5,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Giảm quy mô và tìm cơ hội phục hồi."
      },
      {
        "id": "CHO_CRISIS_FRAUD",
        "name": "Chấp nhận gian lận",
        "event": "EVT_CRISIS",
        "cashDelta": 10000000,
        "happyDelta": 0,
        "reputationDelta": -5,
        "offense": "OFF_TAX",
        "nextEvent": "EVT_LEGAL",
        "delayDays": 365,
        "consequence": "Ghi nhận hành vi; có nguy cơ điều tra về sau."
      },
      {
        "id": "CHO_PARTY_STOP",
        "name": "Giảm chi tiêu",
        "event": "EVT_PARTY",
        "cashDelta": 0,
        "happyDelta": -5,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Bắt đầu phục hồi."
      },
      {
        "id": "CHO_PARTY_MORE",
        "name": "Tiếp tục ăn chơi",
        "event": "EVT_PARTY",
        "cashDelta": -2000000,
        "happyDelta": 15,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Tài sản giảm."
      },
      {
        "id": "CHO_LEGAL_COOPERATE",
        "name": "Hợp tác xử lý",
        "event": "EVT_LEGAL",
        "cashDelta": 0,
        "happyDelta": -10,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Giải quyết theo kết quả giả lập."
      },
      {
        "id": "CHO_RELEASE_WORK",
        "name": "Tìm việc hợp pháp",
        "event": "EVT_RELEASE",
        "cashDelta": 0,
        "happyDelta": 5,
        "reputationDelta": 5,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Bắt đầu lại."
      },
      {
        "id": "CHO_RETIRE_FAMILY",
        "name": "Dành thời gian gia đình",
        "event": "EVT_RETIRE",
        "cashDelta": 0,
        "happyDelta": 10,
        "reputationDelta": 0,
        "offense": null,
        "nextEvent": null,
        "delayDays": 0,
        "consequence": "Tận hưởng tuổi già."
      }
    ],
    "Achievements": [
      {
        "id": "ACH_SHIFT",
        "name": "Đồng tiền đầu tiên",
        "metric": "shifts",
        "threshold": 1,
        "description": "Hoàn thành ca làm."
      },
      {
        "id": "ACH_BIKE",
        "name": "Chiếc xe đầu tiên",
        "metric": "bike",
        "threshold": 1,
        "description": "Sở hữu xe đạp."
      },
      {
        "id": "ACH_MILLION",
        "name": "Triệu phú đầu tiên",
        "metric": "cash",
        "threshold": 1000000,
        "description": "Tích lũy một triệu."
      },
      {
        "id": "ACH_HOME",
        "name": "Mái ấm",
        "metric": "home",
        "threshold": 1,
        "description": "Có nhà."
      },
      {
        "id": "ACH_LEARN",
        "name": "Học không ngừng",
        "metric": "education",
        "threshold": 4,
        "description": "Có bằng đại học."
      },
      {
        "id": "ACH_BIZ",
        "name": "Khởi nghiệp",
        "metric": "business",
        "threshold": 1,
        "description": "Thành lập doanh nghiệp."
      },
      {
        "id": "ACH_RECOVER",
        "name": "Làm lại",
        "metric": "recovery",
        "threshold": 1,
        "description": "Phục hồi sau thất bại."
      }
    ],
    "Life_Endings": [
      {
        "id": "END_SUCCESS_01",
        "name": "Tỷ phú tự thân",
        "group": "success",
        "conditionDescription": "Tài sản ròng rất cao"
      },
      {
        "id": "END_SUCCESS_02",
        "name": "Nhà sáng lập tập đoàn",
        "group": "success",
        "conditionDescription": "Doanh nghiệp quy mô lớn"
      },
      {
        "id": "END_SUCCESS_03",
        "name": "Nhà đầu tư huyền thoại",
        "group": "success",
        "conditionDescription": "Thành tích đầu tư cao"
      },
      {
        "id": "END_SUCCESS_04",
        "name": "Chuyên gia hàng đầu",
        "group": "success",
        "conditionDescription": "Kỹ năng chuyên môn tối đa"
      },
      {
        "id": "END_SUCCESS_05",
        "name": "Người có công với xã hội",
        "group": "success",
        "conditionDescription": "Đóng góp xã hội lớn"
      },
      {
        "id": "END_SUCCESS_06",
        "name": "Gia tộc thịnh vượng",
        "group": "success",
        "conditionDescription": "Di sản nhiều thế hệ"
      },
      {
        "id": "END_SUCCESS_07",
        "name": "Tự do tài chính",
        "group": "success",
        "conditionDescription": "Thu nhập thụ động đủ chi phí"
      },
      {
        "id": "END_SUCCESS_08",
        "name": "Sự nghiệp viên mãn",
        "group": "success",
        "conditionDescription": "Sự nghiệp ổn định"
      },
      {
        "id": "END_SUCCESS_09",
        "name": "Gia đình hạnh phúc",
        "group": "success",
        "conditionDescription": "Quan hệ gia đình bền vững"
      },
      {
        "id": "END_SUCCESS_10",
        "name": "Cuộc đời trọn vẹn",
        "group": "success",
        "conditionDescription": "Cân bằng nhiều mục tiêu"
      },
      {
        "id": "END_ORDINARY_01",
        "name": "Người lao động bình dị",
        "group": "ordinary",
        "conditionDescription": "Thu nhập lao động ổn định"
      },
      {
        "id": "END_ORDINARY_02",
        "name": "Cuộc sống đủ đầy",
        "group": "ordinary",
        "conditionDescription": "Đủ chi phí thiết yếu"
      },
      {
        "id": "END_ORDINARY_03",
        "name": "Nghỉ hưu an nhàn",
        "group": "ordinary",
        "conditionDescription": "Nghỉ hưu đủ tích lũy"
      },
      {
        "id": "END_ORDINARY_04",
        "name": "Người sống độc thân",
        "group": "ordinary",
        "conditionDescription": "Độc thân tự nguyện và hài lòng"
      },
      {
        "id": "END_ORDINARY_05",
        "name": "Người đam mê khám phá",
        "group": "ordinary",
        "conditionDescription": "Nhiều trải nghiệm"
      },
      {
        "id": "END_ORDINARY_06",
        "name": "Chủ cửa hàng nhỏ",
        "group": "ordinary",
        "conditionDescription": "Cửa hàng nhỏ ổn định"
      },
      {
        "id": "END_ORDINARY_07",
        "name": "Dành trọn đời cho gia đình",
        "group": "ordinary",
        "conditionDescription": "Quan hệ gia đình tốt"
      },
      {
        "id": "END_ORDINARY_08",
        "name": "Người sống tự do",
        "group": "ordinary",
        "conditionDescription": "Tự chủ thời gian"
      },
      {
        "id": "END_ORDINARY_09",
        "name": "Cuộc đời nhiều thăng trầm",
        "group": "ordinary",
        "conditionDescription": "Có thăng trầm nhưng ổn định"
      },
      {
        "id": "END_ORDINARY_10",
        "name": "Bình yên tuổi già",
        "group": "ordinary",
        "conditionDescription": "Tuổi già an toàn"
      },
      {
        "id": "END_FAILURE_01",
        "name": "Trắng tay",
        "group": "failure",
        "conditionDescription": "Tài sản ròng không dương"
      },
      {
        "id": "END_FAILURE_02",
        "name": "Vỡ nợ",
        "group": "failure",
        "conditionDescription": "Mất khả năng trả nợ"
      },
      {
        "id": "END_FAILURE_03",
        "name": "Vô gia cư",
        "group": "failure",
        "conditionDescription": "Không có nơi ở"
      },
      {
        "id": "END_FAILURE_04",
        "name": "Con bạc trắng tay",
        "group": "failure",
        "conditionDescription": "Mất tài sản do cờ bạc"
      },
      {
        "id": "END_FAILURE_05",
        "name": "Đại gia sa cơ",
        "group": "failure",
        "conditionDescription": "Từng giàu và mất phần lớn tài sản"
      },
      {
        "id": "END_FAILURE_06",
        "name": "Gia đình tan vỡ",
        "group": "failure",
        "conditionDescription": "Gia đình đổ vỡ"
      },
      {
        "id": "END_FAILURE_07",
        "name": "Giàu có nhưng cô độc",
        "group": "failure",
        "conditionDescription": "Tài sản lớn nhưng quan hệ yếu"
      },
      {
        "id": "END_FAILURE_08",
        "name": "Sự nghiệp sụp đổ",
        "group": "failure",
        "conditionDescription": "Mất việc dài hạn"
      },
      {
        "id": "END_FAILURE_09",
        "name": "Tuổi già khốn khó",
        "group": "failure",
        "conditionDescription": "Tuổi già thiếu tích lũy"
      },
      {
        "id": "END_FAILURE_10",
        "name": "Cuộc đời dang dở",
        "group": "failure",
        "conditionDescription": "Qua đời khi mục tiêu chưa đạt"
      },
      {
        "id": "END_LEGAL_01",
        "name": "Đế chế bất chính sụp đổ",
        "group": "legal",
        "conditionDescription": "Doanh nghiệp bất chính bị xử lý"
      },
      {
        "id": "END_LEGAL_02",
        "name": "Tỷ phú sau song sắt",
        "group": "legal",
        "conditionDescription": "Tài sản lớn khi chấp hành án"
      },
      {
        "id": "END_LEGAL_03",
        "name": "Kẻ lừa đảo mất tất cả",
        "group": "legal",
        "conditionDescription": "Bị kết án lừa đảo và mất tài sản"
      },
      {
        "id": "END_LEGAL_04",
        "name": "Quan chức sa ngã",
        "group": "legal",
        "conditionDescription": "Mất chức vụ vì vi phạm"
      },
      {
        "id": "END_LEGAL_05",
        "name": "Doanh nhân mất danh tiếng",
        "group": "legal",
        "conditionDescription": "Uy tín doanh nghiệp sụp đổ"
      },
      {
        "id": "END_LEGAL_06",
        "name": "Cuộc đời trong tù",
        "group": "legal",
        "conditionDescription": "Qua đời khi chấp hành án"
      },
      {
        "id": "END_LEGAL_07",
        "name": "Người liên tục tái phạm",
        "group": "legal",
        "conditionDescription": "Có nhiều lần tái phạm"
      },
      {
        "id": "END_LEGAL_08",
        "name": "Làm lại cuộc đời",
        "group": "legal",
        "conditionDescription": "Phục hồi sau thất bại"
      },
      {
        "id": "END_LEGAL_09",
        "name": "Từ tù nhân đến doanh nhân chân chính",
        "group": "legal",
        "conditionDescription": "Tái hòa nhập và kinh doanh hợp pháp"
      },
      {
        "id": "END_LEGAL_10",
        "name": "Chuộc lại lỗi lầm",
        "group": "legal",
        "conditionDescription": "Hoàn thành nghĩa vụ và phục hồi uy tín"
      }
    ],
    "Legacy_Rules": [
      {
        "id": "LEG_HEIR",
        "name": "Thừa kế",
        "minHeirAge": 18,
        "transferRatio": 1,
        "description": "Chuyển tài sản hợp lệ sau nghĩa vụ."
      },
      {
        "id": "LEG_NONE",
        "name": "Không có người kế tiếp",
        "minHeirAge": 18,
        "transferRatio": 0,
        "description": "Kết thúc lượt chơi."
      }
    ]
  }
};
