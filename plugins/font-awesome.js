import Vue from "vue";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faFacebookF, faInstagram } from "@fortawesome/fontawesome-free-brands";

config.autoAddCss = false;

library.add(faFacebookF, faInstagram);

Vue.component("font-awesome-icon", FontAwesomeIcon);
