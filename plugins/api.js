import code from '~/api/system/code'
import program from '~/api/system/program'
import menu from '~/api/system/menu'
import authority from '~/api/system/authority'
import common from '~/api/common/common'
import sample from '~/api/sample/sample'

export default ({ $axios }, inject) => {
  const api = {
    system: {
      code: code($axios),
      program: program($axios),
      menu: menu($axios),
      authority: authority($axios)
    },
    common: common($axios),
    sample: sample($axios)
  }
  inject('api', api)
}
