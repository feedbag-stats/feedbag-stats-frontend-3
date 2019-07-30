<template>
  <div>
    <TDDCyclesHeatmap/>
    <hr class="mb-5 mt-5">
    <TestRunsHeatmap/>
  </div>
</template>

<script>
  import TDDCyclesHeatmap from '~/components/diagrams/TDDCyclesHeatmap.vue';
  import TestRunsHeatmap from '~/components/diagrams/TestRunsHeatmap.vue';

  export default {
    middleware: 'auth',
    components: {
      TDDCyclesHeatmap,
      TestRunsHeatmap
    },
  }
</script>
