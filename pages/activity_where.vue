<template>
  <div>
    <div class="clearfix">
      <div class="float-left">
        <h1 class="page-title">Activity Location</h1>
      </div>
      <div class="float-right">
        <a href="#" v-b-modal.modal-1>
          <font-awesome-icon class="fa-2x help-icon" :icon="['fal', 'question-circle']"/>
        </a>
      </div>
    </div>
    <div class="flex-input">
      <div class="prev-day day-mover">
        <a href="#" v-on:click="previousDay">
          <font-awesome-icon :icon="['fal', 'angle-left']"/>
        </a>
      </div>
      <div class="time-picker mb-4">
        <date-range-picker
          v-model="dateRange"
          @update="loadData"
          :locale-data="locale"
          :opens="opens"
          :single-date-picker="true"
          :ranges="false"
          ref="picker"
        >
          <!--Optional scope for the input displaying the dates -->
          <div slot="input" slot-scope="picker">
            <font-awesome-icon :icon="['fal', 'calendar']"/>&nbsp;{{ dateRange.startDate.toLocaleDateString() }}
          </div>
        </date-range-picker>
      </div>
      <div class="next-day day-mover">
        <a href="#" v-on:click="nextDay">
          <font-awesome-icon :icon="['fal', 'angle-right']"/>
        </a>
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
    <b-modal size="lg" id="modal-1" title="Help">
      <p>This section shows where you have performed activites. You can choose a given day as well as the level of depth (Solution, Project, Package, File).</p>
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
            zoomType: 'x',
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
        minDate = minDate.setUTCHours(0, 0, 0, 0);

        let maxDate = this.dateRange.startDate;
        maxDate = maxDate.setUTCHours(23, 59, 59, 999);

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
        //chart.chart.xAxis[0].setExtremes(minDate, maxDate);
        chart.chart.redraw();
        //chart.chart.redraw();
      },
      nextDay(e) {
        e.preventDefault();
        let today = new Date(this.dateRange.startDate);
        today.setDate(today.getDate() + 1);

        this.dateRange.startDate = today;
        this.dateRange.endDate = today;

        this.loadData();
      },
      previousDay(e) {
        e.preventDefault();
        let today = new Date(this.dateRange.startDate);
        today.setDate(today.getDate() - 1);

        this.dateRange.startDate = today;
        this.dateRange.endDate = today;

        this.loadData();
      },
    },
    async mounted() {
      if (this.$store.state.vuexLoaded) {
        let date = new Date(this.$store.state.user.lastUpload);
        this.dateRange.startDate = date;
        this.dateRange.endDate = date;
        this.$refs.picker.monthDate = date;
        this.loadData();
      } else {
        window.onNuxtReady(async () => {
          let date = new Date(this.$store.state.user.lastUpload);
          this.dateRange.startDate = date;
          this.dateRange.endDate = date;
          this.$refs.picker.monthDate = date;
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

  .day-mover {
    padding: 0.5rem;
    cursor: pointer;
    i, svg {
      font-size: 1.75rem;
    }
    &.next-day {
      padding-left: 1rem;
      margin-right: 1rem;
    }
    &.prev-day {
      padding-right: 1rem;
    }
  }

</style>
