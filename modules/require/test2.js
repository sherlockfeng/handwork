var a = require('./test1').a;
console.log('test2: ' + a); // test2: undefined 🥇
var b = 'test2';
setTimeout(() => {
    console.log('test2: ' + a); // test2: undefined 🥉
}, 1000);
exports.b = b;
