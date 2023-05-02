<template>
  <SJModal ref="modal">
    <template #title>
      {{ $t('components.modal.00020') }}
    </template>
    <template #button>
      <button class="btn-gray-bg" @click="close">
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
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00090')">
            <div
              class="Help_content-area"
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
      help: {},
      progId: null
    }
  },
  beforeDestroy () {
    this.$nuxt.$off('modal.show')
  },
  methods: {
    async open (progId) {
      const result = await this.searchHelp(progId)
      if (result.data.progId === undefined) {
        this.$notify.info(this.$t('message.00013'))
        return
      }
      this.$refs.modal.show()
      this.help = result.data
    },
    close () {
      this.$refs.modal.hide()
    },
    doDownload (fileId) {
      this.$api.system.program.downloadHelp(fileId)
    },
    searchHelp (progId) {
      return this.$api.system.program.loadHelp(progId)
    }
  }
}
</script>
<style>
.Help_content-area {
  border:1px solid #ced4da;
  height:415px;
  overflow:auto;
}
.Help_content-area img {
  width: 100%;
  height: auto;
}

</style>
