<template>
  <div class="notivuecation-overlay" v-if="notification">
    <div class="notivuecation-content">
      <h3 v-html="title"></h3>
      <p v-html="message"></p>

      <div class="notivuecation-buttons">
        <button
          v-for="button in buttons"
          :class="button.css"
          @click="resolve(button.value)"
        >{{button.label}}</button>
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
  .notivuecation-overlay {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
  }

  .notivuecation-content {
    max-width: 400px;
    background-color: white;
    padding: 20px;
    border-radius: 3px;
  }

  .notivuecation-content h3 {
    margin: 0;
  }

  .notivuecation-buttons {
    text-align: right;
  }
</style>
