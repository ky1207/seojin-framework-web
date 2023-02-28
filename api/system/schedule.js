export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/system/schedule', { params: search })
  },
  findSchedule (schedule) {
    return axios.get(`/api/v1.0/system/schedule/${schedule.jobGroup}/${schedule.jobName}`)
  },
  insertSchedule (schedule) {
    return axios.post('/api/v1.0/system/schedule', schedule)
  },
  modifySchedule (schedule) {
    return axios.put(`/api/v1.0/system/schedule/${schedule.jobGroup}/${schedule.jobName}`, schedule)
  },
  resumeSchedule (schedule) {
    return axios.put(`/api/v1.0/system/schedule/${schedule.jobGroup}/${schedule.jobName}/resume`)
  },
  executeSchedule (schedule) {
    return axios.post('/api/v1.0/system/schedule/simple', schedule)
  },
  pauseSchedule (schedule) {
    return axios.put(`/api/v1.0/system/schedule/${schedule.jobGroup}/${schedule.jobName}/pause`)
  },
  deleteSchedule (schedule) {
    return axios.delete(`/api/v1.0/system/schedule/${schedule.jobGroup}/${schedule.jobName}`, { data: schedule })
  },
  scheduleLog (schedule, page = 1) {
    return axios.get(`/api/v1.0/system/schedule/${schedule.jobGroup}/${schedule.jobName}/schedulelog`, { params: { pageNum: page } })
  },
  batchJobLog (scheduleLog) {
    return axios.get(`/api/v1.0/system/schedule/${scheduleLog.jobName}/batchjoblog/${scheduleLog.jobExecutionId}`)
  },
  batchStepLog (batchJobLog) {
    return axios.get(`/api/v1.0/system/schedule/batchsteplog/${batchJobLog.jobExecutionId}`)
  }
})
