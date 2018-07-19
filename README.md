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

2. Add a component for the notifications to render. A very simple component named 'notivuecation' is registered on plugin activation and should work out of the box:
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
  title?: string;
  confirm?: string; // used for the ok button in both alert and confirm
  cancel?: string;
}
```
Not setting one of these value will result in a default string, except for the `message` field.

## custom component
To use your own component for displaying the notification, you can add the `componentMixin` to yor component's mixins:

```javascript
import { componentMixin } from 'notivuecation';

Vue.component('custom-component', {
  mixins: [componentMixin],
  template: `<div v-if="isShowing">
      <p>{{title}}</p>
      <button @click="onConfirm">yes</button>
      <button @click="onCancel" v-if="showCancel">no</button>
    </div>`,
});
```

Make sure to use `isShowing` to show or hide the notification and `showCancel` for the cancel-button.
