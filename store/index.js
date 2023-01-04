import { tree } from '~/plugins/lib/tree'
export const state = () => ({
  notifies: [],
  menus: []
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
  setMenus (context, menu) {
    context.commit('setMenus', menu)
  }

}

export const getters = {
  getCurrentMenu: state => (path) => {
    return tree.searchTree(state.menus, 'progPath', path)
  },
  getSearchPath: state => (id) => {
    return tree.searchPath(state.menus, 'menuId', id)
  }

}
