import { mapState } from 'vuex';
import { createDefaultStoreState } from './utils';

export default {
  computed: {
    // todo define this storename elsewhere (breaks when i try to import)
    ...mapState('notivuecation', Object.keys(createDefaultStoreState())),
  },
};
