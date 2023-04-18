export default ({ $axios, app, redirect, store, error: nuxtError }) => {
  $axios.onRequest((config) => {
    config.headers['x-forwarded-for'] = store.state.client.ip
    config.headers['Accept-Language'] = app.i18n.getLocaleCookie()
    app.store.dispatch('loader/loading', true)
    return config
  })
  $axios.onError((e) => {
    app.store.dispatch('loader/loading', false)
    const code = parseInt(e.response && e.response.status)

    if ([504, 401, 403].includes(code)) { // api 서버 응답 없음
      nuxtError(e)
      return false
    }

    if (e.name === 'ExpiredAuthSessionError') {
      // 모든 token이 만료된경우
      nuxtError(e)
      return new Promise(() => { })
    }
    app.$notify.error(e.response.data.message)
    return new Promise(() => { })
  })

  $axios.onResponse((response) => {
    app.store.dispatch('loader/loading', false)

    if (Object.hasOwn(response.data, 'data')) {
      response.data = response.data.data
    }
    return response
  })
}
