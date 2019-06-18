import Vue from "vue";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import xrangeInit from "highcharts/modules/xrange";

if (typeof Highcharts === "object") {
  xrangeInit(Highcharts);
}

Vue.use(HighchartsVue);
