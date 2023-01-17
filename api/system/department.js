export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/department', { params: search })
  },
  load (deptId) {
    return axios.get(`/api/v1.0/department/${deptId}`)
  },
  update (deptId, dept) {
    return axios.post(`/api/v1.0/department/${deptId}`, dept)
  },
  delete (depts) {
    return axios.delete('/api/v1.0/department', { data: depts })
  }

})
