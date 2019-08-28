<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <h1 class="page-title">Global Statistics</h1>
      </div>
      <div class="float-right">
        <a href="#" v-b-modal.modal-1>
          <font-awesome-icon class="fa-2x help-icon" :icon="['fal', 'question-circle']"/>
        </a>
      </div>
    </div>
    <GlobalStatisticsTable/>
    <b-modal size="lg" id="modal-1" title="Help">
      <p>This section shows comparative statistics towards other users of FeedBag for different subjects: Activity
        Statistics, Testing Statistics and Code Statistics.</p>
      <p>With the datepicker, you can choose a certain cutoff date (end date)</p>
      <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
        <b-button size="md" variant="primary" @click="ok()">
          Close
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

  import moment from 'moment';
  import GlobalStatisticsTable from '~/components/diagrams/GlobalStatisticsTable.vue';

  export default {
    middleware: 'auth',
    components: {
      GlobalStatisticsTable,
    },
  }
</script>

<style lang="scss">
  .data-cell {
    text-align: center;
    &.left {
      border-left: 1px solid black;
    }
    &.right {
      border-right: 1px solid black;
    }
  }

  .table-secondary {
    td, th {
      border-top: 3px solid black;
    }
  }
</style>
