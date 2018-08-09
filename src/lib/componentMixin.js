import events from './events';
import { eventBus } from './Notivuecation';

export default {
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    onShowNotification(notification) {
      this.notifications.push(notification);
    },
    onHideNotification(notification) {
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },
  },
  mounted() {
    eventBus.$on(events.SHOW_NOTIFICATION, this.onShowNotification);
    eventBus.$on(events.HIDE_NOTIFICATION, this.onHideNotification);
  },
  computed: {
    notification() {
      return this.notifications[0];
    },
  },
  beforeDestroy() {
    eventBus.$off(events.SHOW_NOTIFICATION, this.onShowNotification);
    eventBus.$off(events.HIDE_NOTIFICATION, this.onHideNotification);
  },
};
