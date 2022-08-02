import { getProps, isPromise } from '@/utils/common';
import { Application, AppStatus } from '@/types';

export default function mountApp(app: Application): Promise<any> {
  app.status = AppStatus.BEFORE_MOUNT;

  // 提取参数
  try {
    app.props = getProps(app.props);
  } catch (err) {
    app.status = AppStatus.MOUNT_ERROR;
    throw err;
  }

  // 执行 mount 函数里面的内容
  let result = app.mount!(app.props);

  if (!isPromise(result)) {
    result = Promise.resolve(result);
  }

  return result
    .then(() => {
      app.status = AppStatus.MOUNTED;
    })
    .catch((err: Error) => {
      app.status = AppStatus.MOUNT_ERROR;
      throw err;
    });
}
