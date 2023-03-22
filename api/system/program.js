import { serialize } from 'object-to-formdata'
import Utils from '~/api/utils'

export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/program', { params: search })
  },
  update (data) {
    return axios.post('/api/v1.0/program', data)
  },
  loadHelp (progId) {
    return axios.get(`/api/v1.0/program/help/${progId}`)
  },
  saveHelp (data) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post('/api/v1.0/program/help/', serialize(data, { indices: true, dotsForObjectNotation: true }), axiosConfig)
  },
  async downloadHelp (fileId) {
    const response = await axios.get(`/api/v1.0/program/downloadHelp/${fileId}`)
    Utils.fileDownload(response)
  }
})
