import { IStore, IStoreApi } from './interface';
import NotificationType from './NotificationType';
import { createDefaultStoreState, initStoreApi } from './utils';
import Notification from './Notification.vue';

const notificationStore: IStoreApi = {
  mutations: {
    setNotificationData: null,
  },
  actions: {
    show: null,
  },
};

initStoreApi(notificationStore, 'notification');

export default {
  install(Vue, params) {
    const store: IStore = params.store;

    store.registerModule('notification', {
      namespaced: true,
      state: createDefaultStoreState(),
      mutations: {
        [notificationStore.local.mutations.setNotificationData]: (state, payload) => {
          const data = payload || createDefaultStoreState();
          Object.keys(data).forEach(key => {
            state[key] = data[key];
          });

          state.isShowing = !!payload;
        },
      },
      actions: {
        [notificationStore.local.actions.show]: (context, payload) => {
          return new Promise(resolve => {
            context.commit(notificationStore.local.mutations.setNotificationData, {
              ...payload,
              resolve,
            });
          }).then(result => {
            context.commit(notificationStore.local.mutations.setNotificationData, null);
            return Promise.resolve(result);
          });
        },
      },
    });

    Vue.prototype.$confirm = data =>
      store.dispatch(notificationStore.actions.show, {
        ...data,
        type: NotificationType.CONFIRM,
      });

    Vue.prototype.$alert = data =>
      store.dispatch(notificationStore.actions.show, {
        ...data,
        type: NotificationType.ALERT,
      });

    if (!Vue.prototype.$store) {
      Vue.prototype.$store = store;
    }
    Vue.component('notivuecation', Notification);
  },
};
