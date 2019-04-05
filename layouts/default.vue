<template>
  <div class="app">
    <Header />
    <div class="pages"><nuxt /></div>
    <Footer />
    <Cookie />
  </div>
</template>

<style scoped lang="scss">
@import "~~/assets/scss/_vars.scss";
@import "~bootstrap/scss/mixins";

</style>

<script>
import Header from "~/components/skeleton/Header";
import Footer from "~/components/skeleton/Footer";
import Cookie from "~/components/skeleton/Cookie";
export default {
  components: { Footer, Header, Cookie },
};
</script>
