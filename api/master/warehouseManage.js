import { serialize } from 'object-to-formdata'
import Utils from '~/api/utils'

export default axios => ({
  list (search) {
    return axios.get('/api/v1.0/warehouse', { params: search })
  }

})
