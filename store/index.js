import { tree } from '~/plugins/lib/tree'
export const state = () => ({
  notifies: [],
  menus: null,
  url: null
})

export const mutations = {
  showNotify (state, notify) {
    state.notifies.push({ isOpen: true, content: notify.content, type: notify.type })
  },

  closeNotify (state) {
    state.notifies.shift()
  },

  setMenus (state, menus) {
    state.menus = menus
  },

  setCurrentUrl (state, url) {
    state.url = url
  }

}

export const actions = {

  showNotify (context, notify) {
    context.commit('showNotify', notify)
    setTimeout(function () {
      context.commit('closeNotify')
    }, 3000)
  },
  closeNotify (context) {
    context.commit('closeNotify')
  },

  // menu
  setCurrentUrl (context, url) {
    context.commit('setCurrentUrl', url)
  },

  setMenus (context, menu) {
    context.commit('setMenus', menu)
  }

}

export const getters = {
  getCurrentUrl: state => () => {
    return state.url
  },
  getMenus: state => () => {
    return state.menus
  },
  getMenu: state => (path) => {
    if (state.menus === null || state.menus === undefined) { return null }
    return tree.searchTree(state.menus, 'progPath', path)
  },
  getSearchPath: state => (id) => {
    return tree.searchPath(state.menus, 'menuId', id)
  }

}
