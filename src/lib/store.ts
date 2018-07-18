import { IStoreApi } from './interface';
import NotificationType from './NotificationType';
import { createDefaultStoreState, initStoreApi } from './utils';

export const notificationStore: IStoreApi = {
  mutations: {
    setNotificationData: null,
  },
  actions: {
    show: null,
  },
};

initStoreApi(notificationStore, 'notification');

export const storeObject = {
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
        return Promise.resolve(payload.type === NotificationType.ALERT ? void 0 : result);
      });
    },
  },
};
