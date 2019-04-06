<template>
<div id="cookie-wrapper" style="display:none">
  <p>
    Wir verwenden Cookies, um die Seitennutzung zu verbessern. Mehr Infos unter
    <nuxt-link to="/de/info/datenschutzerklaerung" class="legal">Datenschutzerklärung</nuxt-link>.
  </p>
  <button class="btn btn-primary" v-on:click="accept()">OK</button>
</div>
</template>

<style scoped lang="scss">
@import "~~/assets/scss/_vars.scss";
@import "~bootstrap/scss/mixins";

#cookie-wrapper {
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 1000;

    max-width: 440px;
    border-radius: 5px;
    padding: 25px 40px;

    color: #eee;
    background: #000;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.3);

    @media (max-width: map-get($grid-breakpoints, sm)) {
      right: 0;
      left: 0;
      bottom: 0;
      border-radius: 0;
      width: 100vw;
      max-width: none;
    }

    button {
        padding: 8px 30px;
        min-width: auto;
    }

}
</style>

<script>
export default {
  name: "Cookie",

  mounted() {
    if (!localStorage.getItem("acceptCookies")) document.getElementById('cookie-wrapper').style.display = ''
  },

  methods: {
    accept() {
      localStorage.setItem("acceptCookies", true)
      document.getElementById('cookie-wrapper').style.display = 'none'
    }
  }

}
</script>
