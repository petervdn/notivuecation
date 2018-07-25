import NotificationType from './NotificationType';
import { storeObject, SHOW_NOTIFICATION } from './store';
import { IStore, IINotificationLabels, IParams } from './interface';
import Notification from './Notification.vue';

export default {
  install(Vue, params: IParams) {
    const store: IStore = params.store;

    const storeName = 'notivuecation';
    store.registerModule(storeName, storeObject);

    const createShowActionForType = type => (labelsData: IINotificationLabels) => {
      const data: any = {
        buttons: [],
        message: labelsData.message,
      };

      const confirmButton = {
        label: labelsData.confirm || 'Ok',
        value: true,
        css: 'ok',
      };

      let defaultTitle;

      if (type === NotificationType.ALERT) {
        data.buttons = [confirmButton];
        defaultTitle = 'Alert';
      } else if (type === NotificationType.CONFIRM) {
        const cancelButton = {
          label: labelsData.cancel || 'Cancel',
          value: false,
          css: 'cancel',
        };
        data.buttons = [confirmButton, cancelButton];
        defaultTitle = 'Confirm';
      } else {
        throw new Error(`Unknown type: ${type}`);
      }

      data.title = labelsData.title !== void 0 ? labelsData.title : defaultTitle;

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
