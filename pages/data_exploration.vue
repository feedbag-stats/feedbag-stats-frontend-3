<template>
  <div>
    <h1 class="page-title">Data Exploration</h1>
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
    <div ref="eventWrapper" id="event-wrapper" class="event-wrapper">
      <div class="scroll-block top">
        <font-awesome-icon :class="{ 'fa-spin' : isLoading }" class="fa-fw" :icon="['fas', 'spinner']"/>&nbsp;&nbsp;Scroll
        up for earlier events
      </div>
      <div class="event" v-for="event in events">
        <div class="row">
          <div class="col-md-3">
            {{ prettyDate(event.instant) }}
          </div>
          <div class="col-md-9">
            {{event.event}}
          </div>
        </div>
      </div>
      <div class="scroll-block bottom">
        <font-awesome-icon :class="{ 'fa-spin' : isLoading }" class="fa-fw" :icon="['fas', 'spinner']"/>&nbsp;&nbsp;Scroll
        down for later events
      </div>
    </div>
  </div>
</template>

<script>

  import moment from 'moment';

  export default {
    middleware: 'auth',
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
      prettyDate(instant) {
        let momentDate = moment(instant);
        return momentDate.format('DD.MM.YYYY, HH:mm:ss')
      },
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
          if (direction === "prev") {
            wrapper.scrollTop = 30;
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
        } else if (wrapper.scrollTop >= wrapper.scrollHeight - wrapper.clientHeight) {
          // we are at the bottom
          console.log('bottom');
          this.isLoading = true;
          this.loadMore("next");
        } else {
          // do nothing
        }
      }
    },
    async mounted() {
      document.getElementById("event-wrapper").addEventListener('scroll', this.handleScroll);
      if (this.$store.state.vuexLoaded) {
        this.loadMore("prev");
      } else {
        window.onNuxtReady(async () => {
          this.loadMore("prev");
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
    width: 100%;
    height: 500px;
    overflow: scroll;
    .event {
      height: 50px;
      background: #f4f4f4;
      margin: 2px 0;
      padding: 10px;
    }
    .scroll-block {
      .top {
        margin-top: 20px;
      }
      .bottom {
        margin-bottom: 20px;
      }
      padding: 40px 50px 20px;
      height: 100px;
      background: #dcdcdc;
      text-align: center;
      font-weight: bold;
    }
  }
</style>
