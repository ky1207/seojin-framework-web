export const DateFormatter = (obj) => {
  return new Date(obj.value).format('yyyy.MM.dd HH:mm:ss')
}

export const GLOBAL_CODES = {
  codes: [],
  // 공통코드가 아니라서 중복 가능성이 있어 따로 유지함
  company: [],
  business: [],
  warehouse: [],
  department: [],
  setCodes (codes) {
    codes.forEach((e) => {
      this.codes[e.subCode] = e.val
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
  setBusiness (business) {
    business.forEach((e) => {
      this.business[e.value] = e.text
    })
  },
  setWarehouse (warehouse) {
    warehouse.forEach((e) => {
      this.warehouse[e.value] = e.text
    })
  },
  getCompany (key) {
    return this.company[key]
  },
  getBusiness (key) {
    return this.business[key]
  },
  setDepartment (department) {
    department.forEach((e) => {
      this.department[e.value] = e.text
    })
  },
  getDepartment (key) {
    return this.department[key]
  },
  getWarehouse (key) {
    return this.warehouse[key]
  }
}

export const CodeFormatter = (obj) => {
  return GLOBAL_CODES.getCode(obj.value)
}

// map을 이용한 경우 1/0 , object boolean은 true/false이다
export const YNFormatter = (obj) => {
  return (obj.value === 1 || obj.value === true) ? 'Y' : 'N'
}

export const MultiLanguageFormatter = (obj) => {
  if (obj.value && obj.value.length > 0) { return obj.value[0].val }
  return ''
}

export const CompanyFormatter = (obj) => {
  return GLOBAL_CODES.getCompany(obj.value)
}

export const BusinessFormatter = (obj) => {
  return GLOBAL_CODES.getBusiness(obj.value)
}

export const DepartmentFormatter = (obj) => {
  return GLOBAL_CODES.getDepartment(obj.value)
}
export const WarehouseFormatter = (obj) => {
  return GLOBAL_CODES.getWarehouse(obj.value)
}
