export default axios => ({
  list (params) {
    return axios.get('/api/v1.0/authority', { params })
  },
  save (authority) {
    return axios.post('/api/v1.0/authority', authority)
  },
  load (authGroupId) {
    return axios.get(`/api/v1.0/authority/${authGroupId}`)
  },
  update (authGroupId, data) {
    return axios.post(`/api/v1.0/authority/${authGroupId}`, data)
  }
})
