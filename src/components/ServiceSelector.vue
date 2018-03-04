<template>
  <select class="service-selector">
    <option disabled selected>Add service</option>
    <option value="twitch">Twitch</option>
    <option value="youtube">YouTube</option>
    <option value="goodgame">GoodGame</option>
  </select>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ServiceSelector extends Vue {
  }
</script>

<style lang="stylus">
  .service-selector
    display block
    margin 1rem
    padding 0.5rem
    border-width 2px
    border-color #fff
    border-style solid
    width "calc(100% - (%s * 2))" % @margin

    background-image url('~material-design-icons/content/svg/production/ic_add_48px.svg?fill=white')
    background-repeat no-repeat
    background-size 1rem
    background-position-x "calc(100% - %s)" % @margin
    background-position-y center

    option
      color #000

      &:first-child
        display none
</style>
