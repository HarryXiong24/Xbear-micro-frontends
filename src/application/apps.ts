import createApp from '@/lifecycle/create';
import mountApp from '@/lifecycle/mount';
import unMountApp from '@/lifecycle/unmount';
import { Application, AppStatus } from '@/types';

// 存放 App 的容器
export const apps: Application[] = [];

/**
 * @param {AppStatus} status 传入指定的状态
 * @return {*}
 * @description: 获取拥有指定状态的 App
 */
function getAppsWithStatus(status: AppStatus) {
  const result: Application[] = [];
  apps.forEach((app) => {
    // toCreate or toMount
    if (isActive(app) && app.status === status) {
      switch (app.status) {
        // 这三个状态是一组
        case AppStatus.BEFORE_CREATE:
        case AppStatus.CREATED:
        case AppStatus.UNMOUNTED:
          result.push(app);
          break;
      }
    } else if (
      app.status === AppStatus.MOUNTED &&
      status === AppStatus.MOUNTED
    ) {
      // toUnmount
      result.push(app);
    }
  });

  return result;
}

/**
 * @param {Application} app
 * @return {*}
 * @description: 判断 App 是否激活
 */
function isActive(app: Application) {
  return (
    typeof app.activeRule === 'function' && app.activeRule(window.location)
  );
}

export async function loadApps() {
  // 先卸载所有失活的子应用
  const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED);
  await Promise.all(toUnMountApp.map(unMountApp));

  // 初始化所有刚注册的子应用
  const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_CREATE);
  await Promise.all(toLoadApp.map(createApp));

  const toMountApp = [
    ...getAppsWithStatus(AppStatus.CREATED),
    ...getAppsWithStatus(AppStatus.UNMOUNTED),
  ];

  // 加载所有符合条件的子应用
  toMountApp.map(mountApp);
}
