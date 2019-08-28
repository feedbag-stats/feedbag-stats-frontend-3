<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <h1 class="page-title">Activities</h1>
      </div>
      <div class="float-right">
        <a href="#" v-b-modal.modal-1>
          <font-awesome-icon class="fa-2x help-icon" :icon="['fal', 'question-circle']"/>
        </a>
      </div>
    </div>
    <no-ssr>
      <date-range-picker
        v-model="dateRange"
        @update="updateData"
        :locale-data="locale"
        :opens="opens"
        :ranges="ranges"
        ref="picker"
      >
        <!--Optional scope for the input displaying the dates -->
        <div slot="input" slot-scope="picker">
          <font-awesome-icon :icon="['fal', 'calendar']"/>&nbsp;{{ dateRange.startDate.toLocaleDateString() }} - {{
          dateRange.endDate.toLocaleDateString() }}
        </div>
      </date-range-picker>
    </no-ssr>
    <div class="row">
      <div class="col-md-8">
        <div v-show="this.total > 0">
          <no-ssr>
            <highcharts
              :updateArgs="updateArgs"
              :options="optionsAreaChart"
              ref="areaChart"></highcharts>
          </no-ssr>
        </div>
        <div v-show="this.total === 0">
          <br>
          <p>There is no data in this timespan. Please choose another timespan.</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="distribution-cart">
          <div v-show="this.total > 0">
            <no-ssr>
              <highcharts
                :updateArgs="updateArgs"
                :options="optionsPieChart"
                ref="pieChart">
              </highcharts>
            </no-ssr>
          </div>
        </div>
      </div>
    </div>
    <b-modal size="lg" id="modal-1" title="Help">
      <p>This section shows various stats about the activities performed while FeedBag was running. The upper part shows how much time was spent in a given timespan as well as how the time was distributed with the different categories:</p>
      <ul>
        <li><strong>Testingstate</strong>: Time spent testing (running tests, adjust tests etc.)</li>
        <li><strong>Write</strong>: Time spent writing code (editing files etc.)</li>
        <li><strong>Debug</strong>: Time spent while the debugger is running (variable evaluation, setting breakpoints, jumping, etc.)</li>
        <li><strong>Active</strong>: Other time spent (opening files, switching solutions, settings, etc.)</li>
      </ul>
      <p>The lower part shows a GitHub-alike heatmap with the number of activites per day.</p>
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

  export default {
    name: "ActivityWhatDiagram",
    components: {},
    data() {
      return {
        colors: {
          Active: '#36A2FF',
          Write: '#24FF73',
          Testingstate: '#C426EB',
          Debug: '#FF7734'
        },
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
          'This week': [moment().startOf('week'), moment().endOf('week')],
          'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
          'This month': [moment().startOf('month'), moment().endOf('month')],
          'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
          'This year': [moment().startOf('year'), moment().endOf('year')],
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
          series: [{}, {}, {}, {}]
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
          this.typeDays = result.typeDays;

          this.updateSeries();
        } else {
          this.aggregated = [];
          this.days = [];
          this.typeDays = [];
        }
      },
      updateSeries() {

        // pie Chart

        let pieChart = this.$refs.pieChart;
        let sum = this.total;
        let data = [];
        Object.entries(this.aggregated).forEach(element => {
          let name = element[0].charAt(0).toUpperCase() + element[0].slice(1).toLowerCase();
          data.push({
            name: name,
            y: (element[1] / sum) * 100,
            color: this.colors[name],
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
          let name = element[0].charAt(0).toUpperCase() + element[0].slice(1).toLowerCase();
          series[element[0]] = {
            name: name,
            data: [],
            color: this.colors[name],
          };
        });

        this.typeDays.forEach(day => {
          Object.entries(day).forEach(type => {
            let hours = Math.round((type[1] / (60 * 60)) * 100) / 100;
            series[type[0]].data.push(hours);
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
        areaChart.chart.xAxis[0].setCategories(this.days);
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
        let oneWeekAgo = new Date(this.$store.state.user.lastUpload);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        this.dateRange.endDate = new Date(this.$store.state.user.lastUpload);
        this.dateRange.startDate = oneWeekAgo;
        this.updateData();
      } else {
        window.onNuxtReady(async () => {
          let oneWeekAgo = new Date(this.$store.state.user.lastUpload);
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          this.dateRange.endDate = new Date(this.$store.state.user.lastUpload);
          this.dateRange.startDate = oneWeekAgo;
          this.$refs.picker.monthDate = oneWeekAgo;
          this.updateData();

        });
      }
    },
  }
</script>

<style>

</style>
