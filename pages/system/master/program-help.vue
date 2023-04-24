<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00029')">
        <SJInput
          id="authName"
          v-model="search.progName"
          :name="$t('page.system.00029')"
          type="text"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00098')">
        <SJInput
          id="authName"
          v-model="search.progPath"
          :name="$t('page.system.00098')"
          type="text"
          disabled-validation
        />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <div class="txt-wrap">
        <h3>
          <i class="fa-regular fa-folder-open" />
          {{ $t('page.system.00034') }}
        </h3>
      </div>
    </template>
    <template #left>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
        :options="grid.options"
        @click="onMasterClick"
      />
    </template>
    <template #rightTitle>
      <div class="txt-wrap">
        <h3><i class="fa-regular fa-folder-open" /> {{ $t('page.system.00100') }}</h3>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00029')">
            <SJInput
              id="form_progName"
              v-model="help.progName"
              :name="$t('page.system.00029')"
              type="text"
              disabled-validation
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00082')">
            <SJInput
              id="form_title"
              v-model="help.title"
              :name="$t('page.system.00082')"
              type="text"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00090')">
            <SJEditor
              id="form_cntn"
              v-model="help.cntn"
              :name="$t('page.system.00090')"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00103')">
            <SJFileUpload id="form_files" v-model="help.files" name="files" @fileDownload="fileDownload" />
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
// 메뉴 화면
// 기능권한버튼을 사용하는 경우
import { MENU, ACTION } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      search: {},
      help: {
        files: [],
        cntn: null
      },
      grid: {
        data: {},
        options: {
          rowHeaders: ['rowNum']
        },
        columns: [
          {
            name: 'progId',
            hidden: true
          },
          {
            name: 'progName'
          },
          {
            name: 'progPath',
            width: 250
          },
          {
            name: 'remark'
          }
        ]
      }
    }
  },
  methods: {
    async onMasterClick (ev) {
      this._resetForm()
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.grid.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.program.loadHelp(item.progId)
      this.help = result.data
      if (result.data.cntn === undefined) {
        this.help.cntn = null
      }
      this.help.progId = item.progId
      this.help.progName = item.progName
    },
    _resetForm () {
      this.$refs.form.reset()
      this.help = { cntn: '' }
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.program.list(this.search)
          this.grid.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            await this.$api.system.program.saveHelp(this.help)

            this._resetForm()
            this.$notify.success(this.$t('message.00002'))// '처리되었습니다.'
            await this.ACTION_REGISTRY().searchClick()
          }
        }
      }
    },
    fileDownload (fileId) {
      this.$api.system.program.downloadHelp(fileId)
    }
  }
}
</script>
