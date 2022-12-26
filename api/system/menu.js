export default axios => ({
  list (params) {
    return axios.get('/api/v1.0/menu', { params })
  },
  menuAuth (path) {
    return axios.post('/api/v1.0/menu/menuAuth', { path })
  }
})
