import Vuex from "vuex";
import Vue from 'vue';

const createStore = () => {
  return new Vuex.Store({
    state: {
      backendURL: "http://localhost:8080",
    }
  });
};

export default createStore;
