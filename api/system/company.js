export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/company', { params: search })
  },
  load (coId) {
    return axios.get(`/api/v1.0/company/${coId}`)
  },
  save (companyDetail) {
    return axios.post('/api/v1.0/company', companyDetail)
  },
  update (coId, company) {
    return axios.post(`/api/v1.0/company/${coId}`, company)
  }
})
