<template>
  <div>
    <h1 class="mb-4">This is settings page :-)</h1>
    <button class="btn btn-primary" v-on:click="resetServer">Reset Server</button>
    <button class="btn btn-primary ml-3" v-on:click="generateData">Generate Activity Data</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {name: 'feedbag frontend'}
    },
    methods: {
      generateData() {
        axios.post('/generate', {}, {
          url: '/generate',
          baseURL: this.$store.state.backendURL
        }).then((Response) => {
          alert('New Data generated on the server.');
        }).catch((err) => {
          alert('Server is not responsing');
        })
      },
      resetServer() {
        axios.post('/reset-database', {}, {
          url: '/reset-database',
          baseURL: this.$store.state.backendURL
        }).then((Response) => {
          alert('Server resetted');
        }).catch((err) => {
          alert('Server is not responsing');
        })
      }
    }
  }
</script>

<style>

</style>
