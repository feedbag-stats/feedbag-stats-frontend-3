<template>

  <component :is="page.component" :data="page.content"></component>

</template>

<script>
import Vue from 'vue'

// auto register components
const requireComponent = require.context('@/components/page', true, /.*$/)
requireComponent.keys().forEach(fileName => {

  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')

  Vue.component(componentName, componentConfig.default || componentConfig)

})

export default {

  data() {
    return {
      page: this.$store.state.currentPage,
    }
  },

  head() {
    return {
      title: this.$store.state.currentPage.title,
      meta: [{
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
