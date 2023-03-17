import { serialize } from 'object-to-formdata'
import Utils from '~/api/utils'

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
  update (appUpdateDetail) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post('/api/v1.0/appUpdate/update/', serialize(appUpdateDetail, { indices: true, dotsForObjectNotation: true }), axiosConfig)
  },
  async download (fileId) {
    const response = await axios.get(`/api/v1.0/appUpdate/download/${fileId}`)
    Utils.fileDownload(response)
  }
})
