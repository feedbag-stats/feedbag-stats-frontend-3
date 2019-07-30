<template>
  <div>
    <h1 class="page-title">Activity Location</h1>
    <div class="flex-input">
      <div class="time-picker mb-4 mr-4">
        <date-range-picker
          v-model="dateRange"
          @update="loadData"
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
      <div class="location-picker">
        <div>
          <b-form-group>
            <b-form-select v-model="location" :options="locationOptions" size="md" @change="loadData"></b-form-select>
          </b-form-group>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <highcharts
          :updateArgs="updateArgs"
          :options="chartOptions"
          ref="chart">
        </highcharts>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    components: {},
    data() {
      return {
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
        locationOptions: [
          {value: 'SOLUTION', text: 'Solution'},
          {value: 'PROJECT', text: 'Project'},
          {value: 'PACKAGE', text: 'Package'},
          {value: 'FILE', text: 'File'},
        ],
        location: 'SOLUTION',
        updateArgs: [true, true, true],
        statistics: [],
        chartOptions: {
          chart: {
            type: 'xrange'
          },
          title: {
            text: 'Activities'
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: ''
            },
            categories: [],
            reversed: true
          },
          series: []
        },
      }
    },
    methods: {
      async loadData() {
        this.dateRange.startDate = new Date('2016-05-16');
        this.statistics = await
          this.$axios.$get('/location', {
            params: {
              date: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
              location: this.location,
            },
            headers: {
              Authorization: this.$store.state.user.token
            }
          });
        console.log(this.statistics);
        this.updateChart();
      },
      updateChart() {

        let chart = this.$refs.chart;
        let categories = Object.keys(this.statistics);

        let data = [];
        Object.entries(this.statistics).forEach(location => {
          location[1].forEach(interval => {
            data.push({
              x: new Date(interval.begin).getTime(),
              x2: new Date(interval.end).getTime(),
              y: categories.indexOf(location[0]),
            });
          });
        });

        if (chart.chart.series[0]) {
          chart.chart.series[0].remove();
        }

        let minDate = this.dateRange.startDate;
        minDate = minDate.setHours(0, 0, 0, 0);

        let maxDate = this.dateRange.startDate;
        maxDate = maxDate.setHours(23, 59, 59, 999);

        chart.chart.addSeries({
          name: 'Activities',
          borderColor: 'gray',
          pointWidth: 20,
          data: data,
          dataLabels: {
            enabled: true
          },
          pointRange: 1,
        });

        chart.chart.yAxis[0].setCategories(categories);
        chart.chart.xAxis[0].setExtremes(minDate, maxDate);
        chart.chart.redraw();
      }
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
    },
  }
</script>

<style lang="scss">
  .flex-input {
    display: flex;
  }
  .location-picker {
    width: 25%;
    min-width: 200px;
  }

</style>
