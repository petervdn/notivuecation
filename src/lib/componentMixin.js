import { mapState } from 'vuex';
import { createDefaultStoreState } from './utils';

export default {
  computed: {
    ...mapState('notification', Object.keys(createDefaultStoreState())),
  },
};
