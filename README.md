# notivuecation

Promise-based alerts, confirms and other notifications for Vue.js. This plugin requires Vuex and a component to render the notifications.

A basic built-in component can be used, but you can easily switch to a custom implementation.

## install

```sh
npm install notivuecation
```


## usage


1 - Activate the plugin and supply a reference to your Vuex store:
```javascript
import notivuecation from 'notivuecation';
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

## message and button labels
Both `$alert` and `$confirm` accept an object containing labels and texts to use:

```javascript
interface IINotificationLabels {
  message: string;
  title?: string;   // default: either Confirm or Alert
  confirm?: string; // default: Ok
  cancel?: string;  // default: Cancel
}
```
Note that the `message` field does not have a default value, and that the confirm button is used for both the alert and confirm state.

## custom component
To use your own component for displaying the notification, just add the `componentMixin` to your component's mixins:

```javascript
import { componentMixin } from 'notivuecation';

Vue.component('custom-component', {
  mixins: [componentMixin],
  template: `<div v-if="isShowing">
      <h2>{{title}}</h2>
      <p>{{message}}</p>
      <button @click="onConfirm">{{confirm}}</button>
      <button @click="onCancel" v-if="showCancel">{{cancel}}</button>
    </div>`,
});
```
The mixin will:
* add `onConfirm` and `onCancel` methods that will close the notification (note that these methods just call the resolve method with either `true` or `false`)
* add `showCancel` computed property, which decides if the cancel button is visible (hidden for alerts)
* map all poperties from the Vuex state to the component: `type`, `title`, `confirm`, `cancel`, `message`, `resolve` and `isShowing`.

__Make sure to use `isShowing` to show or hide the notification and `showCancel` for the cancel-button.__

## custom logic
If your component needs to do specific logic (like validation or animations), the only thing you need to eventually call is `this.resolve()` with either `true` or `false` (depending on what the user clicked on).

You could for example override the default `onConfirm` method to start some animations before the notification closes:
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
