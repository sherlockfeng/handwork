// class Point {
//     static name = 'p';
//     constructor(x, y) {
//           this.x = x;
//           this.y = y;
//       }
//   }
//   class ColorPoint extends Point {
//         color = 'red'
//       constructor(x, y, color) {
//           super(x, y); // 调用父类的constructor(x, y)
//           this.color = color;
//       }
//       toString() {
//           return this.color + ' ' + super.toString(); // 调用父类的toString()
//       }
//         get color() {
//           return this.color
//       }
//   }

//   const a = new ColorPoint(1,2,3)

'use strict';

function _typeof(obj) {
    '@babel/helpers - typeof';
    return (
        (_typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (obj) {
                      return typeof obj;
                  }
                : function (obj) {
                      return obj &&
                          'function' == typeof Symbol &&
                          obj.constructor === Symbol &&
                          obj !== Symbol.prototype
                          ? 'symbol'
                          : typeof obj;
                  }),
        _typeof(obj)
    );
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _get() {
    if (typeof Reflect !== 'undefined' && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
        };
    }
    return _get.apply(this, arguments);
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {value: subClass, writable: true, configurable: true}
    });
    Object.defineProperty(subClass, 'prototype', {writable: false});
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
    } else if (call !== void 0) {
        throw new TypeError('Derived constructors may only return object or undefined');
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, 'prototype', {writable: false});
    return Constructor;
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
    } else {
        obj[key] = value;
    }
    return obj;
}

var Point = /*#__PURE__*/ (function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        _defineProperty(this, 'bbb', 'a');

        console.log(this);
        this.x = x;
        this.y = y;
    }

    _createClass(Point, [
        {
            key: 'getName',
            value: function getName() {
                console.log(this.name);
            }
        }
    ]);

    return Point;
})();

_defineProperty(Point, 'name', 'p');

var ColorPoint = /*#__PURE__*/ (function (_Point) {
    // subClass.prototype 指向 superClass的prototype
    _inherits(ColorPoint, _Point);

    var _super = _createSuper(ColorPoint);

    function ColorPoint(x, y, color) {
        var _this;

        _classCallCheck(this, ColorPoint);

        _this = _super.call(this, x, y); // 调用父类的constructor(x, y)

        _defineProperty(_assertThisInitialized(_this), 'color', 'red');

        _this.color = color;
        return _this;
    }

    // static 的值直接定义到函数上（ColorPoint）
    // 非 static的值在函数（ColorPoint）执行时定义到this上
    // 非 static的方法定义到函数（ColorPoint）的prototype上
    _createClass(ColorPoint, [
        {
            key: 'toString',
            value: function toString() {
                return this.color + ' ' + _get(_getPrototypeOf(ColorPoint.prototype), 'toString', this).call(this); // 调用父类的toString()
            }
        },
        {
            key: 'color',
            get: function get() {
                return this.color;
            }
        }
    ]);

    return ColorPoint;
})(Point);

var a = new ColorPoint(1, 2, 3);
console.log(a.getName());


const fNew = (fn, ...args) => {
    if (typeof fuc !== 'function') {
        return;
    }
    fNew.target = fn;
    const obj = Object.create(fn.prototype);
    const result = fn.call(obj, ...args);
    if (typeof result === 'object' && result !== null) {
        return result;
    }
    return obj;
}