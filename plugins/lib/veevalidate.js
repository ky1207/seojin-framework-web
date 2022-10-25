import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import vi from 'vee-validate/dist/locale/vi.json'
import ko from 'vee-validate/dist/locale/ko.json'

localize({ en, vi, ko })

Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule])
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// validator 다국어 처리
export default (ctx) => {
  localize(ctx.i18n.getLocaleCookie())
}
