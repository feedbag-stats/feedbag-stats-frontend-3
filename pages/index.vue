<template>
  <div class="">
    <div class="row mb-5">
      <div class="col-md-8">
        <h2 class="mb-4">Welcome to the FeedBag Dashboard</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          c</p>

      </div>
    </div>
    <div class="">
      <h3>Start exploring!</h3>
      <div>
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
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    data() {
      return {name: 'feedbag frontend'}
    }
  }
</script>

<style lang="scss" scoped>

  @import "~~/assets/scss/_vars.scss";

  .flex-row {
    display: flex;
  }

  ul {
    margin: 0;
    padding: 0;
    margin-left: -1rem;
    margin-right: -1rem;
    li {
      float: left;
      width: 20%;
      list-style: none;
      padding: 1rem;
      a {
        border: 1px solid black;
        width: 100%;
        display: block;
        padding: 2rem;
        color: white;
        background: $brand-primary;
        font-size: 1.5rem;
        border: 2px solid $brand-primary;
        transition: 300ms all ease;
        &:hover {
          text-decoration: none;
          background: white;
          color: $brand-primary;
        }
      }
    }
  }
</style>
