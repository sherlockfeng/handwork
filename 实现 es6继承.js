// class a {
//     constructor(ccc) {
//         this.ccc = 1111;
//     }

//     static d() {}

//     get e() {
//         return this;
//     }

//     b() {
//         console.log(this);
//     }

//     c = () => {
//         console.log(this);
//     };
// }

function _defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
        var des = props[i];
        des.enumerable = des.enumerable || false;
        des.configurable = true;
        if ('value' in des) {
            des.writable = true;
        }
        Object.defineProperty(target, des.key, des);
    }
}

function _callCheck(instance, Constructor) {
    if (!instance instanceof Constructor) {
        throw new TypeError();
    }
}

function _creatClass(target, protoprops, staticprops) {
    if (protoprops) {
        _defineProperties(target.protoprops, protoprops);
    } else {
        _defineProperties(target, staticprops);
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var a = (function () {
    function a(ccc) {
        var _this = this;
        _callChekc(this, a);
        _defineProperty(this, 'c', function () {
            console.log(_this);
        });
        this.ccc = 111;
    }
    _creatClass(a, [
        {
            key: 'b',
            value: function b() {
                console.log(this);
            }
        },
        {
            key: 'e',
            get: function e() {
                return this;
            }
        }
    ]);
    return a;
})();
