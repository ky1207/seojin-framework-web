<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00108')">
        <SJInput id="bsnsCode" v-model="search.bsnsCode" :name="$t('page.system.00108')" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00109')">
        <SJInput id="bsnsName" v-model="search.bsnsName" :name="$t('page.system.00109')" disabled-validation>
          />
        </sjinput>
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00004')">
        <SJSelect id="useYN" v-model="search.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" disabled-validation />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00104')" />
    </template>
    <template #left>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
        @click="onMasterClick"
      />
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00110')">
        <button class="btn-blue-bg" @click="createBusiness">
          {{ $t('page.system.00115') }}
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00108')">
            <SJInput
              id="form_bsnsCode"
              v-model="businessCode.bsnsCode"
              :name="$t('page.system.00108')"
              rules="required|max:12"
              :disabled="isUpdate"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00109')">
            <SJInput
              id="form_bsnsName"
              v-model="businessCode.bsnsName"
              :name="$t('page.system.00109')"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00111')">
            <SJInput
              id="form_enBsnsName"
              v-model="businessCode.enBsnsName"
              :name="$t('page.system.00111')"
              rules="required"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00040')">
            <SJInput
              id="form_biznum"
              v-model="businessCode.biznum"
              :name="$t('page.system.00040')"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00042')">
            <SJInput
              id="form_repName"
              v-model="businessCode.repName"
              :name="$t('page.system.00042')"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00043')">
            <SJInput
              id="form_email"
              v-model="businessCode.email"
              :name="$t('page.system.00043')"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00112')">
            <SJInput
              id="form_phone"
              v-model="businessCode.phone"
              :name="$t('page.system.00112')"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00113')">
            <SJInput
              id="form_fax"
              v-model="businessCode.fax"
              :name="$t('page.system.00113')"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00114')">
            <SJDatePicker
              id="form_openDt"
              v-model="businessCode.openDt"
              :name="$t('page.system.00114')"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00049')">
            <SJSelect
              id="form_lang"
              v-model="businessCode.lang"
              :options="common.LANGUAGES"
              :name="$t('page.system.00049')"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00050')">
            <SJStepper
              id="form_sort"
              v-model="businessCode.sort"
              name="stepper"
              rules="required|min_value:1"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00004')">
            <SJSelect id="form_useYN" v-model="businessCode.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00051')">
            <SJInput
              id="form_addr1"
              v-model="businessCode.addr1"
              :name="$t('page.system.00051')"
            />
            <SJInput
              id="form_addr2"
              v-model="businessCode.addr2"
              :name="$t('page.system.00051')"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00052')">
            <SJInput
              id="form_addr3"
              v-model="businessCode.addr3"
              :name="$t('page.system.00052')"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00009')">
            <SJTextarea id="form_remark" v-model="businessCode.remark" :name="$t('page.system.00009')" disabled-validation />
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      businessCode: {
      },
      grid: {
        data: {},
        columns: [
          { name: 'bsnsCode' },
          { name: 'bsnsName' },
          { name: 'biznum' },
          { name: 'repName' },
          { name: 'useFlag' }
        ]
      }
    }
  },
  created () {
    this.common.USE_YN = this.$api.common.getYNCodes()
    this.common.LANGUAGES = this.$api.common.getLanguageCode()
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.grid.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.business.load(item.bsnsId)
      this.businessCode = result.data
      this.isUpdate = true
      this.businessCode.data = {
        Data: this.businessCode.codes
      }
    },
    createBusiness () {
      this.isUpdate = false
      this._resetForm()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.business.list(this.search)
          this.grid.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              await this.$api.system.business.update(this.businessCode.bsnsId, this.businessCode)
            } else {
              await this.$api.system.business.save(this.businessCode)
            }
            this._resetForm()
            this.$notify.success(this.$t('message.00002'))
            await this.ACTION_REGISTRY().searchClick()
          }
        },
        delClick: () => {
        }
      }
    },
    _resetForm () {
      this.$refs.form.reset()
      this.businessCode = {}
    }
  }
}
</script>

<style scoped>

</style>
