<template>
  <aside class="side-navigation">
    <no-ssr>
      <div class="inner">
        <div class="brand">
          <h1>Feedbag<br>
            <font-awesome-icon class="fa-fw" :icon="['fal', 'chart-bar']"/>
            Stats
          </h1>
        </div>
        <div v-if="this.isLoggedIn" class="loggedInMenu">
          <div class="menu">
            <ul>
              <li>
                <nuxt-link to="activity_what">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'tasks']"/>
                  Activities
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="activity_where">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'location']"/>
                  Locations
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="testing">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'check']"/>
                  Testing
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="global_statistics">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'globe']"/>
                  Global Statistics
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="data_exploration">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'database']"/>
                  Data Exploration
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="menu">
            <ul>
              <li>
                <nuxt-link to="uploads">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'file-upload']"/>
                  My Uploads
                </nuxt-link>
              </li>
              <li>
                <a href="#" v-on:click="logout()">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'lock']"/>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div class="menu">
            <ul>
              <li>
                <nuxt-link to="login">
                  <font-awesome-icon :icon="['fal', 'lock']"/>
                  Login
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </no-ssr>
  </aside>
</template>

<style scoped lang="scss">
  @import "~~/assets/scss/_vars.scss";

  .brand {
    padding: 1.5rem;
    h1 {
      font-size: 2.75rem;
      line-height: 1;
      font-weight: 300;
      color: white;
      svg {
        font-size: 2.25rem;
        margin-right: 0.5rem;
        margin-left: 0.25rem;
      }
    }
    margin: 1rem 0;
    margin-bottom: 5rem;
  }

  .menu {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      li {
        padding-left: 1.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-weight: 300;
        a {
          color: white;
          text-decoration: none;
          display: block;
        }
        svg {
          margin-right: 0.5rem;
        }
        &:hover, .active {
          background-color: white;
          a {
            color: $brand-primary;
          }
        }
      }
    }
    + .menu {
      margin-top: 3rem;
    }
  }
</style>
<script>

  export default {
    name: "Navigation",
    components: {},
    computed: {
      isLoggedIn() {
        return null !== this.$store.state.user && "" !== this.$store.state.user;
      },
    },
    methods: {
      logout() {
        this.$store.commit("logout");
        this.$router.push('login');
      }
    }
  }
</script>
