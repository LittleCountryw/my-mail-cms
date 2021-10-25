const path = require('path')
module.exports = {
  //1.配置方法一：CLI提供的属性，与webpack配置名不一样
  outputDir: './build',
  // publicPath: './',
  //解决跨域访问问题的设置
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:5000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  //2.配置方式二：对象方式 和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  }
  //也可以通过函数的方法,传参config对象进行修改会直接修改原来的配置
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // },
  //配置方式三：链式调用，也会覆盖config原来的值
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
