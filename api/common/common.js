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
  getYNCodes () {
    return [{
      text: 'Yes',
      value: 'True'
    }, {
      text: 'No',
      value: 'False'
    }
    ]
  }
})
