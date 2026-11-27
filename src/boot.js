import {loadingFailed} from './premium-ui.js';
const retry=document.getElementById('loadRetry');retry.onclick=()=>location.reload();
// Catch static dependency/import errors as well as renderer startup failures.
try{await import('./main.js');}catch(error){console.error(error);loadingFailed(document,error);}
