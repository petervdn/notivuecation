import { mapState } from 'vuex';
import { createDefaultStoreState } from './utils';
import NotificationType from './NotificationType';

export default {
  data() {
    return {
      NotificationType,
    };
  },
  methods: {
    onConfirm() {
      this.resolve(true);
    },
    onCancel() {
      this.resolve(false);
    },
  },
  computed: {
    ...mapState('notification', Object.keys(createDefaultStoreState())),
  },
};
