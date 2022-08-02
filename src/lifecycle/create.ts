import { isPromise, validateIsLifeCycleFunc, getProps } from '../utils/common';
import { Application, AppStatus } from '../types';

export default async function createApp(app: Application) {
  const { create, mount, unmount } = await app.loadApp();

  // 验证是否为函数
  if (create) {
    validateIsLifeCycleFunc('create', create);
  }
  if (mount) {
    validateIsLifeCycleFunc('mount', mount);
  }
  if (unmount) {
    validateIsLifeCycleFunc('unmount', unmount);
  }

  // 复制出来
  app.create = create;
  app.mount = mount;
  app.unmount = unmount;

  // 提取参数
  try {
    app.props = getProps(app.props);
  } catch (err) {
    app.status = AppStatus.CREATE_ERROR;
    throw err;
  }

  let result = app.create!(app.props);

  if (!isPromise(result)) {
    result = Promise.resolve(result);
  }

  return result
    .then(() => {
      app.status = AppStatus.CREATED;
    })
    .catch((err: Error) => {
      app.status = AppStatus.CREATE_ERROR;
      throw err;
    });
}
