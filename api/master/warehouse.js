export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/warehouse', { params: search })
  },
  update (data) {
    return axios.post('/api/v1.0/warehouse', data)
  }
})
