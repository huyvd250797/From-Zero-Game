import {readdir} from 'node:fs/promises';import {spawnSync} from 'node:child_process';
for(const dir of ['src','scripts','scripts/modeling','tests','public'])for(const file of await readdir(dir)){if(!/\.(js|mjs)$/.test(file))continue;let r=spawnSync(process.execPath,['--check',`${dir}/${file}`],{stdio:'inherit'});if(r.status!==0)process.exit(1)}console.log('JavaScript syntax check passed');
