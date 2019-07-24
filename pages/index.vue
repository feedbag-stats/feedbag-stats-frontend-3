<template>
  <div class="text-center">
    <br><br><br><br><br><br>
    <h1>This is the front page :-)</h1>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    data() {
      return {name: 'feedbag frontend'}
    }
  }
</script>

<style>

</style>
