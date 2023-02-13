import code from '~/api/system/code'
import program from '~/api/system/program'
import menu from '~/api/system/menu'
import authority from '~/api/system/authority'
import user from '~/api/system/user'
import company from '~/api/system/company'
import department from '~/api/system/department'
import log from '~/api/system/log'
import alarm from '~/api/system/alarm'

import common from '~/api/common/common'

import sample from '~/api/sample/sample'

export default ({ $axios }, inject) => {
  const api = {
    system: {
      code: code($axios),
      program: program($axios),
      menu: menu($axios),
      authority: authority($axios),
      user: user($axios),
      company: company($axios),
      department: department($axios),
      log: log($axios),
      alarm: alarm($axios)
    },
    common: common($axios),
    sample: sample($axios)
  }
  inject('api', api)
}
