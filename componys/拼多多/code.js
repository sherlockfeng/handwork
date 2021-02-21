// 把提供的字符串转为 dom 节点，其中指定文字设置背景色
const str2dom1 = (str, target) => {
    const result = document.createElement('div');
    const r = new RegExp(`${target}`, 'g');
    str = str.replace(r, v => `<span style="background: red">${v}</span>`);
    result.innerHTML = str;
    return result;
};

const str2dom2 = (str, target) => {
    const result = document.createElement('div');
    result.innerHTML = str.split(target).join(`<span style="background: red">${target}</span>`);
    return result;
};

// 缓存函数
const memo = fn => {
    const map = new Map();
    return (...args) => {
        if (map.has(args)) {
            return map.get(args);
        }
        const r = fn(...args);
        map.set(args, r);
        return r;
    };
};

// 数组转树
const list = [
    {name: '衣服', id: 1, parentId: ''},
    {name: '裤子', id: 2, parentId: 1},
    {name: '上衣', id: 3, parentId: 1},
    {name: '牛仔裤', id: 4, parentId: 2}
];

const arr2tree = arr => {
    for (let i of arr) {
        if (!i.parentId) {
            continue;
        }
        // 两遍循环来保证父在子后的情况
        for (let j of arr) {
            if (j.id === i.id) {
                continue;
            }
            if (j.parentId === i.id) {
                i.children ? (i.children = [j]) : i.children.push(j);
            }
        }
    }
};

// 二叉搜索树转有序链表 其实就是中序遍历
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
const tree2listNode = tree => {
    const result = new ListNode();
    let f = result;

    const help = node => {
        if (node.left) {
            help(node.left);
        }
        f.next = node;
        f = f.next;
        if (node.right) {
            help(node.right);
        }
    };

    help(tree);

    return result.next;
};
