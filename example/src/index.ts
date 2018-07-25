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
    test() {
      this.$notify({
        title: 'test title',
        message: 'Lorem ipsum dolor sit amet, cum scripta dolorem omittantur te, ex doming salutandi vis. Eam ea quas audire, consequat abhorreant incorrupte at duo.',
        buttons: [
          {label: 'option #1', value: 1},
          {label: 'option #2', value: 2},
          {label: 'option #3', value: 3},
        ]
      }).then(result => {
        console.log('result', result);
      })
    },
    showConfirm() {
      this.$confirm({message: 'Are you sure you want to do this?', ok: 'Yes'}).then(result => {
        console.log(result);
      });
    },
    showAlert() {
      this.$alert({ message: 'Please click ok to continue.' }).then(result => {
        console.log(result);
      });
    },
  },
});
