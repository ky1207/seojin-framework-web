<template>
  <SJModal ref="modal">
    <template #title>
      {{ $t('components.modal.00020') }}
    </template>
    <template #button>
      <button type="button" class="btn btn-secondary" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00082')">
            <SJInput
              id="form_title"
              v-model="help.title"
              :name="$t('page.system.00082')"
              type="text"
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00090')">
            <div
              class="cntn-area"
              v-html="help.cntn != null ? help.cntn.unescapeHtml() : ''"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('components.modal.00021')">
            <ul v-for="(file) in help.files" :key="file.fileId" class="list-group">
              <li v-if="file.method !== 'delete'" class="list-group-item" style="cursor : pointer;" @click="doDownload(file.fileId)">
                {{ file.filename }} ( {{ file.filesize }} byte)
              </li>
            </ul>
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      common: {},
      help: {},
      resolve: null,
      reject: null
    }
  },
  beforeDestroy () {
    // 위의 이벤트를 삭제 한다. this.$nuxt.$on('modal.show')
    this.$nuxt.$off('modal.show')
  },
  methods: {
    open () {
      this.$refs.modal.show()
      this.searchHelp()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.$refs.modal.hide()
      this.resolve([]) // response의 응답
    },
    doDownload (fileId) {
      this.$api.system.program.downloadHelp(fileId)
    },
    async searchHelp () {
      const result = await this.$api.system.program.loadHelp('P00000000001')
      this.help = result.data
    }
  }
}
</script>
