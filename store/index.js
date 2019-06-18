import Vuex from "vuex";
import Vue from 'vue';
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      backendURL: "http://localhost:8080",
      token: "",
      user: null,
    },
    mutations: {
      setUser(state, user) {
        console.log(user);
        state.user = user;
      },
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
