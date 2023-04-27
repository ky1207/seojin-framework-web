<template>
  <div class="btn-bar d-flex">
    <div class="btn-bar">
      <button class="btn-gray-bg" @click="refresh">
        <i class="bi bi-arrow-clockwise d-flex align-items-center" />
      </button>
      <button v-if="result.inqryAuth" class="btn-gray-bg" @click="call('searchClick')">
        {{ $t('components.ui.00001') }}
      </button>
      <button v-if="result.saveAuth" class="btn-gray-bg" @click="call('saveClick')">
        {{ $t('components.ui.00002') }}
      </button>
      <button v-if="result.fn1Auth" class="btn-gray-bg" @click="call('f1Click')">
        {{ action.f1Label }}
      </button>
      <button v-if="result.fn2Auth" class="btn-gray-bg" @click="call('f2Click')">
        {{ action.f1Label }}
      </button>
      <button v-if="result.fn3Auth" class="btn-gray-bg" @click="call('f3Click')">
        {{ action.f1Label }}
      </button>
      <button v-if="result.fn4Auth" class="btn-gray-bg" @click="call('f4Click')">
        {{ action.f1Label }}
      </button>
      <button v-if="result.fn5Auth" class="btn-gray-bg" @click="call('f5Click')">
        {{ action.f1Label }}
      </button>
      <button v-if="result.delAuth" class="btn-gray-bg" @click="call('delClick')">
        {{ action.f1Label }}
      </button>
      <button class="btn-blue-bg" @click="openProgramHelpModal()">
        HELP
      </button>
      <CommonHelp ref="programHelpModal" />
    </div>
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
    },
    async openProgramHelpModal () {
      const menu = this.$store.getters.getMenu(this.$route.path)
      if (menu === null) {
        this.$notify.info(this.$t('message.00013'))
        return
      }
      await this.$refs.programHelpModal.open(menu.progId)
    }
  }
}
</script>
