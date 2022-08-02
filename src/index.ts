import overwriteEventsAndHistory from './navigator';
export { default as registerApplication } from './application/registerApp';
export { default as start } from './start';

declare const window: any;

// 是否运行在 single spa 下
window.__IS_SINGLE_SPA__ = true;

// 重写方法
overwriteEventsAndHistory();
