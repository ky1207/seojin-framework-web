import { serialize } from 'object-to-formdata'
import Utils from '~/api/utils'

export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/warehouse', { params: search })
  },
  update (data) {
    return axios.post('/api/v1.0/warehouse', data)
  },
  // load (whseId) {
  //   return axios.get(`/api/v1.0/authority/${whseId}`)
  // },
  saveHelp (data) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post('/api/v1.0/warehouse/help/', serialize(data, { indices: true, dotsForObjectNotation: true }), axiosConfig)
  },
  async downloadHelp (fileId) {
    const response = await axios.get(`/api/v1.0/warehouse/downloadHelp/${fileId}`)
    Utils.fileDownload(response)
  }

})
