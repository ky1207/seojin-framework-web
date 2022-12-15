export default axios => ({
  menuAuth (path) {
    return axios.post('/api/v1.0/menu/menuAuth', { path })
  }
})
