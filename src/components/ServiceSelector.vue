<template>
  <select class="service-selector">
    <option disabled selected>Add service</option>
    <option value="twitch">Twitch</option>
    <option value="youtube">YouTube</option>
    <option value="goodgame">GoodGame</option>
  </select>
</template>

<script>
  export default {
    name: 'ServiceSelector',
  };
</script>

<style scoped>
  .service-selector {
    display: block;
    margin: 1rem;
    padding: 0.5rem;
    border-width: 2px;
    border-color: #fff;
    border-style: solid;
    color: #fff;
    width: calc(100% - (1rem * 2));

    background-image: url(~material-design-icons/content/svg/production/ic_add_48px.svg);
    background-repeat: no-repeat;
    background-size: 1rem;
    background-position-x: calc(100% - 1rem);
    background-position-y: center;
  }

  .service-selector:after {
    content: "";
    position: absolute;
    /*background-image: url();*/
    display: block;
  }

  .service-selector option {
    color: #000;
  }

  .service-selector option:first-child {
    display: none;
  }
</style>
