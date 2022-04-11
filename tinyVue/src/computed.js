import {Watcher} from './watcher.js';

export const computed = gettter => {
    const v = {};
    const computedWatch = new Watcher(gettter, {computed: true});
    Object.defineProperty(v, 'value', {
        get() {
            computedWatch.depend();
            return computedWatch.get();
        }
    });
    return v;
};
