function sum(...args) {
    const add = function (...args1) {
        return sum(...args, ...args1);
    };
    add.toString = () => args.reduce((a, b) => a + b) + '';
    return add;
}
console.log(sum(1)(2)(3)(...[1, 2, 3]).toString());

// // 写一段匹配URL的正则，包括协议、域名、端口、path、hash、querystring
// const urls = [
//     'https://www.baidu.com/',
//     'http://192.168.1.1',
//     'http://192.168.1.1:8080',
//     'https://news.163.com/18/1224/15/E3Q6EJDA0001875N.html#top',
//     'https://baidu.com:80/?wd=wq&url=ksks#ddsx2',
//     'http://192.168.1.1/p/#name',
//     'https://neets.cc/subcriberlist?recommendInventoryId=QNZfMjCRQtS4z8MQrFa7qo'
// ];

// const reg = /^(https?:\/\/)([0-9a-zA-Z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?$/i;
// for (const url of urls) {
//     console.log(reg.test(url));
//     const result = reg.exec(url);
//     console.log(result);
// }

// // 列举闭包的作用的时候举例了 for ... setTimeout，于是要求用多种方式实现
// for (var i = 0; i < 6; i++) {
//     const fn = (i => {
//         return () => console.log(i);
//     })(i);
//     setTimeout(fn);
// }

// var obj = {
//     fnA() {
//         console.log(this);
//     },
//     fnB: () => {
//         console.log(this);
//     }
// };
// obj.fnA(); // obj
// obj.fnB(); // window
// const {fnA, fnB} = obj;
// fnA(); // window
// fnB(); // window

// Promise.then里抛出的错误能否被try...catch捕获，为什么。
try {
    Promise.resolve().then(() => {
        throw new Error('Whoops.');
    });
} catch (e) {
    console.log('e ======', e); //
}

// n级台阶，从0开始走起，一次可以走一步或者两步，那么走完n级台阶一共有多少种走法？先讲思路再写代码。
const pa = n => {
    const dp = [0, 1, 2];
    for (let i = 3; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};

// 实现一个模板字符串转义
const template = (str, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
        const reg = new RegExp(`{{${key}}}`, 'g');
        str.replace(reg, value);
    });

    return str;
};

// todo 从输入Url到页面渲染发生了什么？写个提纲
// 网络阶段：构建请求行、查询强缓存、DNS解析、建立TCP连接、发送HTTP请求、响应请求
// 解析阶段：解析html、构建dom树、计算样式、生成布局树
// 渲染阶段：生成图层树、生成绘制列表、生成图块、优先选择视口附近的图块生成位图数据、展示内容
