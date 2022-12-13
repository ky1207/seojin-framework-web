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

// map을 이용한 경우 1/0 , object boolean은 true/false이다
export const YNFormatter = (obj) => {
  return (obj.value === 1 || obj.value === true) ? 'Yes' : 'No'
}
