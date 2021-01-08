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
        target: "http://localhost:8200",
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
    const svgRule = config.module.rule("svg");

    // 清除 svg 默认的所有 loader
    // 如果不清楚现有 loader，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    svgRule
      .test(/\.svg$/)
      // include
      .include.add(resolve("src/icons"))
      .end()
      // include end
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });

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
