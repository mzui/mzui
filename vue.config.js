const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  //lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@coms", resolve("src/components"))
      .set("@views", resolve("src/views"))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, //less 配置
      },
    },
  },
  devServer: {
    port: "4000",
    proxy: {
      "/api": {
        target: "http://localhost:8081",//"http://47.91.221.11:8081",
        ws: true,
        changeOrigin: true,
      },
      "/foo": {
        target: "<other_url>",
      },
    },
  },
};
