import { INotificationData } from './interface';

export function createDefaultStoreState(): INotificationData {
  return {
    title: null,
    buttons: [],
    message: null,
    resolve: null,
    isShowing: false,
  };
}
