import { loadApps } from './application/apps';

let isStarted = false;

/**
 * @return {*}
 * @description: 启动函数
 */
export default function start() {
  // 标识启动
  if (!isStarted) {
    isStarted = true;
    // 加载 App
    void loadApps();
  }
}

/**
 * @return {*}
 * @description: 判断是否启动
 */
export function isStart() {
  return isStarted;
}
