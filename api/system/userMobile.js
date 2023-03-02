export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/userMobile', { params: search })
  },
  update (data) {
    return axios.post('/api/v1.0/userMobile', data)
  }
})
