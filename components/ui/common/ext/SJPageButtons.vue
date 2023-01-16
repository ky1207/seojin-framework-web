<template>
  <div>
    <button type="button" class="btn btn-outline-dark" @click="refresh">
      <i class="bi bi-arrow-clockwise" />
    </button>
    <button v-if="result.inqryAuth" type="button" class="btn btn-outline-primary" @click="call('searchClick')">
      {{ $t('components.ui.00001') }} <i class="bi bi-search" />
    </button>
    <button v-if="result.saveAuth" type="button" class="btn btn-outline-primary" @click="call('saveClick')">
      {{ $t('components.ui.00002') }} <i class="bi bi-save-fill" />
    </button>
    <button v-if="result.fn1Auth" type="button" class="btn btn-outline-info" @click="call('f1Click')">
      {{ action.f1Label }} (A1)
    </button>
    <button v-if="result.fn2Auth" type="button" class="btn btn-outline-info" @click="call('f2Click')">
      {{ action.f2Label }} (A2)
    </button>
    <button v-if="result.fn3Auth" type="button" class="btn btn-outline-info" @click="call('f3Click')">
      {{ action.f3Label }} (A3)
    </button>
    <button v-if="result.fn4Auth" type="button" class="btn btn-outline-info" @click="call('f4Click')">
      {{ action.f4Label }} (A4)
    </button>
    <button v-if="result.fn5Auth" type="button" class="btn btn-outline-info" @click="call('f5Click')">
      {{ action.f5Label }} (A5)
    </button>
    <button v-if="result.delAuth" type="button" class="btn btn-outline-secondary" @click="call('delClick')">
      {{ $t('components.ui.00003') }} <i class="bi bi-trash" />
    </button>
    <button type="button" class="btn btn-outline-dark">
      HELP <i class="bi bi-question-lg" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: Object,
      default: () => {}
    }

  },
  data () {
    return {
      result: {}
    }
  },
  async created () {
    const program = await this.$api.system.menu.menuAuth(this.$route.path)
    this.result = program.data
  },
  methods: {
    refresh () {
      this.$tabs.refresh()
    },
    call (name) {
      const fnc = this.action[name]
      if (fnc) {
        fnc()
      } else {
        alert('function is not defined')
      }
    }
  }
}
</script>
