<template>
  <p v-if="user">Hallo {{user.name}}</p>
</template>

<script>
  import axios from 'axios'

  export default {
    computed: {
      user() {
        return this.$store.state.user;
      },
    },
    mounted() {
      // we might not need this :o
      this.$store.dispatch('login', this.$route.params.id);
    },
    asyncData({store, route}) {
      //store.commit('login', route.params.id);
    }
  }
</script>

<style>

</style>
