<template>
  <div class="overlay" v-if="isShowing">
    <div class="notification">
      <h3>{{title}}</h3>
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
  .overlay .notification {
    max-width: 400px;
    background-color: white;
    padding: 20px;
    border-radius: 3px;
  }

  .overlay h3 {
    margin: 0;
  }

  .overlay .buttons {
    text-align: right;
  }
</style>
