export class CodeRenderer {
  constructor (props) {
    const el = document.createElement('div')
    this.el = el

    this.render(props)
  }

  getElement () {
    return this.el
  }

  render (props) {
    props.value = 'ttt'
    this.el.innerText = String(props.value + '111')
  }
}
