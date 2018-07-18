import { storeObject, notificationStore } from './store';
import { IStore } from './interface';
import NotificationType from './NotificationType';
import { setDefaultLabels } from './utils';
import Notification from './Notification.vue';

export default {
  install(Vue, params) {
    const store: IStore = params.store;

    store.registerModule('notification', storeObject);

    // create api methods
    const showActionForType = type => data => {
      setDefaultLabels(data);
      return store.dispatch(notificationStore.actions.show, { ...data, type });
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
