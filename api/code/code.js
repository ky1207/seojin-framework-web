export default axios => ({
  list (params) {
    return axios.get('/api/v1.0/code', { params })
  },
  save (codeGroup) {
    return axios.post('/api/v1.0/code', codeGroup)
  }
})
