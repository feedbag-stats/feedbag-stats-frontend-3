<template>
  <aside class="side-navigation">
    <no-ssr>
      <div class="inner">
        <div class="brand">
          <h1>Feedbag<br>
            <font-awesome-icon :icon="['fal', 'chart-bar']"/>
            Stats
          </h1>
        </div>
        <div class="menu">
          <ul>
            <li>
              <nuxt-link :to="localePath('activity_what')">
                <font-awesome-icon :icon="['fal', 'tasks']"/>
                Activity What
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('activity_where')">
                <font-awesome-icon :icon="['fal', 'tasks']"/>
                Activity Where
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('testing')">
                <font-awesome-icon :icon="['fal', 'tasks']"/>
                Testing
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('global_statistics')">
                <font-awesome-icon :icon="['fal', 'tasks']"/>
                Global Statistics
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('data_exploration')">
                <font-awesome-icon :icon="['fal', 'tasks']"/>
                Data Exploration
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="menu">
          <ul>
            <li>
              <nuxt-link :to="localePath('settings')">
                <font-awesome-icon :icon="['fal', 'cog']"/>
                Settings
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('users')">
                <font-awesome-icon :icon="['fal', 'users']"/>
                Users
              </nuxt-link>
            </li>
          </ul>
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
    components: {}
  }
</script>
