import {Application, AnyObject, AppStatus} from '../libs/types';
import {isPromise} from '../utils/utils';
import parseHTMLandloadSources from '../utils/parseHTMLandloadSources';

export default async function bootstrapApp(app: Application) {
    try {
        // 加载 js css
        await parseHTMLandloadSources(app);
    } catch (error) {
        throw error;
    }
    console.log('bootstrapApp', app.name);
    const {bootstrap, mount, unmount} = await getLifeCycleFuncs(app.name);

    validateLifeCycleFunc('bootstrap', bootstrap);
    validateLifeCycleFunc('mount', mount);
    validateLifeCycleFunc('unmount', unmount);

    app.bootstrap = bootstrap;
    app.mount = mount;
    app.unmount = unmount;

    try {
        app.props = await getProps(app.props);
    } catch (err) {
        app.status = AppStatus.BOOTSTRAP_ERROR;
        throw err;
    }

    let result = app.bootstrap!(app.props);
    if (!isPromise(result)) {
        result = Promise.resolve(result);
    }

    return result
        .then(() => {
            app.status = AppStatus.BOOTSTRAPPED;
        })
        .catch((err: Error) => {
            app.status = AppStatus.BOOTSTRAP_ERROR;
            throw err;
        });
}

async function getProps(props: Function | AnyObject) {
    if (typeof props === 'function') {
        return props();
    }
    if (typeof props === 'object') {
        return props;
    }
    return {};
}

function validateLifeCycleFunc(name: string, fn: any) {
    if (typeof fn !== 'function') {
        throw Error(`The "${name}" must be a function`);
    }
}

async function getLifeCycleFuncs(name: string) {
    const result = (window as any)[`tiny-single-spa-${name}`];
    if (typeof result === 'function') {
        return result();
    }

    if (typeof result === 'object') {
        return result;
    }

    throw Error(
        `The micro app must inject the lifecycle("bootstrap" "mount" "unmount") into window['mini-single-spa-${name}']`
    );
}
