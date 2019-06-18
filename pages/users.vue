<template>
  <div>
    <h1>All Users in the Database</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <nuxt-link :to="localePath({'name': 'login-id', 'params': {'id': user.token}})">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    components: {},
    asyncData({store}) {
      return axios.get(store.state.backendURL + '/users').then((res) => {
        return {users: res.data}
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }
</script>

<style>

</style>
