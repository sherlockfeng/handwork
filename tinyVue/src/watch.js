import {Watcher} from './watcher.js';

export const watch = (getter, callback) => {
    new Watcher(getter, {watch: true, callback});
};
