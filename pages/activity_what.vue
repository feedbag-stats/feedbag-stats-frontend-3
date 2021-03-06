<template>
  <div>
    <ActivityWhatDiagram/>
    <hr class="mb-5 mt-5">
    <ActivityHeatmap/>
  </div>
</template>

<script>

  import moment from 'moment';
  import ActivityWhatDiagram from '~/components/diagrams/ActivityWhatDiagram.vue';
  import ActivityHeatmap from '~/components/diagrams/ActivityHeatmap.vue';

  export default {
    middleware: 'auth',
    components: {
      ActivityWhatDiagram,
      ActivityHeatmap
    },
    data() {
      return {
        dateRange: { // used for v-model prop
          startDate: new Date(),
          endDate: new Date(),
        },
        opens: "right",//which way the picker opens, default "center", can be "left"/"right"
        locale: {
          direction: 'ltr', //direction of text
          format: 'DD-MM-YYYY', //fomart of the dates displayed
          separator: ' - ', //separator between the two ranges
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
          monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
          firstDay: 1, //ISO first day of week - see moment documenations for details
          showWeekNumbers: true //show week numbers on each row of the calendar
        },
        ranges: { //default value for ranges object (if you set this to false ranges will no be rendered)
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'This month': [moment().startOf('month'), moment().endOf('month')],
          'This year': [moment().startOf('year'), moment().endOf('year')],
          'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
          'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        },
        shortcuts: [
          {
            text: 'Today',
            onClick: () => {
              this.time1 = [new Date(), new Date()]
            }
          }
        ],
        time1: '',
        updateArgs: [true, true, true],
        aggregated: [],
        days: [],
        total: 0,
        optionsAreaChart: {
          chart: {
            type: 'area'
          },
          title: {
            text: 'Activities'
          },
          xAxis: {
            tickmarkPlacement: 'on',
            title: {
              enabled: false
            },
          },
          yAxis: {
            title: {
              text: 'Hours'
            },
            labels: {
              formatter: function () {
                return this.value;
              }
            },
            max: 10,
          },
          tooltip: {
            split: true,
            valueSuffix: ' hours '
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: '#666666'
              }
            }
          },
          series: [{}, {}, {}, {}, {}]
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
          series: [{
            name: 'Activities',
            colorByPoint: true,
            data: [],
          }]
        }
      }
    },
    methods: {
      async updateData() {

        let result = await
          this.$axios.$get('/activity/aggregated', {
            params: {
              start: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
              end: moment(this.dateRange.endDate).format('YYYY-MM-DD'),
            },
            headers: {
              Authorization: this.$store.state.user.token
            }
          });


        if (result.total && result.total > 0) {
          this.aggregated = result.aggregated;
          this.days = result.days;
          this.total = result.total;

          this.updateSeries();
        } else {
          this.aggregated = [];
          this.days = [];
        }
      },
      updateSeries() {

        // pie Chart

        let pieChart = this.$refs.pieChart;
        let sum = this.total;
        let data = [];
        Object.entries(this.aggregated).forEach(element => {
          data.push({
            name: element[0],
            y: (element[1] / sum) * 100,
          });
        });


        if (pieChart.chart.series.length > 0) {
          pieChart.chart.series[0].update({
            data: data
          });
        } else {
          pieChart.chart.series[0] = {
            name: 'Activities',
            colorByPoint: true,
            data: data,
          };
        }

        pieChart.chart.redraw();

        // Area Chart

        let areaChart = this.$refs.areaChart;

        let series = [];
        Object.entries(this.aggregated).forEach(element => {
          series[element[0]] = {
            name: element[0],
            data: []
          };
        });

        console.log(series);

        Object.entries(this.days).forEach(day => {
          Object.entries(day[1]).forEach(type => {
            series[type[0]].data.push(type[1] / (60 * 60));
          });
        });

        data = [];
        let i = 0;
        for (let index in series) {
          areaChart.chart.series[0].remove();
        }
        for (let index in series) {
          areaChart.chart.addSeries(series[index]);
        }
        areaChart.chart.xAxis[0].setCategories(Object.keys(this.days));
        areaChart.chart.redraw();

        /*this.timeline.forEach(element => {
          data.push({
            x: Date.parse(element.begin),
            x2: Date.parse(element.end),
            y: categories.indexOf(element.type)
          });
        });

        timelineChart.chart.addSeries({
          name: 'Activities',
          // pointPadding: 0,
          // groupPadding: 0,
          borderColor: 'gray',
          pointWidth: 20,
          turboThreshold: 10000,
          data: data,
          dataLabels: {
            enabled: false
          }
        });*/
      }
    },
    async mounted() {
      if (this.$store.state.vuexLoaded) {
        this.dateRange.startDate = new Date(this.$store.state.user.lastUpload);
        this.dateRange.endDate = new Date(this.$store.state.user.lastUpload);
        this.updateData();
      } else {
        window.onNuxtReady(async () => {
          let oneWeekAgo = new Date(this.$store.state.user.lastUpload);
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          this.dateRange.endDate = new Date(this.$store.state.user.lastUpload);
          this.dateRange.startDate = oneWeekAgo;
          this.updateData();
        });
      }
    },
  }
</script>

<style>

</style>
