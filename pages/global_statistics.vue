<template>
  <div>
    <h1 class="page-title">Global Statistics</h1>
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
    <div v-if="this.statsLoaded">

      <table class="table">
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
          <td>Number of sessions</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.numSessions,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.numSessions,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Number of sessions longer than 10 minutes</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.numSessionsLongerThanTenMin,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.numSessionsLongerThanTenMin,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Session duration</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber((statistics[interval].user.totalSessionDurationMillis/1000/60/60),2) }} h
            </td>
            <td class="data-cell right">{{
              roundNumber((statistics[interval].global.totalSessionDurationMillis/1000/60/60),2) }} h
            </td>
          </template>
        </tr>
        <tr>
          <td>Number of Breaks</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.breaks,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.breaks,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Number of Package Switches</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.packageSwitches,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.packageSwitches,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Number of Solution Switches</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.solutionSwitches,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.solutionSwitches,2) }}
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
          <td>Number of tests run</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">{{ statistics[interval].user.testsRun }}</td>
            <td class="data-cell right">{{ statistics[interval].global.testsRun }}</td>
          </template>
        </tr>
        <tr>
          <td>Number of tests successfull</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">{{ statistics[interval].user.successfulTests }}</td>
            <td class="data-cell right">{{ statistics[interval].global.successfulTests }}</td>
          </template>
        </tr>
        <tr>
          <td>Number of tests fixed</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">{{ statistics[interval].user.testsFixed }}</td>
            <td class="data-cell right">{{ statistics[interval].global.testsFixed }}</td>
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
          <td>Number of commits</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.commits,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.commits,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Number of executions/builds</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.buildCount,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.buildCount,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Number of files edited</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.filesEdited,2) }}
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.filesEdited,2) }}
            </td>
          </template>
        </tr>
        <tr>
          <td>Build Duration</td>
          <template v-for="interval in intervals">
            <td class="data-cell left">
              {{ roundNumber(statistics[interval].user.totalBuildDurationInMs/1000,2) }} s
            </td>
            <td class="data-cell right">{{
              roundNumber(statistics[interval].global.totalBuildDurationInMs/1000,2) }} s
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
    middleware: 'auth',
    data() {
      return {
        intervals: [7, 30, 90, 360],
        statistics: {},
        statsLoaded: false,
        dateRange: { // used for v-model prop
          startDate: new Date('2016-10-23'),
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
      roundNumber(num, scale) {
        console.log(num, scale);
        if (!("" + num).includes("e")) {
          return +(Math.round(num + "e+" + scale) + "e-" + scale);
        } else {
          var arr = ("" + num).split("e");
          var sig = ""
          if (+arr[1] + scale > 0) {
            sig = "+";
          }
          return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
      },
      async loadData() {
        this.statistics = await
          this.$axios.$get('/statistics', {
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
        this.loadData();
      } else {
        window.onNuxtReady(async () => {
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
