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
        <div class="col-md-6 col-lg-6 col-xl-4">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Date</th>
              <td></td>
              <th class="data-cell">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="zip in zips">
              <td>{{zip.day}}</td>
              <td>
                <span class="marked-for-deletion" v-if="zip.markedForDelete">
                 marked for deletion
                </span>
              </td>
              <td class="data-cell">
                <a href="#" v-on:click="toggleZipStatus(zip.id, zip.markedForDelete ? 'restore' : 'delete')">
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
      toggleZipStatus(id, state = 'delete') {
        let confirmed = true;
        if (state === 'delete') {
          confirmed = confirm('Do you really want to delete this zip?');
        }
        if (confirmed) {
          this.$axios.$post('/zip/' + id, {}, {
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
  .marked-for-deletion {
    color: red;
  }
</style>
