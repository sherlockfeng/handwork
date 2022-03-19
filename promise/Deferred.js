const isFunction = value => typeof value === 'function';
const isObject = value => typeof value === 'object';
const isNode =
    typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
const isArray = value => Array.isArray(value);

let timerFunc;

let count = 0;

if (isNode) {
    timerFunc = fn => process.nextTick(fn);
} else if (MutationObserver) {
    // 为了节约开销，创建一个文本比创建一个dom可划算的多
    const textNode = document.createTextNode(String(count));

    timerFunc = fn => {
        const observe = new MutationObserver(fn);
        observe.observe(textNode, {
            // 当文本改变时触发回调
            characterData: true
        });
        // 改变文本，回调callback触发
        textNode.data = String(++count);
    };
} else if (typeof setImmediate !== 'undefined') {
    timerFunc = fun => setImmediate(fun);
} else {
    timerFunc = fun => {
        setTimeout(fun, 0);
    };
}

const run = fn => {
    timerFunc(fn);
};

class Deferred {
    static pending = 'pending';
    static fulfilled = 'fulfilled';
    static rejected = 'rejected';

    static isPromise = obj => {
        return obj instanceof Deferred || (['function', 'object'].includes(typeof obj) && 'then' in obj);
    };

    static resolvePromise = (promise, x, resolve, reject) => {
        if (promise === x) {
            return reject(new TypeError('循环调用'));
        }
        if (!Deferred.isPromise(x)) {
            return resolve(x);
        }
        try {
            let called = false;
            const then = x.then;
            if (isFunction(then)) {
                then.call(
                    x,
                    value => {
                        if (called) {
                            return;
                        }
                        called = true;
                        return Deferred.resolvePromise(promise, value, resolve, reject);
                    },
                    reason => {
                        if (called) {
                            return;
                        }
                        called = true;
                        return reject(reason);
                    }
                );
            } else {
                return resolve(x);
            }
        } catch (reason) {
            if (called) {
                return;
            }
            called = true;
            return reject(reason);
        }
    };

    static resolve(value) {
        return new Deferred(resolve => resolve(value));
    }

    static all(promises) {
        return new Deferred((resolve, reject) => {
            // 非数组参数，抛出异常
            if (!Array.isArray(promises)) {
                return Deferred.reject(new TypeError('args must be an array'));
            }

            const result = [];
            let count = 0;

            if (!promises.length) {
                resolve([]);
            }

            for (let i = 0; i < promises.length; i++) {
                Deferred.resolve(promises[i]).then(
                    value => {
                        result[i] = value;
                        count++;
                        if (count === promises.length) {
                            return resolve(result);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                );
            }
        });
    }

    constructor(cb) {
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallacks = [];
        this.rejectCallacks = [];
        this.status = Deferred.pending;

        if (!isFunction(cb)) {
            throw new TypeError('cb 不是函数');
        }

        try {
            cb(this.resolve.bind(this), this.reject.bind(this));
        } catch (reason) {
            this.reject(reason);
        }
    }

    resolve(value) {
        if (Deferred.isPromise(value)) {
            value.then(this.resolve, this.reject);
            return;
        }
        run(() => {
            if (this.status === Deferred.pending) {
                this.value = value;
                this.status = Deferred.fulfilled;
                this.resolveCallacks.forEach(cb => cb(value));
            }
        });
    }

    reject(reason) {
        if (Deferred.isPromise(reason)) {
            reason.then(this.resolve, this.reject);
            return;
        }
        run(() => {
            if (this.status === Deferred.pending) {
                this.reason = reason;
                this.status = Deferred.rejected;
                this.rejectCallacks.forEach(cb => cb(reason));
            }
        });
    }

    then(onFullfiled, onRejected) {
        onFullfiled = isFunction(onFullfiled) ? onFullfiled : value => value;
        onRejected = isFunction(onRejected)
            ? onRejected
            : reason => {
                  throw reason;
              };

        let promise;

        if (this.status === Deferred.fulfilled) {
            promise = new Deferred((resolve, reject) => {
                run(() => {
                    try {
                        const x = onFulfilled(this.value);
                        Deferred.resolvePromise(promise, x, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                });
            });
        }

        if (this.status === Deferred.rejected) {
            promise = new Deferred((resolve, reject) => {
                run(() => {
                    try {
                        const x = onRejected(this.value);
                        Deferred.resolvePromise(promise, x, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                });
            });
        }
        if (this.status === Deferred.pending) {
            promise = new Deferred((resolve, reject) => {
                this.resolveCallacks.push(value => {
                    try {
                        const x = onFullfiled(value);
                        Deferred.resolvePromise(promise, x, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                });
                this.rejectCallacks.push(value => {
                    try {
                        const x = onRejected(value);
                        Deferred.resolvePromise(promise, x, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                });
            });
        }
        return promise;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinal) {
        return this.then(onFinal, onFinal);
    }
}

function fetchData() {
    return new Deferred((resolve, reject) => {
        setTimeout(() => {
            reject('willem');
        }, 1000);
    });
}

// const p1 = fetchData().then(
//     data1 => {
//         console.log('p1 resolve', data1);
//         return data1 + ' resolve';
//     },
//     data1 => {
//         console.log('p1 reject', data1);
//         return data1 + ' reject';
//     }
// );
// const p2 = p1.then(
//     data2 => {
//         console.log('p2 resolve', data2);
//         return data2 + ' resolve';
//     },
//     data2 => {
//         console.log('p2 reject', data2);
//         return data2 + ' reject';
//     }
// ); // willem 正确输出应该是 'willem wei'

// const p3 = p2.then(
//     data3 => {
//         console.log('p3 resolve', data3);
//     },
//     data3 => {
//         console.log('p3 reject', data3);
//     }
// ); // willem 正确输出应该是 'willem wei'

// fetchData()
//     .then()
//     .then(data2 => {
//         console.log(1, data2); // willem
//     }).catch(reason => console.log(reason));

const promise = new Deferred((resolve, reject) => {
    console.log(1);
    resolve('success');
    console.log(2);
});
promise.then(() => {
    console.log(3);
});
console.log(4);
