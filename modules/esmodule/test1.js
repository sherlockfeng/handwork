const a = require('../require/test1');
a.sayHello();
import(/* webpackChunkName: "test2" */ './test2.js').then(val => console.log(val));
