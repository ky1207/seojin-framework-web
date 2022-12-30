export class CustomCheckRenderer {
  constructor (props) {
    let el
    if (props.value === 'false') {
      el = document.createElement('div')
      el.innerText = '-'
    } else {
      el = document.createElement('input')
      el.type = 'checkbox'
      el.value = props.value === '1' ? 'true' : 'false'

      props.grid.dispatch('setValue', props.rowKey, props.columnInfo.name, props.value === '1')
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
    if (props.value === true || props.value === 1) {
      this.el.checked = true
    }
  }
}
