export const DateFormatter = (obj) => {
  return new Date(obj.value).format('yyyy.MM.dd HH:mm:ss')
}

export const GLOBAL_CODES = {
  codes: [],
  // 공통코드가 아니라서 중복 가능성이 있어 따로 유지함
  company: [],
  setCodes (codes) {
    codes.forEach((e) => {
      this.codes[e.codeId] = e.val
    })
  },
  getCode (key) {
    return this.codes[key]
  },
  setCompany (company) {
    company.forEach((e) => {
      this.company[e.value] = e.text
    })
  },
  getCompany (key) {
    return this.company[key]
  }
}

export const CodeFormatter = (obj) => {
  return GLOBAL_CODES.getCode(obj.value)
}

// map을 이용한 경우 1/0 , object boolean은 true/false이다
export const YNFormatter = (obj) => {
  return (obj.value === 1 || obj.value === true) ? 'Y' : 'N'
}

export const MulitLanguageFormatter = (obj) => {
  if (obj.value && obj.value.length > 0) { return obj.value[0].val }
  return ''
}

export const CompanyFormatter = (obj) => {
  return GLOBAL_CODES.getCompany(obj.value)
}
