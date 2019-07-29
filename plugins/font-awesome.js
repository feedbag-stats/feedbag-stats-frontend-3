import Vue from "vue";
import {config, library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import {
  faChartBar,
  faTasks,
  faUser,
  faCog,
  faUsers,
  faCalendar,
  faLock,
  faGlobe,
  faCheck,
  faLocation,
  faDatabase,
  faTrash,
  faFile,
  faRecycle,
  faAngleLeft,
  faAngleRight,
  faFileUpload,
} from "@fortawesome/pro-light-svg-icons";
import {faSpinner, faInfo} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(faChartBar, faTasks, faUser, faCog, faUsers, faCalendar, faLock, faSpinner, faGlobe, faCheck, faLocation, faDatabase, faTrash, faFile, faRecycle, faAngleLeft, faAngleRight, faInfo, faFileUpload);

Vue.component("font-awesome-icon", FontAwesomeIcon);
