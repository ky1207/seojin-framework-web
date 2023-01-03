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
  delete (menus) {
    return axios.delete('/api/v1.0/menu', { data: menus })
  },
  menuProgramAuth (params) {
    return axios.get('/api/v1.0/menu/authority/', { params })
  },
  menuAuth (path) {
    return axios.post('/api/v1.0/menu/menuAuth', { path })
  },
  insertTempMenu (menu) {
    return axios.post('/api/v1.0/menu', menu)
  },
  move (menu) {
    return axios.post(`/api/v1.0/menu/move/${menu.menuId}`, menu)
  }
})
