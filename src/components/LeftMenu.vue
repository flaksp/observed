<template>
  <div class="left-menu">
    <ServiceSelector />
  </div>
</template>

<script>
  import ServiceSelector from './ServiceSelector.vue';

  export default {
    name: 'LeftMenu',
    components: {
      ServiceSelector,
    },
  };
</script>

<style scoped>
  .left-menu {
    background-image: url('http://wallpapercave.com/wp/ERun36c.jpg');
    background-position: center;
    background-size: cover;
    padding: 0.1px; /* A hack */
  }
</style>
