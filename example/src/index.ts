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
      this.$confirm({message: 'Are you sure?'}).then(result => {
        console.log(result);
      });
    },
    showAlert() {
      this.$alert({ message: 'FYI...', 'confirm': 'Check'}).then(result => {
        console.log(result);
      });
    },
  },
});
