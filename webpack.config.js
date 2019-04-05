// for editor/ide intellisense only!
module.exports = {
  resolve: {
    alias: {
      "~": require("path").resolve(__dirname),
    },
  },
  { test: /\.(js|vue)$/, loader: 'eslint-loader', enforce: "pre", include: [resolve('src'), resolve('test')], options: { formatter: require('eslint-friendly-formatter') } },
};
