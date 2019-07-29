<template>
  <div>
    <h1 class="page-title">My Uploads</h1>
    <div v-if="zips.length > 0">
      <div class="row">
        <div class="col-md-9 col-lg-9 col-xl-6">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Date</th>
              <th class="text-center"># Uploads</th>
              <th>&nbsp;</th>
              <th class="data-cell">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="zip in zips">
              <td>{{zip.day}}</td>
              <td class="text-center">{{zip.count}}</td>
              <td>
                <span class="marked-for-deletion" v-if="zip.markedForDelete">
                 marked for deletion
                </span>
              </td>
              <td class="data-cell">
                <a href="#" v-on:click="toggleZipStatus(zip.day, zip.markedForDelete ? 'restore' : 'delete')">
                  <font-awesome-icon v-if="zip.markedForDelete" class="fa-fw" :icon="['fal', 'recycle']"/>
                  <font-awesome-icon v-if="!zip.markedForDelete" class="fa-fw" :icon="['fal', 'trash']"/>
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
      toggleZipStatus(day, state = 'delete') {
        let confirmed = true;
        if (state === 'delete') {
          confirmed = confirm('Do you really want to delete this zip?');
        }
        if (confirmed) {
          this.$axios.$post('/zips/toggle_status', {},
            {
              params: {
                date: day,
              },
              headers: {
                Authorization: this.$store.state.user.token
              }
            }
          ).then(() => {
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
  .marked-for-deletion {
    color: red;
  }
</style>
