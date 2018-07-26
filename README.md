# notivuecation

Promise-based alert and confirm modal for Vue.js. This plugin requires Vuex and a component to render the notifications.

A basic built-in component can be used, but you can easily switch to a custom implementation.

## install

```sh
npm install notivuecation
```


## basic usage

1 - Activate the plugin and supply a reference to your Vuex store:
```javascript
import { notivuecation } from 'notivuecation';
import Vue from 'vue';

Vue.use(notivuecation, { store: myVuexStoreInstance });
```

2 - Add the component that renders the notifications. You probably want to put this somewhere in the root component of your site, so it can always be visible.
```html
<notivuecation />
```

3 - Call `$alert` or `$confirm` from any Vue component:
```javascript
this.$alert('You are the 1 millionth visitor!').then(claimPrize);
});

this.$confirm('Are you sure?').then(result => {
  // result is true/false
});
```

## overview
The plugin adds three methods to the Vue instance:
* `$notify`
* `$alert`
* `$confirm`

### $notify
The `$notify` method accepts an object that defines the title, a message and all buttons to show:
```javascript
this.$notify({
  title: 'Please choose!',
  message: 'We really need to know which option you want.',
  buttons: [
    {label: 'option #1', value: 1, css: 'red'},
    {label: 'option #2', value: 2, css: 'green'},
    {label: 'option #3', value: 3, css: 'blue'},
  ]
});
```
The optional `css` property will be set as css class on the button, while the `value` will be used when resolving the promise (i.e. this is the value that will end up in the `then` when clicking the button).

### $confirm and $alert
`$confirm` and `$alert` are shorthand methods that internally call `$notify` with some predefined data to cover most usecases. These two methods to show either a notification with Ok/Cancel buttons or just a single Ok-button. Both accept roughly the same parameters object:

```javascript
this.$confirm({
  message: 'Please confirm',
  title: 'Warning!', // default is 'Confirm' or 'Alert'
  confirm: 'I will', // default is 'Ok'
  cancel: 'No way',  // default is 'Cancel', not used for $alert
}).then(result => {
  // result is true/false when using $confirm, and not set for $alert
});
```

Both methods can also be called with a string as argument, which is the same as using an object with only the `message` property set. So these two are equal:
```javascript
this.$confirm('Are you sure?');
this.$confirm({message: 'Are you sure?'});
```


## custom component
If you want to use your own component for displaying the notification, just add the `componentMixin` to your component's mixins. It will map all poperties from the Vuex state to the component: `title`, `buttons`, `message`, `resolve` and `isShowing`.

```javascript
import { componentMixin } from 'notivuecation';

Vue.component('custom-component', {
  mixins: [componentMixin],
  template: `<div v-if="isShowing">
      <h1>{{title}}</h1>
      <p>{{message}}</p>

      <button
        v-for="button in buttons"
        :class="button.css"
        @click="resolve(button.value)"
      >{{button.label}}</button>
    </div>`,
});
```


__Make sure to use `isShowing` to show or hide the notification.__


If your component needs to do specific logic (like validation or animations), the only thing you need to eventually do is call `this.resolve(someValue)`.
```javascript
Vue.component('my-custom-component', {
  mixins: [componentMixin],
  methods: {
    onButtonClick(button) {
      doAnimations().then(() => {
        this.resolve(button.value);
      });
    },
  }
}
```

## limitations
Multiple (or queued) notifications are not yet supported, so if a new one is triggered when there is already one in view, things may not work correctly (the new one is displayed, but the previous one will never be resolved).
