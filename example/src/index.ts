import { notivuecation, componentMixin } from '../../src';


declare const Vue;
declare const Vuex;

Vue.use(Vuex);
const store = new Vuex.Store();

Vue.use(notivuecation, { store });

// Define a new component called button-counter
Vue.component('custom-component', {
  mixins: [componentMixin],
  template: '<div v-if="isShowing" style="width: 200px; background-color: grey"><h1>{{title}}<button @click="onConfirm">yes</button><button @click="onCancel">no</button></h1></div>',
});

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
