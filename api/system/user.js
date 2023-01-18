export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/user', { params: search })
  },
  load (userId) {
    return axios.get(`/api/v1.0/user/${userId}`)
  },
  save (userDetail) {
    return axios.post('/api/v1.0/user', userDetail)
  },
  update (userId, user) {
    return axios.post(`/api/v1.0/user/${userId}`, user)
  }
})
