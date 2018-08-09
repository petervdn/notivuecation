# notivuecation

Promise-based alert and confirm modal for Vue.js. 

## install

```sh
npm install notivuecation
```

## demo
See some examples on the [demo page](https://petervdn.github.io/notivuecation/example/).

## basic usage

1 - Activate the plugin.
```javascript
import { notivuecation } from 'notivuecation';
import Vue from 'vue';

Vue.use(notivuecation);
```

2 - Add the component that renders the notifications. You probably want to put this somewhere in the root component of your site, so it can always be visible. There is a simple component (named `notivuecation`) available, but you can also create and use your own.
```html
<notivuecation />
```

3 - Call `$alert` or `$confirm` from any Vue component:
```javascript
this.$alert('You are the 1 millionth visitor!').then(claimPrize);

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
  title: 'Claim prize',
  message: 'What color should your car be?',
  buttons: [
    {label: 'red', value: 1, css: 'red'},
    {label: 'green', value: 2, css: 'green'},
    {label: 'blue', value: 3, css: 'blue'},
  ]
});
```
The optional `css` property on the buttons will be set as css class on the button, while the `value` will be used when resolving the promise (i.e. this is the value that will end up in the `then` when clicking the button).

### $confirm and $alert
`$confirm` and `$alert` are shorthand methods that internally call `$notify` with some predefined data to cover most usecases. These two methods to show either a notification with Ok/Cancel buttons or just a single Ok-button. Both accept roughly the same parameters object:

```javascript
this.$confirm({
  title: 'Warning!', // default is either 'Confirm' or 'Alert'
  message: 'Please confirm that you have read this.',
  confirm: 'Sure man', // default is 'Ok'
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

When using `$confirm` or `$alert`, all confirm buttons will have the css-class `confirm` and all cancel buttons `cancel`.

## styling
The default component has some basic styling to overlay the content and show the message.
For your own project you might want to use custom styling for the notification itself.
There are some basic styles and simple classes which you can override easily.
A small example when using CSS Modules (with SCSS) in your Vue project.

```html
<notivuecation :class="$style.notification" />
```

```scss
:local {
  .notification {
    background: rgba(#000, 0.3);

    :global {
      .notivuecation-content {
        background: #000;
        color: #fff;
      }
    }
  }
}
```

Which would make the notification mask lighter, the content background black and the content contrasting white.


## custom component
If you want to use your own component for displaying the notification, just add the `componentMixin` to your component's mixins. It will add the following properties to the component: `title`, `buttons`, `message`, `resolve` and `notification`.

```javascript
import { componentMixin } from 'notivuecation';

Vue.component('custom-component', {
  mixins: [componentMixin],
  template: `<div v-if="notification">
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

__Make sure to use `v-if="notification"` (or `v-show`) to show or hide the notification.__


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
