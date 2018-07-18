<template>
  <div class="overlay" v-if="isShowing">
    <div class="notification">
      <h2 class="example">{{ title }}</h2>
      <p>{{ message }}</p>

      <template v-if="type === NotificationType.CONFIRM">
        <button @click="confirmClick">{{ confirm }}</button>
        <button @click="cancelClick">{{ cancel }}</button>
      </template>

      <template v-if="type === NotificationType.ALERT">
        <button @click="confirmClick">{{ confirm }}</button>
      </template>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import NotificationType from './NotificationType';
  import { createDefaultStoreState } from './utils';

  export default {
    data() {
      return {
        NotificationType,
      };
    },
    methods: {
      confirmClick() {
        this.resolve(true);
      },
      cancelClick() {
        this.resolve(false);
      },
    },
    computed: {
      ...mapState('notification', Object.keys(createDefaultStoreState())),
    },
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
