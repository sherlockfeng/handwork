const arr = [1, 2, 3];
arr.reduce((acc, cur) => {
    return acc.then(() => {
        return new Promise(resolve => {
            setTimeout(() => resolve(console.log(cur)), 1000);
        });
    });
}, Promise.resolve());
