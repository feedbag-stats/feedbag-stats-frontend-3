<template>
  <div>
    <h1 class="page-title">Testing</h1>
    <no-ssr>
      <div v-if="mapLoaded" class="map">
        <div class="map-row days">
          <div v-for="dayName in dayNames" class="map-cell text"><span>{{dayName}}</span></div>
        </div>
        <div v-for="rowIndex in Array(numberOfWeeks).keys()" class="map-row">
          <div v-for="cellIndex in Array(daysPerWeek).keys()" class="map-cell"
               :set="cell = map[rowIndex * 7 + cellIndex]">
            <div v-b-tooltip.html :title="'<strong>'+cell.count+'</strong> TDD Cycles on '+cell.date"
                 :class="'background intensity-'+cell.intensity"></div>
          </div>
          <div class="map-cell text">#{{ weekNumberStart+rowIndex }}</div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>

  import moment from 'moment';

  export default {
    data() {
      return {
        dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        numberOfWeeks: 24,
        daysPerWeek: 7,
        aggregated: [],
        dateRange: { // used for v-model prop
          startDate: this.getStartDate(),
          endDate: this.getEndDate()
        },
        weekNumberStart: this.getWeekNumber(this.getStartDate()),
        map: [],
        mapLoaded: false
      }
    },
    methods: {
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
      getEndDate() {
        return this.nextDate(0);
      },
      getStartDate() {
        let daysToMove = -7 * 24
        let monday = this.nextDate(1);
        monday.setDate(monday.getDate() + daysToMove);
        return monday;
      },
      formatDate(date) {
        return date.getFullYear() + '-' + (date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
      },
      async loadMap() {
        // there should be at max 7 * 12 response objects in the tddCycles array

        let tddCycles = await
          this.$axios.$get('/tdd_cycles', {
            params: {
              start: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
              end: moment(this.dateRange.endDate).format('YYYY-MM-DD'),
            },
            headers: {
              Authorization: this.$store.state.user.token
            }
          });

        let intensities = [];
        let nextDay = this.dateRange.startDate;
        for (let i = 0; i < 24; i++) {
          for (let j = 0; j < 7; j++) {
            let dateFormat = this.formatDate(nextDay);
            intensities[dateFormat] = {
              date: dateFormat,
              count: 0,
              intensity: 0,
            };
            nextDay.setDate(nextDay.getDate() + 1);
          }
        }

        const biggestValue = Math.max.apply(Math, tddCycles.map(function (o) {
          return o.cycleCount;
        }));

        tddCycles.forEach(function (element) {
          intensities[element.date] = {
            date: element.date,
            count: element.cycleCount,
            intensity: (Math.round(element.cycleCount / biggestValue * 10) / 10) * 10,
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
    async created() {
      // this is hacky, but we need to wait until local storage is loaded for the token
      if (process.browser) {
        window.onNuxtReady(async () => {
          this.loadMap();
        });
      }
    },
    async mounted() {
      this.loadMap();
    }
  }
</script>

<style scoped lang="scss">
  $base-color: blue;

  .map {
    display: flex;
    .map-row {
      &.days {
        margin-right: 10px;
      }
      .map-cell {
        &.text {
          font-size: 14px;
          text-align: center;
          line-height: 36px;
        }
        position: relative;
        padding: 2px;
        width: 36px;
        height: 36px;
        .background {
          width: 100%;
          height: 100%;
          background-color: #f4f4f4;
          cursor: pointer;
        }
        @for $i from 1 through 10 {
          .#{intensity}-#{$i} {
            background: rgba($base-color, $i*0.1)
          }
        }
      }
    }
  }
</style>
