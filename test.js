const newF = (fun, ...args) => {
    if (typeof fun !== 'function') {
        return;
    }
    newF.target = fn;
    const o = Object.create(fun.prototype);
    const r = fun(...args);
    if ((typeof f === 'object' && f !== null) || typeof f === 'function') {
        return r;
    }
    return o;
};

const xipai = arr => {
    const swap = (arr, left, right) => {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    };

    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(Math.random() * (i + 1));
        swap(arr, index, i);
    }

    return arr;
};

const quickSort = arr => {
    const swap = (arr, left, right) => {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    };
    const help = (arr, left, right) => {
        if (left < right) {
            const flag = arr[left];
            const l = left;
            const r = right;
            left++;
            while (left <= right) {
                while (left <= right && arr[left] <= flag) {
                    left++;
                }
                while (left <= right && arr[right] >= flag) {
                    right--;
                }
                if (left < right) {
                    swap(arr, left, right);
                    left++;
                    right--;
                }
            }
            console.log(l, right);
            swap(arr, l, right);
            help(arr, l, right - 1);
            help(arr, right + 1, r);
        }
    };

    help(arr, 0, arr.length - 1);

    return arr;
};

const r = quickSort([1, 3, 5, 2, 2, 5]);
console.log(r);

function Person() {
    this.name = 'A';
}

Person.prototype.sayName = function () {
    console.log(this.name);
};

Person();

const b = {};

Person.prototype.sayName.call(b);

const c = () => {
    this.name = 'C';
};

const d = {name: 'z'};

c.call(d);

console.log(d);
