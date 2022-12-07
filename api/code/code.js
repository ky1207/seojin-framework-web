export default axios => ({
  list (params) {
    return axios.get('/api/v1.0/code', { params })
  }
})
