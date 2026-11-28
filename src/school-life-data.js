// Fictional local schools; reuse existing building footprints and canonical course catalogue.
export const SCHOOLS=Object.freeze([
 {id:'lot_4_100',level:'kindergarten',name:'Mầm non An Lạc',sign:'MAM NON',color:'#b66c47',door:[88,106],min:3,max:6},
 {id:'lot_92_100',level:'primary',name:'Tiểu học An Lạc',sign:'TIEU HOC',color:'#318d81',door:[83,132],min:6,max:11},
 {id:'lot_4_124',level:'secondary',name:'THCS An Lạc',sign:'THCS',color:'#5078a4',door:[88,138],min:11,max:15},
 {id:'lot_92_124',level:'high',name:'THPT An Lạc',sign:'THPT',color:'#8b688e',door:[72,107],min:15,max:18},
 {id:'school',level:'college',name:'Trường nghề & Cao đẳng An Lạc',sign:'CAO DANG',color:'#367c87',min:18,max:22},
 {id:'east_school',level:'university',name:'Đại học & Trung tâm đào tạo An Bình',sign:'DAI HOC',color:'#476a9e',min:18,max:26}
].map(Object.freeze));
export const schoolById=id=>SCHOOLS.find(s=>s.id===id);
export const schoolForAge=age=>SCHOOLS.find(s=>age>=s.min&&age<s.max&&s.min<18)||null;
