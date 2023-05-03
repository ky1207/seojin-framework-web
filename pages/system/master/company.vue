<template>
  <SJSearchLRLayout left-size="40" right-size="60">
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00074')">
        <SJInput id="companyId" v-model="search.coId" :name="$t('page.system.00074')" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00075')">
        <SJInput id="companyName" v-model="search.coName" :name="$t('page.system.00075')" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00004')">
        <SJSelect
          id="useYN"
          v-model="search.useFlag"
          :name="$t('page.system.00004')"
          :options="$api.common.getYNCodes()"
          disabled-validation
        />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle :title="$t('page.system.00001')" />
    </template>
    <template #left>
      <SJGrid ref="company" v-model="company.data" :columns="company.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <SJTitle :title="$t('page.system.00038')">
        <button class="btn-blue-bg" @click="createCompany">
          {{ $t('page.system.00039') }}
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00074')">
            <SJInput
              id="form_coCode"
              v-model="companyDetail.coCode"
              :name="$t('page.system.00074')"
              rules="required|max:12"
              :disabled="isUpdate"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00075')">
            <SJInput
              id="form_coName"
              v-model="companyDetail.coName"
              :name="$t('page.system.00075')"
              rules="required|max:50"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00107')">
            <SJInput
              id="form_emCoName"
              v-model="companyDetail.enCoName"
              :name="$t('page.system.00107')"
              rules="required|max:50"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00040')">
            <SJInput
              id="form_biznum"
              v-model="companyDetail.biznum"
              :name="$t('page.system.00040')"
              rules="max:50"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00041')">
            <SJInput
              id="form_coNum"
              v-model="companyDetail.coNum"
              :name="$t('page.system.00041')"
              rules="max:50"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00042')">
            <SJInput
              id="form_repName"
              v-model="companyDetail.repName"
              :name="$t('page.system.00042')"
              rules="max:50"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00043')">
            <SJInput
              id="form_email"
              v-model="companyDetail.email"
              :name="$t('page.system.00043')"
              rules="email|max:50"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00044')">
            <SJInput
              id="form_phone"
              v-model="companyDetail.phone"
              :name="$t('page.system.00044')"
              rules="max:20"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00045')">
            <SJInput
              id="form_fax"
              v-model="companyDetail.fax"
              :name="$t('page.system.00045')"
              rules="max:20"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00046')">
            <SJDatePicker id="form_estabDt" v-model="companyDetail.estabDt" name="$t('page.system.00046')" disabled-validation />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00047')">
            <SJInput
              id="form_biztype"
              v-model="companyDetail.biztype"
              :name="$t('page.system.00047')"
              rules="max:12"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00048')">
            <SJInput
              id="form_bizitem"
              v-model="companyDetail.bizitem"
              :name="$t('page.system.00048')"
              rules="max:12"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00049')">
            <SJSelect
              id="form_lang"
              v-model="companyDetail.lang"
              :name="$t('page.system.00049')"
              :options="common.LANGUAGES"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00050')">
            <SJStepper
              id="form_sort"
              v-model="companyDetail.sort"
              name="stepper"
              rules="required|min_value:1"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00004')">
            <SJSelect id="form_useYN" v-model="companyDetail.useFlag" :name="$t('page.system.00004')" :options="$api.common.getYNCodes()" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00051')">
            <SJInput
              id="form_addr1"
              v-model="companyDetail.addr1"
              :name="$t('page.system.00051')"
              disabled-validation
            />
            <SJInput
              id="form_addr2"
              v-model="companyDetail.addr2"
              :name="$t('page.system.00051')"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00052')">
            <SJInput
              id="form_addr3"
              v-model="companyDetail.addr3"
              :name="$t('page.system.00052')"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00053')">
            <SJInput
              id="form_coType"
              v-model="companyDetail.coType"
              :name="$t('page.system.00053')"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00054')">
            <SJInput
              id="form_logoName"
              v-model="companyDetail.logoName"
              :name="$t('page.system.00054')"
              rules="required|max:50"
            />
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
      companyDetail: {
      },
      company: {
        data: {},
        columns: [
          { name: 'coCode' },
          { name: 'coName' },
          { name: 'biznum' },
          { name: 'repName' },
          { name: 'useFlag' }
        ]
      }
    }
  },
  created () {
    this.common.LANGUAGES = this.$api.common.getLanguageCode()
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.company.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.company.load(item.coId)
      this.companyDetail = result.data
      this.isUpdate = true
      this.companyDetail.data = {
        Data: this.companyDetail.codes
      }
    },
    createCompany () {
      this.isUpdate = false
      this._resetForm()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.company.list(this.search)
          this.company.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              /* const data = { company: this.companyDetail } */
              await this.$api.system.company.update(this.coId, this.companyDetail)
            } else {
              await this.$api.system.company.save(this.companyDetail)
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
      this.companyDetail = {}
    }
  }
}
</script>

<style scoped>

</style>
