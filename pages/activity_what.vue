<template>
  <div>
    <h1>Activity What Page</h1>
    <div class="row">
      <div class="col-md-8">
        <no-ssr>
          <highcharts
            :updateArgs="updateArgs"
            :options="timelineOptions"
            ref="timelineChart"/>
        </no-ssr>
      </div>
      <div class="col-md-4">
        <no-ssr>
          <highcharts
            :updateArgs="updateArgs"
            :options="optionsPieChart"
            ref="pieChart"/>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        updateArgs: [true, true, true],
        aggregated: [],
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
        optionsPieChart: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Activities'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: []
        }
      }
    },
    async asyncData({store}) {
    },
    methods: {
      updateSeries() {

        // pie Chart

        let pieChart = this.$refs.pieChart;
        let sum = this.aggregated.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.duration;
        }, 0);
        let data = [];
        this.aggregated.forEach(element => {
          data.push({
            name: element.type,
            y: (element.duration / sum) * 100,
          });
        });
        /*this.optionsPieChart.series[0] = {
          name: 'Activities',
          colorByPoint: true,
          data: data,
        };*/
        pieChart.chart.addSeries({
          name: 'Activities',
          colorByPoint: true,
          data: data
        });

        // timeline Chart

        let timelineChart = this.$refs.timelineChart;
        let categories = ['Reading', 'Writing', 'Testing', 'Debugging'];

        data = [];
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
      let aggregated = await this.$axios.$get('/activity/aggregated', {
        headers: {
          Authorization: this.$store.state.user.token
        }
      });
      this.aggregated = aggregated;

      let timeline = await this.$axios.$get('/activity/all', {
        headers: {
          Authorization: this.$store.state.user.token
        }
      });
      this.timeline = timeline;
      this.updateSeries();
    }
  }
</script>

<style>

</style>
