export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/alarm', { params: search })
  },
  update (notifyTmpltId, alarmForm) {
    return axios.post(`/api/v1.0/alarm/${notifyTmpltId}`, alarmForm)
  },
  save (alarmForm) {
    return axios.post('/api/v1.0/alarm', alarmForm)
  },
  load (search) {
    return axios.get('/api/v1.0/alarm/detail', { params: search })
  },
  delete (data) {
    return axios.post('/api/v1.0/alarm/delete', data)
  },
  updateAlarmReceiver (data) {
    return axios.post('/api/v1.0/alarm/updateAlarmReceiver', data)
  },
  alarmList (search, page = 1) {
    search.pageNum = page
    return axios.get('/api/v1.0/alarm/alarm', { params: search })
  },
  alarmCnt (search) {
    return axios.get('/api/v1.0/alarm/alarmCnt', { params: search })
  },
  loadAlarm (notifyId) {
    return axios.get(`/api/v1.0/alarm/detailAlarm/${notifyId}`)
  },
  updateAlarm (data) {
    return axios.post('/api/v1.0/alarm/updateAlarm', data)
  }
})
