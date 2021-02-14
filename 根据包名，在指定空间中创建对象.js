// 题目描述
// 根据包名，在指定空间中创建对象
// 输入描述:
// namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
// 输出描述:
// {a: {test: 1, b: {c: {d: {}}}}}
function namespace(oNamespace, sPackage) {
    const sNums = sPackage.split('.');
    if (sNums[0] === '') {
        return;
    }
    let temp = oNamespace;
    sNums.forEach(key => {
        if (typeof temp[key] === 'object') {
            temp[key] = {...temp[key]};
        } else {
            temp[key] = {};
        }
        temp = temp[key];
    });
    return oNamespace;
}

// namespace({a: {test: 1, b: 2}}, 'a.b.c.d');

function test() {
    var a = {};
    var r = namespace(a, 'a.b.c.d.e.f.g');
    a.a.b.c.d.e.f.g = 1;
    return a.a.b.c.d.e.f.g === 1;
}

console.log(test());
