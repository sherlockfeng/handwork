type returnType<T> = T extends (...arg: any) => infer p ? p : never;

type paramsType<T> = T extends (arg: infer p) => void ? p : never;

const sq = n => {
    if (isNaN(n) || n < 0) {
        return NaN;
    }
    if (n === 0 || n === 1) {
        return n;
    }

    let low = 0.0000000001;
    let high = n;
    let middle = (low + high) / 2;
    let preMid = middle;
    do {
        if (middle * middle < n) {
            low = middle;
        } else {
            high = middle;
        }
        preMid = middle;
        middle = (low + high) / 2;
    } while (preMid - middle > 0 ? preMid - middle : middle - preMid > Number.EPSILON);

    return preMid;
};
