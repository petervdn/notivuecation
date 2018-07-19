# notivuecation

Promise-based alerts, confirms and other notifications for Vue.js. This plugin requires Vuex (it will created a namespaced store on initialization) and a component to render the notifications. A very basic default component is supplied to get immediate results, but you can easily use of your own custom one.

## install

```sh
npm install notivuecation
```


## usage


1. Activate the plugin and supply a reference to your Vuex store:
```javascript
import notivuecation from 'notivuecation';
import Vue from 'vue';

Vue.use(notivuecation, { store: myVuexStoreInstance });
```

2. Add a component for the notifications to render. A simple component called 'notivuecation' is registered on plugin activation and should work out of the box. You probably want to put this in the root component of your site, so it can always be visible.
```html
<notivuecation />
```

3. Open an alert (ok button) or confirm (ok+cancel button) from any Vue component:
```javascript
this.$alert({ message: 'You are the 1 millionth visitor!'}).then(claimPrize);
});

this.$confirm({ message: 'Are you sure?'}).then(result => {
  // result is true/false
});
```

## parameters
Both `$alert` and `$confirm` accept an object containing some labels and texts to use:

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
      <p>{{description}}</p>
      <button @click="onConfirm">{{confirm}}</button>
      <button @click="onCancel" v-if="showCancel">{{cancel}}</button>
    </div>`,
});
```

Make sure to use `isShowing` to show or hide the notification and `showCancel` for the cancel-button.
