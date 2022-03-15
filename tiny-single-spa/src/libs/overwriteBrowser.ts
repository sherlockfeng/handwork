import {loadApps} from '../Application/app';

const originPushState = window.history.pushState;
const originReplaceState = window.history.replaceState;

export default function overwriteBrowser() {
    window.history.pushState = function (state: any, title: string, url?: string | URL) {
        const result = originPushState.call(this, state, title, url);
        loadApps();
        return result;
    };

    window.history.replaceState = function (state: any, title: string, url?: string | URL) {
        const result = originReplaceState.call(this, state, title, url);
        loadApps();
        return result;
    };

    window.addEventListener(
        'popstate',
        () => {
            loadApps();
        },
        true
    );

    window.addEventListener(
        'hashchange',
        () => {
            loadApps();
        },
        true
    );
}
