import {readFile,readdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const base=fileURLToPath(new URL('../',import.meta.url));
export async function loadMaster(root=path.join(base,'master-data')){
 const schema=JSON.parse(await readFile(path.join(root,'schema.json'),'utf8'));
 const catalogs=Object.keys(schema.catalogs), data={};
 const actual=(await readdir(root)).filter(x=>x.endsWith('.json')&&x!=='schema.json').sort();
 if(JSON.stringify(actual)!==JSON.stringify(catalogs.map(x=>x+'.json').sort()))throw Error('Danh mục JSON không khớp schema');
 for(const name of catalogs)data[name]=JSON.parse(await readFile(path.join(root,name+'.json'),'utf8'));
 return {schema,data};
}
export function validateMaster(schema,data){
 const errors=[],err=(p,m)=>errors.push(`${p}: ${m}`), ids=new Map();
 if(schema?.version!=='3.1.0'||!schema.catalogs||Object.keys(schema.catalogs).length!==60){return ['Schema phải là 3.1.0 và có 60 danh mục'];}
 for(const k of Object.keys(data))if(!Object.hasOwn(schema.catalogs,k))err(k,'Danh mục ngoài schema');
 for(const [key,s] of Object.entries(schema.catalogs)){
  if(!/^[A-Z][A-Z0-9]*$/.test(s.prefix)||!s.fields||typeof s.fields!=='object'){err(key,'Schema không hợp lệ');continue}
  if(!Array.isArray(data[key])||!data[key].length){err(key,'Danh mục rỗng hoặc không phải mảng');continue}
  for(const [i,row] of data[key].entries()){
   const p=`${key}[${i}]`;if(!row||typeof row!=='object'||Array.isArray(row)){err(p,'Bản ghi không hợp lệ');continue}
   if(typeof row.id!=='string'||!new RegExp(`^${s.prefix}_[A-Z0-9]+(?:_[A-Z0-9]+)*$`).test(row.id))err(p,'ID sai chuẩn');
   if(ids.has(row.id))err(p,`ID trùng ${row.id}`);else ids.set(row.id,key);
   if(typeof row.name!=='string'||!row.name.trim())err(p,'Thiếu tên');
   for(const k of Object.keys(row))if(k!=='id'&&k!=='name'&&!Object.hasOwn(s.fields,k))err(p,`Trường không khai báo ${k}`);
  }
 }
 const phases=data.Economy_Events||[];for(const id of ['ECO_STABLE','ECO_BOOM','ECO_INFLATION','ECO_RECESSION','ECO_RECOVERY'])if(!phases.some(p=>p.id===id))err('Economy_Events','Thiếu giai đoạn '+id);for(const p of phases){for(const k of ['priceMultiplier','wageMultiplier','activity','demand','supply','property','vehicle','competition','fuelMultiplier'])if(!(p[k]>=.5&&p[k]<=2))err(p.id,k+' ngoài giới hạn cân bằng 0.5–2');if(p.durationMonths>60)err(p.id,'Thời lượng kinh tế vượt 60 tháng');}
 const valid=(v,t)=>{
  if(t.startsWith('nullable:'))return v===null||valid(v,t.slice(9));
  const [kind,a,b]=t.split(':');
  const number=typeof v==='number'&&Number.isFinite(v),int=Number.isSafeInteger(v);
  switch(kind){
   case 'text':return typeof v==='string'&&!!v.trim();case 'string':return typeof v==='string';case 'bool':return typeof v==='boolean';case 'color':return typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
   case 'int':return int&&(a===undefined||v>=Number(a)&&v<=Number(b));case 'money':case 'nonnegativeInt':return int&&v>=0;case 'positiveInt':return int&&v>0;
   case 'pct':return number&&v>=0&&v<=100;case 'ratio':return number&&v>=0&&v<=1;case 'positive':return number&&v>0;case 'nonnegative':return number&&v>=0;
   case 'enum':return a.split(',').includes(v);case 'ref':return typeof v==='string'&&ids.get(v)===a;
   case 'refAny':return typeof v==='string'&&a.split(',').includes(ids.get(v));
   case 'refs':return Array.isArray(v)&&new Set(v).size===v.length&&v.every(x=>valid(x,'ref:'+a));default:return false;
  }
 };
 for(const [key,s] of Object.entries(schema.catalogs))if(Array.isArray(data[key])&&s.fields)for(const row of data[key])if(row&&typeof row==='object')for(const [f,t] of Object.entries(s.fields))if(typeof t!=='string'||!Object.hasOwn(row,f)||!valid(row[f],t))err(`${key}.${row.id}.${f}`,`Không hợp lệ (${t})`);
 if(errors.length)return errors;
 const get=(k,id)=>data[k]?.find(r=>r.id===id), each=(k,fn)=>data[k].forEach(r=>fn(r,`${k}.${r.id}`));
 const unique=(k,f)=>{const set=new Set();each(k,(r,p)=>{if(set.has(r[f]))err(p,`Trùng ${f}`);set.add(r[f])})};
 unique('Building_Instances','legacyId');unique('Location_Actions','legacyId');unique('Story_Chapters','order');unique('Education_Levels','rank');
 each('Character_Attributes',(r,p)=>{if(r.min>r.initial||r.initial>r.max)err(p,'min ≤ initial ≤ max')});
 for(const k of ['Life_Stages','Story_Events'])each(k,(r,p)=>{if(r.minAge>r.maxAge)err(p,'Khoảng tuổi đảo ngược')});
 each('Social_Reputation',(r,p)=>{if(r.min>r.max)err(p,'Khoảng điểm đảo ngược')});
 each('NPC_Master',(r,p)=>{const home=get('Building_Instances',r.home),work=get('Building_Instances',r.workplace),leisure=get('Building_Instances',r.leisure),schedule=data.World_Schedules.find(x=>x.building===r.workplace);if(home.district!==r.homeDistrict||home.h<=0||!work?.interactive||!leisure?.interactive||!schedule||r.workStart<schedule.opens||r.workEnd>schedule.closes||r.workEnd<=r.workStart)err(p,'Lịch hoặc địa điểm NPC không hợp lệ');});
 unique('Business_Types','building');unique('Business_Products','business');unique('Business_Operations','business');each('Business_Types',(r,p)=>{const b=get('Building_Instances',r.building),h=data.World_Schedules.find(s=>s.building===r.building);if(!b.interactive||!h||h.closes-h.opens<240||r.minSkill>get('Skills',r.skill).maxLevel||!data.Business_Products.some(x=>x.business===r.id)||!data.Business_Operations.some(x=>x.business===r.id))err(p,'Cấu hình kinh doanh không hợp lệ');});
 unique('World_Schedules','building');unique('Needs_Rules','attribute');each('World_Schedules',(r,p)=>{if(r.opens>=r.closes)err(p,'Giờ đóng phải sau giờ mở');if(!get('Building_Instances',r.building).interactive)err(p,'Lịch của công trình không tương tác')});each('Building_Instances',(r,p)=>{if(r.interactive&&!data.World_Schedules.some(s=>s.building===r.id))err(p,'Thiếu lịch mở cửa')});
 each('Schools',(r,p)=>{const b=get('Building_Instances',r.building);if(!b.interactive||b.district!==r.district)err(p,'Địa điểm đào tạo không hợp lệ')});
 each('Courses',(r,p)=>{const school=get('Schools',r.school),hours=data.World_Schedules.find(s=>s.building===school.building),cfg=get('Game_Config','CFG_DEFAULT');if(r.gain>get('Skills',r.skill).maxLevel)err(p,'Vượt cấp kỹ năng');if((r.kind==='degree')!==Boolean(r.awardLevel)||r.sessions>r.durationDays||r.durationDays>3650||r.sessionMinutes>240||!cfg||r.sessionMinutes>cfg.dailyStudyLimit||!hours||r.sessionMinutes>hours.closes-hours.opens)err(p,'Chương trình đào tạo không hợp lệ');if(r.awardLevel&&get('Education_Levels',r.awardLevel).rank<=get('Education_Levels',r.requiresLevel).rank)err(p,'Bằng cấp không cao hơn đầu vào')});
 each('Jobs',(r,p)=>{if(Boolean(r.skills.length)!==Boolean(r.minSkillLevel)||r.skills.some(id=>r.minSkillLevel>get('Skills',id).maxLevel)||Boolean(r.practiceSkill)!==Boolean(r.practiceXp)||r.practiceXp>100)err(p,'Điều kiện kỹ năng nghề không hợp lệ')});
 const cfg=get('Game_Config','CFG_DEFAULT'),city=get('Cities','CTY_ANLAC');
 if(!cfg||!city)err('Foundation','Thiếu CFG_DEFAULT hoặc CTY_ANLAC');
 if(cfg&&city){
  if(city.size>512||city.size%city.chunkSize||city.chunkSize<16||city.chunkSize>64)err('Cities','Kích thước thành phố/chunk không hợp lệ');
  each('Road_Network',(r,p)=>{if(r.width<4||r.width>16||r.center-r.width/2<0||r.center+r.width/2>city.size||r.lanes!==(r.kind==='avenue'?4:2))err(p,'Hình học hoặc loại đường không hợp lệ')});
  const districts=data.Districts.filter(r=>r.city===city.id);let area=0;
  for(const d of districts){if(d.minX>=d.maxX||d.minZ>=d.maxZ||d.maxX>city.size||d.maxZ>city.size)err(d.id,'Ranh giới phân khu sai');area+=(d.maxX-d.minX)*(d.maxZ-d.minZ);for(const q of districts)if(q.id!==d.id&&d.minX<q.maxX&&d.maxX>q.minX&&d.minZ<q.maxZ&&d.maxZ>q.minZ)err(d.id,'Phân khu chồng lấn');}
  if(area!==city.size**2)err('Districts','Phân khu chưa phủ kín thành phố');
  for(const f of ['energy','hunger','happy'])if(cfg[f]!==get('Character_Attributes','ATR_'+f.toUpperCase())?.initial)err('Game_Config',`Chỉ số ${f} không đồng nhất`);
  if(cfg.bikeSpeed!==get('Vehicles','VEH_BIKE')?.speed)err('Game_Config','Tốc độ xe đạp không đồng nhất');
  const rmin=city.riverMinX,rmax=city.riverMaxX,water=(x,z)=>x>=rmin&&x<=rmax&&!data.Road_Network.some(r=>r.axis==='z'&&Math.abs(z-r.center)<=r.width/2+1.3);if(!(rmin>=192&&rmax>rmin&&rmax<city.size))err('Cities','Sông không hợp lệ');const solid=data.Building_Instances.filter(b=>b.h>0);const walk=(x,z)=>x>=1&&z>=1&&x<=city.size-1&&z<=city.size-1&&!water(x,z)&&!solid.some(b=>Math.abs(x-b.x)<b.w/2+.65&&Math.abs(z-b.z)<b.d/2+.65);
  each('Navigation_Nodes',(r,p)=>{if(r.city===city.id&&!walk(r.x,r.z))err(p,'Điểm điều hướng nằm ngoài vùng đi bộ')});
  each('Building_Instances',(r,p)=>{if(r.x-r.w/2<0||r.z-r.d/2<0||r.x+r.w/2>city.size||r.z+r.d/2>city.size)err(p,'Ngoài bản đồ');if(r.x+r.w/2>rmin&&r.x-r.w/2<rmax)err(p,'Công trình lấn sông');if(r.interactive!==!!r.door)err(p,'Điểm cửa không phù hợp');if(r.interactive&&!data.Location_Actions.some(a=>a.building===r.id))err(p,'Thiếu hành động');});
  const roadRows=data.Road_Network.filter(r=>r.city===city.id);
  for(const axis of ['x','z']){const lines=roadRows.filter(r=>r.axis===axis).sort((a,b)=>a.center-b.center);if(!lines.length)err('Road_Network','Thiếu trục đường');for(let i=1;i<lines.length;i++)if(lines[i].center-lines[i-1].center<(lines[i].width+lines[i-1].width)/2+2)err('Road_Network','Đường cùng trục chồng lấn');}
  each('Building_Instances',(r,p)=>{const d=get('Districts',r.district);if(d.city!==city.id||r.x<d.minX||r.x>=d.maxX||r.z<d.minZ||r.z>=d.maxZ)err(p,'Sai phân khu');if(r.h>40||r.w>32||r.d>32)err(p,'Kích thước công trình vượt giới hạn renderer');if(roadRows.some(q=>Math.abs((q.axis==='x'?r.x:r.z)-q.center)<q.width/2+(q.axis==='x'?r.w:r.d)/2))err(p,'Công trình lấn đường');if(r.door){const n=get('Navigation_Nodes',r.door);if(n.city!==d.city||Math.hypot(n.x-r.x,n.z-r.z)>Math.hypot(r.w,r.d)/2+5)err(p,'Lối vào không hợp lệ');}});
  for(let i=0;i<data.Building_Instances.length;i++)for(let j=i+1;j<data.Building_Instances.length;j++){const a=data.Building_Instances[i],b=data.Building_Instances[j];if(Math.abs(a.x-b.x)<(a.w+b.w)/2&&Math.abs(a.z-b.z)<(a.d+b.d)/2)err(a.id,'Công trình chồng lấn '+b.id);}

 }
 for(const key of ['Items','Food_Drinks'])each(key,(r,p)=>{if(r.shops.some(id=>!get('Building_Instances',id).interactive))err(p,'Cửa hàng không tương tác');if(r.useMinutes>1440)err(p,'Thời gian sử dụng quá lớn');});
 each('Food_Drinks',(r,p)=>{if(Boolean(r.ingredients.length)!==Boolean(r.cookMinutes)||r.cookMinutes>1440||r.ingredients.some(id=>get('Items',id).category!=='ingredient')||(r.ingredients.length&&r.shops.length))err(p,'Công thức nấu không hợp lệ');});
 each('Location_Actions',(r,p)=>{
  if(!get('Building_Instances',r.building).interactive)err(p,'Không thể tương tác công trình nền');
  if(r.rule==='work'){const j=get('Jobs',r.job);if(!j||j.payPeriod!=='shift'||r.cash!==j.pay||r.time!==j.shiftMinutes)err(p,'Tiền công/giờ làm không khớp nghề');}
  const food=get('Food_Drinks',r.asset);if(food&&['cash','energy','hunger','happy'].some(f=>r[f]!== (f==='cash'?-food.price:food[f])))err(p,'Giá/chỉ số món ăn không khớp');
  if(r.rule==='rent'&&r.cash!==-get('Properties',r.asset)?.rentMonthly)err(p,'Giá thuê không khớp');
  if(r.rule==='buybike'&&r.cash!==-get('Vehicles',r.asset)?.price)err(p,'Giá xe không khớp');
 });
 for(const id of ['work','meal','rent','sleep','coffee','rest','ask','bankinfo','buybike','ride','clinicinfo'])if(!data.Location_Actions.some(r=>r.legacyId===id))err('Location_Actions',`Thiếu hành động tương thích ${id}`);
 each('Vehicles',(r,p)=>{if(r.energyType==='none'?[r.capacity,r.consumption,r.unitPrice].some(Boolean):![r.capacity,r.consumption,r.unitPrice].every(n=>n>0))err(p,'Thông số năng lượng xe không hợp lệ');});
 unique('Properties','building');each('Properties',(r,p)=>{const b=get('Building_Instances',r.building);if(!b.interactive||b.type!==r.type||!r.rentMonthly||!r.rentDaily||r.id!=='PROP_ROOM'&&!r.price)err(p,'Bất động sản hoặc địa điểm không hợp lệ');});
 each('Story_Events',(r,p)=>{if(!data.Event_Choices.some(c=>c.event===r.id))err(p,'Sự kiện không có lựa chọn');if(r.repeatable!==Boolean(r.cooldownDays))err(p,'Cooldown không phù hợp');});
 each('Event_Choices',(r,p)=>{if(r.delayDays>0&&!r.nextEvent)err(p,'Hậu quả trì hoãn thiếu sự kiện đích');if(r.delayDays>3650)err(p,'Hậu quả trì hoãn vượt 3650 ngày');});
 each('Employers',(r,p)=>{const hours=data.World_Schedules.find(s=>s.building===r.building);if(!hours||new Set(r.jobs).size!==r.jobs.length)err(p,'Nhà tuyển dụng không hợp lệ');for(const id of r.jobs){const j=get('Jobs',id);if(j?.payPeriod==='month'&&(!hours||hours.opens>480||hours.closes<540+j.shiftMinutes))err(p,'Ca làm không phù hợp giờ công trình');}});
 each('Career_Paths',(r,p)=>{if(r.from===r.to)err(p,'Lộ trình tự tham chiếu')});
 const cycle=(rows,edges,label)=>{const active=new Set(),done=new Set();function visit(id){if(active.has(id)){err(label,`Chu trình ${id}`);return}if(done.has(id))return;active.add(id);for(const next of edges(id))visit(next);active.delete(id);done.add(id)}for(const id of rows)visit(id)};
 cycle(data.Jobs.map(r=>r.id),id=>data.Career_Paths.filter(r=>r.from===id).map(r=>r.to),'Career_Paths');
 cycle(data.Legal_Proceedings.map(r=>r.id),id=>get('Legal_Proceedings',id).next,'Legal_Proceedings');
 if(data.Life_Endings.length<40)err('Life_Endings','Cần ít nhất 40 kết thúc');
 return errors;
}
export async function compileMaster(){const {schema,data}=await loadMaster();const errors=validateMaster(schema,data);if(errors.length)throw Error(errors.join('\n'));const bundle={version:schema.version,catalogs:data};await writeFile(path.join(base,'src/master-data.generated.js'),'// Generated from master-data/*.json. Do not edit.\nexport default '+JSON.stringify(bundle,null,2)+';\n');return {catalogs:Object.keys(data).length,records:Object.values(data).reduce((n,r)=>n+r.length,0)};}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{const stats=await compileMaster();console.log(`Master Data PASS: ${stats.catalogs} catalogs, ${stats.records} records`)}catch(e){console.error(e.message);process.exitCode=1}}
