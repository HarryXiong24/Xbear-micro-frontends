import { loadApps } from '@/application/loadingApp';

/**
 * 监听页面 URL 变化，切换子应用
 */

// eslint-disable-next-line @typescript-eslint/unbound-method
const originalPushState = window.history.pushState;
// eslint-disable-next-line @typescript-eslint/unbound-method
const originalReplaceState = window.history.replaceState;

export function overwriteEventsAndHistory() {
  window.history.pushState = function (state: any, title: string, url: string) {
    const result = originalPushState.call(this, state, title, url);
    void loadApps();
    return result;
  };

  window.history.replaceState = function (
    state: any,
    title: string,
    url: string
  ) {
    const result = originalReplaceState.call(this, state, title, url);
    void loadApps();
    return result;
  };

  window.addEventListener(
    'popstate',
    () => {
      void loadApps();
    },
    true
  );

  window.addEventListener(
    'hashchange',
    () => {
      void loadApps();
    },
    true
  );
}

export default overwriteEventsAndHistory;
