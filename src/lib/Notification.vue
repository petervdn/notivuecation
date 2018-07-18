<template>
  <div class="overlay" v-if="isShowing">
    <div class="notification">
      <h2 class="example">{{ title }}</h2>
      <p>{{ message }}</p>

      <button @click="onCancel" v-if="showCancel">{{ cancel }}</button>
      <button @click="onConfirm">{{ confirm }}</button>
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
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .notification {
    width: 400px;
    height: 300px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
