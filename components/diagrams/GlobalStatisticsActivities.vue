<template>
  <div>
    <h1 class="page-title">Global Events grouped by Feedbag Version</h1>
    <div class="time-picker mb-4">
      <date-range-picker
        v-model="dateRange"
        @update="updateData"
        :locale-data="locale"
        :opens="opens"
        :single-date-picker="true"
        :ranges="false"
      >
        <!--Optional scope for the input displaying the dates -->
        <div slot="input" slot-scope="picker">
          <font-awesome-icon :icon="['fal', 'calendar']"/>&nbsp;{{ dateRange.startDate.toLocaleDateString() }}
        </div>
      </date-range-picker>
    </div>
    <highcharts
      :updateArgs="updateArgs"
      :options="optionsChart"
      ref="chart"></highcharts>
  </div>
</template>

<script>

  import moment from 'moment';

  export default {
    name: 'GlobalStatistics',
    data() {
      return {
        statistics: {},
        statsLoaded: false,
        dateRange: { // used for v-model prop
          startDate: new Date(),
          endDate: new Date(),
        },
        opens: "right",//which way the picker opens, default "center", can be "left"/"right",
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
        updateArgs: [true, true, true],
        optionsChart: {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Activities'
          },

          xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
              enabled: false
            },
          },
          yAxis: {
            title: {
              text: 'Activities'
            },
            labels: {
              formatter: function () {
                return this.value;
              }
            },
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          },

          series: [],
        }
      }
    },
    methods: {
      async loadData() {
        this.statistics = await
          this.$axios.$get('/statistics/activities', {
            params: {
              date: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
            },
            headers: {
              Authorization: this.$store.state.user.token
            }
          });
        this.statsLoaded = true;

        this.updateSeries();
      },
      async updateData() {
        this.loadData();
      },
      updateSeries() {
        let chart = this.$refs.chart;

        for (let index in chart.chart.series) {
          chart.chart.series[0].remove();
        }

        Object.entries(this.statistics.activities).forEach(version => {
          chart.chart.addSeries({
            name: version[0],
            data: version[1]
          });
        });

        let days = this.statistics.days.map(function(element) {
          return moment(element).format('DD.MM.YYYY');
        });
        console.log(days);

        chart.chart.xAxis[0].setCategories(days);
        chart.chart.redraw();
      },
    },
    async mounted() {
      if (this.$store.state.vuexLoaded) {
        this.dateRange.startDate = new Date(this.$store.state.user.lastUpload);
        this.dateRange.endDate = new Date(this.$store.state.user.lastUpload);
        this.loadData();
      } else {
        window.onNuxtReady(async () => {
          this.dateRange.startDate = new Date(this.$store.state.user.lastUpload);
          this.dateRange.endDate = new Date(this.$store.state.user.lastUpload);
          this.loadData();
        });
      }
    }
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
