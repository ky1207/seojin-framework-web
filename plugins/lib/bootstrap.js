import * as bootsrtap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default ({ app }, inject) => {
  inject('bootstrap', bootsrtap)
}