import { mapState } from 'vuex';
import { createDefaultStoreState } from './utils';
import NotificationType from './NotificationType';

export default {
  computed: {
    showCancel() {
      return this.type === NotificationType.CONFIRM;
    },
    ...mapState('notification', Object.keys(createDefaultStoreState())),
  },
  methods: {
    onConfirm() {
      this.resolve(true);
    },
    onCancel() {
      this.resolve(false);
    },
  },
};
