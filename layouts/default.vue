<template>
  <div class="app">
    <Header />
    <main><nuxt /></main>
    <Footer />
    <Cookie />
  </div>
</template>

<style scoped lang="scss">
@import "~~/assets/scss/_vars.scss";
@import "~bootstrap/scss/mixins";

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  margin-top : 115px; // navbar
  padding-top: 40px;
}

</style>

<script>
import Header from "~/components/skeleton/Header";
import Footer from "~/components/skeleton/Footer";
import Cookie from "~/components/skeleton/Cookie";
export default {
  components: { Footer, Header, Cookie },
}
</script>
