<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="search-area">
        <div class="col-md-1 search-label">
          {{ $t('page.system.00001') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="search_company"
            v-model="search.coId"
            :name="$t('page.system.00001')"
            :options="common.COMPANY"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 search-label">
          {{ $t('page.system.00091') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="search_appType"
            v-model="search.appType"
            :name="$t('page.system.00091')"
            :options="common.UPDATE_TYPE"
            item-text="val"
            item-value="codeId"
            disabled-validation
            disabled-first-message
          />
        </div>
      </div>
    </template>

    <template #leftTitle>
      {{ $t('page.system.00095') }}
    </template>
    <template #left>
      <SJGrid ref="appUpdate" v-model="appUpdate.data" :columns="appUpdate.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00102') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="createAppUpdate">
            {{ $t('page.system.00096') }} <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField class="col-md-6" :label="$tc('page.system.00092')">
            <SJStepper
              id="form_updateId"
              v-model="appUpdateDetail.updateId"
              :name="$t('page.system.00092')"
              type="text"
              disabled
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00091')">
            <SJSelect
              id="form_appType"
              v-model="appUpdateDetail.appType"
              :name="$t('page.system.00091')"
              :options="common.UPDATE_TYPE"
              item-text="val"
              item-value="codeId"
              rules="required"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00093')">
            <SJInput
              id="form_updateTitle"
              v-model="appUpdateDetail.updateVersion"
              :name="$t('page.system.00093')"
              type="text"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00082')">
            <SJInput
              id="form_updateTitle"
              v-model="appUpdateDetail.updateTitle"
              :name="$t('page.system.00082')"
              type="text"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00090')">
            <SJTextarea id="form_updateCntn" v-model="appUpdateDetail.updateCntn" :name="$t('page.system.00090')" disabled-validation />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFileUpload v-model="appUpdateDetail.files" name="files" @fileDownload="fileDownload" />
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
            name: 'coId'
          },
          {
            name: 'lastUpdateFlag'
          },
          {
            name: 'updateId'
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
    const company = await this.$api.common.getCompanyCodes()
    this.common = codes.data
    this.common.COMPANY = company.data
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
      this.appUpdateDetail.coId = this.search.coId
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.appUpdate.list(this.search)
          this.appUpdateDetail.coId = this.search.coId
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
    },
    fileDownload (fileId) {
      this.$api.system.appUpdate.download(fileId)
    }
  }
}
</script>

<style scoped>

</style>
