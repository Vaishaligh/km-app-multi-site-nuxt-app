module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  server: {
    port: 5000,
  },
  router: {
    mode: 'history',
    middleware: ['adjustScroll']
  },
  head: {
    title: 'kartmax-product-multi-site-app',
    // htmlAttrs: {
    //   lang: 'en'
    // },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
  
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '' },
      { rel: "stylesheet", type: "text/css", href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
      { rel: 'stylesheet', href: "https://unpkg.com/swiper@7.0.8/swiper-bundle.min.css" },
      { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.3/css/lightgallery.css" },
      { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.3/css/lg-zoom.css" }


    ],
    script: [
      { src: '/js/swiper-bundle.min.js'},
      { src: '/js/bootstrap.bundle.min.js' } // bootstrap 5 js
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // "~/static/css/bootstrap.min.css",
    "~/static/css/new_style.css",
    "~/static/css/km-style.css",
    "~/static/css/responsive.css",
    "~/static/css/color-swatches.css",
    "~/static/css/lg-zoom.css",

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/getOrigin.js' },
    { src: '~/plugins/filter.js' },
    { src: '~/plugins/directives.js' },
    { src: '~/plugins/infinite-scroll.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   '@nuxtjs/pwa',
  // ],
  // generate: {
  //   minify: false
  // },
  axios: {
    baseURL: 'https://engine.kartmax.in/api/', // Used as to update the baseurl defined in .nuxt/axios.js
    proxyHeaders: false,
    withCredentials: false,
    crossorigin: true,
    proxy: false
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/axios', '@nuxtjs/toast',
  ],

  //serverMiddleware: ['~/middleware/logger'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

    
  // env: {
  //   token:'https://dev-harpa.kartmax.co',
  //   devToken :window.location.origin
  // },
  // pwa: {
  //   meta: {
  //     title: 'kartmax',
  //     author: 'Kartmax',
  //   },
  //   manifest: {
  //     "short_name": 'km',
  //     "name": "kartmax",
  //     "display": "standalone",
  //     "theme_color": "#fff",
  //     "background_color": "#fff",
  //   }
  // },
}
