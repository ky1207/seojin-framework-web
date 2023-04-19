const path = require('path')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const CKEditorStyles = require('@ckeditor/ckeditor5-dev-utils').styles

export default {
  // *****client side이므로 fetch대신에.. created가 최최 한번 클라이언트쪽에서 호출된다.
  ssr: false,
  target: 'static',
  server: {
    host: '0.0.0.0'
  },
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - seojin-framework-web',
    title: 'seojin',
    meta: [
      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      { hid: 'stripe', src: 'https://cdn.ckeditor.com/4.20.2/standard/ckeditor.js', defer: true }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: `${process.env.CDN_STATIC}favicon.ico` }
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style/scss/custom.scss',
    '~/assets/transition.css',
    '~/assets/style/grid.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/prototype.js' },
    { src: '~/plugins/lib/toastgrid.js' },
    { src: '~/plugins/lib/ckeditor.js' },
    { src: '~/plugins/lib/tree.js' },
    { src: '~/plugins/lib/notify.js' },
    { src: '~/plugins/lib/common.js' },
    { src: '~/plugins/lib/routertab.js' },
    { src: '~/plugins/lib/bootstrap.js' },
    { src: '~/plugins/lib/veevalidate.js' },
    { src: '~/plugins/lib/vue2datepicker.js' },
    { src: '~/plugins/client.js' },
    { src: '~/plugins/api.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    // Equivalent to { path: '~/components' }
    '~/components/modal',
    '~/components/ui/editor',
    '~/components/ui/editor/ext',
    '~/components/ui/common',
    '~/components/ui/common/ext',
    '~/components/ui/layouts'
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
    transpile: ['vue-router-tab', 'vee-validate/dist/rules', /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
    plugins: [
      // If you set ssr: true that will cause the following error. This error does not affect the operation.
      // ERROR  [CKEditorWebpackPlugin] Error: No translation has been found for the zh language.
      new CKEditorWebpackPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'en',
        additionalLanguages: 'all',
        addMainLanguageTranslationsToAllAssets: true
      })
    ],

    postcss: CKEditorStyles.getPostCssConfig({
      themeImporter: {
        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
      },
      minify: true
    }),

    extend (config, ctx) {
      // If you do not exclude and use raw-loader to load svg, the following errors will be caused.
      // Cannot read property 'getAttribute' of null
      const svgRule = config.module.rules.find((item) => {
        return /svg/.test(item.test)
      })
      svgRule.exclude = [path.join(__dirname, 'node_modules', '@ckeditor')]

      // add svg to load raw-loader
      config.module.rules.push({
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      })
    },

    extractCSS: true, // inline css를 파일로 저장한다. 그렇지 않으면 head 내에 inline으로 출력 kskim 2021-12-10   ***
    // publicPath:'http://test.org' // default='/_nuxt/

    publicPath: process.env.CDN_ASSETS,
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    },
    // nuxt의 템플릿에 문제가 있어 사용하는 템플릿 입니다.
    // builder/template은 수정하지 마세요
    template: {
      dependencies: {
        'node-fetch': '^2.6.1',
        ufo: '^0.7.4',
        unfetch: '^4.2.0',
        vue: '^2.6.12',
        'vue-client-only': '^2.0.0',
        'vue-meta': '^2.4.0',
        'vue-no-ssr': '^1.1.1',
        'vue-router': '^3.5.1',
        'vue-template-compiler': '^2.6.12',
        vuex: '^3.6.2'
      },
      dir: './builder/template',
      files: [
        'App.js',
        'client.js',
        'index.js',
        'jsonp.js',
        'router.js',
        'router.scrollBehavior.js',
        'routes.json',
        'server.js',
        'utils.js',
        'empty.js',
        'mixins/fetch.server.js',
        'mixins/fetch.client.js',
        'components/nuxt-error.vue',
        'components/nuxt-child.js',
        'components/nuxt-link.server.js',
        'components/nuxt-link.client.js',
        'components/nuxt.js',
        'views/app.template.html',
        'views/error.html'
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 100000,
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  },
  serverMiddleware: [
    { path: '/health', handler: '~/middleware/health.js' }
  ],
  router: {
    // base: '/app/', //servlet에 context path 같은 것 kskim 12.20
    middleware: ['auth', 'url'],
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
