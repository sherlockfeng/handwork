// 实现加法函数使得sum(2)(3)和sum(2,3)都输出5

// const sum = (...args) => {
//     let result = 0;
//     for (let n of args) {
//         result += n;
//     }
//     if (args.length === 1) {
//         return y => result + y;
//     }
//     return result;
// };

const curry = (fn, ...curArgs) => {
    return (...args) => {
        console.log('curArgs', curArgs);
        console.log('args', args);
        if (curArgs.length) {
            args = [...args, ...curArgs];
        }
        if (args.length < fn.length) {
            return curry(fn, ...args);
        }
        return fn(...args);
    };
};

const sum = curry((a, b) => a + b);
console.log(sum(2)(3));
// console.log(sum(2, 3));

// function curry(fn, currArgs) {
//     return function () {
//         let args = [].slice.call(arguments);

//         // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
//         if (currArgs !== undefined) {
//             args = args.concat(currArgs);
//         }

//         console.log('currArgs', currArgs);
//         console.log('args', args);

//         // 递归调用
//         if (args.length < fn.length) {
//             return curry(fn, args);
//         }

//         // 递归出口
//         return fn.apply(null, args);
//     };
// }

const persons = [
    {name: 'kevin', age: 4},
    {name: 'bob', age: 5},
    {name: 'andy', age: 6}
];

// 这里的 curry 函数，之前已实现
// const getProp = curry(function (obj, index) {
//     const args = [].slice.call(arguments);
//     console.log('a', args);
//     console.log('obj', obj);
//     return obj[args[args.length - 1]];
// });

// const ages = persons.map(getProp('age')); // [4, 5]
// // const names = persons.map(getProp('name')); // ['kevin', 'bob']

// console.log(ages);
