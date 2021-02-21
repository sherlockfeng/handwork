const shuffle = arr => {
    const len = arr.length;
    let randomIndex;

    const swap = (arr, left, right) => {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    };

    for (let i = len - 1; i >= 0; i--) {
        randomIndex = Math.floor(Math.random() * (i + 1));
        swap(arr, randomIndex, i);
    }

    console.log(arr);

    return arr;
};
for (let i = 0; i < 10; i++) {
    shuffle([1, 2, 3, 4, 5]);
}
