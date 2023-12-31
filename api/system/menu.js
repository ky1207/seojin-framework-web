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
  menuFolderAuth (params) {
    return axios.get('/api/v1.0/menu/folder/authority/', { params })
  },
  menuAuth (path) {
    return axios.post('/api/v1.0/menu/menuAuth', { path })
  },
  insertMenu (menu) {
    return axios.post('/api/v1.0/menu', menu)
  },
  move (menuId, targetId, appended) {
    return axios.post(`/api/v1.0/menu/move/${menuId}`, { targetId, appended })
  },
  menuAuthByMenuId (menuId) {
    return axios.get(`/api/v1.0/menu/authority/menu/${menuId}`)
  },
  updateAuthByMenuId (menuId, data) {
    return axios.post(`/api/v1.0/menu/authority/menu/${menuId}`, data)
  },
  menuByAuth (params) {
    return axios.get('/api/v1.0/menu/authority/menuByAuth', { params })
  },
  updateMenuAuthByAuthority (data) {
    return axios.post('/api/v1.0/menu/authority/updateMenuAuth', data)
  }

})
