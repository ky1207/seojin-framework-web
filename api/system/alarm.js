export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/alarm', { params: search })
  },
  update (data) {
    return axios.post('/api/v1.0/alarm', data)
  },
  load (search) {
    return axios.get('/api/v1.0/alarm/detail', { params: search })
  },
  updateAlarmReceiver (data) {
    return axios.post('/api/v1.0/alarm/updateAlarmReceiver', data)
  },
  alarmList (search, page = 1) {
    search.pageNum = page
    return axios.get('/api/v1.0/alarm/alarm', { params: search })
  }
})
