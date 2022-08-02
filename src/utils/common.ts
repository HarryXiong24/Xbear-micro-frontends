// 判断是否为 promise 对象
export function isPromise(fn: any) {
  if (
    (typeof fn === 'object' || typeof fn === 'function') &&
    typeof fn.then === 'function'
  ) {
    return true;
  }
}

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

// 判断是不是函数
export function validateIsFunc(name: string, fn: (...args: any[]) => any) {
  if (typeof fn !== 'function') {
    throw Error(`The "${name}" must be a function`);
  } else {
    return true;
  }
}
