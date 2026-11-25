// Generated from master-data/*.json. Do not edit.
export default {
  "version": "1.0.0",
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
        "spawn": "NAV_SPAWN"
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
        "intervalMinutes": 15,
        "delta": -1,
        "warningBelow": 15
      },
      {
        "id": "NEE_HUNGER",
        "name": "Tiêu hao độ no",
        "attribute": "ATR_HUNGER",
        "intervalMinutes": 15,
        "delta": -1,
        "warningBelow": 20
      }
    ],
    "Cities": [
      {
        "id": "CTY_ANLAC",
        "name": "An Lạc",
        "size": 96,
        "currency": "VND",
        "description": "Thành phố Việt Nam giả tưởng."
      }
    ],
    "Districts": [
      {
        "id": "DST_CENTER",
        "name": "Trung tâm",
        "city": "CTY_ANLAC",
        "description": "Khu thử nghiệm hiện tại."
      },
      {
        "id": "DST_RESIDENTIAL",
        "name": "Dân cư",
        "city": "CTY_ANLAC",
        "description": "Nhà ở và dịch vụ."
      },
      {
        "id": "DST_INDUSTRIAL",
        "name": "Công nghiệp",
        "city": "CTY_ANLAC",
        "description": "Nhà máy và kho."
      },
      {
        "id": "DST_EDUCATION",
        "name": "Giáo dục",
        "city": "CTY_ANLAC",
        "description": "Trường và trung tâm."
      },
      {
        "id": "DST_OUTSKIRTS",
        "name": "Ngoại ô",
        "city": "CTY_ANLAC",
        "description": "Đất và nông trại."
      },
      {
        "id": "DST_CIVIC",
        "name": "Hành chính",
        "city": "CTY_ANLAC",
        "description": "Tòa án và dịch vụ công."
      }
    ],
    "Building_Types": [
      {
        "id": "BTY_SHOP",
        "name": "Cửa hàng",
        "description": "Nhu yếu phẩm và việc làm."
      },
      {
        "id": "BTY_ROOM",
        "name": "Phòng trọ",
        "description": "Nơi nghỉ ngơi."
      },
      {
        "id": "BTY_CAFE",
        "name": "Cà phê",
        "description": "Gặp gỡ và giải trí."
      },
      {
        "id": "BTY_PARK",
        "name": "Công viên",
        "description": "Không gian công cộng."
      },
      {
        "id": "BTY_OFFICE",
        "name": "Văn phòng",
        "description": "Nơi làm việc."
      },
      {
        "id": "BTY_BANK",
        "name": "Ngân hàng",
        "description": "Dịch vụ tài chính."
      },
      {
        "id": "BTY_BIKE",
        "name": "Cửa hàng xe",
        "description": "Mua phương tiện."
      },
      {
        "id": "BTY_CLINIC",
        "name": "Phòng khám",
        "description": "Chăm sóc sức khỏe."
      },
      {
        "id": "BTY_DECOR",
        "name": "Công trình nền",
        "description": "Trang trí thành phố."
      },
      {
        "id": "BTY_SCHOOL",
        "name": "Trường học",
        "description": "Đào tạo."
      },
      {
        "id": "BTY_COURT",
        "name": "Tòa án",
        "description": "Xét xử."
      },
      {
        "id": "BTY_PRISON",
        "name": "Nhà tù",
        "description": "Thi hành án."
      },
      {
        "id": "BTY_HOUSE",
        "name": "Nhà ở",
        "description": "Nhà có thể sở hữu."
      },
      {
        "id": "BTY_FACTORY",
        "name": "Nhà máy",
        "description": "Sản xuất."
      }
    ],
    "Building_Instances": [
      {
        "id": "BLD_SHOP",
        "name": "Cửa hàng tiện lợi",
        "legacyId": "shop",
        "type": "BTY_SHOP",
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "name": "Cửa hàng xe đạp",
        "legacyId": "bike",
        "type": "BTY_BIKE",
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "d": 12,
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
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
        "district": "DST_CENTER",
        "icon": "",
        "x": 68,
        "z": 57,
        "w": 5,
        "d": 7,
        "h": 5,
        "color": "#d4c4a9",
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
        "width": 7
      },
      {
        "id": "ROD_X_48",
        "name": "Đường X 48",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 48,
        "width": 7
      },
      {
        "id": "ROD_X_80",
        "name": "Đường X 80",
        "city": "CTY_ANLAC",
        "axis": "x",
        "center": 80,
        "width": 7
      },
      {
        "id": "ROD_Z_16",
        "name": "Đường Z 16",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 16,
        "width": 7
      },
      {
        "id": "ROD_Z_48",
        "name": "Đường Z 48",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 48,
        "width": 7
      },
      {
        "id": "ROD_Z_80",
        "name": "Đường Z 80",
        "city": "CTY_ANLAC",
        "axis": "z",
        "center": 80,
        "width": 7
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
        "opens": 0,
        "closes": 1440
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
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_BANK",
        "name": "Ngân hàng",
        "building": "BLD_BANK",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_BIKE",
        "name": "Cửa hàng xe đạp",
        "building": "BLD_BIKE",
        "opens": 0,
        "closes": 1440
      },
      {
        "id": "SCH_CLINIC",
        "name": "Phòng khám",
        "building": "BLD_CLINIC",
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
        "asset": null
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
        "asset": "FOOD_MEAL"
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
        "asset": "PROP_ROOM"
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
        "hunger": -20,
        "happy": 5,
        "log": "Nghỉ ngơi trong phòng trọ.",
        "rule": "sleep",
        "job": null,
        "asset": null
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
        "asset": "FOOD_COFFEE"
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
        "asset": null
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
        "asset": null
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
        "asset": null
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
        "asset": "VEH_BIKE"
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
        "asset": "VEH_BIKE"
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
        "asset": null
      }
    ],
    "NPC_Master": [
      {
        "id": "NPC_LAN",
        "name": "Lan",
        "personality": "TRA_SOCIAL",
        "behavior": "service",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_SHOP",
        "description": "Quản lý cửa hàng, hỗ trợ việc thời vụ."
      },
      {
        "id": "NPC_NAM",
        "name": "Nam",
        "personality": "TRA_DISCIPLINED",
        "behavior": "work",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_OFFICE",
        "description": "Nhân viên văn phòng."
      },
      {
        "id": "NPC_THAO",
        "name": "Thảo",
        "personality": "TRA_CURIOUS",
        "behavior": "study",
        "homeDistrict": "DST_CENTER",
        "workplace": null,
        "description": "Bạn trẻ đang học nghề."
      },
      {
        "id": "NPC_HUNG",
        "name": "Hùng",
        "personality": "TRA_CAREFUL",
        "behavior": "service",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_BIKE",
        "description": "Chủ cửa hàng xe."
      },
      {
        "id": "NPC_MAI",
        "name": "Mai",
        "personality": "TRA_SOCIAL",
        "behavior": "service",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_CAFE",
        "description": "Nhân viên cà phê."
      },
      {
        "id": "NPC_DUC",
        "name": "Đức",
        "personality": "TRA_DETERMINED",
        "behavior": "work",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_BANK",
        "description": "Nhân viên ngân hàng."
      },
      {
        "id": "NPC_LINH",
        "name": "Linh",
        "personality": "TRA_CAREFUL",
        "behavior": "service",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_CLINIC",
        "description": "Nhân viên y tế."
      },
      {
        "id": "NPC_AN",
        "name": "An",
        "personality": "TRA_IMPULSIVE",
        "behavior": "visit",
        "homeDistrict": "DST_CENTER",
        "workplace": "BLD_PARK",
        "description": "Người bạn có lối sống phóng khoáng."
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
        "description": "Hai NPC trưởng thành đồng thuận trong game."
      },
      {
        "id": "FAM_CHILD",
        "name": "Nuôi con",
        "minAge": 18,
        "minTrust": 0,
        "description": "Phát sinh trách nhiệm chăm sóc."
      },
      {
        "id": "FAM_SEPARATION",
        "name": "Chia tay",
        "minAge": 18,
        "minTrust": 0,
        "description": "Giải quyết quan hệ và nghĩa vụ."
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
        "level": "EDU_VOC"
      },
      {
        "id": "SCHL_UNI",
        "name": "Đại học An Lạc",
        "district": "DST_EDUCATION",
        "level": "EDU_UNI"
      },
      {
        "id": "SCHL_CENTER",
        "name": "Trung tâm kỹ năng",
        "district": "DST_CENTER",
        "level": "EDU_NONE"
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
        "gain": 1
      },
      {
        "id": "CRS_IT",
        "name": "Lập trình nhập môn",
        "school": "SCHL_VOC",
        "skill": "SKL_IT",
        "fee": 3000000,
        "durationDays": 60,
        "gain": 2
      },
      {
        "id": "CRS_ACCOUNT",
        "name": "Kế toán cơ bản",
        "school": "SCHL_CENTER",
        "skill": "SKL_ACCOUNT",
        "fee": 1500000,
        "durationDays": 30,
        "gain": 2
      },
      {
        "id": "CRS_COOK",
        "name": "Nghề bếp",
        "school": "SCHL_VOC",
        "skill": "SKL_COOK",
        "fee": 2000000,
        "durationDays": 45,
        "gain": 2
      },
      {
        "id": "CRS_MANAGE",
        "name": "Quản trị",
        "school": "SCHL_UNI",
        "skill": "SKL_MANAGE",
        "fee": 12000000,
        "durationDays": 180,
        "gain": 3
      },
      {
        "id": "CRS_REPAIR",
        "name": "Sửa chữa xe",
        "school": "SCHL_VOC",
        "skill": "SKL_REPAIR",
        "fee": 2500000,
        "durationDays": 60,
        "gain": 2
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
        "stress": 25
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
        "stress": 40
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
        "stress": 30
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
        "stress": 45
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
        "stress": 50
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
        "stress": 55
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
        "stress": 65
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
        "stress": 45
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
        "stress": 60
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
        "stress": 45
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
        "stress": 40
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
        "stress": 55
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
        "stress": 45
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
        "stress": 45
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
        "stress": 35
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
          "JOB_SALES"
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
          "JOB_MANAGER"
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
        "category": "personal"
      },
      {
        "id": "ITM_BAG",
        "name": "Ba lô",
        "price": 150000,
        "category": "personal"
      },
      {
        "id": "ITM_BOOK",
        "name": "Sách học nghề",
        "price": 80000,
        "category": "study"
      },
      {
        "id": "ITM_LAPTOP",
        "name": "Laptop cơ bản",
        "price": 7000000,
        "category": "study"
      },
      {
        "id": "ITM_HELMET",
        "name": "Mũ bảo hiểm",
        "price": 250000,
        "category": "utility"
      }
    ],
    "Food_Drinks": [
      {
        "id": "FOOD_MEAL",
        "name": "Cơm hộp",
        "price": 30000,
        "hunger": 35,
        "energy": 2,
        "happy": 3
      },
      {
        "id": "FOOD_COFFEE",
        "name": "Cà phê",
        "price": 35000,
        "hunger": -3,
        "energy": 15,
        "happy": 8
      },
      {
        "id": "FOOD_WATER",
        "name": "Nước uống",
        "price": 10000,
        "hunger": 0,
        "energy": 2,
        "happy": 0
      },
      {
        "id": "FOOD_NOODLES",
        "name": "Mì",
        "price": 25000,
        "hunger": 25,
        "energy": 1,
        "happy": 2
      },
      {
        "id": "FOOD_FRUIT",
        "name": "Trái cây",
        "price": 20000,
        "hunger": 15,
        "energy": 2,
        "happy": 2
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
        "capacity": 1
      },
      {
        "id": "PROP_SMALL",
        "name": "Nhà nhỏ",
        "type": "BTY_HOUSE",
        "price": 500000000,
        "rentDaily": 250000,
        "maintenanceMonthly": 600000,
        "capacity": 2
      },
      {
        "id": "PROP_APT",
        "name": "Căn hộ",
        "type": "BTY_HOUSE",
        "price": 1500000000,
        "rentDaily": 450000,
        "maintenanceMonthly": 1500000,
        "capacity": 4
      },
      {
        "id": "PROP_TOWN",
        "name": "Nhà phố",
        "type": "BTY_HOUSE",
        "price": 3000000000,
        "rentDaily": 800000,
        "maintenanceMonthly": 2500000,
        "capacity": 5
      },
      {
        "id": "PROP_VILLA",
        "name": "Biệt thự",
        "type": "BTY_HOUSE",
        "price": 10000000000,
        "rentDaily": 2000000,
        "maintenanceMonthly": 8000000,
        "capacity": 8
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
        "seats": 1
      },
      {
        "id": "VEH_MOTO",
        "name": "Xe máy",
        "price": 22000000,
        "speed": 20,
        "energyType": "petrol",
        "maintenanceMonthly": 200000,
        "seats": 2
      },
      {
        "id": "VEH_CAR",
        "name": "Ô tô phổ thông",
        "price": 550000000,
        "speed": 30,
        "energyType": "petrol",
        "maintenanceMonthly": 1800000,
        "seats": 5
      },
      {
        "id": "VEH_EV",
        "name": "Ô tô điện",
        "price": 650000000,
        "speed": 30,
        "energyType": "electric",
        "maintenanceMonthly": 1500000,
        "seats": 5
      },
      {
        "id": "VEH_LUX",
        "name": "Ô tô cao cấp",
        "price": 1800000000,
        "speed": 32,
        "energyType": "petrol",
        "maintenanceMonthly": 4500000,
        "seats": 5
      },
      {
        "id": "VEH_TRUCK",
        "name": "Xe tải",
        "price": 850000000,
        "speed": 22,
        "energyType": "petrol",
        "maintenanceMonthly": 3000000,
        "seats": 2
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
