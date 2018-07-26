import NotificationType from './NotificationType';
import { storeObject, SHOW_NOTIFICATION } from './store';
import { IStore, IINotificationLabels, IParams } from './interface';
import Notification from './Notification.vue';

export default {
  install(Vue, params: IParams) {
    const defaultLabels = {
      confirmOk: 'Ok',
      cancel: 'Cancel',
      alertOk: 'Ok',
    };

    const store: IStore = params.store;
    const storeName = 'notivuecation';
    store.registerModule(storeName, storeObject);

    const createShowActionForType = type => (param: IINotificationLabels | string) => {
      const labels = {
        confirmOkLabel:
          typeof param !== 'string' && param.confirm ? param.confirm : defaultLabels.confirmOk,
        alertOkLabel:
          typeof param !== 'string' && param.confirm ? param.confirm : defaultLabels.alertOk,
        cancel: typeof param !== 'string' && param.cancel ? param.cancel : defaultLabels.cancel,
      };

      const data: any = {
        buttons: [],
        message: typeof param === 'string' ? param : param.message,
      };

      const confirmButton = {
        label: labels.confirmOkLabel,
        value: true,
        css: 'ok',
      };

      let defaultTitle;

      if (type === NotificationType.ALERT) {
        data.buttons = [confirmButton];
        defaultTitle = 'Alert';
      } else if (type === NotificationType.CONFIRM) {
        const cancelButton = {
          label: labels.cancel,
          value: false,
          css: 'cancel',
        };
        data.buttons = [confirmButton, cancelButton];
        defaultTitle = 'Confirm';
      } else {
        throw new Error(`Unknown type: ${type}`);
      }

      data.title = typeof param !== 'string' && param.title !== void 0 ? param.title : defaultTitle;

      return store.dispatch(`${storeName}/${SHOW_NOTIFICATION}`, data);
    };

    // create the 3 api methods
    Vue.prototype.$confirm = createShowActionForType(NotificationType.CONFIRM);
    Vue.prototype.$alert = createShowActionForType(NotificationType.ALERT);
    Vue.prototype.$notify = payload => {
      return store.dispatch(`${storeName}/${SHOW_NOTIFICATION}`, payload);
    };

    // when does this exist or not?
    if (!Vue.prototype.$store) {
      Vue.prototype.$store = store;
    }

    Vue.component('notivuecation', Notification);
  },
};
