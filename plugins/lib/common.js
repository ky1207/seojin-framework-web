import { consts as CONSTS } from '../const'
export default ({ $axios }, inject) => {
  const common = {

    codes: (params) => {
      const data = params.map((codeGroup) => { return { codeGroup } })
      return $axios.post(`/api/v1.0/common/code/${CONSTS.LANG_CODE_BASE}`, data)
    },

    siteLanguage: (params) => {
      const url = `/api/v1.0/common/site/${params.siteNo}/useYn/${params.useYn}`
      return $axios.get(url)
    },

    /*
    *  사이트 채널 조회
    */
    siteChannelList: (params) => {
      const url = `/api/v1.0/common/site/${params.siteNo}/channel`
      return $axios.get(url)
    }
  }

  inject('common', common)
  // 상수추가
  inject('consts', CONSTS)
}
