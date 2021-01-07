// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

const vueConfig = {
  publicPath: "/",
  outputDir: resolve("./prod"),
  lintOnSave: true,
  productionSourceMap: false,
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8877,
    host: "0.0.0.0",
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:6954",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  // webpack configuration
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // eslint import only src
    config.module
      .rule("eslint")
      .include.add(resolve("src"))
      .end();
  },
  configureWebpack: () => {
    // configure webpack
  }
};

module.exports = vueConfig;
