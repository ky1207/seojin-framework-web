/**
 *  window popup을  사용하는경우
 *  opener의 메소드에 접급 할 수 없기에 이벤트를 이용하며
 *  등록된 lisenter를 parent가 deactivated,beforeDestroy 되는 경우 삭제한다.
 *  Mixin 이름으로 메소드 및 data에 prefix 이용
 */
const POPUP = {
  data () {
    return {
      POPUP_EVENTS: []
    }
  },

  deactivated () {
    this.POPUP_EVENTS.forEach((event) => {
      this.$nuxt.$off(event)
      console.log('deactivated=' + event)
    })
    this.POPUP_EVENTS = []
  },
  beforeDestroy () {
    this.POPUP_EVENTS.forEach((event) => {
      this.$nuxt.$off(event)
      console.log('beforeDestroy=' + event)
    })
    this.POPUP_EVENTS = []
  },
  methods: {
    POPUP_OPEN (url, name, option, callback) {
      this.POPUP_EVENTS.push(name)
      // 중복 제거
      this.POPUP_EVENTS = this.POPUP_EVENTS.filter((item, index) => {
        return this.POPUP_EVENTS.indexOf(item) === index
      })

      window.open(url, name, option)
      // 창이름으로 event명을 정의
      this.$nuxt.$off(name)
      this.$nuxt.$once(name, callback)
    }
  }

}

export default POPUP
