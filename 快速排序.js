const quickSort = arr => {
    const swap = (left, right) => {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    };

    const sort = (arr, left, right) => {
        const pivot = arr[left];
        let index = pivot + 1;

        for (let i = index; i <= right; i++) {
            if (arr[i] < arr[pivot]) {
                swap(i, index);
                index++;
            }
        }
        swap(pivot, index - 1);
        return index - 1;
    };

    const index = sort(arr, 0, arr.length - 1);
    sort(arr, 0, index - 1);
    sort(arr, index + 1, arr.length - 1);

    return arr;
};

const r = quickSort([1, 3, 5, 2, 2, 5]);
console.log(r);
