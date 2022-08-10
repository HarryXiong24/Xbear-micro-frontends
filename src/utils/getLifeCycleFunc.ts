/**
 * 在 Version1 版本里，注册子应用的时候有一个 loadApp() 方法.
 * 微前端框架在第一次加载子应用时会执行这个方法，从而拿到子应用暴露的三个方法。
 * 现在实现了 pageEntry 功能，我们就不用把这个方法写在主应用里了，因为不再需要在主应用里引入子应用。
 * 但是又得让微前端框架拿到子应用暴露出来的方法，所以我们可以换一种方式暴露子应用的方法：
 * 每个子应用都需要这样暴露三个 API，该属性格式为 `child-app-${appName}`
 * window['child-app-vue'] = {
 *   create,
 *   mount,
 *   unmount
 * }
 * 这样微前端也能拿到每个子应用暴露的方法，从而实现加载、卸载子应用的功能。
 */

/**
 * @param {string} name
 * @return {*}
 * @description: 获取子应用的生命周期函数
 */
export function getLifeCycleFunc(name: string): {
  create: (props: Record<string, any>) => any;
  mount: (props: Record<string, any>) => any;
  unmount: (props: Record<string, any>) => any;
} {
  console.log(window);

  const result: any = window[`child-app-${name}` as any];

  console.log(result);

  if (typeof result === 'function') {
    return result();
  } else if (typeof result === 'object') {
    return result;
  } else {
    throw Error(
      `The micro app must inject the lifecycle("create" "mount" "unmount") into window['child-app-${name}']`
    );
  }
}

export default getLifeCycleFunc;
