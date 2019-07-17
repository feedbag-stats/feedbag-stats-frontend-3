<template>
  <div>
    <h1 class="page-title">Data Exploration</h1>
    <no-ssr>
      <div class="time-picker mb-4">
        <date-range-picker
          v-model="dateRange"
          @update="updateData"
          :locale-data="locale"
          :opens="opens"
          :single-date-picker="true"
          :ranges="false"
          :time-picker24-hour="true"
          :time-picker="true"
          :time-picker-seconds="true"
          :time-picker-increment="1"
        >
          <!--Optional scope for the input displaying the dates -->
          <div slot="input" slot-scope="picker">
            <font-awesome-icon :icon="['fal', 'calendar']"/>&nbsp;{{ dateRange.startDate.toLocaleDateString() }} {{
            dateRange.startDate.toLocaleTimeString() }}
          </div>
        </date-range-picker>
      </div>
      <div id="event-wrapper" class="event-wrapper">
        <div class="event" v-for="event in events">{{event}}</div>
      </div>
    </no-ssr>
  </div>
</template>

<script>

  import moment from 'moment';

  export default {
    data() {
      return {
        events: [],
        instant: new Date(),
        eventsLoaded: false,
        isLoading: false,
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
      async updateData() {
        this.isLoading = true;
        this.events = [];
        this.loadMore("prev", this.dateRange.startDate);
      },
      updatePickerModel() {
        this.dateRange.startDate = this.instant;
      },
      appendArray(array, arrayToAppend) {
        for (let index in arrayToAppend) {
          array.push(arrayToAppend[index]);
        }
      },
      prependArray(array, arrayToPrepend) {
        arrayToPrepend.reverse();
        for (let index in arrayToPrepend) {
          array.unshift(arrayToPrepend[index]);
        }
      },
      async loadMore(direction, date = false) {

        if (direction === "prev") {
          if (this.events.length > 0) {
            this.instant = new Date(this.events[0].instant);
          } else {
            if (date) {
              this.instant = date;
            } else {
              this.instant = new Date();
            }
          }
        } else {
          this.instant = new Date(this.events[this.events.length - 1].instant);
        }
        this.updatePickerModel();

        // there should be at max 7 * 12 response objects in the tddCycles array
        let events = await
          this.$axios.$get('/load_events', {
            params: {
              direction: direction,
              date: moment(this.instant).toDate().toISOString(),
            },
            headers: {
              Authorization: this.$store.state.user.token
            }
          });

        if (direction === "prev") {
          this.prependArray(this.events, events);
        } else {
          this.appendArray(this.events, events);
        }

        this.eventsLoaded = true;
        this.isLoading = false;

        // we need to do this :'(
        setTimeout(function () {
          let wrapper = document.getElementById("event-wrapper");
          console.log(wrapper);
          if (direction === "prev") {
            wrapper.scrollTop = 50;
          } else {
            // wrapper.scrollTop = wrapper.scrollHeight - wrapper.clientHeight - 50;
          }
        }, 500);

      }
      ,
      handleScroll(event) {
        if (this.isLoading) {
          return;
        }

        //determine if we are at top or bottom
        let wrapper = document.getElementById("event-wrapper");

        if (wrapper.scrollTop === 0) {
          // we are at top, lets load previous ones..
          console.log('top');
          this.isLoading = true;
          this.loadMore("prev");
        } else if (wrapper.scrollTop === wrapper.scrollHeight - wrapper.clientHeight) {
          // we are at the bottom
          console.log('bottom');
          this.isLoading = true;
          this.loadMore("next");
        } else {
          // do nothing
        }
      }
    },
    async created() {
      // this is hacky, but we need to wait until local storage is loaded for the token
      if (process.browser) {
        window.onNuxtReady(async () => {
          this.loadMore("prev");
          document.getElementById("event-wrapper").addEventListener('scroll', this.handleScroll);
        });
      }
    },
    beforeDestroy() {
      document.getElementById("event-wrapper").removeEventListener('scroll', this.handleScroll);
    },
  }
</script>

<style scoped lang="scss">
  .event-wrapper {
    width: 800px;
    height: 500px;
    overflow: scroll;
    .event {
      &:first-child {
        margin-top: 150px;
      }
      &:last-child {
        margin-bottom: 150px;
      }
      height: 50px;
      background: #f4f4f4;
      margin: 2px 0;
    }
  }
</style>
