<template>
  <b-container>

    <b-row>
      <b-col md="11" offset-md="1">

        <div v-if="error.statusCode === 404" class="text">
          <h1>{{$t('error.404.title')}}</h1>
          <p>{{$t('error.404.content')}}</p>
        </div>

        <div v-else-if="error.statusCode === 598" class="text">
          <h1>{{$t('error.598.title')}}</h1>
          <p>{{$t('error.598.content')}}</p>
        </div>

        <h1 v-else>{{$t('error.title')}}</h1>

        <nuxt-link to="/">
          <button class="btn btn-danger text">{{$t('error.home')}}</button>
        </nuxt-link>

        <no-ssr>
          <p v-if="dev"><pre style="color:#888">{{error}}</pre></p>
        </no-ssr>

      </b-col>
    </b-row>

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
  props: ["error"],
  data(){ return { dev: false } },
  mounted() { this.dev = !!window.webpackHotUpdate }
}
</script>
