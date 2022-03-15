import {Application, AppStatus} from '../libs/types';
import {isPromise} from '../utils/utils';

export default async function mountApp(app: Application) {
    app.status = AppStatus.MOUNTED;
    app.container.innerHTML = app.pageBody;

    let result = app.mount!({props: app.props, container: app.container});

    if (!isPromise(result)) {
        result = Promise.resolve(result);
    }

    return result
        .then(() => {
            app.status = AppStatus.MOUNTED;
        })
        .catch((err: Error) => {
            app.status = AppStatus.MOUNT_ERROR;
            throw err;
        });
}
