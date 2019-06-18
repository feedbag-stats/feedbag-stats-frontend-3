import Vue from "vue";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faChartBar, faTasks, faUser, faCog, faUsers } from "@fortawesome/pro-light-svg-icons";

config.autoAddCss = false;

library.add(faChartBar, faTasks, faUser, faCog, faUsers);

Vue.component("font-awesome-icon", FontAwesomeIcon);
