export default axios => ({
  getCommonCodes (params) {
    const data = params.map((codeGroupId) => { return { codeGroupId } })
    return axios.post('/api/v1.0/code/codes', data)
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
