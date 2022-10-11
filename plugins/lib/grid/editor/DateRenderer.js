// eslint-disable-next-line no-unused-vars
export class DateRenderer {
  constructor (props) {
    const el = document.createElement('div')
    this.el = el

    this.render(props)
  }

  getElement () {
    return this.el
  }

  render (props) {
    this.el.innerText = new Date(props.value).format('yyyy.MM.dd HH:mm:ss')
  }
}
