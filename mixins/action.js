
const ACTION = {
  data () {
    return {
      ACTION: {}
    }
  },
  created () {
    if (this.ACTION_REGISTRY) {
      this.ACTION = this.ACTION_makeAction()
    } else {
      alert('ACTION_REGISTRY is not defined!')
    }
  },
  methods: {
    ACTION_makeAction () {
      return this.ACTION_REGISTRY()
    }
  }
}

export default ACTION
