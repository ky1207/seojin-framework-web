import * as bootsrtap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default ({ app }, inject) => {
  inject('bootstrap', bootsrtap)
}
