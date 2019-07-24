import Vuex from "vuex";
import Vue from 'vue';
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      backendURL: "http://localhost:8080",
      token: "",
      user: null,
      vuexLoaded : false,
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
        state.vuexLoaded = true;
      },
      logout(state) {
        state.user = null;
      }
    },
    actions: {
      login({commit, state}, token) {
        this.$axios.$get('/me', {
          headers: {
            Authorization: token,
          }
        }).then((res) => {
          commit('setUser', res);
        }).catch((err) => {
          console.log(err.message)
        });
      }
    }
  });
};

export default createStore;
