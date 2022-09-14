export const state = () => ({
  // 즐겨찾기
  favorites: null

})

export const mutations = {
  setFavorites (state, favorites) {
    state.favorites = favorites
  },
  addFavorite (state, favorite) {
    state.favorites.push(favorite)
  },
  deleteFavorite (state, favorite) {
    const index = state.favorites.findIndex(e => e.menuNo === favorite.menuNo)
    state.favorites.splice(index, 1)
  }

}

export const actions = {

  async addFavorites (context, menu) {
    await this.$axios.post(`/api/v1.0/common/favorite/${menu.menuNo}`)

    context.commit('addFavorite', {
      menuNo: menu.menuNo,
      menuName: menu.menuName,
      menuUrl: menu.menuUrl
    })

    this.$notify.success('추가되었습니다.')

    // context.dispatch('loadFavorite')
  },
  async deleteFavorites (context, menu) {
    await this.$axios.delete(`/api/v1.0/common/favorite/${menu.menuNo}`)

    context.commit('deleteFavorite', {
      menuNo: menu.menuNo,
      menuName: menu.menuName,
      menuUrl: menu.menuUrl
    })
    this.$notify.success('삭제되었습니다.')

    // context.dispatch('loadFavorite')
  },
  async loadFavorite (context) {
    const result = await this.$axios.get('/api/v1.0/common/favorite')
    context.commit('setFavorites', result.data)
  },
  toggleFavorite (context, menu) {
    if (context.state.favorites.findIndex(item => item.menuNo === menu.menuNo) > -1) {
      context.dispatch('deleteFavorites', menu)
    } else {
      context.dispatch('addFavorites', menu)
    }
  }
}

export const getters = {
  isAdded: state => (menuNo) => {
    if (state.favorites === null) { return false }
    return state.favorites.findIndex(item => item.menuNo === menuNo) > -1
  },
  getFavorites: state => () => {
    return state.favorites
  }

}
