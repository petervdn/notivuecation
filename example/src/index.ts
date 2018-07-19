import { notivuecation, componentMixin } from '../../src';


declare const Vue;
declare const Vuex;

Vue.use(Vuex);
const store = new Vuex.Store();

Vue.use(notivuecation, { store });

// define custom component
Vue.component('custom-component', {
  mixins: [componentMixin],
  template: `<div v-if="isShowing" style="width: 200px; background-color: grey">
      <h1>{{title}}</h1>
      <p>{{message}}</p>
      <button @click="onConfirm">{{confirm}}</button>\
      <button @click="onCancel" v-if="showCancel">{{cancel}}</button>
    </div>`,
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
      this.$alert({ message: 'FYI...' }).then(result => {
        console.log(result);
      });
    },
  },
});
