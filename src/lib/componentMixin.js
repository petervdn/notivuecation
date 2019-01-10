import events from './events';
import { getEventBus, options } from './Notivuecation';

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
    onEscapeUp(event) {
      if (event.keyCode === 27 && this.notification && options.getButtonForEscape) {
        const buttonForEscape = options.getButtonForEscape(this.notification);
        if (buttonForEscape) {
          this.resolve(buttonForEscape.value);
        }
      }
    },
  },
  mounted() {
    getEventBus().$on(events.SHOW_NOTIFICATION, this.onShowNotification);
    getEventBus().$on(events.HIDE_NOTIFICATION, this.onHideNotification);

    window.addEventListener('keyup', this.onEscapeUp);
  },
  computed: {
    resolve() {
      return this.notification ? this.notification.resolve : null;
    },
    buttons() {
      return this.notification ? this.notification.buttons : null;
    },
    title() {
      return this.notification ? this.notification.title : null;
    },
    message() {
      return this.notification ? this.notification.message : null;
    },
    notification() {
      return this.notifications[0];
    },
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onEscapeUp);
    getEventBus().$off(events.SHOW_NOTIFICATION, this.onShowNotification);
    getEventBus().$off(events.HIDE_NOTIFICATION, this.onHideNotification);
  },
};
