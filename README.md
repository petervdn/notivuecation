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
this.$alert({ message: 'You are the 1 millionth visitor!'}).then(claimPrize);
});

this.$confirm({ message: 'Are you sure?'}).then(result => {
  // result is true/false
});
```

## in depth
The plugin adds three methods to the Vue instance:
* `$notify`
* `$alert`
* `$confirm`

### $notify
The `$notify` method accepts an object that defines the notification, with a title, a message and all buttons to show:
```javascript
this.$notify({
  title: 'Please choose!',
  message: 'We really need to know which option you want.',
  buttons: [
    {label: 'option #1', value: 1},
    {label: 'option #2', value: 2},
    {label: 'option #3', value: 3},
  ]
});
```

### $confirm and $alert
The `$confirm` and `$alert` methods are shorthand methods that internally call `$notify` with some predefined data. These two methods to show either a notification with Ok/Cancel buttons or just a single Ok-button. Both accept roughly the same parameters object:

```javascript
this.$confirm({
  message: 'Please confirm',
  title: 'Warning!', // optional, defaults to 'Confirm' or 'Alert'
  ok: 'I will',     // defaults to 'Ok'
  cancel: 'No way', // default is 'Cancel', not used for $alert
}).then(result => {
  // result is true/false with $confirm, and not set for $alert
});
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


If your component needs to do specific logic (like validation or animations), the only thing you need to eventually do is call `this.resolve(someValue)`. You could for example override the default `onConfirm` method to start some animations before the notification closes:
```javascript
Vue.component('my-custom-component', {
  mixins: [componentMixin],
  methods: {
    onConfirm() {
      doAnimations().then(() => {
        this.resolve(true);
      });
    },
  }
}
```

## limitations
Multiple (or queued) notifications are not yet supported, so if a new one is triggered when there is already one in view, things may not work correctly (the new one is displayed, but the previous one will never be resolved).
