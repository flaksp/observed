<template>
  <div id="app">
    <LeftMenu class="app__left-menu"/>
  </div>
</template>

<script>
  import LeftMenu from './components/LeftMenu.vue';

  export default {
    name: 'app',
    components: {
      LeftMenu,
    },
  };
</script>

<style>
  #app {
    display: block;
    height: 100%;
  }

  .app__left-menu {
    display: block;
    height: 100%;
    width: 300px;
  }
</style>
