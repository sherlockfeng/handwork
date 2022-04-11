const breakNum = nums => {
    const len = nums.length;
    let right = nums[len - 1];
    let result = 0;

    for (let i = len - 2; i >= 0; i--) {
        if (nums[i] <= right) {
            right = nums[i];
            continue;
        }
        const extro = nums[i] % right;
        if (extro === 0) {
            result += nums[i] / right - 1;
        } else {
            const t = Math.floor(nums[i] / right) + 1;
            result += t - 1;
            right = Math.floor(nums[i] / t);
        }
    }

    return result;
};

console.log(breakNum([3, 5, 13, 9, 12])); // 1
console.log(breakNum([3, 12, 13, 9, 12])); // 2
console.log(breakNum([3, 13, 12, 9, 12])); // 3
console.log(breakNum([3, 13, 60, 7])); // 10
console.log(breakNum([3, 63, 7])); // 8
console.log(breakNum([9, 1])); // 8
