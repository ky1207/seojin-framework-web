import code from '~/api/system/code'
import program from '~/api/system/program'
import menu from '~/api/system/menu'
import authority from '~/api/system/authority'
import user from '~/api/system/user'
import company from '~/api/system/company'
import department from '~/api/system/department'
import log from '~/api/system/log'
import schedule from '~/api/system/schedule'
import alarm from '~/api/system/alarm'
import userMobile from '~/api/system/userMobile'
import appUpdate from '~/api/system/appUpdate'
import business from '~/api/system/business'

import common from '~/api/common/common'

import sample from '~/api/sample/sample'

import warehouseManage from '~/api/master/warehouseManage'

export default ({ $axios }, inject) => {
  const api = {
    system: {
      code: code($axios),
      business: business($axios),
      program: program($axios),
      menu: menu($axios),
      authority: authority($axios),
      user: user($axios),
      company: company($axios),
      department: department($axios),
      log: log($axios),
      schedule: schedule($axios),
      alarm: alarm($axios),
      userMobile: userMobile($axios),
      appUpdate: appUpdate($axios)
    },
    master: {
      warehouseManage: warehouseManage($axios)
    },
    common: common($axios),
    sample: sample($axios)
  }
  inject('api', api)
}
