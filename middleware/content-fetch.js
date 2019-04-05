import axios from "axios";

const cachingEnabled = false;

export default async function({ store, route, app, error }) {

  store.commit("SET_NAVIGATION_OPEN", false);

  if (process.browser) {
    document.querySelector("is-nav");
  }

  if (cachingEnabled && store.state.loadedPages[route.fullPath]) {
    store.commit("SET_CURRENT_PAGE", store.state.loadedPages[route.fullPath]);
  } else {
    try {
      let { data } = await axios.get(store.state.backendURL + route.fullPath);

      data.route = route.fullPath;

      store.commit("SET_CURRENT_PAGE", data);
      if (cachingEnabled) {
        store.commit("CACHE_PAGE", data);
      }

      if (!store.state.navigation.length) {
        let { data } = await axios.get(
          store.state.backendURL + "/" + app.i18n.locale + "/ajax/navigation",
        );
        store.commit("SET_NAVIGATION", data);
      }

    } catch (err) {

      if(err.request) {
        return error({ statusCode: 0,
                       message: "No connection to server" })
      }

      return error({ statusCode: err.response.status,
                     message: err.response.data })

    }
  }

}
