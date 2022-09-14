import { RefreshScheme } from '~auth/runtime'

export default class RrefreshWithUserScheme extends RefreshScheme {
  updateTokens (response, { isRefreshing = false, updateOnRefresh = true } = {}) {
    super.updateTokens(response, { isRefreshing, updateOnRefresh })

    if (!isRefreshing) {
      this.$auth.$storage.setUniversal('user', response.data.user)
      this.$auth.setUser(response.data.user)
    }
  }

  fetchUser (endpont) {
    const user = this.$auth.$storage.getUniversal('user')
    if (user !== null) {
      this.$auth.setUser(user)
    }
  }

  reset ({ resetInterceptor = true } = {}) {
    super.reset({ resetInterceptor })
    this.$auth.$storage.removeUniversal('user')
  }
}
