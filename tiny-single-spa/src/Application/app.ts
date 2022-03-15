import {AppStatus, Application} from '../libs/types';
import unmountApp from '../Lifecycle/unmount';
import mountApp from '../Lifecycle/mount';
import bootstrapApp from '../Lifecycle/bootstrap';

export const apps: Application[] = [];

export const loadApps = async () => {
    const toUnMountApps = getAppsWithStatus(AppStatus.MOUNTED);
    await Promise.all(toUnMountApps.map(app => unmountApp(app)));

    const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP);
    await Promise.all(toLoadApp.map(app => bootstrapApp(app)));

    const toMountApp = [...getAppsWithStatus(AppStatus.BOOTSTRAPPED), ...getAppsWithStatus(AppStatus.UNMOUNTED)];

    // 加载所有符合条件的子应用
    await toMountApp.map(mountApp);
};

const getAppsWithStatus = (status: AppStatus) => {
    const result: Application[] = [];

    apps.forEach(app => {
        // tobootstrap or tomount
        if (isActive(app) && app.status === status) {
            switch (app.status) {
                case AppStatus.BEFORE_BOOTSTRAP:
                case AppStatus.BOOTSTRAPPED:
                case AppStatus.UNMOUNTED:
                    result.push(app);
                    break;
            }
        } else if (app.status === AppStatus.MOUNTED && status === AppStatus.MOUNTED) {
            // tounmount
            result.push(app);
        }
    });

    return result;
};

const isActive = (app: Application) => {
    return typeof app.activeRule === 'function' && app.activeRule(window.location);
};
