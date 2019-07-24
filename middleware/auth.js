export default function ({store, redirect}) {
  window.onNuxtReady(() => {
    if (!store.state.user) {
      return redirect('/login')
    }
  });
}
