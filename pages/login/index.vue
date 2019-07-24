<template>
  <div class="center-container">
    <div class="login-container">
      <b-form @submit="onSubmit">
        <h1>Login</h1>
        <p>Please enter your token to access your personalized dashboard.</p>
        <b-form-group id="token">
          <b-form-input v-model="token" placeholder="token" required type="text"></b-form-input>
        </b-form-group>
        <b-alert variant="danger" :show="this.error">This token is not valid.</b-alert>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        token: '',
        error: false,
      }
    },
    methods: {
      onSubmit(evt) {
        this.error = false;
        evt.preventDefault();

        this.$axios.$get('/me', {
          headers: {
            Authorization: this.token,
          }
        }).then((res) => {
          this.$store.commit('setUser', res);
          this.$router.push({path: '/'});

        }).catch((err) => {
          this.error = true;
        });
      },
    }
  }
</script>

<style lang="scss">
  .center-container {
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-container {
      max-width: 30%;
    }
  }
</style>
