<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00091')">
        <SJSelect
          id="search_appType"
          v-model="search.appType"
          :name="$t('page.system.00091')"
          :options="common.UPDATE_TYPE"
          item-text="val"
          item-value="subCode"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle :title="$t('page.system.00095')" />
    </template>
    <template #left>
      <SJGrid ref="appUpdate" v-model="appUpdate.data" :columns="appUpdate.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <SJTitle :title="$t('page.system.00102')">
        <button class="btn-blue-bg" @click="createAppUpdate">
          {{ $t('page.system.00096') }}
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00091')">
            <SJSelect
              id="form_appType"
              v-model="appUpdateDetail.appType"
              :name="$t('page.system.00091')"
              :options="common.UPDATE_TYPE"
              item-text="val"
              item-value="subCode"
              rules="required"
              :disabled="isUpdate"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00093')">
            <SJInput
              id="form_updateTitle"
              v-model="appUpdateDetail.updateVersion"
              :name="$t('page.system.00093')"
              rules="required"
              :disabled="isUpdate"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00082')">
            <SJInput
              id="form_updateTitle"
              v-model="appUpdateDetail.updateTitle"
              :name="$t('page.system.00082')"
              rules="required"
              :disabled="isUpdate"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00090')">
            <SJTextarea id="form_updateCntn" v-model="appUpdateDetail.updateCntn" :name="$t('page.system.00090')" disabled-validation :disabled="isUpdate" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow v-if="!isUpdate">
          <SJFormField :label="$tc('page.system.00103')">
            <SJFileUpload
              id="form_files"
              v-model="appUpdateDetail.files"
              name="files"
              rules="required"
              @fileDownload="fileDownload"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow v-if="isUpdate">
          <SJFormField :label="$tc('components.modal.00021')">
            <ul v-for="(file) in appUpdateDetail.files" :key="file.fileId" class="list-group">
              <li v-if="file.method !== 'delete'" class="list-group-item" style="cursor : pointer;" @click="fileDownload(file.fileId)">
                {{ file.filename }} ( {{ file.filesize }} byte)
              </li>
            </ul>
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      appUpdateDetail: {
        files: []
      },
      appUpdate: {
        data: {},
        columns: [
          {
            name: 'lastUpdateFlag'
          },
          {
            name: 'appType'
          },
          {
            name: 'updateTitle'
          },
          {
            name: 'updateCntn'
          },
          {
            name: 'modDtm'
          },
          {
            name: 'modUserName'
          }
        ]
      }
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['UPDATE_TYPE'])
    this.common = codes.data
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.appUpdate.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.appUpdate.load(item.updateId)
      this.appUpdateDetail = result.data
      this.isUpdate = true

      this.appUpdateDetail.data = {
        Data: this.appUpdateDetail.codes
      }
    },
    createAppUpdate () {
      this.isUpdate = false
      this._resetForm()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.appUpdate.list(this.search)
          this.appUpdate.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              await this.$api.system.appUpdate.update(this.appUpdateDetail)
            } else {
              await this.$api.system.appUpdate.save(this.appUpdateDetail)
            }
            this._resetForm()
            this.$notify.success(this.$t('message.00002'))// '처리되었습니다.'
            await this.ACTION_REGISTRY().searchClick()
          }
        },
        delClick: () => {
        }
      }
    },
    _resetForm () {
      this.$refs.form.reset()
      this.appUpdateDetail = {}
      this.appUpdateDetail.files = []
    },
    fileDownload (fileId) {
      this.$api.system.appUpdate.download(fileId)
    }
  }
}
</script>

<style scoped>

</style>
