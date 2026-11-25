import bundle from './master-data.generated.js';
function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value)}return value}
export const MASTER_VERSION=bundle.version;
export const catalogs=freeze(bundle.catalogs);
const index=new Map(Object.values(catalogs).flat().map(row=>[row.id,row]));
export function record(id){return index.get(id)}
export const config=record('CFG_DEFAULT');
export const city=record('CTY_ANLAC');
export const stats=freeze({catalogs:Object.keys(catalogs).length,records:index.size});
