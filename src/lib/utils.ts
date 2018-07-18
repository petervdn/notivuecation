import NotificationType from './NotificationType';
import { IStoreApi, INotification } from './interface';

export function createDefaultStoreState(): INotification {
  // todo rename to INotificationData?
  return {
    type: null,
    title: null,
    confirm: null,
    cancel: null,
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

export function setDefaultLabels(data: INotification): void {
  if (data.confirm === void 0) {
    data.confirm = 'Ok';
  }

  if (data.cancel === void 0) {
    data.cancel = 'Cancel';
  }

  if (data.title === void 0 && data.type === NotificationType.ALERT) {
    data.title = 'Alert';
  } else if (data.title === void 0 && data.type === NotificationType.CONFIRM) {
    data.title = 'Confirm';
  }
}

// export function createNotificationData(payload: any, type: NotificationType): any {
//   if (typeof payload === 'string') {
//     return {
//       type,
//       message: payload,
//     }
//   } else if (typeof payload === 'object') {
//     return {
//       ...payload,
//       type,
//     }
//   }
// }
