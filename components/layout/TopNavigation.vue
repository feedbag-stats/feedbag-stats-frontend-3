<template>
  <header>
    <div class="inner clearfix">
      <div v-if="user">
        <div class="float-left">
          <span v-if="user.recalculatingStats"><font-awesome-icon class="fa-fw fa-spin" :icon="['fas', 'spinner']"/>&nbsp;&nbsp;Your stats are being recalculated.</span>
        </div>
        <div class="float-right">
          <font-awesome-icon :icon="['fal', 'user']"/>&nbsp;&nbsp;
          {{ user.name }}
        </div>
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
