const Utils = {

  isEmpty (str) {
    return (str === null || str === undefined || str.length < 1)
  },
  isNotEmpty (str) {
    return !this.isEmpty(str)
  },
  fileDownload (response) {
    const file = new File([''], response.data.filename) // 파일 객체 생성
    const utf8Array = Uint8Array.from(atob(response.data.content), c => c.charCodeAt(0))
    const blob = new Blob([utf8Array], { type: file.type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = response.data.filename
    link.click()
    window.URL.revokeObjectURL(url)
  },
  fileDownloadByFile (file) {
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    link.click()
    window.URL.revokeObjectURL(url)
  }
}

export default Utils
