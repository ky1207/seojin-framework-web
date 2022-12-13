export class CustomCheckBoxRenderer {
  constructor (props) {
    const el = document.createElement('input')
    el.type = 'checkbox'
    el.value = String(props.value)
    this.el = el
    this.el.addEventListener('change', (e) => {
      const rowKey = props.rowKey
      const name = props.columnInfo.name

      props.grid.dispatch('setValue', rowKey, name, e.target.checked)
    })
    this.render(props)
  }

  getElement () {
    return this.el
  }

  render (props) {
    this.el.checked = false
    if (props.value === true || props.value === 'true') {
      this.el.checked = true
    }
  }
}
