const o = {};

let bValue = [1, 2, 3];
Object.defineProperty(o, 'b', {
    // 使用了方法名称缩写（ES2015 特性）
    // 下面两个缩写等价于：
    // get : function() { return bValue; },
    // set : function(newValue) { bValue = newValue; },
    get() {
        console.log('get');
        return bValue;
    },
    set(newValue) {
        bValue = newValue;
    },
    enumerable: true,
    configurable: true
});

console.log(o.b);

o.b.push(2);
