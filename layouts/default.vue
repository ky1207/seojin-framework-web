<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>

const home = { menuName: 'Home', menuUrl: '/', fullPathMenuName: '메뉴 > Home', fullPathMenuNo: '000^0001', menuNo: '1' }
export default {
  name: 'Default',
  data () {
    return {
      drawer: true,
      mini: false,
      menus: [{ children: [] }],
      tabs: [home],
      tabLimit: 10,
      current: home,
      cacheArray: ['index'],
      isReload: false,
      reloadMenu: null

    }
  },
  async fetch () {
    this.$store.dispatch('favorite/loadFavorite')
    // 로그인에서 넘어오는 경우 빠르게 전달해야함.
    if (this.$route.path === '/') {
      this.$store.dispatch('setMenu', this.current)
    }
    const result = await this.$axios.get('/api/v1.0/common/menu')
    this.menus = this.$tree.treeGridSort(result.data)

    // 현재 메뉴를 찾아
    if (this.$route.path !== '/') {
      const menu = this.$tree.searchTree(this.menus[0], 'menuUrl', this.$route.path)
      /**
       * 메뉴가 아닌 일반화면일경우, 상위메뉴 선택
       */
      if (menu.menuTypeCode === this.$consts.MENU_TYPE_VIEW) {
        this.reloadMenu = this.$tree.searchTree(this.menus[0], 'menuNo', menu.upMenuNo)

        this.$store.dispatch('setMenu', this.reloadMenu)
        this.isReload = true
        // ssr:false일 경우 mounted와 동시에 실행된다.
        // 여기서 강체 처리한다.
        // serverside에서는 페이지 이동이 되지 않는다.
        if (process.client) { this.checkReload() }
        return
      }
      if (menu === null) {
        this.$nuxt.error({ statusCode: 500, message: '메뉴가 없습니다.' })
        return
      }
      this.current = menu
      this.addTab(menu)
      this.linkTo(menu)
    }
    this.$store.dispatch('setMenu', this.current)
  },
  computed: {
    getFavorites () {
      return this.$store.getters['favorite/getFavorites']()
    },
    hasFavorite () {
      const favorites = this.getFavorites
      return favorites?.length > 0
    }

  },
  watch: {
    $route (to, from) {
      if (to.path !== from.path) {
        let menu = home
        if (to.path !== '/') {
          menu = this.$tree.searchTree(this.menus[0], 'menuUrl', to.path)
        }

        this.addTab(menu)
        if (menu.menuTypeCode !== this.$consts.MENU_TYPE_VIEW) {
          this.current = menu
        }
        this.$store.dispatch('setMenu', menu)
      }
    }
  },
  mounted () {
    this.checkReload()
  },
  methods: {
    checkReload () {
      if (this.isReload) {
        this.$router.push(this.reloadMenu.menuUrl)
      }
    },
    selectNode (menu) {
      if (this.tabs.length === this.tabLimit) {
        this.$notify.info(`탭은 ${this.tabLimit} 개까지만 가능합니다.`)
        return
      }
      if (menu) {
        // const menu = this.$tree.searchTree(this.menus[0], 'menuNo', menuNo[0])
        if (!Object.prototype.hasOwnProperty.call(menu, 'children') || (menu.menuTypeCode !== this.$consts.MENU_TYPE_VIEW)) {
          this.linkTo(menu)
        }
      }
    },
    isOpen (menuNo) {
      return this.current?.fullPathMenuNo?.split('^').includes(menuNo)
    },
    linkTo (menu) {
      this.current = menu
      if (menu.menuUrl) { this.$router.push(menu.menuUrl) }
    },
    addTab (menu) {
      if (this.tabs.findIndex(e => e.menuUrl === menu.menuUrl) < 0 && menu.menuTypeCode !== this.$consts.MENU_TYPE_VIEW) {
      // 최초이면
        // menu.vuepath = this.$route.matched[0].components.default.options.name

        this.cacheArray.push(this.$route.name) // cache추가
        this.tabs.push(menu)
      }
    },
    enableTab (tab) {
      return this.$store.getters.getCurrentMenu().menuUrl === tab.menuUrl || this.$store.getters.getCurrentMenu().upMenuNo === tab.menuNo
    },
    remove (menu) {
      const index = this.tabs.findIndex(e => e.menuName === menu.menuName)
      this.tabs.splice(index, 1)
      this.cacheArray.splice(index, 1) // cache 삭제
      this.linkTo(this.tabs[this.tabs.length - 1])
    },
    resetTab () {
      this.tabs.splice(1)
      this.cacheArray.splice(1) // cache 삭제
      this.linkTo(this.tabs[0])
    },
    logout () {
      this.$auth.logout()
    },
    goFavorite (favortie) {
      // this.$router.push(favortie.menuUrl)
      const menu = this.$tree.searchTree(this.menus[0], 'menuNo', favortie.menuNo)
      this.linkTo(menu)
    },
    openMyself () {
      this.$refs.adminDetailMyself.open(this.$auth.user.adminNo)
    }
  }
}
</script>
<style>
</style>
