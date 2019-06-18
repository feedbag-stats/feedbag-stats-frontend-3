<template>
  <div class="app">
    <SideNavigation class="side-navigation"/>
    <main class="content">
      <TopNavigation class="top-navigation"/>
      <div class="content-inner">
        <nuxt/>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
  @import "~~/assets/scss/_vars.scss";
  @import "~bootstrap/scss/mixins";

  .app {
    display: flex;
    min-height: 100vh;
    flex-direction: row;
  }

  .side-navigation {
    width: 15rem;
    //background-color: $brand-primary;
    background-image: linear-gradient(to left bottom, #16425b, #134b65, #0e556e, #075f77, #00697f);
    border-right: 1px solid $brand-primary;
  }

  .top-navigation {
    background-color: $brand-light-gray;
    border-bottom: 1px solid #DDD;
  }
  .content {
    width: auto;
    flex: 1;
  }

  .content-inner {
    padding: 2rem;
  }

</style>

<script>
  import SideNavigation from "~/components/layout/SideNavigation";
  import TopNavigation from "~/components/layout/TopNavigation";

  export default {
    components: {SideNavigation, TopNavigation},
  }
</script>
