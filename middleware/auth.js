export default function ({store, redirect, $axios}) {

  function loadUser() {
    if (!store.state.user) {
      return redirect('/login')
    } else {
      $axios.$get('/me', {
        headers: {
          Authorization: store.state.user.token,
        }
      }).then((res) => {
        store.commit('setUser', res);
      }).catch((err) => {
        store.commit('setUser', null);
        return redirect('/login');
      });
    }
  }

  if (store.state.vuexLoaded) {
    return loadUser();
  } else {
    window.onNuxtReady(() => {
      return loadUser();
    });
  }
}
