const TAB = {
  computed: {
    // context 이용시 ,meta 가 아닌 computed: routeTab() 이용해야함
    routeTab () {
      return {
        title: this._getTabMeunName(),
        closable: true
      }
    }
  },
  methods: {
    _getTabMeunName (url) {
      return 'Tab Tempalte'
    }
  }
}

export default TAB
