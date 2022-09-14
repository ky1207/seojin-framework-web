import Vue from 'vue'

export const capitalize = (value) => {
  if (!value) { return '' }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const unescapeHTML = (str) => {
  if (!str) { return '' }
  return str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  )
}

export const longToDateTime = (longdate, format) => {
  if (longdate == null) {
    return ''
  }

  const d = new Date(longdate)
  return d.format(format)
}

/**
 * 코드명 조회
 * ex) {{ 공통 코드 | codeDtlName(공통코드 리스트) }}
 * @param {*} codeDtlNo
 * @param {*} codeDtlList
 * @returns
 */
export const codeDtlName = (codeDtlNo, codeDtlList) => {
  if (codeDtlNo == null || codeDtlList == null) {
    return ''
  }
  return codeDtlList.find(code => code.codeDtlNo === codeDtlNo).codeDtlName
}

Vue.filter('capitalize', capitalize)
Vue.filter('unescapeHTML', unescapeHTML)
Vue.filter('longToDateTime', longToDateTime)
Vue.filter('codeDtlName', codeDtlName)
