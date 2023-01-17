export default axios => ({
  list (search, page = 1) {
    search.pageNum = page
    return axios.get('/api/v1.0/log', { params: search })
  }
})
