/**
 * client ip를 저장한다.
 * 최초 서버 request시
 */

export default async ({ $axios, store, env }) => {
  const result = await $axios.get(env.API_SERVER + '/api/v1.0/common/myIp')
  store.commit('client/setIp', result.data)
}
