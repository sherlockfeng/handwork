let name = 1;

class Pro {
    static pending = 'pending';
    static fullfilled = 'fullfilled';
    static rejected = 'rejected';

    static _isPromiseLike = data => {
        return data instanceof Pro || (['object', 'function'].includes(typeof data) && 'then' in data);
    };

    constructor(cb) {
        this.name = name;
        name++;
        this.callbacks = [];
        this.value = undefined;
        this.reason = undefined;
        this.status = Pro.pending;

        cb(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(value) {
        if (Pro._isPromiseLike(value)) {
            value.then(this._resolve, this._reject);
            return;
        }
        this.value = value;
        this.status = Pro.fullfilled;

        this.callbacks.forEach(c => this._handle(c));
    }

    _reject(reason) {
        if (Pro._isPromiseLike(reason)) {
            reason.then(this._resolve, this._reject);
            return;
        }
        this.reason = reason;
        this.status = Pro.rejected;
        this.callbacks.forEach(c => this._handle(c));
    }

    then(onFullfiled, onRejected) {
        return new Pro((nextResolve, nextReject) => {
            console.log('this in then', this);
            this._handle({
                onFullfiled,
                onRejected,
                nextResolve,
                nextReject
            });
        });
    }

    _handle(cb) {
        console.log('this in handle =', this);
        if (this.status === Pro.pending) {
            this.callbacks.push(cb);
            console.log('this.callbacks =', this.callbacks);
            return;
        }

        const {nextResolve, nextReject, onFullfiled, onRejected} = cb;

        if (this.status === Pro.rejected) {
            this.reason = onRejected ? onRejected(this.reason) : this.reason;
            nextResolve(this.reason);
            return;
        }

        if (this.status === Pro.fullfilled) {
            this.value = onFullfiled ? onFullfiled(this.value) : this.value;
            nextResolve(this.value);
            return;
        }
    }

    _catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    _finally(onFinal) {
        return this.then(onFinal, onFinal);
    }
}

function fetchData() {
    return new Pro((resolve, reject) => {
        setTimeout(() => {
            reject('willem');
        }, 1000);
    });
}

const p1 = fetchData().then(
    data1 => {
        console.log('p1 resolve', data1);
        return data1 + ' resolve';
    },
    data1 => {
        console.log('p1 reject', data1);
        return data1 + ' reject';
    }
);
const p2 = p1.then(
    data2 => {
        console.log('p2 resolve', data2);
        return data2 + ' resolve';
    },
    data2 => {
        console.log('p2 reject', data2);
        return data2 + ' reject';
    }
); // willem 正确输出应该是 'willem wei'
// // const p3 = p2.then(
// //     data3 => {
// //         console.log('p3 resolve', data3);
// //     },
// //     data3 => {
// //         console.log('p3 reject', data3);
// //     }
// // ); // willem 正确输出应该是 'willem wei'

// function fetchData() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('willem');
//         }, 1000);
//     });
// }

// fetchData()
//     .then()
//     .then(data2 => {
//         console.log(data2); // willem wei
//     });
