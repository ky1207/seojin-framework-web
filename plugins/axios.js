import qs from 'qs'

export default ({ $axios, app, redirect, store, error: nuxtError }) => {
  $axios.onRequest((config) => {
    config.headers['x-forwarded-for'] = store.state.client.ip

    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'comma' })
    return config
  })
  $axios.onError((e) => {
    const code = parseInt(e.response && e.response.status)
    if ([504, 401, 403].includes(code)) { // api 서버 응답 없음
      nuxtError(e)
      return new Promise(() => { })
    }

    if (e.name === 'ExpiredAuthSessionError') {
      // 모든 token이 만료된경우
      nuxtError(e)
      return new Promise(() => { })
    }

    return Promise.reject(e)
  })

  $axios.onResponse((response) => {
    if (response.data.data) {
      response.data = response.data.data
    }
    return response
  })
}
