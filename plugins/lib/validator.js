export default (ctx, inject) => {
  const validator = {
    required: (label) => {
      return v => (v && (v.length ? v.length > 0 : true)) || `[${label}]  필수 항목입니다.`
    },
    minLength: (label, minLength) => {
      return v => (v && v.length >= minLength) || `[${label}] 최소 ${minLength}이상 입력 가능합니다. `
    },
    maxLength: (label, maxLength) => {
      return v => (v && v.length <= maxLength) || `[${label}] 최대 ${maxLength}까지 입력 가능합니다. `
    },
    isEmail: (label) => {
      /* eslint-disable no-useless-escape */
      const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      return v => (v && regex.test(v)) || `[${label}]  eMail 형식에 맞게 입력 하세요. `
    },
    isNumber: (label) => {
      const regex = /^[0-9]*$/
      return v => (v && regex.test(v)) || `[${label}] 숫자만 입력 가능 합니다.`
    },
    isAlphabet: (label) => {
      const regex = /^[a-zA-Z]*$/
      return v => (v && regex.test(v)) || `[${label}] 영문만 입력 가능 합니다.`
    },
    isAlphabetBar: (label) => {
      const regex = /^[a-zA-Z_]*$/
      return v => (v && regex.test(v)) || `[${label}] 영문,밑줄(_)만 입력 가능 합니다.`
    },
    isAlphabetNumber: (label) => {
      const regex = /^[a-zA-Z0-9]*$/
      return v => (v && regex.test(v)) || `[${label}] 영문,숫자만 입력 가능 합니다.`
    },
    isAlphabetHangul: (label) => {
      const regex = /^[a-zA-Zㄱ-ㅎ가-힣]*$/
      return v => (v && regex.test(v)) || `[${label}] 한글,영문만 입력 가능 합니다.`
    },
    isIp: (label) => {
      const regex = /^[0-9.]*$/
      return v => (v && regex.test(v)) || `[${label}] 숫자, dot(.)만 입력 가능 합니다.`
    },
    requiredSelect: (label) => {
      return v => (v && (v.length ? v.length > 0 : true)) || `[${label}] 필수 선택항목입니다.`
    },
    isURL: (label) => {
      const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/
      return v => (v ? regex.test(v) : true) || `[${label}] URL 형식에 맞게 입력 하세요.`
    },
    maxLengthString: (label, maxLength) => {
      return v => (v && v.length <= maxLength) || `[${label}] 최대 ${maxLength}자까지 입력 가능합니다. `
    },
    maxLengthByte: (label, maxLength) => {
      return (v) => {
        if (v) {
          const byteLen = v.split('')
            .map(s => s.charCodeAt(0))
            .reduce((byteLen, unicodeDecimalValue) => byteLen + ((unicodeDecimalValue >> 7) ? 2 : 1), 0)

          if (byteLen > maxLength) {
            return `[${label}] 최대 ${maxLength} Byte까지 입력 가능합니다.`
          }
        }
        return true
      }
    },
    checkGroupMoreThanOne: (label) => {
      return v => (v && v.length > 0) || `[${label}]  필수 항목입니다.`
    },
    isPassword: (label, loginId, currentPswd) => {
      return (v) => {
        if (v) {
          const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/
          const regex1 = /(\w)\1\1/

          if (!regex.test(v)) {
            return '영문(대소문자 구분), 숫자, 특수문자의 2 개 이상 조합 10~20 자까지 가능합니다.'
          }

          if (regex1.test(v)) {
            return '동일 문자를 3회 이상 사용할 수 없습니다.'
          }

          if (v === loginId) {
            return '아이디와 동일한 비밀번호를 사용할 수 없습니다.'
          }

          if (v === currentPswd) {
            return '이전 비밀번호는 사용하실 수 없습니다.'
          }
        }

        return true
      }
    }
  }

  inject('validator', validator)
}
