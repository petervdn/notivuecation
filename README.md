# notivuecation

Promise-based alerts, confirms and other notifications for Vue.js. This plugin requires Vuex (it will created a namespaced store on initialization) and a component to render the notifications. A very basic default component is supplied to get immediate results, but you can easily use of your own custom one.

## install

```sh
npm install notivuecation
```


## usage


Activate the plugin and supply a reference to your vuex store:
```javascript
import notivuecation from 'notivuecation';
import Vue from 'vue';

Vue.use(notivuecation, { store: myVuexStoreInstance });
```

Add the component to wherever you want it to render:
```html
<notivuecation /> // a component named 'notivuecation' is registered on plugin activation
```

Open an alert (ok button) or confirm (ok+cancel button) from any Vue component:
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

## built-in component
For quick prototyping, you can use the `<notivuecation />` component to render the notification.

## custom component
To use your own component: just skip the render of the `<notivuecation />` component, and your own instead. You you should add the `componentMixin` to the component's mixins:
```javascript
import { componentMixin } from 'notivuecation';

Vue.component('custom-component', {
  mixins: [componentMixin],
  template: '<div v-if="isShowing">
      <p>{{title}}</p>
      <button @click="onConfirm">yes</button>
      <button @click="onCancel" v-if="showCancel">no</button>
    </div>',
});
```

Make sure to add the `isShowing` to the whole notification (so it can be shown at the correct time) and the `showCancel` to the cancel-button (so we can hide it for alerts);
