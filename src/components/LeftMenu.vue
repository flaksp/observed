<template>
  <div class="left-menu">
    <ServiceSelector />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ServiceSelector from './ServiceSelector.vue';

  @Component({
    components: {
      ServiceSelector,
    },
  })

  export default class LeftMenu extends Vue {}
</script>

<style lang="stylus">
  .left-menu
    display block

    color #fff
    padding 0.1px /* Hack */

    background-image url('/images/left-menu-background.jpg')
    background-position center
    background-size cover
</style>
