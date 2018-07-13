import NotificationType from './NotificationType';

export interface IStore {
  state: any;
  subscribe: (callback: (mutation: IMutation, state: any) => void) => void;
  getters: { [key: string]: any };
  commit: (type: string, data?: any) => void;
  dispatch: (type: string, data?: any, options?: any) => void; // todo returns promise
  watch: (
    state: (state: any, getters?: any) => any,
    handler: (newValue: any, oldValue?: any) => void,
    options?: IStoreWatchOptions,
  ) => () => void;
  registerModule: (name: string, data: any) => void;
}

export interface IStoreWatchOptions {
  immediate?: boolean;
  deep?: boolean;
}

export interface IMutation {
  type: string;
  payload: any;
}

export interface IStoreApi {
  state?: any;
  mutations?: any;
  getters?: any;
  actions?: any;
  local?: any;
}

export interface INotification {
  type: NotificationType;
  title: string;
  confirm: string;
  cancel: string;
  message: string;
  resolve: (result: boolean) => void;
  isShowing: boolean;
}
