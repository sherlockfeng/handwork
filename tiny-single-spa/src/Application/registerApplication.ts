import {Application, AppStatus} from '../libs/types';
import {apps} from './app';

export default function registerApplication(app: Application) {
    if (typeof app.activeRule === 'string') {
        const path = app.activeRule;
        app.activeRule = (location = window.location) => location.pathname === path;
    }

    app.pageBody = '';
    app.loadedURLs = [];
    app.status = AppStatus.BEFORE_BOOTSTRAP;
    apps.push(app);
}
