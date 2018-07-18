import { storeObject, notificationStore } from './store';
import { IStore, IINotificationLabels } from './interface';
import NotificationType from './NotificationType';
import Notification from './Notification.vue';

export default {
  install(Vue, params) {
    const store: IStore = params.store;

    store.registerModule('notification', storeObject);

    // create api methods
    const showActionForType = type => (labelsData: IINotificationLabels) => {
      const dataWithType = { ...labelsData, type };

      // set some default labels
      if (dataWithType.confirm === void 0) {
        dataWithType.confirm = 'Ok';
      }
      if (dataWithType.cancel === void 0) {
        dataWithType.cancel = 'Cancel';
      }
      if (dataWithType.title === void 0 && dataWithType.type === NotificationType.ALERT) {
        dataWithType.title = 'Alert';
      } else if (dataWithType.title === void 0 && dataWithType.type === NotificationType.CONFIRM) {
        dataWithType.title = 'Confirm';
      }

      return store.dispatch(notificationStore.actions.show, dataWithType);
    };

    Vue.prototype.$confirm = showActionForType(NotificationType.CONFIRM);
    Vue.prototype.$alert = showActionForType(NotificationType.ALERT);

    // when does this exist or not?
    if (!Vue.prototype.$store) {
      Vue.prototype.$store = store;
    }

    Vue.component('notivuecation', Notification);
  },
};
