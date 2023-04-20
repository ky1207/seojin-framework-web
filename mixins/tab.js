const TAB = {
  meta: {
    title: '...' // 이동시 잠시 보여지는 값.
  },
  computed: {
    // context 이용시 ,meta 가 아닌 computed: routeTab() 이용해야함
    routeTab () {
      return {
        title: this._getTabMenuName(this.$route.path),
        closable: true
      }
    }
  },
  methods: {
    _getTabMenuName (url) {
      const menu = this.$store.getters.getMenu(url)
      return menu ? menu.menuName : ''
    }
  },
  mounted () {
    // if (this.$tabs.items.length > 14) {
    //   setTimeout(() => {
    //     const item = this.$tabs.items[1]
    //     this.$tabs.close(item.id)
    //   }, 100)
    // }
  }
}

export default TAB
