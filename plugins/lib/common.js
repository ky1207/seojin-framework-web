import { consts as CONSTS } from '../const'
export default ({ $axios }, inject) => {
  const common = {

    codes: (params) => {
      const data = params.map((codeGroup) => { return { codeGroup } })
      return $axios.post(`/api/v1.0/common/code/${CONSTS.LANG_CODE_BASE}`, data)
    }

  }

  inject('common', common)
  // 상수추가
  inject('consts', CONSTS)
}
