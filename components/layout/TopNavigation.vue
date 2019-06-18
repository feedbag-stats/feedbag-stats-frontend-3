<template>
  <header>
    <div class="inner clearfix">
      <div v-if="user" class="float-right">
        <font-awesome-icon :icon="['fal', 'user']"/>&nbsp;&nbsp;
        {{ user.name }}
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
    components: {},
    computed: {
      user() {
        return this.$store.state.user;
      },
    },
  }
</script>
