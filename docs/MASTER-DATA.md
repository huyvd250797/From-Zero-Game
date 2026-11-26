# From Zero — Canonical Master Data V2.6.0

Game release V0.19.0 · 60 danh mục, 658 bản ghi. Số liệu kinh tế và pháp luật là dữ liệu hư cấu phục vụ cân bằng game, không phải dữ liệu thực tế.

## Danh mục

| Nhóm | JSON | Bản ghi | Trạng thái |
|---|---|---:|---|
| A – Foundation | `Game_Config.json` | 1 | Runtime prototype |
| A – Foundation | `Difficulty.json` | 3 | Seed cho phiên bản sau |
| A – Foundation | `Character_Origins.json` | 3 | Seed cho phiên bản sau |
| A – Foundation | `Character_Traits.json` | 6 | Seed cho phiên bản sau |
| A – Foundation | `Character_Attributes.json` | 14 | Runtime Survival & Daily Activities |
| A – Foundation | `Life_Stages.json` | 4 | Seed cho phiên bản sau |
| A – Foundation | `Needs_Rules.json` | 4 | Runtime Survival & Daily Activities |
| B – World & City | `Cities.json` | 1 | Runtime prototype |
| B – World & City | `Districts.json` | 10 | Runtime City Engine |
| B – World & City | `Building_Types.json` | 24 | Runtime City Engine |
| B – World & City | `Building_Instances.json` | 79 | Runtime City Engine |
| B – World & City | `Road_Network.json` | 12 | Runtime City Engine |
| B – World & City | `Navigation_Nodes.json` | 26 | Runtime City Engine |
| B – World & City | `World_Schedules.json` | 25 | Runtime Life Simulation |
| B – World & City | `Location_Actions.json` | 43 | Runtime Survival & Daily Activities |
| C – Character & Social | `NPC_Master.json` | 16 | Runtime NPC & Social World |
| C – Character & Social | `Relationships.json` | 5 | Runtime tình bạn; đối tác/vợ chồng là seed |
| C – Character & Social | `Relationship_Events.json` | 4 | Runtime giúp đỡ/mâu thuẫn; còn lại là seed |
| C – Character & Social | `Family_Rules.json` | 3 | Seed cho phiên bản sau |
| C – Character & Social | `Social_Reputation.json` | 3 | Runtime uy tín |
| D – Education & Career | `Education_Levels.json` | 6 | Runtime Education & Skills |
| D – Education & Career | `Schools.json` | 3 | Runtime Education & Skills |
| D – Education & Career | `Skills.json` | 15 | Runtime Education & Skills |
| D – Education & Career | `Courses.json` | 13 | Runtime Education & Skills |
| D – Education & Career | `Industries.json` | 10 | Seed cho phiên bản sau |
| D – Education & Career | `Jobs.json` | 19 | Runtime ca thời vụ và điều kiện đào tạo |
| D – Education & Career | `Employers.json` | 10 | Runtime Career & Employment |
| D – Education & Career | `Career_Paths.json` | 4 | Lộ trình nghề; 3 nhánh thăng chức chính thức |
| E – Assets & Lifestyle | `Items.json` | 10 | Runtime Survival & Daily Activities |
| E – Assets & Lifestyle | `Food_Drinks.json` | 9 | Runtime Survival & Daily Activities |
| E – Assets & Lifestyle | `Activities.json` | 5 | Seed cho phiên bản sau |
| E – Assets & Lifestyle | `Properties.json` | 5 | Runtime Housing & Interior |
| E – Assets & Lifestyle | `Vehicles.json` | 6 | Runtime prototype |
| E – Assets & Lifestyle | `Furniture.json` | 5 | Runtime Housing & Interior |
| E – Assets & Lifestyle | `Maintenance.json` | 4 | Seed cho phiên bản sau |
| F – Finance & Economy | `Income_Types.json` | 12 | Lương/thưởng/thời vụ và thu lịch sử runtime, các nguồn khác seed |
| F – Finance & Economy | `Expense_Types.json` | 20 | Runtime Survival & Daily Activities |
| F – Finance & Economy | `Banks.json` | 2 | Seed cho phiên bản sau |
| F – Finance & Economy | `Loan_Products.json` | 4 | Runtime Banking & Business |
| F – Finance & Economy | `Saving_Products.json` | 2 | Seed cho phiên bản sau |
| F – Finance & Economy | `Investment_Assets.json` | 4 | Seed cho phiên bản sau |
| F – Finance & Economy | `Economy_Events.json` | 3 | Seed cho phiên bản sau |
| G – Business | `Business_Types.json` | 6 | Runtime Business |
| G – Business | `Business_Products.json` | 6 | Runtime Business |
| G – Business | `Business_Roles.json` | 5 | Vai trò bán hàng/lập trình runtime; còn lại dữ liệu nền |
| G – Business | `Business_Operations.json` | 6 | Runtime Business |
| H – Health, Lifestyle & Law | `Diseases.json` | 3 | Seed cho phiên bản sau |
| H – Health, Lifestyle & Law | `Treatments.json` | 3 | Seed cho phiên bản sau |
| H – Health, Lifestyle & Law | `Lifestyle_Habits.json` | 7 | Seed cho phiên bản sau |
| H – Health, Lifestyle & Law | `Addiction_Rules.json` | 4 | Seed cho phiên bản sau |
| H – Health, Lifestyle & Law | `Legal_Offenses.json` | 6 | Runtime Law, Crime & Justice |
| H – Health, Lifestyle & Law | `Legal_Proceedings.json` | 5 | Runtime Law, Crime & Justice |
| H – Health, Lifestyle & Law | `Penalties.json` | 3 | Runtime Law, Crime & Justice |
| H – Health, Lifestyle & Law | `Prison_Rehabilitation.json` | 4 | Seed cho phiên bản sau |
| I – Story & Events | `Story_Chapters.json` | 12 | Runtime Story Engine |
| I – Story & Events | `Story_Events.json` | 22 | Runtime (19 hoạt động, RELEASE dữ liệu nền) |
| I – Story & Events | `Event_Choices.json` | 47 | Runtime Story Engine |
| J – Endgame | `Achievements.json` | 7 | Seed cho phiên bản sau |
| J – Endgame | `Life_Endings.json` | 40 | Seed cho phiên bản sau |
| J – Endgame | `Legacy_Rules.json` | 2 | Seed cho phiên bản sau |

## Quyết định chuẩn hóa
Roadmap trước ghi 60 nhưng liệt kê 65 tên. Giữ 60 danh mục vật lý, gộp năm khái niệm:
- Game_Time → Game_Config (dayMinutes, realSecondsPerMinute).
- NPC_Personalities → NPC_Master.personality tham chiếu Character_Traits.
- NPC_Behaviors → NPC_Master.behavior và workplace.
- Business_Risks → Business_Operations.risk / riskDescription.
- Event_Consequences → Event_Choices (cashDelta, happyDelta, reputationDelta, offense, nextEvent, delayDays, consequence).

## Hợp đồng dữ liệu
- ID: PREFIX_UPPERCASE, duy nhất toàn bộ 60 danh mục. Không tái sử dụng ID đã phát hành. Các khóa legacyId chỉ là adapter bảo toàn prototype/save.
- Giá và tiền: số nguyên VND, không dùng số thập phân; lãi suất là tỷ lệ 0–1; điểm 0–100; thời lượng có đơn vị trong tên trường hoặc schema.
- `schema.json`: hợp đồng schema phiên bản 1.0.0, không phải danh mục gameplay thứ 61.
- JSON là nguồn chuẩn. `src/master-data.generated.js` tự sinh từ JSON; không sửa tay. `src/master-data.js` cung cấp dữ liệu đóng băng và tra cứu theo ID.
- `npm run data:validate` kiểm tra và tái sinh bundle; build/dev/test tự thực hiện. Build lỗi nếu dữ liệu không đạt.
- Runtime state và schema save v1 độc lập với master schema 1.0.0. Không ghi runtime state vào JSON.

## Phạm vi phiên bản
Các danh mục seed chưa phải bộ nội dung đầy đủ V1.4.0. NPC chưa có hành vi AI từ seed; chưa mở mua nhà/ô tô, pháp luật, kinh doanh, đầu tư, cốt truyện đa nhánh. Điều kiện kết thúc hiện là mô tả, chưa phải biểu thức được engine thực thi. Tốc độ và hình học của renderer vẫn giới hạn bản đồ prototype 192×192. Giá trị cần playtest và cân bằng trước khi đóng băng nội dung.

## City Engine V0.3.0
- Schema 1.1.0 bổ sung Cities.chunkSize; Districts.minX/minZ/maxX/maxZ/color; Building_Types.style; Road_Network.lanes/kind.
- Kích thước 192×192; chunk 32×32; 10 phân khu phủ kín bản đồ. 79 khu/công trình (62 có chiều cao), 24 loại, 12 đường, 23 điểm điều hướng, 25 hoạt động.
- Giữ ID, cửa và vị trí của các địa điểm V0.2.0; thu chiều sâu BLD_DECOR_03 từ 12 xuống 11 để không lấn đường.
- Các hành động mới chỉ tham quan, chưa có hệ thống nghiệp vụ đầy đủ.

## V1.3.0
Cấu hình năm bắt đầu và ngưỡng sức khỏe; thêm nhu cầu vệ sinh, lịch 22 địa điểm, 5 hoạt động hồi phục và trường hygiene/health/stress cho toàn bộ hành động. Giữ 60 catalog. Xem LIFE-SIMULATION.md.

## V1.4.0
- Schools gắn building; Courses có loại chương trình, đầu vào, văn bằng, số buổi và thời lượng mỗi buổi; thêm 7 văn bằng. Jobs có ngưỡng kỹ năng và XP thực hành; Game_Config có giới hạn học, XP mỗi cấp và trình độ xuất phát.
- 60 danh mục, 552 bản ghi. Chi tiết runtime: `docs/EDUCATION.md`.

## V1.5.0
Bổ sung 6 nhà tuyển dụng, mở rộng vị trí tại các nhà tuyển dụng cũ, thêm INC_BONUS. 19 vị trí lương tháng, 14 nghề chính thức. Kiểm tra ca làm phù hợp giờ công trình.

## V1.6.0
- Thêm `INC_LEGACY` cho thu nhập tổng ngày từ save cũ; không suy đoán nguồn. Kích hoạt phân loại lương, thưởng, thời vụ trong Personal Finance. Không thay đổi danh mục hay vị trí thành phố.

## V1.7.0
Gắn mỗi Properties với Building_Instances và phí utilitiesMonthly; kích hoạt ba địa điểm nhà, bổ sung ba cửa/lịch/hành động, 1 nguồn thu bán nhà và 3 danh mục chi. Giữ 60 danh mục. Xem HOUSING.md.

## V1.8.0
Vehicles bổ sung capacity, consumption, unitPrice; tên BLD_BIKE đổi thành Cửa hàng phương tiện (giữ ID và tọa độ); Income_Types thêm INC_VEHICLE_SALE. Quy tắc nhiên liệu được kiểm tra khi build.

## V1.9.0
- 16 NPC, thêm hồ sơ và lịch/địa điểm. Kiểm tra nơi ở, phân khu, giờ hoạt động và tham chiếu.
- EXP_SOCIAL cho chi phí xã hội; 60 danh mục, 583 bản ghi.

## V2.0.0
- Mở rộng Family_Rules với điều kiện tình cảm, thời gian, phí và chi phí hằng ngày; thêm 11 quy tắc, giữ ID cũ.
- EXP_FAMILY là danh mục chi tiêu mới. 60 danh mục, 595 bản ghi.

## V2.1.0
- LOAN_VEHICLE, INC_INVEST_SALE, EXP_INVEST. Hai ngân hàng, hai sản phẩm tiết kiệm và ba sản phẩm vay hoạt động; hai cổ phiếu và vàng hoạt động. LOAN_BIZ và INV_LAND vẫn là dữ liệu nền.

## V2.2.0
- Business_Types bổ sung building, skill, minSkill, staffRole, baseDemand, staffDemand, staffPerLevel, marketingCost; giữ nguyên ID, vốn và phí cố định. Thêm PRD_FACTORY và EXP_BUSINESS. Kích hoạt LOAN_BIZ; kiểm tra liên kết mặt bằng, lịch hoạt động, sản phẩm và kỹ năng.

## V2.3.0
- Economy_Events thêm ECO_STABLE và ECO_RECOVERY; năm cấu hình có chỉ số hoạt động, thất nghiệp, nhu cầu, nguồn cung, lãi suất (basis points), giá nhà/xe, cạnh tranh, nhiên liệu.
- Giá gốc trong các danh mục khác được giữ nguyên. Economy Engine tính báo giá runtime, không sửa Master Data.

## V2.4.0
Story_Events bổ sung cooldownDays và trigger, Event_Choices bổ sung ethicsDelta, stressDelta, healthDelta, familyDelta. Thêm 12 biến cố, 25 lựa chọn, INC_STORY và EXP_STORY. Giữ nguyên 60 danh mục.
