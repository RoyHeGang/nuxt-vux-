const vuxLoader = require('vux-loader')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'yky-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
    {src: '~plugins/vux', ssr: false}
  ],
  // css: ['vux/src/styles/index.less'],
  modules: [
    // npm install @nuxtjs/proxy -D
    ['@nuxtjs/proxy']
  ],
  proxy: {
    '/api': {
      pathRewrite: {'^/api': '/api'},
      target: 'http://localhost:8080'
    }
  },
  build: {
    vendor: ['axios'],
    babel: {
      presets: ['es2015', 'stage-0'],
      // plugins: ['transform-runtime']
      plugins: [
        'transform-runtime'
      ]
    },
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /vux.src.*?js$/,
      loader: 'babel'
    }],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      vuxLoader.merge(config, {
        options: {
          isWebpack2: true
        },
        plugins: [{
          name: 'vux-ui'
        }, {
          name: 'duplicate-style'
        }]
      })
    }
  }
}
