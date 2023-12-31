export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/alarm', { params: search })
  },
  update (alarmForm) {
    return axios.post('/api/v1.0/alarm/update', alarmForm)
  },
  save (alarmForm) {
    return axios.post('/api/v1.0/alarm', alarmForm)
  },
  getAlarmFormDupChk (search) {
    return axios.get('/api/v1.0/alarm/dupChk', { params: search })
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
  myAlamList (search, page = 1) {
    search.pageNum = page
    return axios.post('/api/v1.0/alarm/my-alarm', search)
  },
  alarmCnt () {
    return axios.get('/api/v1.0/alarm/alarmCnt')
  },
  loadAlarm (notifyId) {
    return axios.get(`/api/v1.0/alarm/detailAlarm/${notifyId}`)
  },
  readAlarm (alarms) {
    return axios.delete('/api/v1.0/alarm/readAlarm', { data: alarms })
  },
  deleteAlarm (alarms) {
    return axios.delete('/api/v1.0/alarm/deleteAlarm', { data: alarms })
  }
})
