// 判断是否为 promise 对象
export function isPromise(fn: any) {
  if (
    (typeof fn === 'object' || typeof fn === 'function') &&
    typeof fn.then === 'function'
  ) {
    return true;
  }
}

// 选择器
// export function $(selector: string) {
//   return document.querySelector(selector);
// }

// 获取参数
export function getProps(
  props: ((...args: any[]) => any) | Record<string, any> | undefined
): Record<string, any> {
  if (typeof props === 'function') {
    return props();
  }
  if (typeof props === 'object') {
    return props;
  }
  return {};
}

export function validateIsLifeCycleFunc(
  name: string,
  fn: (...args: any[]) => any
) {
  if (typeof fn !== 'function') {
    throw Error(`The "${name}" must be a function`);
  }
}
