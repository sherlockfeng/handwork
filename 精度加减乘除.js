const accAdd = (...args) => {
    let max = 0;
    for (let i = 0; i < args.length; i++) {
        max = Math.max(`${args[i]}`.includes('.') ? `${args[i]}`.split('.')[1].length : 0, max);
    }
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += Math.pow(10, max) * +args[i];
    }
    return sum / Math.pow(10, max);
};

console.log(0.1 + 0.2);
console.log(accAdd(0.1, 0.2));

const accSubtr = (...args) => {
    let max = 0;
    for (let i = 0; i < args.length; i++) {
        max = Math.max(`${args[i]}`.includes('.') ? `${args[i]}`.split('.')[1].length : 0, max);
    }
    let sum = args[0] * Math.pow(10, max);
    for (let i = 1; i < args.length; i++) {
        sum -= Math.pow(10, max) * +args[i];
    }
    return sum / Math.pow(10, max);
};

console.log(0.2 - 0.1);
console.log(accSubtr(0.2, 0.1));

const accMul = (...args) => {
    let max = 0;
    for (let i = 0; i < args.length; i++) {
        max = Math.max(`${args[i]}`.includes('.') ? `${args[i]}`.split('.')[1].length : 0, max);
    }

    const a = Math.pow(10, max);
    let sum = 1;
    let d = 1;
    for (let i = 0; i < args.length; i++) {
        sum *= args[i] * a;
        d *= a;
    }

    return sum / d;
};

console.log(0.1 * 0.2);
console.log(accMul(0.1, 0.2));

const accDiv = (arg1, arg2) => {
    const len1 = `${arg1}`.includes('.') ? `${arg1}`.split('.')[1].length : 0;
    const len2 = `${arg2}`.includes('.') ? `${arg2}`.split('.')[1].length : 0;
    const max = Math.max(len1, len2);

    return (arg1 * Math.pow(10, max)) / (arg2 * Math.pow(10, max));
};

console.log(accDiv(0.003, 0.001));
