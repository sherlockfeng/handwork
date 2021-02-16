const sleep = relay => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, relay);
    });
};

const a = async () => {
    console.log(1);
    await sleep(2000);
    console.log(1 + 1);
};

a();
