<template>
  <div>
    <h1 class="page-title">Global Statistics</h1>
    <GlobalStatisticsTable/>
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
