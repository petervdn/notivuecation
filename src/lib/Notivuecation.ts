import NotificationType from './NotificationType';
import events from './events';
import Notification from './Notification.vue';
import { createShowActionForType } from './utils';

export let eventBus: any;

export default {
  install(Vue) {
    // create the event bus
    eventBus = new Vue();

    // create the base method to emit notification-data to the component
    const notifyMethod = payload =>
      new Promise(resolve => {
        payload.resolve = resolve;
        eventBus.$emit(events.SHOW_NOTIFICATION, payload);
      }).then(result => {
        eventBus.$emit(events.HIDE_NOTIFICATION, payload);
        return result;
      });

    // create the 3 api methods
    Vue.prototype.$confirm = createShowActionForType(NotificationType.CONFIRM, notifyMethod);
    Vue.prototype.$alert = createShowActionForType(NotificationType.ALERT, notifyMethod);
    Vue.prototype.$notify = notifyMethod;

    Vue.component('notivuecation', Notification);
  },
};
