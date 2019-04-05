<template>
  <b-container class="seperate main-container">
    <b-row>
      <b-col md="12">

        <h1>Hello World!</h1>

      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped lang="scss">
  @import "~~/assets/scss/_vars.scss";
  @import "~bootstrap/scss/mixins";

</style>

<script>
  export default {
    name: "Hello",
    props: {
      data: {}
    }
  }
</script>
