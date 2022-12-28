export default axios => ({
  list (params) {
    return axios.get('/api/v1.0/menu', { params })
  },
  load (menuId) {
    return axios.get(`/api/v1.0/menu/${menuId}`)
  },
  update (menuId, menu) {
    return axios.post(`/api/v1.0/menu/${menuId}`, menu)
  },
  menuAuth (path) {
    return axios.post('/api/v1.0/menu/menuAuth', { path })
  }
})
