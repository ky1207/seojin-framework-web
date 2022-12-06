export default axios => ({
  list () {
    return axios.get('/api/v1.0/sample')
  }
})
