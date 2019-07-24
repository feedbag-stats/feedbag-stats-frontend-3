<template>
  <div>
    <h1 class="page-title">My Profile</h1>
    <p>... maybe some profile stuff?</p>
    <ul>
      <li>set password</li>
      <li>set visibilty?</li>
    </ul>
    <br><br>
    <h4>My Uploads</h4>
    <p>...</p>
  </div>
</template>

<script>

  import moment from 'moment';

  export default {
    middleware: 'auth',
    data() {
      return {
        zips: [],
      }
    },
    methods: {},
    async mounted() {
    },
  }
</script>

<style scoped lang="scss">
  .event-wrapper {
    width: 100%;
    height: 500px;
    overflow: scroll;
    .event {
      height: 50px;
      background: #f4f4f4;
      margin: 2px 0;
      padding: 10px;
    }
    .scroll-block {
      .top {
        margin-top: 20px;
      }
      .bottom {
        margin-bottom: 20px;
      }
      padding: 40px 50px 20px;
      height: 100px;
      background: #dcdcdc;
      text-align: center;
      font-weight: bold;
    }
  }
</style>
