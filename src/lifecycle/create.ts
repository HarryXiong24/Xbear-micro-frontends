import { isPromise, validateIsFunc, getProps } from '@/utils/common';
import { Application, AppStatus } from '@/types';

export default async function createApp(app: Application) {
  const { create, mount, unmount } = await app.loadApp();

  // 验证是否存在
  if (create && validateIsFunc('create', create)) {
    app.create = create;
  } else {
    app.create = () => {
      console.warn('This app has no create method');
    };
  }
  if (mount && validateIsFunc('mount', mount)) {
    app.mount = mount;
  } else {
    app.mount = () => {
      console.warn('This app has no mount method');
    };
  }
  if (unmount && validateIsFunc('unmount', unmount)) {
    app.unmount = unmount;
  } else {
    app.unmount = () => {
      console.warn('This app has no unmount method');
    };
  }

  // 提取参数
  try {
    app.props = getProps(app.props);
  } catch (err) {
    app.status = AppStatus.CREATE_ERROR;
    throw err;
  }

  let result = app.create(app.props);

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
