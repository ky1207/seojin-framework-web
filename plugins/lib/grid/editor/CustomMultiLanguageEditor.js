export class CustomMultiLanguageEditor {
  constructor (props) {
    if (props.value === null) {
      console.log('null')
      props.value = [{ langCode: 'ko', val: '' }]
    }
    this.data = [...props.value]

    const el = document.createElement('div')

    const koDiv = document.createElement('div')
    const enDiv = document.createElement('div')
    const viDiv = document.createElement('div')

    this.ko = document.createElement('input')
    this.ko.type = 'text'
    this.ko.value = this.getValueByLocale('ko').val
    koDiv.append(this.ko)

    this.en = document.createElement('input')
    this.en.type = 'text'
    this.en.value = this.getValueByLocale('en').val
    enDiv.append(this.en)

    this.vi = document.createElement('input')
    this.vi.type = 'text'
    this.vi.value = this.getValueByLocale('vi').val
    viDiv.append(this.vi)

    el.append(koDiv, enDiv, viDiv)

    this.el = el
  }

  getElement () {
    return this.el
  }

  getValueByLocale (locale) {
    const idx = this.data.findIndex((e) => {
      return e.langCode === locale
    })
    if (idx >= 0) {
      return this.data[idx]
    }
    const initialize = { langCode: locale, val: '' }
    this.data.push(initialize)
    return initialize
  }

  getValue () {
    this.getValueByLocale('ko').val = this.ko.value
    this.getValueByLocale('en').val = this.en.value
    this.getValueByLocale('vi').val = this.vi.value

    return this.data
  }
}
