<template>
  <div>
    <h1 class="page-title">My Profile</h1>
    <p>... maybe some profile stuff?</p>
    <ul>
      <li>set password</li>
      <li>set visibilty?</li>
    </ul>
    <br><br>
    <h4 class="mb-4">My Uploads</h4>
    <div v-if="zips.length > 0">
      <div class="row">
        <div class="col-md-6 col-lg-4 col-xl-4">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Date</th>
              <th class="data-cell">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="zip in zips">
              <td>{{zip.day}}</td>
              <td class="data-cell">
                <a href="#" v-on:click="deleteZip(zip.id)">
                  <font-awesome-icon class="fa-fw" :icon="['fal', 'trash']"/>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>No uploads</div>
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
    methods: {
      async loadData() {
        this.zips = await
        this.$axios.$get('/zips', {
          headers: {
            Authorization: this.$store.state.user.token
          }
        });
      },
      deleteZip(id) {
        let confirmed = confirm('Do you really want to delete this zip?');
        if (confirmed) {
          this.$axios.$delete('/zip/'+id, {
            headers: {
              Authorization: this.$store.state.user.token
            }
          }).then(() => {
            this.loadData();
          });
        }
      }
    },
    async mounted() {
      if (this.$store.state.vuexLoaded) {
        this.loadData();
      } else {
        window.onNuxtReady(async () => {
          this.loadData();
        });
      }
    }
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
