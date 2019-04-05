import Vuex from "vuex";
import Vue from 'vue';

const createStore = () => {
  return new Vuex.Store({
    state: {
      backendURL: "<REPLACE ME> ",
      currentPage: {},
      navigation: [],
      loadedPages: {},
      navigationOpen: false,
    },
    mutations: {
      SET_CURRENT_PAGE(state, content) {
        state.currentPage = content;
      },
      CACHE_PAGE(state, content) {
        Vue.set(state.loadedPages, content.route, content);
      },
      SET_NAVIGATION(state, content) {
        state.navigation = content;
      },
      SET_NAVIGATION_OPEN(state, value) {
        state.navigationOpen = value;
      },
    },
  });
};

export default createStore;
