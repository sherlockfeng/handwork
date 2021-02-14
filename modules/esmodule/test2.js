import {a} from './test1.js';
console.log('es2: ' + a); // es2: undefined 🥇
var b = 'es2';
setTimeout(() => {
    console.log('es2: ' + a); // es2: es1 🥉
}, 1000);
export {b};
