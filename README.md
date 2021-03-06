# nuxt+vux 开发环境搭建


##安装

为了便于大家快速使用，Nuxt.js提供了一个 starter 模板。

下载模板的压缩包 或利用 vue-cli 安装(没有安装vue-cli的同学要先执行`npm i vue-cli -g`)使用：

	vue init nuxt-community/starter-template yky-app

然后安装依赖包：

	cd yky-app
	npm i

安装目录如下：

	.nuxt
	assets
	components
	layouts
	middleware
	node_modules
	pages
	plugins
	static
	store
	.editorconfig
	.eslintrc.js
	.gitignore
	nuxt.config.js
	package-lock.json
	package.json
	README.md

如果你install完之后的目录跟此不一样，兄弟！你安装的有问题！从头再来一遍吧！！！

接着通过以下命令启动项目：

	npm run dev


OK！ 恭喜你nuxt安装完成！！！


## 配置VUX

接下来咱们要继续配置 `vux`

找到根目录`plugins`文件件，在此文件夹中创建vux.js，添加如下代码

	import {Card, XButton, Divider} from 'vux' //根据项目需求，需要哪些组件就添加那些组件
	import Vue from 'vue'
	Vue.component('Divider', Divider)
	Vue.component('XButton', XButton)
	Vue.component('Card', Card)


OK，vux.js 建好就改配置nuxt.config.js了


在配置nuxt.config.js之前，你需要安装一些依赖先

	npm i -S axios vux @nuxtjs/proxy
	
	npm i -D babel-cli babel-preset-es2015 babel-preset-stage-0 css-loader less-loader style-loader vue-loader vux-loader

安装完这些依赖后，正式开始配置nuxt.config.js了

算了！直接贴代码吧

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



好了，环境装完了，接下来就是使用vux了

贴个例子 index.vue

	<template>
	  <section >
	    
	      <card :header="{title: ('My wallet')}">
	      <div slot="content" class="card-demo-flex card-demo-content01">
	        <div class="vux-1px-r">
	          <span>1130</span>
	          <br/>
	          {{ ('Point') }}
	        </div>
	        <div class="vux-1px-r">
	          <span>15</span>
	          <br/>
	          {{ ('Coupon') }}
	        </div>
	        <div class="vux-1px-r">
	          <span>0</span>
	          <br/>
	          {{ ('Gift card') }}
	        </div>
	        <div>
	          <span>88</span>
	          <br/>
	          {{ ('Cash') }}
	        </div>
	      </div>
	    </card>
	
	  </section>
	</template>
	
	<script>
	import {Card} from 'vux'
	
	export default {
	  components: {
	    Card
	  }
	}
	</script>
	
	<style scoped lang="less">
	@import '~vux/src/styles/1px.less';
	.card-demo-flex {
	  display: flex;
	}
	.card-demo-content01 {
	  padding: 10px 0;
	}
	.card-padding {
	  padding: 15px;
	}
	.card-demo-flex > div {
	  flex: 1;
	  text-align: center;
	  font-size: 12px;
	}
	.card-demo-flex span {
	  color: #f74c31;
	}
	</style>


6666! 再运行`npm run dev`看看！

 