// // 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：
// function red() {
//     console.log('red');
// }
// function green() {
//     console.log('green');
// }
// function yellow() {
//     console.log('yellow');
// }

// const fn = (red, green, yellow) => {
//     const toHandleArray = [[green], [green, yellow], [green, yellow, red]];

//     const delay = () => {
//         toHandleArray.reduce((acc, cur, index) => {
//             return acc.then(() => {
//                 return new Promise(resolve => {
//                     setTimeout(() => {
//                         cur.map(fun => fun());
//                         resolve();
//                         if (index === toHandleArray.length - 1) {
//                             delay();
//                         }
//                     }, 1000);
//                 });
//             });
//         }, Promise.resolve());
//     };

//     delay();
// };

// fn(red, green, yellow);

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
const toP = (fn, time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            fn();
            resolve();
        }, time);
    });
};
const step = () =>
    Promise.resolve()
        .then(() => {
            return toP(red, 3000);
        })
        .then(() => {
            return toP(yellow, 2000);
        })
        .then(() => {
            return toP(green, 1000);
        })
        .then(step);

step();
