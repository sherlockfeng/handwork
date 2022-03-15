import {loadApps} from './Application/app';

let isStarted = false;
export default function start() {
    if (!isStarted) {
        isStarted = true;
        loadApps();
    }
}

export function isStart() {
    return isStarted;
}
