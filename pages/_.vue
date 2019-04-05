<template>
  <main>

    <component :id="section.slug" v-for="(section,index) in content.sections" :key="index" :is="section.component" :data="section"></component>

  </main>
</template>

<script>
import Vue from 'vue'

const requireComponent = require.context('@/components/template', true, /.*$/)
requireComponent.keys().forEach(fileName => {

  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')

  Vue.component(componentName, componentConfig.default || componentConfig)

})

  export default {
    name: "Home",

    data() {
      return {
        content: this.$store.state.currentPage.content,
      }
    },

    head() {
      return {
        title: this.$store.state.currentPage.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.$store.state.currentPage.description,
          },
          {
            hid: "keywords",
            name: "keywords",
            content: this.$store.state.currentPage.keywords,
          },
        ],
      }
    },

    beforeRouteUpdate(to, from, next) {
      to.params['0'] = to.params.pathMatch;
      next();
    },

    beforeRouteEnter(to, from, next) {
      to.params['0'] = to.params.pathMatch;
      next();
    }

  }
</script>

<style lang="scss">
  @import "~~/assets/scss/_vars.scss";

</style>
