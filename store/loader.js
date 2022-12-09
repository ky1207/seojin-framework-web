// loader용 vuex는 loader에서만 사용하므로 별로 api는 작성하지 않음.
export const state = () => ({
  loading: false
})

export const mutations = {
  loading (state, loading) {
    state.loading = loading
  }
}

export const actions = {
  loading (context, loading) {
    context.commit('loading', loading)
  }
}

export const getters = {
  isLoading: state => () => {
    return state.loading
  }
}
