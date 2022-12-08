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
