function rd(cb, init) {
    const arr = this;
    console.log(this);
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new TypeError();
    }
    if (!arr.length) {
        throw new Error();
    }
    let result = init === undefined ? arr[0] : init;
    for (let i = 0; i < arr.length; i++) {
        if (i === 0 && init === undefined) {
            continue;
        }
        result = cb(result, arr[i], i, arr);
    }
    return result;
}

Array.prototype.rd = rd;

