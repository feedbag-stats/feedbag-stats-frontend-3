<template>
  <header>
    <div class="inner clearfix">
      <div class="float-right">
        <font-awesome-icon :icon="['fal', 'user']"/>&nbsp;&nbsp;
        Max Mustermann
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
  @import "~~/assets/scss/_vars.scss";

  .inner {
    padding: 1em;
  }
</style>
<script>

  export default {
    name: "Navigation",
    components: {}
  }
</script>
