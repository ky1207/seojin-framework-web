export default async function ({ app, store, route }) {
  if (route.path === '/login') { return }
  if (store.getters.getMenus() === null) {
    const result = await app.$api.common.menu()
    const sortedTree = app.$tree.treeGridSort(result.data)[0]
    store.dispatch('setMenus', sortedTree)
  }
  store.dispatch('setCurrentUrl', route.path)
}
