<template>
<b-container>
  <b-row>
    <b-col md="12">

      <Hello></Hello>

    </b-col>
  </b-row>
</b-container>
</template>

<style scoped lang="scss">
@import "~~/assets/scss/_vars.scss";
@import "~bootstrap/scss/mixins";
</style>

<script>
import Hello from "~/components/part/Hello"

export default {
  name: "Index",
  components: { Hello },
  props: {
    data: {}
  }
}
</script>
