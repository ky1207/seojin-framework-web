export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/alarm', { params: search })
  },
  update (data) {
    return axios.post('/api/v1.0/alarm', data)
  }
})
