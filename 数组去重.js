Array.prototype.uniq = function () {
    return Array.from(new Set(this));
};

console.log([false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq());
