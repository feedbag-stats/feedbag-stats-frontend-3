import axios from "axios";

export default async function({ app, store }) {
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    console.log("here");
    axios
      .get(store.state.backendURL + "/" + newLocale + "/ajax/navigation")
      .then(function(response) {
        console.log(response.data);
        store.commit("SET_NAVIGATION", response.data);
      });
  };
}
