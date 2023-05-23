export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/business', { params: search })
  },
  load (bsnsId) {
    return axios.get(`/api/v1.0/business/${bsnsId}`)
  },
  save (businessCode) {
    return axios.post('/api/v1.0/business', businessCode)
  },
  update (bsnsId, business) {
    return axios.post(`/api/v1.0/business/${bsnsId}`, business)
  }
})
