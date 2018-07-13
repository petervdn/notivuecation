import notivuecation from '../../src';

declare const Vue;
declare const Vuex;

Vue.use(Vuex);
const store = new Vuex.Store();

Vue.use(notivuecation, { store });

new Vue({
  el: '#app',
  methods: {
    showConfirm() {
      console.log('confirm');
      this.$confirm({ title: 'Test confirm', message: 'Are you sure?', 'cancel': 'Noooo' }).then(result => {

      });
    },
    showAlert() {
      console.log('alert');
      this.$alert({ title: 'Test alert', message: 'FYI...', 'confirm': 'Check'}).then(result => {

      });
    },
  },
});
