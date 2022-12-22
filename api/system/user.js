export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/user', { params: search })
  }

})
