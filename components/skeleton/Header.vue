<template>
<headroom :downTolerance="10" :disabled="navActive" style="position:fixed">
  <header class="full">
    <b-navbar v-click-outside="closeNav" class="navbar-light bg-light">

      <b-navbar-brand :to="localePath('index')">
        <img src="<REPLACE ME>" alt="<REPLACE ME>" class="h-100"/>
      </b-navbar-brand>

      <div class="flex-grow-1"></div>

      <div v-on:click="navActive = !navActive" v-bind:class="{ active: navActive }" class="d-flex align-items-center nav-trigger">
        <span class="l text-uppercase">Menü</span>
        <hamburger />
      </div>

      <nav id="nav_collapse" class="navbar-nav" v-bind:class="{ active: navActive }">

        <nuxt-link to="/" class="h2 nav-link" @click.native="closeNav">
          Home
        </nuxt-link>

      </nav>


    </b-navbar>
  </header>
</headroom>
</template>

<style lang="scss">
@import "~~/assets/scss/_vars.scss";
@import "~~/assets/scss/_mixins.scss";

</style>
<script>
import Hamburger from "~/components/skeleton/Hamburger"
import { headroom } from "vue-headroom"

export default {
  name: "Header",
  components: {
    Hamburger,
    headroom
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }
          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  },
  data() {
    return {
      navActive: false
    }
  },
  methods: {

    closeNav: function(event) {
      this.navActive = false
    },

  },

  computed: {
    brands() {
      return this.$store.state.navigation;
    }
  },

}
</script>
