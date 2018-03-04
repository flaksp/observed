<template>
  <div class="app" id="app">
    <LeftMenu class="app__left-menu"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import LeftMenu from './components/LeftMenu.vue';

  @Component({
    components: {
      LeftMenu,
    },
  })

  export default class App extends Vue {}
</script>

<style lang="stylus">
  .app
    display block
    height 100%

    &__left-menu
      display block
      height 100%
      width 300px
</style>
