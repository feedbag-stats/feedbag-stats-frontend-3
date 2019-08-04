<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="time-picker mb-4">
          <date-range-picker
            v-model="dateRange"
            @update="updateData"
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
      </div>
      <div class="col-md-6">
        <div class="float-right">
          <div style="text-align: right">
            <font-awesome-icon :icon="['fal', 'user']"/> = Me<br>
            <font-awesome-icon :icon="['fal', 'globe']"/> = Global
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.statsLoaded">
      <table class="table table-hover">
        <tbody>
        <tr class="table-secondary">
          <th></th>
          <th colspan="2" class="data-cell" v-for="interval in intervals">
            Last {{ interval }} Days
          </th>
        </tr>
        <tr>
          <td></td>
          <template v-for="interval in intervals">
            <td class="data-cell left" style="width: 50px;">
              <font-awesome-icon :icon="['fal', 'user']"/>
            </td>
            <td class="data-cell right" style="width: 50px;">
              <font-awesome-icon :icon="['fal', 'globe']"/>
            </td>
          </template>
        </tr>
        <tr class="table-secondary">
          <th style="width: 400px">Activity Statistics</th>
          <template v-for="interval in intervals">
            <td></td>
            <td></td>
          </template>
        </tr>
        <tr>
          <td>Average daily sessions</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.numSessions,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.numSessions,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average daily work duration</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint((statistics[interval].user.totalSessionDurationMillis/1000/60/60),2,'h') }}
            </td>
            <td class="data-cell right">{{
              prettyPrint((statistics[interval].global.totalSessionDurationMillis/1000/60/60),2,'h') }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average session duration</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint((statistics[interval].user.sessionDuration/1000/60),2, 'min') }}
            </td>
            <td class="data-cell right">{{
              prettyPrint((statistics[interval].global.sessionDuration/1000/60),2, 'min') }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average daily sessions longer than 10 minutes</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.numSessionsLongerThanTenMin,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.numSessionsLongerThanTenMin,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average daily breaks</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.breaks,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.breaks,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average daily package switches</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.packageSwitches,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.packageSwitches,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average daily solution switches</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.solutionSwitches,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.solutionSwitches,2) }}
            </td>
          </template>
        </tr>
        <tr class="table-secondary">
          <th style="width: 300px">Testing Statistics</th>
          <template v-for="interval in intervals">
            <td></td>
            <td></td>
          </template>
        </tr>
        <tr>
          <td>Average daily tests runs</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">{{ prettyPrint(statistics[interval].user.testsRun,2) }}</td>
            <td class="data-cell right">{{ prettyPrint(statistics[interval].global.testsRun,2) }}</td>
          </template>
        </tr>
        <tr>
          <td>Average daily sucessful test runs</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">{{ prettyPrint(statistics[interval].user.successfulTests,2) }}</td>
            <td class="data-cell right">{{ prettyPrint(statistics[interval].global.successfulTests,2) }}</td>
          </template>
        </tr>
        <tr>
          <td>Average daily fixed tests</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">{{ prettyPrint(statistics[interval].user.testsFixed,2) }}</td>
            <td class="data-cell right">{{ prettyPrint(statistics[interval].global.testsFixed,2) }}</td>
          </template>
        </tr>
        <tr class="table-secondary">
          <th style="width: 300px">Code Statistics</th>
          <template v-for="interval in intervals">
            <td></td>
            <td></td>
          </template>
        </tr>
        <tr>
          <td>Average daily commits</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.commits,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.commits,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average daily builds</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.buildCount,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.buildCount,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average daily files edited</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.filesEdited,2) }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.filesEdited,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Average build duration</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ prettyPrint(statistics[interval].user.buildDuration/1000,2,'s') }}
            </td>
            <td class="data-cell right">{{
              prettyPrint(statistics[interval].global.buildDuration/1000,2,'s') }}
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  import moment from 'moment';

  export default {
    name: 'GlobalStatistics',
    data() {
      return {
        intervals: [7, 30, 90, 360],
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
      }
    },
    methods: {
      prettyPrint(num, scale, unit = '') {
        if (num === 0) {
          return '-';
        }
        let value = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
        return value + ' ' + unit;
      },
      async loadData() {
        this.statistics = await
          this.$axios.$get('/statistics/table', {
            params: {
              date: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
            },
            headers: {
              Authorization: this.$store.state.user.token
            }
          });
        this.statsLoaded = true;
      }
      ,
      async updateData() {
        this.loadData();
      }
      ,
    },
    async mounted() {
      if (this.$store.state.vuexLoaded) {
        let date = new Date(this.$store.state.user.lastUpload);
        this.dateRange.endDate = date;
        this.dateRange.startDate = date;
        this.$refs.picker.monthDate = date;
        this.loadData();
      } else {
        window.onNuxtReady(async () => {
          let date = new Date(this.$store.state.user.lastUpload);
          this.dateRange.endDate = date;
          this.dateRange.startDate = date;
          this.$refs.picker.monthDate = date;
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
