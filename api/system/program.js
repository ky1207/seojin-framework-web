export default axios => ({
  programAuth (path) {
    return axios.post('/api/v1.0/program', { path })
  }
})
