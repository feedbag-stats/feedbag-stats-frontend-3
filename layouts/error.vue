<template>
  <b-container>

    {{error}}

  </b-container>
</template>

<style scoped>
  h1 {
    margin-bottom: 10px;
  }

  .text {
    margin-bottom: 70px;
  }
</style>

<script>
  export default {
    props: ['error'],
  }
</script>
