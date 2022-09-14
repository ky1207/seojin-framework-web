module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  ignorePatterns: ['builder/*'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-extend-native': ['error', { exceptions: ['String', 'Date', 'Number'] }]
  }
}
