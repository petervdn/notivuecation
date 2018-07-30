import { createDefaultStoreState } from './utils';

const SET_NOTIFICATION_DATA = 'setNotificationData';
export const SHOW_NOTIFICATION = 'showNotification';

export const storeObject = {
  namespaced: true,
  state: createDefaultStoreState(),
  mutations: {
    [SET_NOTIFICATION_DATA]: (state, payload) => {
      const data = payload || createDefaultStoreState();
      Object.keys(data).forEach(key => {
        state[key] = data[key];
      });

      state.isShowing = !!payload;
    },
  },
  actions: {
    [SHOW_NOTIFICATION]: (context, payload) => {
      return new Promise(resolve => {
        context.commit(SET_NOTIFICATION_DATA, {
          ...payload,
          resolve,
        });
      }).then(result => {
        context.commit(SET_NOTIFICATION_DATA, null);
        return Promise.resolve(result);
      });
    },
  },
};
