import overwriteEventsAndHistory from './libs/overwriteBrowser';
export {default as registerApplication} from './Application/registerApplication';
export {default as start} from './start';

declare const window: any;

// 是否运行在 single spa 下
window.__IS_SINGLE_SPA__ = true;

overwriteEventsAndHistory();
