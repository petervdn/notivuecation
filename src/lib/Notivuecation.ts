import NotificationType from './NotificationType';
import { storeObject, notificationStore } from './store';
import { IStore, IINotificationLabels } from './interface';
import Notification from './Notification.vue';

export default {
  install(Vue, params) {
    const store: IStore = params.store;

    store.registerModule('notification', storeObject);

    // create api methods
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

      return store.dispatch(notificationStore.actions.show, data);
    };

    Vue.prototype.$confirm = createShowActionForType(NotificationType.CONFIRM);
    Vue.prototype.$alert = createShowActionForType(NotificationType.ALERT);

    // when does this exist or not?
    if (!Vue.prototype.$store) {
      Vue.prototype.$store = store;
    }

    Vue.component('notivuecation', Notification);
  },
};
