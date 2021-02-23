const axios = (cb, time = 5000, count = 3) => {
    const nTime = () => {
        return new Promise(async (resolve, reject) => {
            setTimeout(() => reject(['time out']), time);
            try {
                const result = await cb();
                resolve([undefined, result]);
            } catch (e) {
                reject([e]);
            }
        });
    };
    let result;
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < count; i++) {
            result = await nTime();
            if (result[1]) {
                resolve(result[1]);
                break;
            }
        }
        reject(result[0]);
    });
};

const r = await axios(async () => {
    return await ajax.get('');
});
