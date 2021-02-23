function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

const reConstructBinaryTree = (pre, vin) => {
    const build = (pre, ino) => {
        if (!pre.length || !ino.length) {
            return null;
        }
        const v = pre[0];
        pre.shift();
        const index = ino.indexOf(v);
        const node = new TreeNode(v);

        node.left = build(pre.slice(0, index), ino.slice(0, index));
        node.right = build(pre.slice(index), ino.slice(index + 1));

        return node;
    };
    const result = build(pre, vin);
    return result;
};

console.log(reConstructBinaryTree([1, 2, 3, 4, 5, 6, 7], [3, 2, 4, 1, 6, 5, 7]));
