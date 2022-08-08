export enum AppStatus {
  BEFORE_CREATE = 'BEFORE_CREATE',
  CREATED = 'CREATED',
  BEFORE_MOUNT = 'BEFORE_MOUNT',
  MOUNTED = 'MOUNTED',
  BEFORE_UNMOUNT = 'BEFORE_UNMOUNT',
  UNMOUNTED = 'UNMOUNTED',
  CREATE_ERROR = 'CREATE_ERROR',
  MOUNT_ERROR = 'MOUNT_ERROR',
  UNMOUNT_ERROR = 'UNMOUNT_ERROR',
}

export interface Application {
  name: string;
  activeRule: ((...args: any[]) => any) | string;
  loadApp():
    | {
        create?: (props: Record<string, any>) => any;
        mount?: (props: Record<string, any>) => any;
        unmount?: (props: Record<string, any>) => any;
      }
    | Promise<{
        create?: (props: Record<string, any>) => any;
        mount?: (props: Record<string, any>) => any;
        unmount?: (props: Record<string, any>) => any;
      }>;
  props?: Record<string, any> | ((...args: any[]) => any);
  status?: AppStatus;
  container?: HTMLElement;
  create?: (props: Record<string, any>) => any;
  mount?: (props: Record<string, any>) => any;
  unmount?: (props: Record<string, any>) => any;
  pageEntry: string;
  pageBody: string;
  // app 已经加载过的 url，用于去重
  loadedURLs: string[];
}

/**
 * script css 的资源属性
 */
export interface Source {
  // 是否全局资源
  isGlobal: boolean;
  // 资源的 url
  url?: string;
  // 资源的内容，如果 url 有值，则忽略该属性
  value: string;
  // script 的类型
  type?: string | null;
}
