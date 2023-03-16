import { serialize } from 'object-to-formdata'
import Utils from '@/api/utils'

export default axios => ({
  list (page = 1) {
    return axios.get('/api/v1.0/sample', { params: { pageNum: page } })
  },
  write (sample) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post('/api/v1.0/sample', serialize(sample, { indices: true, dotsForObjectNotation: true }), axiosConfig)
  },
  async download (fileId) {
    const response = await axios.get(`/api/v1.0/sample/download/${fileId}`)
    Utils.fileDownload(response)
  }
})
