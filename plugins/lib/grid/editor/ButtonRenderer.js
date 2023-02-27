export class ButtonRenderer {
  constructor (props) {
    const el = document.createElement('button')
    el.className = 'btn btn-mb3 btn-mr3 btn-secondary'
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
