module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Feedbag Stats Frontend",
    meta: [
      {charset: "utf-8"},
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
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.png"}],
    script: [{src: "https://cdn.polyfill.io/v2/polyfill.js"}],
  },
  plugins: [
    {src: "~/plugins/vue-bootstrap.js"},
    {src: "~/plugins/font-awesome.js"},
    {src: '~/plugins/highcharts.js', ssr: false},
    {src: "~/plugins/local-storage.js", ssr: false},
    {src: "~/plugins/i18n.js"},
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {color: "#CCBB8B"},
  css: ["~/assets/scss/app.scss"],
  /*
   ** Build configuration
   */
  build: {
    //transpile: [/^vue2-google-maps($|\/)/],
    /*
     ** Run ESLint on save
     */
    extend(config, {isDev, isClient}) {
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
  router: {},
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
    ["bootstrap-vue/nuxt", {css: false}],
    [
      "nuxt-i18n",
      {
        locales: [
          {code: "en", iso: "en-CH", file: "en.js", name: "E"},
        ],
        defaultLocale: "en",
        detectBrowserLanguage: true,
        lazy: true,
        langDir: "lang/",
        rootRedirect: "en",
        redirectRootToLocale: "en",
        strategy: "prefix_except_default",
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
