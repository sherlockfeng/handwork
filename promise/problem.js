// 1. Promise的状态一经改变就不能再改变。(见3.1)
// 2. .then和.catch都会返回一个新的Promise。(上面的👆1.4证明了)
// 3. catch不管被连接到哪里，都能捕获上层未捕捉过的错误。(见3.2)
// 4. 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
// 5. Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。(见3.5)
// 6. .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。(见3.6)
// 7. .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。(见3.7)
// todo易错 8. .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。(见3.8)
// 9. .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。(见3.9)
// 10. .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。
// 11. .finally()方法不管Promise对象最后的状态如何都会执行
// 12. .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的
// 13. 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。

const promise1 = new Promise((resolve, reject) => {
    console.log('promise1');
});
console.log('1', promise1);

// promise1 1 Promise(<pending>)

const promise2 = new Promise((resolve, reject) => {
    console.log(1);
    resolve('success');
    console.log(2);
});
promise2.then(() => {
    console.log(3);
});
console.log(4);

// 1 4 2 3

const promise3 = new Promise((resolve, reject) => {
    console.log(1);
    console.log(2);
});
promise3.then(() => {
    console.log(3);
});
console.log(4);

// 1 2 4

const promise4 = new Promise((resolve, reject) => {
    console.log('promise1');
    resolve('resolve1');
});
const promise5 = promise1.then(res => {
    console.log(res);
});
console.log('1', promise4);
console.log('2', promise5);

// promise1 1 Promise{<fulfiled>: 'resolve1'} 2 Promise{<pending>} resolve1

const fn = () =>
    new Promise((resolve, reject) => {
        console.log(1);
        resolve('success');
    });
fn().then(res => {
    console.log(res);
});
console.log('start');

// 1 start success

const fn1 = () =>
    new Promise((resolve, reject) => {
        console.log(1);
        resolve('success');
    });
console.log('start');
fn1().then(res => {
    console.log(res);
});

// start 1 success

console.log('start');
setTimeout(() => {
    console.log('time');
});
Promise.resolve().then(() => {
    console.log('resolve');
});
console.log('end');

// start end resolve time

const promise6 = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        console.log('timerStart');
        resolve('success');
        console.log('timerEnd');
    }, 0);
    console.log(2);
});
promise6.then(res => {
    console.log(res);
});
console.log(4);

// 1 2 4 timerStart timerEnd success

setTimeout(() => {
    console.log('timer1');
    setTimeout(() => {
        console.log('timer3');
    }, 0);
}, 0);

setTimeout(() => {
    console.log('timer2');
}, 0);

console.log('start');

// start timer1 timer2 timer3

setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => {
        console.log('promise');
    });
}, 0);

setTimeout(() => {
    console.log('timer2');
}, 0);

console.log('start');

// start timer1 promise timer2

new Promise(resolve => {
    resolve();
})
    .then(() => {
        // 0
        new Promise(resolve => {
            resolve();
        })
            .then(() => {
                // 1
                console.log(111);
            })
            .then(() => {
                // 2
                console.log(222);
            });
    })
    .then(() => {
        // 1
        new Promise(resolve => {
            resolve();
        })
            .then(() => {
                // 2
                new Promise(resolve => {
                    resolve();
                })
                    .then(() => {
                        // 3
                        console.log(333);
                    })
                    .then(() => {
                        // 4
                        console.log(444);
                    });
            })
            .then(() => {
                // 3
                console.log(555);
            });
    })
    .then(() => {
        // 2
        console.log(666);
    });

// 111 222 666 333 555 444

new Promise(resolve => {
    resolve();
})
    .then(() => {
        // 0
        console.log('then1');
        console.log('推1-1入队');
        new Promise(resolve => {
            resolve();
        })
            .then(() => {
                // 1
                console.log('then1-1');
                console.log('推1-2入队');
            })
            .then(() => {
                // 2
                console.log('then1-2');
            });
        console.log('推2入队');
    })
    .then(() => {
        // 1
        console.log('then2');
        console.log('推2-1入队');
        new Promise(resolve => {
            resolve();
        })
            .then(() => {
                // 2
                console.log('then2-1');
                console.log('推2-1-1入队');
                new Promise(resolve => {
                    resolve();
                })
                    .then(() => {
                        // 3
                        console.log('then2-1-1');
                        console.log('推2-1-2入队');
                    })
                    .then(() => {
                        // 4
                        console.log('then2-1-2');
                    });
                console.log('推2-2入队');
            })
            .then(() => {
                // 3
                console.log('then2-2');
                console.log('推2-3入队');
            })
            .then(() => {
                // 4
                console.log('then2-3');
            });
        console.log('推3入队');
    })
    .then(() => {
        // 2
        console.log('then3');
        console.log('推3-1入队');
        new Promise(res => {
            res();
        })
            .then(() => {
                // 3
                console.log('then3-1');
                console.log('推3-2入队');
            })
            .then(() => {
                // 4
                console.log('then3-2');
            });
    });

// then1 推1-1入队 推2入队
// then1-1 推1-2入队 then2 推2-1入队 推3入队
// then1-2 then2-1 推2-1-1入队 推2-2入队 then3 推3-1入队
// then2-1-1 推2-1-2入队 then2-2 推2-3入队 then3-1 推3-2入队
// then2-1-2 then2-3 then3-2

Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
        console.log('timer2');
    }, 0);
});

const timer1 = setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => {
        console.log('promise2');
    });
}, 0);

console.log('start');

// start promise1 timer1 promise2 timer2

const promise7 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 1000);
});
const promise8 = promise7.then(() => {
    throw new Error('error!!!');
});
console.log('promise7', promise7);
console.log('promise8', promise8);
setTimeout(() => {
    console.log('promise7', promise7);
    console.log('promise8', promise8);
}, 2000);

// promise7 Promise { <pending> } promise8 Promise { <pending> } error!!! promise7 Promise { <fulfilled> } promise8 Promise { <rejected> }

const promise9 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
        console.log('timer1');
    }, 1000);
    console.log('promise9里的内容');
});
const promise10 = promise9.then(() => {
    throw new Error('error!!!');
});
console.log('promise9', promise9);
console.log('promise10', promise10);
setTimeout(() => {
    console.log('timer2');
    console.log('promise9', promise9);
    console.log('promise10', promise10);
}, 2000);

// promise9里的内容 promise9 Promise { <pending> } promise10 Promise { <pending> } timer1 error!!! timer2 promise9 Promise { <fulfilled>: success } promise10 Promise { <rejected>: Error: error!!! }

const promise11 = new Promise((resolve, reject) => {
    resolve('success1');
    reject('error');
    resolve('success2');
});
promise11
    .then(res => {
        console.log('then: ', res);
    })
    .catch(err => {
        console.log('catch: ', err);
    });
// then success1

const promise12 = new Promise((resolve, reject) => {
    reject('error');
    resolve('success2');
});
promise12
    .then(res => {
        console.log('then1: ', res);
    })
    .then(res => {
        console.log('then2: ', res);
    })
    .catch(err => {
        console.log('catch: ', err);
    })
    .then(res => {
        console.log('then3: ', res);
    });
// catch error then3 undefined

Promise.resolve(1)
    .then(res => {
        console.log(res);
        return 2;
    })
    .catch(err => {
        return 3;
    })
    .then(res => {
        console.log(res);
    });
// 1 2

Promise.reject(1)
    .then(res => {
        console.log(res);
        return 2;
    })
    .catch(err => {
        console.log(err);
        return 3;
    })
    .then(res => {
        console.log(res);
    });
// 1 3

const promise13 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('timer');
        resolve('success');
    }, 1000);
});
const start = Date.now();
promise13.then(res => {
    console.log(res, Date.now() - start);
});
promise13.then(res => {
    console.log(res, Date.now() - start);
});
// timer success 100x 100x

Promise.resolve()
    .then(() => {
        return new Error('error!!!');
    })
    .then(res => {
        console.log('then: ', res);
    })
    .catch(err => {
        console.log('catch: ', err);
    });
// then error!!!

const promise14 = Promise.resolve().then(() => {
    return promise14;
});
promise14.catch(console.err);
// 报错 cycle

Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// 值会一直透传 1

Promise.reject('err!!!')
    .then(
        res => {
            console.log('success', res);
        },
        err => {
            console.log('error', err);
        }
    )
    .catch(err => {
        console.log('catch', err);
    });
// error err!!!

Promise.resolve()
    .then(
        function success(res) {
            throw new Error('error!!!');
        },
        function fail1(err) {
            console.log('fail1', err);
        }
    )
    .catch(function fail2(err) {
        console.log('fail2', err);
    });
// fail2 Error: error!!!

Promise.resolve('1')
    .then(res => {
        console.log(res);
    })
    .finally(() => {
        console.log('finally');
    });
Promise.resolve('2')
    .finally(() => {
        console.log('finally2');
        return '我是finally2返回的值';
    })
    .then(res => {
        console.log('finally2后面的then函数', res);
    });
// 1 finally2 finally finally2后面的then函数 2

Promise.resolve('1')
    .finally(() => {
        console.log('finally1');
        throw new Error('我是finally中抛出的异常');
    })
    .then(res => {
        console.log('finally后面的then函数', res);
    })
    .catch(err => {
        console.log('捕获错误', err);
    });
// finally1 捕获错误 我是finally中抛出的异常

function promise15() {
    let p = new Promise(resolve => {
        console.log('promise1');
        resolve('1');
    });
    return p;
}
function promise16() {
    return new Promise((resolve, reject) => {
        reject('error');
    });
}
promise15()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('finally1'));

promise16()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('finally2'));

// promise1 1 error finally1 finally2

function runAsync(x) {
    const p = new Promise(r =>
        setTimeout(() => {
            r(x, console.log(x));
            throw new Error(x);
        }, 1000)
    );
    return p;
}
function runReject(x) {
    const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x));
    return p;
}
Promise.race([runReject(10), runAsync(1), runAsync(2), runAsync(3)])
    .then(res => console.log('result: ', res))
    .catch(err => console.log('err', err));
// 0 Error 0 1 2 3

// Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
// .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
// Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致。
// all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。

async function async1() {
    console.log('async1-start');
    await async2();
    // await 之后的才是下一个微任务，以上是同步任务
    console.log('async1-end');
}
async function async2() {
    console.log('async2');
}
async1();
console.log('start');
// async1-start start async2 async1-end

async function async1() {
    console.log('async1-start');
    new Promise(resolve => {
        console.log('promise');
    });
    console.log('async1-end');
}
async1();
console.log('start');
// async1-start promise async1-end start

async function async1() {
    console.log('async1-start');
    await async2();
    console.log('async1-end');
}
async function async2() {
    setTimeout(() => {
        console.log('timer');
    }, 0);
    console.log('async2');
}
async1();
console.log('start');
// async1-start async2 start async1-end timer

async function async1() {
    console.log('async1-start');
    await async2();
    console.log('async1-end');
    setTimeout(() => {
        console.log('timer1');
    }, 0);
}
async function async2() {
    setTimeout(() => {
        console.log('timer2');
    }, 0);
    console.log('async2');
}
async1();
setTimeout(() => {
    console.log('timer3');
}, 0);
console.log('start');
// async1-start async2 start async1-end timer2 timer3 timer1

async function fn() {
    return await 1234;
    // 等同于
    return 123;
}
fn().then(res => console.log(res));
// 123
// 正常情况下，async中的await命令是一个Promise对象，返回该对象的结果。
// 但如果不是Promise对象的话，就会直接返回对应的值，相当于Promise.resolve()

async function async1() {
    console.log('async1-start');
    await new Promise(resolve => {
        console.log('promise1');
    });
    console.log('async1 success');
    return 'async1 end';
}
console.log('srcipt-start');
async1().then(res => console.log(res));
console.log('srcipt-end');
// srcipt-start async1-start promise1 srcipt-end

async function async1() {
    console.log('async1-start');
    await new Promise(resolve => {
        console.log('promise1');
        resolve('promise1-resolve');
    }).then(res => console.log(res));
    console.log('async1-success');
    return 'async1-end';
}
console.log('srcipt-start');
async1().then(res => console.log(res));
console.log('srcipt-end');
// srcipt-start async1-start promise1 srcipt-end
// promise1-resolve async1-success async1-end

async function async1() {
    console.log('async1-start');
    await new Promise(resolve => {
        console.log('promise1');
        resolve('promise-resolve');
    });
    console.log('async1-success');
    return 'async1-end';
}
console.log('srcipt-start');
async1().then(res => {
    console.log(res);
});
new Promise(resolve => {
    console.log('promise2');
    setTimeout(() => {
        console.log('timer');
    });
});
// srcipt-start async1-start promise1 promise2
// async1-success async1-end timer

async function async1() {
    console.log('async1-start');
    await async2();
    console.log('async1-end');
}

async function async2() {
    console.log('async2');
}

console.log('script-start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script-end');
// script-start async1-start async2 promise1 script-end
// async1-end promise2 setTimeout

async function testSometing() {
    console.log('执行testSometing');
    return 'testSometing';
}

async function testAsync() {
    console.log('执行testAsync');
    return Promise.resolve('hello-async');
}

async function test() {
    console.log('test-start...');
    const v1 = await testSometing();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}

test();

var promise = new Promise(resolve => {
    console.log('promise-start...');
    resolve('promise');
});
promise.then(val => console.log(val));

console.log('test-end...');
// test-start... 执行testSometing promise-start...test-end
// testSometing 执行testAsync promise hello-async testSometing hello-async

async function async1() {
    await async2();
    console.log('async1');
    return 'async1 success';
}
async function async2() {
    return new Promise((resolve, reject) => {
        console.log('async2');
        reject('error');
    });
}
async1().then(res => console.log(res));
// async2
// 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。

async function async1() {
    try {
        await Promise.reject('error!!!');
    } catch (e) {
        console.log(e);
    }
    console.log('async1');
    return Promise.resolve('async1-success');
}
async1().then(res => console.log(res));
console.log('script-start');
// error!!! script-start async1 async1-success

const first = () =>
    new Promise((resolve, reject) => {
        console.log(3);
        let p = new Promise((resolve, reject) => {
            console.log(7);
            setTimeout(() => {
                console.log(5);
                resolve(6);
                console.log(p);
            }, 0);
            resolve(1);
        });
        resolve(2);
        p.then(arg => {
            console.log(arg);
        });
    });
first().then(arg => {
    console.log(arg);
});
console.log(4);
// 3 7 4 1 2 5 Promise{<fulfilled>: 1}

// todo 错过的题目
const async1 = async () => {
    console.log('async1');
    setTimeout(() => {
        console.log('timer1');
    }, 2000);
    await new Promise(resolve => {
        console.log('promise1');
    });
    console.log('async1 end');
    return 'async1-success';
};
console.log('script-start');
async1().then(res => console.log(res));
console.log('script-end');
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .catch(4)
    .then(res => console.log(res));
setTimeout(() => {
    console.log('timer2');
}, 1000);
// script-start async1 promise1 script-end
// 1 timer2 timer1
// async函数中await的new Promise要是没有返回值的话则不执行后面的内容(类似题5.5)
// .then函数中的参数期待的是函数，如果不是函数的话会发生透传(类似题3.8 )
// 注意timer时间

// todo 错过的题目
const p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve('resolve3');
        console.log('timer1');
    }, 0);
    resolve('resovle1');
    resolve('resolve2');
})
    .then(res => {
        console.log(res);
        setTimeout(() => {
            console.log(p1);
        }, 1000);
    })
    .finally(res => {
        console.log('finally', res);
    });
// resovle1 finally undefined timer1 Promise{<fulfilled>: undefined}
// finally不管Promise的状态是resolved还是rejected都会执行，且它的回调函数是接收不到Promise的结果的，所以finally()中的res是一个迷惑项(类似3.10)。
// 最后一个定时器打印出的p1其实是.finally的返回值，我们知道.finally的返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值(3.10中也有提到), 而这道题中.finally上一个Promise是.then()，但是这个.then()并没有返回值，所以p1打印出来的Promise的值会是undefined，如果你在定时器的下面加上一个return 1，则值就会变成1(感谢掘友JS丛中过的指出)。

const promise = new Promise(resolve => {
    console.log('11111');

    setTimeout(() => {
        console.log('22222');
    }, 0);

    // resolve();

    console.log('resolve');

    throw new Error('error');

    console.log('error');
});

promise
    .then(
        () => {
            console.log('33333');

            setTimeout(() => {
                console.log('44444');
            }, 0);
        },

        () => {
            console.log('reject');
        }
    )
    .catch(() => {
        console.log('catch');
    });

console.log('55555');
// 11111 resolve 55555 33333 22222 44444