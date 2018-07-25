import { mapState } from 'vuex';
import { createDefaultStoreState } from './utils';

export default {
  computed: {
    ...mapState('notivuecation', Object.keys(createDefaultStoreState())),
  },
};
