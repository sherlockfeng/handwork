// var x = 10;
// globalThis.x = 10;
// var obj = {
//     x: 20,
//     f: function () {
//         console.log(this.x); // 20
//         var foo = function () {
//             console.log(this.x);
//         };
//         foo(); // 10
//     }
// };
// obj.f();

// function foo(arg) {
//     this.a = arg;
//     return this;
// }

// var a = foo(1);
// var b = foo(10); // 把window.a 变成了10

// console.log(a.a); // 10.a undefined
// console.log(b.a); // 10

// var x = 10;
// var obj = {
//     x: 20,
//     f: function () {
//         console.log(this.x);
//     }
// };
// var bar = obj.f;
// var obj2 = {
//     x: 30,
//     f: obj.f
// };
// obj.f(); // 20
// bar(); // 10
// obj2.f(); // 30

// function foo() {
//     getName = function () {
//         console.log(1);
//     };
//     return this;
// }
// foo.getName = function () {
//     console.log(2);
// };
// foo.prototype.getName = function () {
//     console.log(3);
// };
// var getName = function () {
//     console.log(4);
// };
// function getName() { // 函数声明会被提升到最顶端
//     console.log(5);
// }

// foo.getName(); // 2
// getName(); // 4 函数声明会被提升到最顶端 var getName在后面
// foo().getName(); // 1
// getName(); // 1
// new foo.getName(); // 2
// new foo().getName(); // 3 return 的this竟然不影响new 的返回
// new new foo().getName(); // 3

var a = 10;
function foo() {
    console.log(this.a);
}
foo(); // 10

('use strict');
var a = 10;
function foo() {
    console.log('this1', this);
    console.log(window.a);
    console.log(this.a);
}
console.log(window.foo); // foo () { ... }
console.log('this2', this); // window
foo(); // undefined 10 报错

let a = 10;
const b = 20;

function foo() {
    console.log(this.a);
    console.log(this.b);
}
foo();
console.log(window.a);
// undefined undefined undefined

var a = 1;
function foo() {
    var a = 2;
    console.log(this);
    console.log(this.a);
}

foo();
// window 1

var a = 1;
function foo() {
    var a = 2;
    function inner() {
        console.log(this.a);
    }
    inner();
}

foo(); // 1

function foo() {
    console.log(this.a);
}
var obj = {a: 1, foo};
var a = 2;
obj.foo();
// 1

function foo() {
    console.log(this.a);
}
var obj = {a: 1, foo};
var a = 2;
var foo2 = obj.foo;

obj.foo(); // 1
foo2(); // 2

function foo() {
    console.log(this.a);
}
var obj = {a: 1, foo};
var a = 2;
var foo2 = obj.foo;
var obj2 = {a: 3, foo2: obj.foo};

obj.foo(); // 1
foo2(); // 2
obj2.foo2(); // 3

function foo() {
    console.log(this.a);
}
function doFoo(fn) {
    console.log(this);
    fn();
}
var obj = {a: 1, foo};
var a = 2;
doFoo(obj.foo); // window 2

function foo() {
    console.log(this.a);
}
function doFoo(fn) {
    console.log(this);
    fn();
}
var obj = {a: 1, foo};
var a = 2;
var obj2 = {a: 3, doFoo};

obj2.doFoo(obj.foo); // obj2 2

function foo() {
    console.log(this.a);
}
var obj = {a: 1};
var a = 2;

foo(); // 2
foo.call(obj); // 1
foo.apply(obj); // 1
foo.bind(obj); // function

function foo() {
    console.log(this.a);
}
var a = 2;
foo.call(); // 2
foo.call(null); // 2
foo.call(undefined); // 2

var obj1 = {
    a: 1
};
var obj2 = {
    a: 2,
    foo1: function () {
        console.log(this.a);
    },
    foo2: function () {
        setTimeout(function () {
            console.log(this);
            console.log(this.a);
        }, 0);
    }
};
var a = 3;

obj2.foo1(); // 2
obj2.foo2(); // 3

var obj1 = {
    a: 1
};
var obj2 = {
    a: 2,
    foo1: function () {
        console.log(this.a);
    },
    foo2: function () {
        setTimeout(
            function () {
                console.log(this);
                console.log(this.a);
            }.call(obj1),
            0
        );
    }
};
var a = 3;
obj2.foo1(); // 2
obj2.foo2(); // 1

var obj1 = {
    a: 1
};
var obj2 = {
    a: 2,
    foo1: function () {
        console.log(this.a);
    },
    foo2: function () {
        function inner() {
            console.log(this);
            console.log(this.a);
        }
        inner();
    }
};
var a = 3;
obj2.foo1(); // 2
obj2.foo2(); // 3

function foo() {
    console.log(this.a);
}
var obj = {a: 1};
var a = 2;

foo(); // 2
foo.call(obj); // 1
foo().call(obj); // 2

function foo() {
    console.log(this.a);
    return function () {
        console.log(this.a);
    };
}
var obj = {a: 1};
var a = 2;

foo(); // 2
foo.call(obj); // 1
foo().call(obj); // 2 1

function foo() {
    console.log(this.a);
    return function () {
        console.log(this.a);
    };
}
var obj = {a: 1};
var a = 2;

foo(); // 2
foo.bind(obj); // function
foo().bind(obj); // 2 function

function foo() {
    console.log(this.a);
    return function () {
        console.log(this.a);
    };
}
var obj = {a: 1};
var a = 2;

foo.call(obj)(); // 1 2

var obj = {
    a: 'obj',
    foo: function () {
        console.log('foo:', this.a);
        return function () {
            console.log('inner:', this.a);
        };
    }
};
var a = 'window';
var obj2 = {a: 'obj2'};

obj.foo()(); // obj window
obj.foo.call(obj2)(); // obj2 window
obj.foo().call(obj2); // obj obj2

var obj = {
    a: 1,
    foo: function (b) {
        b = b || this.a;
        return function (c) {
            console.log(this.a + b + c);
        };
    }
};
var a = 2;
var obj2 = {a: 3};

obj.foo(a).call(obj2, 1); // 3 + 2 + 1 = 6
obj.foo.call(obj2)(1); // 2 + 3 + 1 = 6

function foo1() {
    console.log(this.a);
}
var a = 1;
var obj = {
    a: 2
};

var foo2 = function () {
    foo1.call(obj);
};

foo2(); // 2
foo2.call(window); // 2

function foo1(b) {
    console.log(`${this.a} + ${b}`);
    return this.a + b;
}
var a = 1;
var obj = {
    a: 2
};

var foo2 = function () {
    return foo1.call(obj, ...arguments);
};

var num = foo2(3); // 2 + 3
console.log(num); // 5

// todo forEach、map、filter、every、some、find、findIndex
// todo 第二个参数也是能绑定this的
// 1. this 永远指向最后调用它的那个对象
// 2. 匿名函数的this永远指向window
// 3. 使用.call()或者.apply()的函数是会直接执行的
// 4. bind()是创建一个新的函数，需要手动调用才会执行
// 5. 如果call、apply、bind接收到的第一个参数是空或者null、undefined的话，则会忽略这个参数
// 6. forEach、map、filter函数的第二个参数也是能显式绑定this的

function foo(item) {
    console.log(item, this.a);
}
var obj = {
    a: 'obj'
};
var a = 'window';
var arr = [1, 2, 3];

// arr.forEach(foo, obj)
// arr.map(foo, obj)
arr.filter(function (i) {
    console.log(i, this.a);
    return i > 2;
}, obj); // 1 obj 2 obj 3 obj

function Person(name) {
    this.name = name;
}
var name = 'window';
var person1 = new Person('LinDaiDai');
console.log(person1.name); // LinDaiDai

function Person(name) {
    this.name = name;
    this.foo1 = function () {
        console.log(this.name);
    };
    this.foo2 = function () {
        return function () {
            console.log(this.name);
        };
    };
}
var person1 = new Person('person1');
person1.foo1(); // person1
person1.foo2()(); // ''

var name = 'window';
function Person(name) {
    this.name = name;
    this.foo = function () {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    };
}
var person2 = {
    name: 'person2',
    foo: function () {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    }
};

var person1 = new Person('person1');
person1.foo()(); // person1 window
person2.foo()(); // persion2 window

var name = 'window';
function Person(name) {
    this.name = name;
    this.foo = function () {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    };
}
var person1 = new Person('person1'); // persion1 {name: persion1; foo: function}
var person2 = new Person('person2'); // persion2 {name: persion2; foo: function}

person1.foo.call(person2)(); // person2 window
person1.foo().call(person2); // persion1 persion2

var obj = {
    name: 'obj',
    foo1: () => {
        console.log(this.name);
    },
    foo2: function () {
        console.log(this.name);
        return () => {
            console.log(this.name);
        };
    }
};
var name = 'window';
obj.foo1(); // window
obj.foo2()(); // obj obj

var name = 'window';
var obj1 = {
    name: 'obj1',
    foo: function () {
        console.log(this.name);
    }
};

var obj2 = {
    name: 'obj2',
    foo: () => {
        console.log(this.name);
    }
};

obj1.foo(); // obj1
obj2.foo(); // window

var name = 'window';
var obj1 = {
    name: 'obj1',
    foo: function () {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    }
};
var obj2 = {
    name: 'obj2',
    foo: function () {
        console.log(this.name);
        return () => {
            console.log(this.name);
        };
    }
};
var obj3 = {
    name: 'obj3',
    foo: () => {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    }
};
var obj4 = {
    name: 'obj4',
    foo: () => {
        console.log(this.name);
        return () => {
            console.log(this.name);
        };
    }
};

obj1.foo()(); // obj1 window
obj2.foo()(); // obj2 obj2
obj3.foo()(); // window window
obj4.foo()(); // window window

var name = 'window';
function Person(name) {
    this.name = name;
    this.foo1 = function () {
        console.log(this.name);
    };
    this.foo2 = () => {
        console.log(this.name);
    };
}
var person2 = {
    name: 'person2',
    foo2: () => {
        console.log(this.name);
    }
};
var person1 = new Person('person1');
person1.foo1(); // person1
person1.foo2(); // person1
person2.foo2(); // window

var name = 'window';
function Person(name) {
    this.name = name;
    this.foo1 = function () {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    };
    this.foo2 = function () {
        console.log(this.name);
        return () => {
            console.log(this.name);
        };
    };
    this.foo3 = () => {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    };
    this.foo4 = () => {
        console.log(this.name);
        return () => {
            console.log(this.name);
        };
    };
}
var person1 = new Person('person1');
person1.foo1()(); // person1 window
person1.foo2()(); // person1 person1
person1.foo3()(); // person1 window
person1.foo4()(); // person1 person1

var name = 'window';
var obj1 = {
    name: 'obj1',
    foo1: function () {
        console.log(this.name);
        return () => {
            console.log(this.name);
        };
    },
    foo2: () => {
        console.log(this.name);
        return function () {
            console.log(this.name);
        };
    }
};
var obj2 = {
    name: 'obj2'
};
obj1.foo1.call(obj2)(); // obj2 obj2
obj1.foo1().call(obj2); // obj1 obj1
obj1.foo2.call(obj2)(); // window window
obj1.foo2().call(obj2); // window obj2

// todo 1. 它里面的this是由外层作用域来决定的，且指向函数定义时的this而非执行时
// todo 2. 字面量创建的对象，作用域是window，如果里面有箭头函数属性的话，this指向的是window
// todo 3. 构造函数创建的对象，作用域是可以理解为是这个构造函数，且这个构造函数的this是指向新建的对象的，因此this指向这个对象
// todo 4. 箭头函数的this是无法通过bind、call、apply来直接修改，但是可以通过改变作用域中this的指向来间接修改。

var name = 'window';
var person1 = {
    name: 'person1',
    foo1: function () {
        console.log(this.name);
    },
    foo2: () => console.log(this.name),
    foo3: function () {
        return function () {
            console.log(this.name);
        };
    },
    foo4: function () {
        return () => {
            console.log(this.name);
        };
    }
};
var person2 = {name: 'person2'};

person1.foo1(); // person1
person1.foo1.call(person2); // person2

person1.foo2(); // window
person1.foo2.call(person2); // window

person1.foo3()(); // window
person1.foo3.call(person2)(); // window
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1

var name = 'window';
function Person(name) {
    this.name = name;
    (this.foo1 = function () {
        console.log(this.name);
    }),
        (this.foo2 = () => console.log(this.name)),
        (this.foo3 = function () {
            return function () {
                console.log(this.name);
            };
        }),
        (this.foo4 = function () {
            return () => {
                console.log(this.name);
            };
        });
}
var person1 = new Person('person1');
var person2 = new Person('person2');

person1.foo1(); // person1
person1.foo1.call(person2); // person2

person1.foo2(); // person1
person1.foo2.call(person2); // person1

person1.foo3()(); // window
person1.foo3.call(person2)(); // window
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1

var name = 'window';
function Person(name) {
    this.name = name;
    this.obj = {
        name: 'obj',
        foo1: function () {
            return function () {
                console.log(this.name);
            };
        },
        foo2: function () {
            return () => {
                console.log(this.name);
            };
        }
    };
}
var person1 = new Person('person1');
var person2 = new Person('person2');

person1.obj.foo1()(); // window
person1.obj.foo1.call(person2)(); // window
person1.obj.foo1().call(person2); // person2

person1.obj.foo2()(); // obj
person1.obj.foo2.call(person2)(); // person2
person1.obj.foo2().call(person2); // obj

function foo() {
    console.log(this.a);
}
var a = 2;
(function () {
    'use strict';
    foo();
})();
// 2

Function.prototype.bind1 = function (fn, ...args) {
    if (typeof fn !== 'function') {
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
    }

    const self = this;

    const fBuond = function (...args1) {
        return self.apply(this instanceof fNOP ? this : fn, args.concat(args1));
    };

    const fNOP = function () {};
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBuond;
};

function create(...args) {
    const context = [].shift.call(args);
    const obj = Object.create(context.prototype);
    const result = context.apply(obj, args);

    if (result instanceof Object) {
        return result;
    }
    return obj;
}
