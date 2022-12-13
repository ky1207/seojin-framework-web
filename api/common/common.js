import { GLOBAL_CODES } from '~/plugins/lib/grid/Formatter'

export default axios => ({
  async getCommonCodes (params) {
    const data = params.map((codeGroupId) => { return { codeGroupId } })
    const result = await axios.post('/api/v1.0/code/codes', data)

    params.forEach((ele) => {
      GLOBAL_CODES.setCodes(result.data[ele])
    })
    return result
  },
  /**
   * Map을 이용하는 경우 1=>true
   * Boolean true
   * boolean true
   * @returns {[{text: string, value: boolean},{text: string, value: boolean}]}
   */
  getYNCodes () {
    return [{
      text: 'Yes',
      value: true
    }, {
      text: 'No',
      value: false
    }
    ]
  }
})
