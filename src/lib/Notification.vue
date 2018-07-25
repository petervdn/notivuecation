<template>
  <div class="overlay" v-if="isShowing">
    <div class="notification">
      <h2>{{title}}</h2>
      <div class="content">
        <p>{{ message }}</p>

        <div class="buttons">
          <button
            v-for="button in buttons"
            :class="button.css"
            @click="resolve(button.value)"
          >{{button.label}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import componentMixin from './componentMixin';

  export default {
    mixins: [componentMixin],
  }
</script>


<style>
  .overlay {
    z-index: 9999;
    font-family: sans-serif;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .overlay .notification {
    border-radius: 3px;
    width: 400px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .overlay .notification h2 {
    margin: 0;
    background-color: #666666;
    color: #fff;
    padding: 10px 15px;
    font-size: .9rem;
  }

  .overlay .notification .content {
    padding: 0 15px 15px 15px;
  }

  .overlay .notification .buttons {
    text-align: right;
  }
</style>
