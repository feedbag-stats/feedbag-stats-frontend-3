<template>
  <div>
    <div class="text-center">
      <h1>Activity Where Page</h1>
    </div>
    <div class="row">
      <div class="col-md-12">
        <no-ssr>
          <highcharts
            :updateArgs="updateArgs"
            :options="timelineOptions"
            ref="timelineChart"></highcharts>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    components: {},
    data() {
      return {
        updateArgs: [true, true, true],
        timeline: [],
        timelineOptions: {
          chart: {
            type: 'xrange'
          },
          title: {
            text: 'Activities on Wednesday, 13. March 2019'
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: ''
            },
            categories: ['Reading', 'Writing', 'Testing', 'Debugging'],
            reversed: true
          },
          series: [{
            name: 'new series',
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            turboThreshold: 10000,
            data: [],
            dataLabels: {
              enabled: false
            }
          }]
        },
      }
    },
    async asyncData({store}) {
    },
    methods: {
      updateSeries() {

        // timeline Chart

        let timelineChart = this.$refs.timelineChart;
        let categories = ['Reading', 'Writing', 'Testing', 'Debugging'];

        let data = [];
        this.timeline.forEach(element => {
          data.push({
            x: element.begin * 1000,
            x2: element.end * 1000,
            y: categories.indexOf(element.type)
          });
        });

        timelineChart.chart.addSeries({
          name: 'new series',
          // pointPadding: 0,
          // groupPadding: 0,
          borderColor: 'gray',
          pointWidth: 20,
          turboThreshold: 10000,
          data: data,
          dataLabels: {
            enabled: false
          }
        });
      }
    },
    async created() {
      let timeline = await axios.get('/activity/all', {
        baseURL: this.$store.state.backendURL
      });
      this.timeline = timeline.data;
      this.updateSeries();
    }
  }
</script>

<style>

</style>
