import { getProps, isPromise } from '../utils/common';
import { Application, AppStatus } from '../types';

export default function unMountApp(app: Application): Promise<any> {
  app.status = AppStatus.BEFORE_UNMOUNT;

  // 提取参数
  try {
    app.props = getProps(app.props);
  } catch (err) {
    app.status = AppStatus.MOUNT_ERROR;
    throw err;
  }

  let result = app.unmount!(app.props);

  if (!isPromise(result)) {
    result = Promise.resolve(result);
  }

  return result
    .then(() => {
      app.status = AppStatus.UNMOUNTED;
    })
    .catch((err: Error) => {
      app.status = AppStatus.UNMOUNT_ERROR;
      throw err;
    });
}
