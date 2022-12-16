export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/program', { params: search })
  },
  update (data) {
    axios.post('/api/v1.0/program', data)
  }
})
