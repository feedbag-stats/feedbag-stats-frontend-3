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

  export default {
    components: {},
    asyncData({$axios}) {
      return $axios.$get('/users').then((res) => {
        return {users: res}
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }
</script>

<style>

</style>
