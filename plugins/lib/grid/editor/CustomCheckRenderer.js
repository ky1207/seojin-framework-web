export class CustomCheckRenderer {
  constructor (props) {
    let el
    if (props.value === 'N') {
      el = document.createElement('div')
      el.innerText = props.value
    } else {
      el = document.createElement('input')
      el.type = 'checkbox'
      el.value = props.value
      el.addEventListener('change', (e) => {
        const rowKey = props.rowKey
        const name = props.columnInfo.name

        props.grid.dispatch('setValue', rowKey, name, e.target.checked)
      })
    }

    this.el = el
    this.render(props)
  }

  getElement () {
    return this.el
  }

  render (props) {
    this.el.checked = false
    if (props.value === true || props.value === 1 || props.value === '1') {
      this.el.checked = true
    }
  }
}
