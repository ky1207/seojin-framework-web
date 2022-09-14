export const state = () => ({
  notifies: [],
  // Authoriy
  
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
    // serverside에서 client에 vuex 값 동기화 하지 못함
    // 처리되지  못하는  경우, TopNodify.vue에서 별도 처리함
    setTimeout(function () {
      context.commit('closeNotify')
    }, 2000)
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
