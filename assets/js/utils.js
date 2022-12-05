const Utils = {

  isEmpty (str) {
    return (str === null || str === undefined || str.length < 1)
  },
  isNotEmpty (str) {
    return !this.isEmpty(str)
  }
}

export default Utils
