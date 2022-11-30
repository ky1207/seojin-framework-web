<template>
  <div>
    <button v-if="result.inqryAuth" type="button" class="btn btn-outline-primary">
      조회
    </button>
    <button v-if="result.saveAuth" type="button" class="btn btn-outline-primary">
      저장
    </button>
    <button v-if="result.fn1Auth" type="button" class="btn btn-outline-info" @click="f1Click">
      {{ f1Label }} (A1)
    </button>
    <button v-if="result.fn2Auth" type="button" class="btn btn-outline-info" @click="f2Click">
      {{ f2Label }} (A2)
    </button>
    <button v-if="result.fn3Auth" type="button" class="btn btn-outline-info" @click="f3Click">
      {{ f3Label }} (A3)
    </button>
    <button v-if="result.fn4Auth" type="button" class="btn btn-outline-info" @click="f4Click">
      {{ f4Label }} (A4)
    </button>
    <button v-if="result.fn5Auth" type="button" class="btn btn-outline-info" @click="f5Click">
      {{ f5Label }} (A5)
    </button>
    <button v-if="result.delAuth" type="button" class="btn btn-outline-secondary">
      삭제
    </button>
    <button type="button" class="btn btn-outline-dark">
      HELP
    </button>
  </div>
</template>

<script>
export default {
  props: {
    f1Label: {
      type: String,
      default: ''
    },
    f1Click: {
      type: Function,
      default: () => {}
    },
    f2Label: {
      type: String,
      default: ''
    },
    f2Click: {
      type: Function,
      default: () => {}
    },

    f3Label: {
      type: String,
      default: ''
    },
    f3Click: {
      type: Function,
      default: () => {}
    },

    f4Label: {
      type: String,
      default: ''
    },
    f4Click: {
      type: Function,
      default: () => {}
    },

    f5Label: {
      type: String,
      default: ''
    },
    f5Click: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      result: {
        inqryAuth: true,
        saveAuth: true,
        fn1Auth: true,
        fn2Auth: true,
        fn3Auth: true,
        fn4Auth: true,
        fn5Auth: true,
        delAuth: true
      }
    }
  },
  created () {
    // TODO: 권한조회...
    console.log('created')
    console.log(this.$route.path)
    console.log(this.$route.fullPath)
    console.log(this.$route)
  }
}
</script>
