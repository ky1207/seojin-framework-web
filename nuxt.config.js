
export default {
  ssr: false,

  server: {
    host: '0.0.0.0'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - seojin-framework-web',
    title: 'seojin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: `${process.env.CDN_STATIC}favicon.ico` }
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/transition.css', '~/assets/style/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/prototype.js' },
    { src: '~/plugins/lib/toasteditor.js' },
    { src: '~/plugins/lib/toastgrid.js' },
    { src: '~/plugins/lib/tree.js' },
    { src: '~/plugins/lib/notify.js' },
    { src: '~/plugins/lib/common.js' },
    { src: '~/plugins/lib/routertab.js' },
    { src: '~/plugins/lib/bootstrap.js' },
    { src: '~/plugins/lib/veevalidate.js' },
    { src: '~/plugins/lib/vue2datepicker.js' },
    { src: '~/plugins/client.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    // Equivalent to { path: '~/components' }
    '~/components/modal',
    '~/components/ui/editor', '~/components/ui/common', '~/components/ui/layouts'
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', {
      fix: true // 저장시 오류 자동수정 kskim **
    }],
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}`, systemvars: true }]
  ],
  publicRuntimeConfig: {
    CDN_STATIC: process.env.CDN_STATIC
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa'
    '@nuxtjs/auth-next',
    ['@nuxtjs/i18n', {
      locales: [
        { code: 'ko', iso: 'ko-KR', file: 'ko.json' },
        { code: 'en', iso: 'en-US', file: 'en.json' },
        { code: 'vi', iso: 'vi-VN', file: 'vi.json' }
      ],
      defaultLocale: 'ko',
      langDir: '~/i18n/',
      strategy: 'no_prefix',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',
        cookieCrossOrigin: false
      }
    }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    debug: false
  },

  proxy: {
    '/api': { target: process.env.API_SERVER }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en'
  //   }
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Babel transpile dependencies
    transpile: ['vue-router-tab', 'vee-validate/dist/rules'],
    extractCSS: { ignoreOrder: true }, // inline css를 파일로 저장한다. 그렇지 않으면 head 내에 inline으로 출력 kskim 2021-12-10   ***
    // publicPath:'http://test.org' // default='/_nuxt/
    publicPath: process.env.CDN_ASSETS,
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  },
  serverMiddleware: [
    { path: '/health', handler: '~/middleware/health.js' }
  ],
  router: {
    // base: '/app/', //servlet에 context path 같은 것 kskim 12.20
    middleware: ['auth'],
    extendRoutes (routes, resolve) {
      // add Iframe route
      routes.push({
        name: 'iframe',
        path: '/iframe/:src/:title?/:icon?',
        component: resolve(__dirname, 'pages/-Iframe.js'),
        props: true
      })
    }
  },
  auth: {
    localStorage: false,
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      customStrategy: {
        scheme: '~/schemes/RefreshWithUserScheme',
        token: {
          property: 'accessToken',
          type: 'Bearer', // `tokenType` is now `token.type`
          required: true // `tokenRequired` is now `token.required`
        },
        refreshToken: {
          property: 'refreshToken' // change to your refresh token property
        },
        user: {
          autoFetch: false
        },
        endpoints: {
          login: { url: '/api/v1.0/login', method: 'post' },
          refresh: { url: '/api/v1.0/login/refresh', method: 'post' }, // change to your refresh token url
          user: false,
          logout: false
        }
      }
    }
  }
}
