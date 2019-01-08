import NotificationType from './NotificationType';
import events from './events';
import Notification from './Notification.vue';
import { createNotificationLabels, createNotifyParams, defaultGetButtonForEscape } from './utils';
import { INotificationData, INotifyParams, IOptions, LabelsOrString } from './interface';

// main methods
export function notify(params: INotifyParams): Promise<any> {
  const data: INotificationData = { ...params };
  return new Promise(resolve => {
    data.resolve = resolve;
    eventBus.$emit(events.SHOW_NOTIFICATION, data);
  }).then(result => {
    eventBus.$emit(events.HIDE_NOTIFICATION, data);
    return result;
  });
}

export function confirm(param: LabelsOrString): Promise<any> {
  return notify(createNotifyParams(createNotificationLabels(param), NotificationType.CONFIRM));
}
export function alert(param: LabelsOrString): Promise<any> {
  return notify(createNotifyParams(createNotificationLabels(param), NotificationType.ALERT));
}

export let eventBus: any; // todo type?

const defaultOptions: IOptions = {
  addMethodsToVue: true,
  componentName: 'notivuecation',
  getButtonForEscape: defaultGetButtonForEscape,
};

// define as empty object so we can export it
export const options: IOptions = {};

export default {
  install(Vue, userOptions: IOptions = {}) {
    // todo type vue?
    Object.assign(options, defaultOptions, userOptions);

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
