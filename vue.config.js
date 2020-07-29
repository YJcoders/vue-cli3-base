'use strict';
const path = require('path');
// const merge = require('webpack-merge');

// plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 压缩gzip
const webpackbar = require('webpackbar'); // 打包进度条

const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}
// 配置less
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/index.less')
      ]
    });
}

module.exports = {
  publicPath: isProduction ? '/vue/' : '/', // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  lintOnSave: !isProduction,

  devServer: {
    open: true,
    disableHostCheck: true,
    historyApiFallback: true, // vue-cli3 可不用配置
    hotOnly: true
  },

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'mormal-modules', 'normal'];
    // 添加less
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));

    // 生产环境使用cdn, 在public/index.html中引入cdn
    // 引用需要注意顺序，加载顺序
    const cdn = {
      css: [
        // 'https://at.alicdn.com/t/font_649543_le5l4asnrxd.css'
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/theme-chalk/index.css'
      ],
      js: isProduction ? [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js',
        'https://cdn.bootcss.com/element-ui/2.12.0/index.js',
        'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js'
        // 'http://api.map.baidu.com/api?v=2.0&ak=LBHPGvgtMZwEWEKt0OAgC7Mo60L0HoMv&callback=initialize'
      ] : []
    };
    const externals = isProduction ? {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts',
      'axios': 'axios'
    } : {};
    config.externals(externals);
    config.plugin('html').tap(args => {
      args[0].cdn = cdn;
      return args;
    });

    if (isProduction) {
      // gzip压缩
      config.plugin('compression-webpack-plugin').use(CompressionWebpackPlugin, [
        {
          test: /\.(js|css)(\?.*)?$/i, // 需要压缩的文件正则
          threshold: 10240 // 文件大小大于这个值时启用压缩
          // deleteOriginalAssets: true// 压缩后保留原文件
        }
      ]);
    }
    // 打包进度条
    config.plugin('webpackbar').use(webpackbar);
    // 打包查看，npm包大小分析
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }

    // 打包多进程
    // config.module
    //   .rule('js')
    //   // .test(/\.(js|css)$/)
    //   .use('thread-loader')
    //   .options({
    //     workers: 3
    //   });

    // config.plugin('terser-webpack-plugin').use(TerserPlugin, [
    //   {
    //     parallel: 4
    //   }
    // ]);
  },

  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        '@': resolve('src'),
        'views': resolve('src/views')
      }
    },
    module: {

    },
    plugins: [

    ]
  }
};
