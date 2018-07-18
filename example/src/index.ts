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
      this.$confirm({ title: 'Test confirm', message: 'Are you sure?', 'cancel': 'Noooo' }).then(result => {
        console.log(result);
      });
    },
    showAlert() {
      this.$alert({ title: 'Test alert', message: 'FYI...', 'confirm': 'Check'}).then(result => {
        console.log(result);
      });
    },
  },
});
