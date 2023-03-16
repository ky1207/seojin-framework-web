import { serialize } from 'object-to-formdata'

export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/appUpdate', { params: search })
  },
  load (updateId) {
    return axios.get(`/api/v1.0/appUpdate/${updateId}`)
  },
  save (appUpdateDetail) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post('/api/v1.0/appUpdate', serialize(appUpdateDetail, { indices: true, dotsForObjectNotation: true }), axiosConfig)
  },
  update (updateId, formData) {
    return axios.post(`/api/v1.0/appUpdate/${updateId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  downloadFile (fileId) {
    return axios.get(`/api/v1.0/appUpdate/downloadFile/${fileId}`)
  }
})
