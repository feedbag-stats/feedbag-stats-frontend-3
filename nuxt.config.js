require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
});

module.exports = {
  mode: 'spa',
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
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.png"},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro'}],
    script: [{src: "https://cdn.polyfill.io/v2/polyfill.js"}],
  },
  plugins: [
    {src: "~/plugins/vue-bootstrap.js"},
    {src: "~/plugins/font-awesome.js"},
    {src: '~/plugins/highcharts.js', ssr: false},
    {src: "~/plugins/local-storage.js", ssr: false},
    {src: "~/plugins/datepicker.js", ssr: false},
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {color: "#CCBB8B"},
  css: ["~/assets/scss/app.scss", "vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css"],
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
      "@nuxtjs/google-analytics",
      {
        id: "<REPLACE ME>",
      },
    ],
    "@nuxtjs/sitemap",
    '@nuxtjs/axios',
  ],
  vue: {
    loaders: {
      scss: "style!css!sass",
    },
  },
  axios: {
    baseURL: process.env.BASE_URL,
    browserBaseURL: process.env.BASE_URL,
    credentials: false
  },
};
