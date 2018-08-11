import NotificationType from './NotificationType';
import events from './events';
import Notification from './Notification.vue';
import { createShowActionForType } from './utils';
import { IINotificationLabels, INotifyParams, IOptions } from './interface';

// main methods
export function notify(params: INotifyParams): Promise<any> {
  return new Promise(resolve => {
    params.resolve = resolve;
    eventBus.$emit(events.SHOW_NOTIFICATION, params);
  }).then(result => {
    eventBus.$emit(events.HIDE_NOTIFICATION, params);
    return result;
  });
}

export const confirm: (
  param: IINotificationLabels | string,
) => Promise<any> = createShowActionForType(NotificationType.CONFIRM, notify);
export const alert: (
  param: IINotificationLabels | string,
) => Promise<any> = createShowActionForType(NotificationType.ALERT, notify);

export let eventBus: any; // todo type?

const defaultOptions: IOptions = {
  addMethodsToVue: true,
  componentName: 'notivuecation',
};

export default {
  install(Vue, userOptions: IOptions = {}) {
    // todo type vue?
    const options = Object.assign({}, defaultOptions, userOptions);

    eventBus = new Vue();

    if (options.addMethodsToVue) {
      Vue.prototype.$alert = alert;
      Vue.prototype.$confirm = confirm;
      Vue.prototype.$notify = notify;
    }

    // register the default component
    Vue.component(options.componentName, Notification);
  },
};
