import code from '~/api/system/code/code'
import common from '~/api/common/common'
import sample from '~/api/sample/sample'

export default ({ $axios }, inject) => {
  const api = {
    system: {
      code: code($axios)
    },
    common: common($axios),
    sample: sample($axios)
  }
  inject('api', api)
}
