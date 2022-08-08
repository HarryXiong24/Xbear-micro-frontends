import { Application, AppStatus } from '@/types';
import { apps } from './loadingApp';

/**
 * 注册子应用
 */

export function registerApplication(app: Application) {
  /**
   * 当页面 URL 改变后，如果子应用满足以下两个条件，则需要加载该子应用：
   * 1. activeRule() 的返回值为 true，例如 URL 从 / 变为 /vue，这时子应用 vue 为激活状态（假设它的激活规则为 /vue）
   * 2. 子应用状态必须为 bootstrap 或 unmount，这样才能向 mount 状态转换。如果已经处于 mount 状态并且 activeRule() 返回值为 true，则不作任何处理
   * 如果页面的 URL 改变后，子应用满足以下两个条件，则需要卸载该子应用：
   * 1. activeRule() 的返回值为 false，例如 URL 从 /vue 变为 /，这时子应用 vue 为失活状态（假设它的激活规则为 /vue）
   * 2. 子应用状态必须为 mount，也就是当前子应用必须处于加载状态（如果是其他状态，则不作任何处理）。然后 URL 改变导致失活了，所以需要卸载它，状态也从 mount 变为 unmount
   */
  if (typeof app.activeRule === 'string') {
    const path = app.activeRule;
    // 将 activeRule 变成函数
    app.activeRule = (location: Location = window.location) =>
      location.hash === path;
  }

  // 初始化
  app.pageBody = '';
  app.loadedURLs = [];

  // 设置状态
  app.status = AppStatus.BEFORE_CREATE;
  // 存入 App 容器
  apps.push(app);
}

export default registerApplication;
