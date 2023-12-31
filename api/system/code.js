export default axios => ({
  list (params) {
    return axios.get('/api/v1.0/code', { params })
  },
  save (codeGroup) {
    return axios.post('/api/v1.0/code', codeGroup)
  },
  load (codeGroupId) {
    return axios.get(`/api/v1.0/code/${codeGroupId}`)
  },
  update (codeGroupId, data) {
    return axios.post(`/api/v1.0/code/${codeGroupId}`, data)
  }
})
