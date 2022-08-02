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
}
