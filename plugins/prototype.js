import { consts as CONSTS } from './const'

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
  }
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    const subjectString = this.toString()
    if (typeof position !== 'number' || !isFinite(position) ||
            Math.floor(position) !== position ||
            position > subjectString.length) {
      position = subjectString.length
    }
    position -= searchString.length
    const lastIndex = subjectString.indexOf(searchString, position)
    return lastIndex !== -1 && lastIndex === position
  }
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  }
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    const args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
    })
  }
}

String.prototype.replaceAll = function (from, to) {
  return this.replace(new RegExp(from, 'g'), to)
}

String.prototype.string = function (len) {
  let s = ''
  let i = 0
  while (i++ < len) {
    s += this
  }
  return s
}

String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this
}

// String.prototype.formatter = function (value, format) {
//   const fs = format.split('')
//   let r = ''
//   let i = 0
//   $.each(fs, function (x, c) {
//     if (fs[x] === '#') {
//       if ($.type(value[i]) !== 'undefined') {
//         r += value[i]
//       }
//       ;
//       i++
//     } else {
//       r += fs[x]
//     }
//     ;
//   })
//   if (i !== value.length) {
//     r += value.substring(i)
//   }
//   ;
//   return r
// }

/**
 * yyyyMMddhhmmss 형식의 문자열을 yyyy.MM.dd hh:mm:ss 형식으로 변환한다.
 */
String.prototype.displayDateFormat = function () {
  return this.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
    '$1.$2.$3 $4:$5:$6')
}

/*
 * 한글은 2byte 처리한 길이를 리턴한다. 3byte 변경
 */
// String.prototype.uniLength = function () {
//   let strByteLength = 0
//   strByteLength = (function (s, b, i, c) {
//     for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11
//       ? 3
//       : c >> 7 ? 2 : 1) { ; }
//     return b
//   })(this)

//   return strByteLength
// }

String.prototype.escapeHtml = function () {
  return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g,
    '&quot;')
}

String.prototype.unescapeHtml = function () {
  return this.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(
    /&gt;/g, '>').replace(/&quot;/g, '"').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
}

/***************************************************************************
 * 날짜 형식을 지정한다.
 *
 * @param t
 *            날짜 형식
 */
Date.prototype.format = function (f) {
  if (!this.valueOf()) { return ' ' }
  f = f || CONSTS.DEFAULT_DATETIME_PATTERN

  const weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const d = this

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear()
      case 'yy':
        return (d.getFullYear() % 1000).zf(2)
      case 'MM':
        return (d.getMonth() + 1).zf(2)
      case 'dd':
        return d.getDate().zf(2)
      case 'E':
        return weekName[d.getDay()]
      case 'HH':
        return d.getHours().zf(2)
      case 'hh':
        return (d.getHours() % 12 || 12).zf(2)
      case 'mm':
        return d.getMinutes().zf(2)
      case 'ss':
        return d.getSeconds().zf(2)
      case 'a/p':
        return d.getHours() < 12 ? '오전' : '오후'
      default:
        return $1
    }
  })
}

/**
 * 일 계산
 * @param {*} days
 * @returns
 */
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

/**
 * 주 계산
 * @param {} weeks
 * @returns
 */
Date.prototype.addWeeks = function (weeks) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + (weeks * 7))
  return date
}

/**
 * 월 계산
 * @param {*} months
 * @returns
 */
Date.prototype.addMonths = function (months) {
  const date = new Date(this.valueOf())
  date.setMonth(date.getMonth() + months)
  return date
}

/**
 * 년 계산
 * @param {*} years
 * @returns
 */
Date.prototype.addYears = function (years) {
  const date = new Date(this.valueOf())
  date.setMonth(date.getMonth() + (years * 12))
  return date
}

Number.prototype.zf = function (len) {
  return this.toString().zf(len)
}

// /**
//    * 숫자 형식을 지정 한다.
//    *
//    * format( "#,##0.####", 1234567.890 ); // output: "1,234,567.89" format( "$
//    * #,###.00", -1234567.890 ); // output: "$ -1,234,567.89"
//    */
// Number.prototype.format = function (pattern) {
//   return format(pattern, this)
// }
