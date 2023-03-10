export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/appUpdate', { params: search })
  },
  load (updateId) {
    return axios.get(`/api/v1.0/appUpdate/${updateId}`)
  },
  save (formData) {
    return axios.post('/api/v1.0/appUpdate', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  update (updateId, formData) {
    return axios.post(`/api/v1.0/appUpdate/${updateId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
})
