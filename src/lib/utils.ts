import { IStoreApi, INotificationData, IButton } from './interface';

export function createDefaultStoreState(): INotificationData {
  return {
    title: null,
    buttons: [],
    message: null,
    resolve: null,
    isShowing: false,
  };
}

export function initStoreApi(object: IStoreApi, storeName: string): any {
  object.local = {};

  ['state', 'mutations', 'getters', 'actions'].forEach(type => {
    if (!object[type]) {
      return;
    }
    object.local[type] = {};
    Object.keys(object[type]).forEach(key => {
      object[type][key] = `${storeName}/${key}`;
      object.local[type][key] = key;
    });
  });
}
