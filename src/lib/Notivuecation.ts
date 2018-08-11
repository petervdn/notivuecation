import NotificationType from './NotificationType';
import events from './events';
import Notification from './Notification.vue';
import { createShowActionForType } from './utils';
import { IINotificationLabels, INotifyParams, IOptions } from './interface';

// main methofs
export const notify: (data: INotifyParams) => Promise<any> = (params: INotifyParams) =>
  new Promise(resolve => {
    params.resolve = resolve;

    eventBus.$emit(events.SHOW_NOTIFICATION, params);
  }).then(result => {
    eventBus.$emit(events.HIDE_NOTIFICATION, params);
    return result;
  });

export const confirm: (
  param: IINotificationLabels | string,
) => Promise<any> = createShowActionForType(NotificationType.CONFIRM, notify);
export const alert: (
  param: IINotificationLabels | string,
) => Promise<any> = createShowActionForType(NotificationType.ALERT, notify);

export let eventBus: any; // todo type

const defaultOptions: IOptions = {
  addMethodsToVue: true,
};

export default {
  install(Vue, userOptions: IOptions = {}) {
    const options = Object.assign({}, defaultOptions, userOptions);

    // create the event bus
    eventBus = new Vue();

    // create the base method to emit notification-data to the component
    if (options.addMethodsToVue) {
      Vue.prototype.$alert = alert;
      Vue.prototype.$confirm = confirm;
      Vue.prototype.$notify = notify;
    }

    Vue.component('notivuecation', Notification);
  },
};
