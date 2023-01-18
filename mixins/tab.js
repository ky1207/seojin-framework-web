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
  }
}

export default TAB
