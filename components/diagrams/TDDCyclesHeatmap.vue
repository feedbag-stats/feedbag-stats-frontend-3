<template>
  <div>
    <h1 class="page-title">TDD Cycles</h1>
    <div class="time-picker mb-4">
      <date-range-picker
        v-model="datePickerRange"
        @update="updateData"
        :locale-data="locale"
        :opens="opens"
        :single-date-picker="true"
        :ranges="false"
        ref="picker"
      >
        <!--Optional scope for the input displaying the dates -->
        <div slot="input" slot-scope="picker">
          <font-awesome-icon :icon="['fal', 'calendar']"/>&nbsp;{{ datePickerRange.endDate.toLocaleDateString() }}
        </div>
      </date-range-picker>
    </div>
    <div v-if="mapLoaded" class="map">
      <div class="map-row">
        <div class="map-control left">
          <a href="#" v-on:click="previousWeek">
            <font-awesome-icon :icon="['fal', 'angle-left']"/>
          </a>
        </div>
      </div>
      <div class="map-row days">
        <div v-for="dayName in dayNames" class="map-cell text"><span>{{dayName}}</span></div>
      </div>
      <div v-for="rowIndex in Array(numberOfWeeks).keys()" class="map-row">
        <div v-for="cellIndex in Array(daysPerWeek).keys()" class="map-cell"
             :set="cell = map[rowIndex * 7 + cellIndex]">
          <div v-b-tooltip.html :title="'<strong>'+cell.count+'</strong> TDD Cycles on '+cell.date"
               :class="'background intensity-'+cell.intensity"></div>
        </div>
        <div class="map-cell text">#{{ (weekNumberStart+rowIndex-1)%52+1 }}</div>
      </div>
      <div class="map-row">
        <div class="map-control right">
          <a href="#" v-on:click="nextWeek">
            <font-awesome-icon :icon="['fal', 'angle-right']"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import moment from 'moment';

  export default {
    data() {
      return {
        dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        numberOfWeeks: 18,
        daysPerWeek: 7,
        aggregated: [],
        datePickerRange: { // used for v-model prop
          startDate: new Date(),
          endDate: new Date(),
        },
        instant: new Date(),
        weekNumberStart: 0,
        map: [],
        mapLoaded: false,
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
      }
    },
    methods: {
      updateData() {
        let today = new Date(this.datePickerRange.startDate);
        today.setDate(today.getDate() + (0 - 1 - today.getDay() + 7) % 7 + 1);

        this.datePickerRange.startDate = today;
        this.datePickerRange.endDate = today;
        this.instant = today;

        this.loadMap();
      },
      //takes dayIndex from sunday(0) to saturday(6)
      getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return weekNo;
      },
      nextDate(dayIndex) {
        var today = new Date();
        today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
        return today;
      },
      getEndDate(date) {
        let today = new Date(date);
        today.setDate(today.getDate() + (0 - 1 - today.getDay() + 7) % 7 + 1);
        return today;
      },
      getStartDate(endDate) {
        let daysToMove = -this.daysPerWeek * this.numberOfWeeks;
        let monday = new Date(endDate);
        monday.setDate(monday.getDate() + (1 - 1 - monday.getDay() + 7) % 7 + 1);
        monday.setDate(monday.getDate() + daysToMove);
        return monday;
      },
      formatDate(date) {
        return date.getFullYear() + '-' + (date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
      },
      nextWeek(e) {
        e.preventDefault();
        let today = new Date(this.instant);
        today.setDate(today.getDate() + 7);

        this.datePickerRange.startDate = today;
        this.datePickerRange.endDate = today;
        this.instant = today;

        this.loadMap();
      },
      previousWeek(e) {
        e.preventDefault();
        let today = new Date(this.instant);
        today.setDate(today.getDate() - 7);

        this.datePickerRange.startDate = today;
        this.datePickerRange.endDate = today;
        this.instant = today;

        this.loadMap();
      },
      async loadMap() {
        // there should be at max 7 * 12 response objects in the tddCycles array

        let data = await
          this.$axios.$get('/testing/tdd_cycles', {
            params: {
              date: moment(this.instant).format('YYYY-MM-DD'),
            },
            headers: {
              Authorization: this.$store.state.user.token
            }
          });

        let tddCycles = data.stats;
        let intensities = [];
        let startDay = this.getStartDate(this.instant);
        this.weekNumberStart = this.getWeekNumber(startDay);

        let nextDay = startDay;
        for (let i = 0; i < this.numberOfWeeks; i++) {
          for (let j = 0; j < this.daysPerWeek; j++) {
            let dateFormat = this.formatDate(nextDay);
            intensities[dateFormat] = {
              date: dateFormat,
              count: 0,
              intensity: 0,
            };
            nextDay.setDate(nextDay.getDate() + 1);
          }
        }

        const biggestValue = data.max;

        tddCycles.forEach(function (element) {
          let intensity = Math.min((Math.round(element.cycleCount / biggestValue * 10) / 10) * 10, 10);
          if (element.count > 1 && intensity === 0) {
            intensity = "min";
          }
          intensities[element.date] = {
            date: element.date,
            count: element.cycleCount,
            intensity: intensity,
          };
        });

        let map = [];
        let i = 0;
        for (let date in intensities) {
          map[i] = intensities[date];
          i++;
        }

        this.map = map;
        this.mapLoaded = true;
      }
    },
    async mounted() {
      if (this.$store.state.vuexLoaded) {
        let endDate = this.getEndDate(this.$store.state.user.lastUpload);
        this.instant = endDate;
        this.datePickerRange.endDate = endDate;
        this.datePickerRange.startDate = endDate;
        this.$refs.picker.monthDate = endDate;
        this.loadMap();
      } else {
        window.onNuxtReady(async () => {
          let endDate = this.getEndDate(this.$store.state.user.lastUpload);
          this.datePickerRange.endDate = endDate;
          this.datePickerRange.startDate = endDate;
          this.$refs.picker.monthDate = endDate;
          this.loadMap();
        });
      }
    }
  }
</script>
