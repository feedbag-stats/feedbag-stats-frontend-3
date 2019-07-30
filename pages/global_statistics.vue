<template>
  <div>
    <h1 class="page-title">Global Statistics</h1>
    <GlobalStatisticsTable/>
    <hr class="mb-5 mt-5">
    <GlobalStatisticsActivities/>
  </div>
</template>

<script>

  import moment from 'moment';
  import GlobalStatisticsTable from '~/components/diagrams/GlobalStatisticsTable.vue';
  import GlobalStatisticsActivities from '~/components/diagrams/GlobalStatisticsActivities.vue';

  export default {
    middleware: 'auth',
    components: {
      GlobalStatisticsTable,
      GlobalStatisticsActivities
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
