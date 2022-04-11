// 算法题，leetcode 112路径总和

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    if (!root) {
        return false;
    }
    let result = false;
    const dfs = (node, sum) => {
        if (!node.left && !node.right) {
            if (sum + node.val === targetSum) {
                result = true;
            }
        }
        node.left && dfs(node.left, node.val + sum);
        node.right && dfs(node.right, node.val + sum);
    };

    dfs(root, 0);

    return result;
};

// 手写reduce

const fReduce = (arr, cb, acc) => {
    let initIndex = 0;

    if (acc === undefined) {
        acc = arr[0];
        initIndex = 1;
    }

    for (let i = initIndex; i < arr.length; i++) {
        acc = cb(acc, arr[i], i, arr);
    }

    return acc;
};

// 作者自己的方法实现的不一样，感觉是题目记错了？
// fn([['a', 'b'], ['n', 'm'], ['0', '1']]) => ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']
function fn(matrix) {
    const result = [];
    const len = matrix.length;
    function dfs(res, curr) {
        if (res.length === len) {
            result.push(res.join(''));
            return;
        }
        for (let i = 0; i < matrix[curr].length; i++) {
            res.push(matrix[curr][i]);
            dfs(res, curr + 1);
            res.pop();
        }
    }
    dfs([], 0);
    return result;
}

// console.log(
//     fn([
//         ['a', 'b'],
//         ['n', 'm'],
//         ['0', '1']
//     ])
// );

// u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')，

class U {
    constructor() {
        this.wait = Promise.resolve();
    }
    console(v) {
        // console.log('console');
        this.wait = this.wait.then(() => {
            console.log(v);
        });
        return this;
    }

    setTimeout(waitTime) {
        // console.log('setTimeout', waitTime);
        this.wait = this.wait.then(() => {
            return new Promise(resolve => {
                waitTime &&
                    setTimeout(() => {
                        resolve();
                    }, waitTime);
            });
        });

        return this;
    }
}
const u = new U();
// u.console('breakfast').setTimeout(5000).console('lunch').setTimeout(13000).console('dinner');

// 什么是事件代理
// 捕获阶段 目标阶段 冒泡阶段 减少绑定dom事件
// event.target 和 event.curentTarget分别是什么
// target是触发事件的dom，如li，cuerntTarget是绑定事件的dom，如ul

var length = 10;
function fn1() {
    return this.length + 1;
}
var obj1 = {
    length: 5,
    test1: function () {
        return fn1();
    }
};
obj1.test2 = fn1;
obj1.test1.call(); // 11
obj1.test1(); // 11
obj1.test2.call(); // 11
obj1.test2(); // 6

// 给数组中的字符串编号，f(['ab', 'c', 'd', 'ab', 'c']) => ['ab1', 'c1', 'd', 'ab2', 'c2']
const f = arr => {
    const map = new Map();
    const waitOne = [];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const findOne = map.get(arr[i]);
        if (findOne) {
            findOne.count++;
            result.push(`${arr[i]}${findOne.count}`);
            if (findOne.count === 2) {
                waitOne.push(findOne.initIndex);
            }
        } else {
            result.push(arr[i]);
            map.set(arr[i], {
                initIndex: i,
                count: 1
            });
        }
    }
    for (const index of waitOne) {
        result[index] += '1';
    }
    return result;
};
// console.log(f(['ab', 'c', 'd', 'ab', 'c']));

// todo 技术选型
// 成熟度 下载量 维护频率
// 团队技术匹配程度
// 是否满足业务需求

// todo 设计模式
// 代理 单例 发布订阅 观察者

// f(n) = (f(n - 1) + m) % n
