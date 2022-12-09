export const state = () => ({
  notifies: [],
  // current menu
  currentMenu: null
})

export const mutations = {
  showNotify (state, notify) {
    state.notifies.push({ isOpen: true, content: notify.content, type: notify.type })
  },

  closeNotify (state) {
    state.notifies.shift()
  },

  // Menu
  setMenu (state, menu) {
    state.currentMenu = menu
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
  setMenu (context, menu) {
    context.commit('setMenu', menu)
  }

}

export const getters = {

  getCurrentMenu: state => () => {
    return state.currentMenu
  }

}
