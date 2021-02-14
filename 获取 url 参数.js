// 获取 url 中的参数
// 1. 指定参数名称，返回该参数的值 或者 空字符串
// 2. 不指定参数名称，返回全部的参数对象 或者 {}
// 3. 如果存在多个同名参数，则返回数组

function getUrlParam(sUrl, sKey) {
    const params = sUrl.split('?')[1].split('#')[0].split('&');
    let result = sKey ? [] : {};
    params.forEach(p => {
        const k = p.split('=')[0];
        const v = p.split('=')[1];
        if (!sKey) {
            if (!result[k]) {
                result[k] = [];
            }
            result[k].push(v);
        } else {
            if (k === sKey) {
                result.push(v);
            }
        }
    });
    if (sKey) {
        if (result.length > 1) {
            return result;
        }
        return result.length ? result[0] : '';
    }
    return result;
}

// console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe', 'key'));
// console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test1=4#hehe', 'test1'));
console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&key=4&test1=4#hehe'));
let a = getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&key=4&test1=4#hehe');
console.log(a.key.join('') === '1234');
