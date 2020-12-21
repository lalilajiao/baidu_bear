const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {router: {base: '/baidu_bear/' }}: {}

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  router: {
    base: '/baidu_bear/'
  },
  ...routerBase,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'baidu_bear',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/normalize.css',
    '~/assets/css/responsive.css',
    '~/assets/css/animate.css',
    '~/assets/css/swiper-3.4.2.min.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/assets/js/swiper-3.4.2.min.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: 'https://baidulogo.bj.bcebos.com/baidu_bear/'
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  generate: {
    dir: 'docs',
    subFolders: false 
  },
  
}
