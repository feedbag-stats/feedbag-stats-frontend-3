export default async function({ app, store }) {
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    console.log("here");
  };
}
