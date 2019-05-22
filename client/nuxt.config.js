const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Client IoT',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Client IoT' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  // router: {
  //   linkActiveClass: 'active'
  // },
  /*
  ** Build configuration
  */
  build: {
    vendor: [ 
      'chart.js',
      'vue-chartjs'
    ],
    babel: {
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ]
    },
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
        '$': 'jquery',
        '_': 'lodash'
      })
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    // { src: '~plugins/vue2-highcharts.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/component-cache',
    {src:'cookie-universal-nuxt', options:{ alias: 'cookiz', parseJSON: true }},
  ],
  css: [
    '~/assets/css/helper.css',
    '~/assets/css/spinners.css',
    '~/assets/css/lib/bootstrap/bootstrap.min.css',
    '~/assets/css/lib/sweetalert/sweetalert.css',
    '~/assets/css/morris.css',
    '~/assets/css/style.css'
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'jquery': 'jquery/src/jquery.js'
    }
  },
}
