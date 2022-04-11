// 数组A中给定可以使用的1~9的数，返回由A数组中的元素组成的小于n的最大数。
// 例如A=[1, 2, 4, 9]，x=2533，返回2499

const getMax = (arr, x) => {
    const numSet = new Set(arr);
    let result = '';
    x = `${x}`.split('');

    for (let i = 0; i < x.length; i++) {
        const num = +x[i];
        console.log('num', num);
        if (numSet.has(num)) {
            result += num;
            console.log('1', result);
        } else {
            let notFind = true;
            for (let j = num - 1; j >= 0; j--) {
                if (numSet.has(j)) {
                    result += j;
                    notFind = false;
                    break;
                }
            }
            while (notFind && result.length) {
                let j = result[result.length - 1] - 1;
                result = result.slice(0, -1);
                for (; j >= 0; j--) {
                    if (numSet.has(j)) {
                        result += j;
                        notFind = false;
                        break;
                    }
                }
            }
            if (i < 0) {
                return 0;
            }
            break;
        }
    }
    console.log('result', result);

    for (let i = 9; i >= 0; i--) {
        while (numSet.has(i) && result.length < x.length) {
            result += i;
        }
        break;
    }

    return result;
};

// console.log(getMax([1, 2, 4, 9], 2533));

// transform({
//     0: {
//       username: '0',
//       department: 'A-B-C',
//     },
//     1: {
//       username: '1',
//       department: 'A-B-D',
//     },
//     2: {
//       username: '2',
//       department: 'A-X-Y',
//     },
//   })
//   // 打印结果：
//   [
//     {
//       name: 'A',
//       path: 'A',
//       children: [
//         {
//           name: '0',
//           path: 'A-B',
//           children: [
//             { name: '0', path: 'A-B-C', children: [] },
//             { name: '1', path: 'A-B-D', children: [] },
//           ],
//         },
//         { name: '2', path: 'A-X', children: [{ name: '2', path: 'A-X-Y', children: [] }] },
//       ],
//     }
//   ]

const transform = obj => {
    const root = [];

    Object.values(obj).forEach(item => {
        const {username, department} = item;

        let flag = root;

        const path = department.split('-');

        path.reduce((acc, cur, index) => {
            // console.log('acc', acc);
            // console.log('cur', cur);
            const toFind = acc ? `${acc}-${cur}` : cur;
            // console.log('toFind', toFind);
            const findOne = flag.find(item => item.path === toFind);
            if (findOne) {
                !flag.children && (flag.children = []);
                flag = findOne.children;
            } else {
                flag.push({
                    path: toFind,
                    children: [],
                    ...(index === path.length - 1 ? {name: username} : {})
                });
                flag = flag[flag.length - 1].children;
            }
            return toFind;
        }, '');
    });

    return root;
};

const result = transform({
    0: {
        username: '0',
        department: 'A-B-C'
    },
    1: {
        username: '1',
        department: 'A-B-D'
    },
    2: {
        username: '2',
        department: 'A-X-Y'
    }
});
console.log('result', result);
console.log('result[0].children', result[0].children);
console.log('result[0].children[0].children', result[0].children[0].children);
console.log('result[0].children[1].children', result[0].children[1].children);
