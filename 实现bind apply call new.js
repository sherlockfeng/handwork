function.prototype.bind2 = function(context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
      }
        const self = this;
        const args = Array.prototype.slice.call(arguments, 1);
        var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
}

const m = {
    x: 42,
    getX: function () {
        return this.x;
    }
};

const unboundGetX = m.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = bind(unboundGetX, m);
console.log(boundGetX());

// expected output: 42

const apply = (fn, obj, args) => {
    obj.fn = fn;
    const result = obj.fn(...args);
    delete obj.fn;
    return result;
};

var array = ['a', 'b'];
var elements = [0, 1, 2];
apply(array.push, array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

function instanceof(left, right) {
    const target = right.prototype;
    let __proto__ = left.__proto__
    while (__proto__) {
        if (__proto__ === target) {
            return true;
        }
        __proto__ = __proto__.__proto__;
    }
    return false;
}
