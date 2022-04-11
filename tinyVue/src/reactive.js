import {Dep} from './dep';
import {isObject} from './utils';

export const reactive = data => {
    if (isObject(data)) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key);
        });
    }
    return data;
};

export const defineReactive = (data, key) => {
    let val = data[key];
    const dep = new Dep();
    data.dep = dep;
    Object.defineProperty(data, key, {
        get() {
            console.log('data', data, key);
            dep.depend();
            return val;
        },
        set(newVal) {
            val = newVal;
            dep.notify();
        }
    });

    if (isObject(val)) {
        reactive(val);
    }
};
