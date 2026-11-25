import {compileMaster} from './master-data.mjs';
await compileMaster();
import {cp,mkdir,rm,copyFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const check=spawnSync(process.execPath,['scripts/check.mjs'],{stdio:'inherit'});if(check.status!==0)process.exit(1);
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('src','dist/src',{recursive:true});await cp('public','dist',{recursive:true});await copyFile('index.html','dist/index.html');console.log('From Zero v0.3.0 → dist/');
