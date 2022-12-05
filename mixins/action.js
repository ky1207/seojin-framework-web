
const ACTION = {
  data () {
    return {
      ACTION: {}
    }
  },
  created () {
    if (this._makeAction) {
      this.ACTION = this.ACTION_makeAction()
    } else {
      alert('_makeAction is not defined!')
    }
  },
  methods: {
    ACTION_makeAction () {
      return this._makeAction()
    }
  }
}

export default ACTION
