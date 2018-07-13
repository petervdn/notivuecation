# notivuecation

Promise-based alerts, confirms and other notifications for vue.

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
<notivuecation></notivuecation>
```

Open the notifications from any Vue component:
```javascript
this.$confirm({ message: 'Are you sure?'}).then(result => {
  // result is true/false
});
```

## alert and confirm
Two methods will be added to every Vue component: `$alert` and `$confirm` which both mimic their native counterparts.
