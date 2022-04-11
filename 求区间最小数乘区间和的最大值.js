const fuc = arr => {
    const sum = [0];
    for (let i = 1; i <= arr.length; i++) {
        sum[i] = sum[i - 1] + arr[i - 1];
    }

    console.log('sum', sum);

    const stack = [];

    let result = 0;

    const getTop = () => {
        return stack[stack.length - 1];
    };

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[getTop()] >= arr[i]) {
            const pick = arr[getTop()];
            stack.pop();
            const left = stack.length ? getTop() : -1;
            const right = i;
            const dist = sum[right] - sum[left + 1];
            result = Math.max(result, dist * pick);
        }
        stack.push(i);
    }

    while (stack.length) {
        const pick = arr[getTop()];
        stack.pop();
        const left = stack.length ? getTop() : -1;
        const right = arr.length;

        const dist = sum[right] - sum[left + 1];

        result = Math.max(result, dist * pick);
    }

    return result;
};

console.log(fuc([3, 1, 6, 4, 5, 2])); // 1
