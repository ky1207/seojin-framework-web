import { GLOBAL_CODES } from '~/plugins/lib/grid/Formatter'

export default axios => ({
  menu () {
    return axios.get('/api/v1.0/common/menu')
  },
  async getCommonCodes (params) {
    const data = params.map((codeGroupId) => { return { codeGroupId } })
    const result = await axios.post('/api/v1.0/code/codes', data)

    params.forEach((ele) => {
      GLOBAL_CODES.setCodes(result.data[ele])
    })
    return result
  },
  async getCompanyIds () {
    const result = await axios.get('/api/v1.0/company/codes')
    GLOBAL_CODES.setCompany(result.data)
    return result
  },
  async getBusinessIds () {
    const result = await axios.get('/api/v1.0/business/codes')
    GLOBAL_CODES.setBusiness(result.data)
    return result
  },

  async getDepartmentIds () {
    const result = await axios.get('/api/v1.0/department/codes')
    GLOBAL_CODES.setDepartment(result.data)
    return result
  },
  async getProgramCodes () {
    const result = await axios.get('/api/v1.0/program/codes')
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
