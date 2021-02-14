// 快排
const quickSort = arr => {
    const swap = (arr, left, right) => {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    };
    const s = (arr, left, right) => {
        if (left < right) {
            const f = arr[left];
            const l = left;
            const r = right;
            left++;
            while (left <= right) {
                while (left <= right && arr[right] >= f) {
                    right--;
                }

                while (left <= right && arr[left] <= f) {
                    left++;
                }

                if (left < right) {
                    swap(arr, left, right);
                    left++;
                    right--;
                }
            }
            swap(arr, right, l);
            s(arr, l, right - 1);
            s(arr, right + 1, r);
        }
    };

    s(arr, 0, arr.length - 1);

    return arr;
};

const r = quickSort([1, 3, 5, 2, 2, 5]);
console.log(r);

// 堆排序
const heapSort = arr => {
    const swap = (arr, left, right) => {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    };

    const getParent = i => Math.floor((i - 1) / 2);

    const buildHeap = (arr, start, end) => {
        let left = start * 2 + 1;
        let right = start * 2 + 2;

        while (left <= end) {
            let largeIndex = left;
            if (arr[left] < arr[right] && right <= end) {
                largeIndex = right;
            }
            if (arr[start] > arr[largeIndex]) {
                largeIndex = start;
            }
            if (start === largeIndex) {
                break;
            }

            swap(arr, largeIndex, start);
            start = largeIndex;
            left = start * 2 + 1;
            right = start * 2 + 2;
        }
    };

    for (let i = 1; i < arr.length; i++) {
        if (i === 0) {
            continue;
        }
        let current = i;
        let parent = getParent(i);

        console.log('current', current, arr[current]);
        console.log('parent', parent, arr[parent]);

        while (arr[current] > arr[parent] && current !== 0) {
            swap(arr, current, parent);
            current = parent;
            parent = getParent(current);
            console.log(arr);
        }
    }
    let len = arr.length - 1;
    while (len > 0) {
        swap(arr, 0, len);
        len--;
        buildHeap(arr, 0, len);
    }
    console.log(arr);
};

heapSort([3, 6, 8, 5, 7]);

const quick = arr => {
    const swap = (arr, left, right) => {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    };
    const sort = (arr, left, right) => {
        if (left >= right) {
            return;
        }
        const flag = arr[left];
        const l = left;
        const r = right;
        left++;
        while (left <= right) {
            while (left <= right && arr[left] <= flag) {
                left++;
            }
            while (left <= right && arr[right] >= flag) {
                right--;
            }
            if (left < right) {
                swap(arr, left, right);
                left++;
                right--;
            }
        }
        swap(arr, right, l);
        sort(arr, l, right - 1);
        sort(arr, right + 1, r);
    };
    sort(arr, 0, arr.length - 1);
    console.log(arr);
    return arr;
};

const r = quick([1, 3, 5, 2, 2, 5]);
console.log(r);
