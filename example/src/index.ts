import notivuecation, { confirm, alert, notify, componentMixin } from '../../src';

declare const Vue;
Vue.use(notivuecation);

// define custom component
Vue.component('custom-component', {
  mixins: [componentMixin],
  template: `<div v-if="notification" class="notivuecation-overlay">
      <div class="notivuecation-content">
        <h1>{{title}}</h1>
        <p>{{message}}</p>
        
        <button
          v-for="button in buttons"
          :class="button.css"
          @click="resolve(button.value)"
        >{{button.label}}</button>
      </div>
    </div>`,
});

new Vue({
  el: '#app',
  methods: {
    showFullCustom() {
      notify({
        title: 'Custom title',
        message: 'Custom message.',
        buttons: [
          {label: 'option #1', value: 1},
          {label: 'option #2', value: 2},
          {label: 'option #3', value: 3},
        ]
      }).then(console.log)
    },
    showBasicConfirm() {
      confirm('Are you sure you want to do this?').then(console.log);
    },
    showCustomConfirm() {
      confirm({ message: 'Are you sure you want to do this?', confirm: 'Yes!', cancel: 'Hell no' }).then(console.log);
    },
    showCustomAlert() {
      alert({
        title: 'Error!',
        message: 'Something went wrong',
        confirm: 'Bummer',
      }).then(console.log);
    },
    showBasicAlert() {
      alert('Please click ok').then(console.log);
    },
    onQueueDemoClick() {
      confirm('First confirm').then(console.log);

      setTimeout(() => {
        confirm('Second confirm').then(console.log);
      }, 1000);
      setTimeout(() => {
        confirm('Third confirm').then(console.log);
      }, 2000);
    },
  },
});
