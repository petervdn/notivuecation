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
      
      <button
        v-for="button in buttons"
        :class="button.css"
        @click="resolve(button.value)"
      >{{button.label}}</button>
    </div>`,
});

new Vue({
  el: '#app',
  methods: {
    showFullCustom() {
      this.$notify({
        title: 'Custom title',
        message: 'Custom message.',
        buttons: [
          {label: 'option #1', value: 1},
          {label: 'option #2', value: 2},
          {label: 'option #3', value: 3},
        ]
      }).then(result => {
        console.log(result);
      })
    },
    showBasicConfirm() {
      this.$confirm('Are you sure you want to do this?').then(result => {
        console.log(result);
      });
    },
    showCustomConfirm() {
      this.$confirm({ message: 'Are you sure you want to do this?', confirm: 'Yes!', cancel: 'Hell no' }).then(result => {
        console.log(result);
      });
    },
    showCustomAlert() {
      this.$alert({
        title: 'Important!',
        message: 'Please confirm',
        confirm: 'Sure!',
      });
    },
    showBasicAlert() {
      this.$alert('Please click ok').then(result => {
        console.log(result);
      });
    },
  },
});
