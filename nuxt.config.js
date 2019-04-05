module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Nuxt Skeleton",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, user-scalable=no",
      },
      {
        hid: "description",
        name: "description",
        content: "<REPLACE ME>",
      },
      {
        name: "google-site-verification",
        content: "<REPLACE ME>"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    script: [{ src: "https://cdn.polyfill.io/v2/polyfill.js" }],
  },
  plugins: [
    "~/plugins/vue-bootstrap.js",
    { src: "~/plugins/font-awesome.js", ssr: false },
    { src: "~/plugins/scroll-to.js", ssr: true },
    { src: "~/plugins/localStorage.js", ssr: false },
    { src: "~/plugins/i18n.js" },
    { src: "~/plugins/headroom.js", ssr: false},
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#CCBB8B" },
  css: ["~/assets/scss/app.scss"],
  /*
   ** Build configuration
   */
  build: {
    //transpile: [/^vue2-google-maps($|\/)/],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (false && isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
      if (!isClient) {
      }
    },
    vendors: ["babel-polyfill"],
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      let position = false;

      if (savedPosition) {
        position = savedPosition;
      } else {
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 };
        } else if (
          to.matched.some(r => r.components.default.options.scrollToTop)
        ) {
          position = { x: 0, y: 0 };
        }
        if (to.hash) {
          position = { selector: to.hash };
        }
      }

      if (position.selector && document.querySelector(position.selector))
        return position;

      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        // view https://github.com/nuxt/nuxt.js/issues/2738
        window.$nuxt.$once("triggerScroll", () => {
          resolve(position);
        });
      });
    },
    middleware: "content-fetch",
  },
  generate: {
    routes: [
      "/",
      "/<REPLACE ME>",
      "/<REPLACE ME>",
      "/<REPLACE ME>"
    ],
  },
  sitemap: {
    path: "/sitemap.xml",
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // Enable me when using nuxt generate
  },
  modules: [
    ["bootstrap-vue/nuxt", { css: false }],
    [
      "nuxt-i18n",
      {
        locales: [
          { code: "de", iso: "de-CH", file: "de.js", name: "D" },
          { code: "fr", iso: "fr-CH", file: "fr.js", name: "F" },
          { code: "it", iso: "it-CH", file: "it.js", name: "I" },
        ],
        defaultLocale: "de",
        detectBrowserLanguage: true,
        lazy: true,
        langDir: "lang/",
        rootRedirect: "de",
        redirectRootToLocale: "de",
        parsePages: false,
        strategy: "prefix",
        pages: {
          index: {
            de: "/",
            fr: "/",
            it: "/",
          },
        },
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "<REPLACE ME>",
      },
    ],
    "@nuxtjs/sitemap",
  ],
  vue: {
    loaders: {
      scss: "style!css!sass",
    },
  },
};
