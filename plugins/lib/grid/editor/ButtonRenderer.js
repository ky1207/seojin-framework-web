export class ButtonRenderer {
  constructor (props) {
    const el = document.createElement('button')
    el.className = 'btn-gray-bg'
    this.el = el

    this.render(props)
  }

  getElement () {
    return this.el
  }

  render (props) {
    this.el.innerText = props.columnInfo.renderer.options.title
  }
}
