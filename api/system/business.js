export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/business', { params: search })
  }
})
