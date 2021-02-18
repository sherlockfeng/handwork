import {Watcher} from './watcher';

export const watch = (getter, callback) => {
    new Watcher(getter, {watch: true, callback});
};
