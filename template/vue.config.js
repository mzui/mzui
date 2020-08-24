const path = require('path');
const { Command } = require('commander');
const ChangeResultPlugin = require('./build/plugs/change.result.plugin');
const webpack = require('webpack');

/** 自定义参数 start */
const program = new Command();
program
  //.option('-V, --view <type>', 'output extra debugging')
  .option('-S, --small', 'show small view 小页面')
  .option('-L, --large', 'show large view 大页面')
  .option('-P, --platform <type>', '运行系统平台 android, ios, windows, linux', 'windows')
  .option('-T, --target <type>', '运行目标 android, ios, electron, browser', 'browser');
program.parse(process.argv);
console.log('VUE_APP_PAGE_ID', program.opts());

process.env.View = program.large ? `large` : `small`;
process.env.Platform = `${program.platform}`;
process.env.Target = `${program.target}`;
/** 自定义参数 end */

function resolve(dir) {
  return path.join(__dirname, dir);
}
const ViewLoaderOptions = {
  view: 'aa',
};
module.exports = {
  configureWebpack: {
    resolveLoader: {
      modules: ['node_modules', './build/loaders/'],
    },
    plugins: [
      //new ChangeResultPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(t|j)s$/,
          use: [
            {
              loader: 'view-loader',
              options: {
                view: process.env.View
              },
            },
          ],
        },
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@coms', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@common', resolve('src/common'))
      .set('@api', resolve('src/api'));
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0]['process.env'], {
        View: program.large ? `'large'` : `'small'`,
        Platform: `'${program.platform}'`,
        Target: `'${program.target}'`,
      });
      /*     Object.assign(definitions[0]['global'], {
        view: program.large ? `'large'` : `'small'`,
      }); */
      return definitions;
    });
    /*     config.module
      .rule('js')
      .test(/\.js$/)
      .use('view-loader')
      .loader('view-loader')
      .tap((options) => {
        return Object.assign({}, options, ViewLoaderOptions);
      })
      .end();
    // 你还可以再添加一个 loader
    config.module
      .rule('ts')
      .test(/\.ts$/)
      .use('view-loader')
      .loader('view-loader')
      .tap((options) => {
        return Object.assign({}, options, ViewLoaderOptions);
      })
      .end(); */
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, //less 配置
      },
    },
  },
  devServer: {
    port: '4000',
    proxy: {
      '/api': {
        target: 'http://localhost:8081', //"http://47.91.221.11:8081",
        ws: true,
        changeOrigin: true,
      },
      '/foo': {
        target: '<other_url>',
      },
    },
  },
};
