const jishi = (time = 1100) => {
    let i = 0;
    setTimeout(() => clearTimeout(i), time);
    let k = 1;
    const j = () => {
        console.log(k);
        k++;
        i = setTimeout(j, 100);
    };
    j();
};
jishi();

// 防抖
const debounce = (cb, delay = 500, immediate = true) => {
    let timer = null;
    return (...args) => {
        if (immediate && !timer) {
            cb(...args);
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            cb(...args);
        }, delay);
    };
};

const cb = (s, d) => {
    console.log(s), console.log(d);
};

const a = debounce(cb, 500, true);

// a('11231', '234234');
// a('3333', '34534');
// a('23423', '3423423423534');

// 节流
const throttle = (cb, delay = 500) => {
    let time;

    return (...args) => {
        const t = Date.now();
        if (t - time > delay || !time) {
            time = t;
            cb(...args);
        }
    };
};

const b = throttle(cb);

b(123, 456);
b(456, 789);
setTimeout(() => {
    b(789, 111);
}, 600);
