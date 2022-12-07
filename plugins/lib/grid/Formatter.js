export const DateFormatter = (obj) => {
  return new Date(obj.value).format('yyyy.MM.dd HH:mm:ss')
}

export const GLOBAL_CODES = {
  codes: [],
  setCodes (codes) {
    codes.forEach((e) => {
      this.codes[e.codeId] = e.val
    })
  },
  getCode (key) {
    return this.codes[key]
  }
}

export const CodeFormatter = (obj) => {
  return GLOBAL_CODES.getCode(obj.value)
}

export const YNFormatter = (obj) => {
  return (obj.value === 1) ? 'Yes' : 'No'
}
