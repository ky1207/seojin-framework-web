const TAB = {
  meta: {
    title: '...' // 이동시 잠시 보여지는 값.
  },
  computed: {
    // context 이용시 ,meta 가 아닌 computed: routeTab() 이용해야함
    routeTab () {
      return {
        title: this._getTabMeunName(this.$route.path),
        closable: true
      }
    }
  },
  methods: {
    _getTabMeunName (url) {
      // TODO: menu목록에서 이름 가져오는 작업 필요
      return 'Tab Template'
    }
  }
}

export default TAB
