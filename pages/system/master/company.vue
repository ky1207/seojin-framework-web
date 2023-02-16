<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          {{ $t('page.system.00074') }}
        </div>
        <div class="col-md-1">
          <SJInput id="companyId" v-model="search.coId" :name="$t('page.system.00074')" type="text" disabled-validation />
        </div>
        <div class="col-md-1 text-center">
          {{ $t('page.system.00075') }}
        </div>
        <div class="col-md-1">
          <SJInput id="companyName" v-model="search.coName" :name="$t('page.system.00075')" type="text" disabled-validation />
        </div>
        <div class="col-md-1 text-center">
          {{ $t('page.system.00004') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="useYN"
            v-model="search.useFlag"
            :name="$t('page.system.00004')"
            :options="$api.common.getYNCodes()"
            disabled-validation
          />
        </div>
      </div>
    </template>

    <template #leftTitle>
      {{ $t('page.system.00001') }}
    </template>
    <template #left>
      <SJGrid ref="company" v-model="company.data" :columns="company.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00038') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="createCompany">
            {{ $t('page.system.00039') }} <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00074') }}</label>
            <SJInput
              id="form_coId"
              v-model="companyDetail.coId"
              :name="$t('page.system.00074')"
              type="text"
              disabled-validation
              disabled
            />
          </div>
          <div class="col-md-4  mt-3">
            <label>{{ $t('page.system.00075') }}</label>
            <SJInput
              id="form_coName"
              v-model="companyDetail.coName"
              :name="$t('page.system.00075')"
              type="text"
              rules="required|max:50"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00040') }}</label>
            <SJInput
              id="form_biznum"
              v-model="companyDetail.biznum"
              :name="$t('page.system.00040')"
              type="text"
              rules="max:50"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00041') }}</label>
            <SJInput
              id="form_coNum"
              v-model="companyDetail.coNum"
              :name="$t('page.system.00041')"
              type="text"
              rules="max:50"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00042') }}</label>
            <SJInput
              id="form_repName"
              v-model="companyDetail.repName"
              :name="$t('page.system.00042')"
              type="text"
              rules="max:50"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00043') }}</label>
            <SJInput
              id="form_email"
              v-model="companyDetail.email"
              :name="$t('page.system.00043')"
              type="text"
              rules="email|max:50"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00044') }}</label>
            <SJInput
              id="form_phone"
              v-model="companyDetail.phone"
              :name="$t('page.system.00044')"
              type="text"
              rules="max:20"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00045') }}</label>
            <SJInput
              id="form_fax"
              v-model="companyDetail.fax"
              :name="$t('page.system.00045')"
              type="text"
              rules="max:20"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00046') }}</label>
            <SJDatePicker id="form_estabDt" v-model="companyDetail.estabDt" name="$t('page.system.00046')" disabled-validation />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00047') }}</label>
            <SJInput
              id="form_biztype"
              v-model="companyDetail.biztype"
              :name="$t('page.system.00047')"
              type="text"
              rules="max:12"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00048') }}</label>
            <SJInput
              id="form_bizitem"
              v-model="companyDetail.bizitem"
              :name="$t('page.system.00048')"
              type="text"
              rules="max:12"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00049') }}</label>
            <SJInput
              id="form_lang"
              v-model="companyDetail.lang"
              :name="$t('page.system.00049')"
              type="text"
              rules="max:12"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00050') }}</label>
            <SJStepper
              id="form_sort"
              v-model="companyDetail.sort"
              name="stepper"
              rules="required|min_value:1"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00004') }}</label>
            <SJSelect id="form_useYN" v-model="companyDetail.useFlag" :name="$t('page.system.00004')" :options="$api.common.getYNCodes()" rules="required" />
          </div>

          <div class="col-md-12 mt-3">
            <label>{{ $t('page.system.00051') }}</label>
            <SJInput
              id="form_addr1"
              v-model="companyDetail.addr1"
              :name="$t('page.system.00051')"
              type="text"
              disabled-validation
            />
            <SJInput
              id="form_addr2"
              v-model="companyDetail.addr2"
              :name="$t('page.system.00051')"
              type="text"
              disabled-validation
            />
          </div>

          <div class="col-md-12 mt-3">
            <label>{{ $t('page.system.00052') }}</label>
            <SJInput
              id="form_addr3"
              v-model="companyDetail.addr3"
              :name="$t('page.system.00052')"
              type="text"
              disabled-validation
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00053') }}</label>
            <SJInput
              id="form_coType"
              v-model="companyDetail.coType"
              :name="$t('page.system.00053')"
              type="text"
              rules="required|max:12"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00054') }}</label>
            <SJInput
              id="form_logoName"
              v-model="companyDetail.logoName"
              :name="$t('page.system.00054')"
              type="text"
              rules="required|max:50"
            />
          </div>
        </div>
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
          {
            name: 'coName'
          },
          {
            name: 'biznum'
          },
          {
            name: 'repName'
          },
          { name: 'useFlag' }
        ]
      }
    }
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
