/**
 * client ip를 저장한다.
 * 최초 서버 request시
 */

export default ({ req, store }) => {
  if (process.server) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
    store.commit('client/setIp', ip)
  }
  console.log('ipCheck')
}
