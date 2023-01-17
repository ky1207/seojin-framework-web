export default axios => ({
  list (page = 1) {
    return axios.get('/api/v1.0/sample', { params: { pageNum: page } })
  }
})
