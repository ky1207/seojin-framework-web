<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          {{ $t('page.system.00001') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="search_company"
            v-model="search.coId"
            :name="$t('page.system.00001')"
            :options="common.COMPANY"
            disabled-validation
            @change="changeCompanySearch($event)"
          />
        </div>
        <div class="col-md-1 text-center">
          {{ $t('page.system.00059') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="search_department"
            v-model="search.deptId"
            :name="$t('page.system.00059')"
            :options="departmentSearch"
            disabled-validation
          />
        </div>
        <div class="col-md-1 text-center">
          ID
        </div>
        <div class="col-md-1">
          <SJInput id="loginId" v-model="search.loginId" name="ID" type="text" disabled-validation />
        </div>
        <div class="col-md-1 text-center">
          {{ $t('page.system.00060') }}
        </div>
        <div class="col-md-1">
          <SJInput id="userName" v-model="search.userName" :name="$t('page.system.00060')" type="text" disabled-validation />
        </div>
      </div>
    </template>

    <template #leftTitle>
      {{ $t('page.system.00061') }}
    </template>
    <template #left>
      <SJGrid ref="user" v-model="user.data" :columns="user.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00062') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="createUser">
            {{ $t('page.system.00063') }} <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00064') }}</label>
            <SJInput
              id="form_loginId"
              v-model="userDetail.loginId"
              :name="$t('page.system.00064')"
              type="text"
              rules="required|max:12"
              :disabled="isUpdate"
            />
          </div>
          <div class="col-md-4  mt-3">
            <label>{{ $t('page.system.00035') }}</label>
            <SJInput
              id="form_userName"
              v-model="userDetail.userName"
              :name="$t('page.system.00035')"
              type="text"
              rules="required|max:50"
            />
          </div>
          <div class="col-md-4  mt-3">
            <label>{{ $t('page.system.00065') }}</label>
            <SJInput
              id="form_userEnName"
              v-model="userDetail.userEnName"
              :name="$t('page.system.00065')"
              type="text"
              rules="max:50"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00066') }}</label>
            <SJInput
              id="form_pswd"
              v-model="userDetail.pswd"
              name="password"
              type="password"
              :rules="isUpdate ? '' : 'required'"
            />
          </div>
          <div class="col-md-4  mt-3">
            <label>{{ $t('page.system.00067') }}</label>
            <SJInput
              id="form_pswdChk"
              v-model="userDetail.pswdChk"
              name="password_confirmation"
              type="password"
              rules="confirmed:password"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00068') }}</label>
            <SJInput
              id="form_email"
              v-model="userDetail.email"
              name="email"
              type="text"
              rules="email|max:50"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00069') }}</label>
            <SJInput
              id="form_mobile"
              v-model="userDetail.mobile"
              :name="$t('page.system.00069')"
              type="text"
              rules="numeric|max:20"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00004') }}</label>
            <SJSelect id="form_useYN" v-model="userDetail.useFlag" :name="$t('page.system.00004')" :options="$api.common.getYNCodes()" rules="required" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label> {{ $t('page.system.00001') }}</label>
            <SJSelect
              id="form_company"
              v-model="userDetail.coId"
              :name="$t('page.system.00001')"
              :options="common.COMPANY"
              rules="required"
              @change="changeCompanyForm($event)"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label> {{ $t('page.system.00059') }}</label>
            <SJSelect
              id="form_department"
              v-model="userDetail.deptId"
              :name="$t('page.system.00059')"
              :options="departmentForm"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00070') }}</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.job"
              :name="$t('page.system.00070')"
              :options="common.USR_POSTN"
              item-text="val"
              item-value="codeId"
              disabled-validation
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00071') }}</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.pos"
              :name="$t('page.system.00071')"
              :options="common.USER_DUTY"
              item-text="val"
              item-value="codeId"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00072') }}</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.systemType"
              :name="$t('page.system.00072')"
              :options="common.SYSTEM_TYPE"
              item-text="val"
              item-value="codeId"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00073') }}</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.status"
              :name="$t('page.system.00073')"
              :options="common.USER_ST"
              item-text="val"
              item-value="codeId"
              disabled-validation
            />
          </div>
        </div>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
import { CodeFormatter, GLOBAL_CODES } from '~/plugins/lib/grid/Formatter'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      userDetail: {
      },
      user: {
        data: {},
        columns: [
          {
            name: 'loginId'
          },
          {
            name: 'userName'
          },
          {
            name: 'deptName'
          },
          {
            name: 'job'
          },
          {
            name: 'pos',
            header: '직책',
            formatter: CodeFormatter
          },
          {
            name: 'systemType'
          },
          {
            name: 'email'
          },
          {
            name: 'useFlag'
          }
        ]
      },
      departmentForm: [],
      departmentSearch: []
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['USR_POSTN', 'USER_DUTY', 'SYSTEM_TYPE', 'USER_ST'])
    const company = await this.$api.common.getCompanyCodes()
    this.common = codes.data
    this.common.USE_YN = this.$api.common.getYNCodes()
    this.common.COMPANY = company.data
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.user.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.user.load(item.userId)
      const resultCoId = await this.$api.system.department.getDepartmentCodesByCoId(result.data.coId)
      this.userDetail = result.data
      this.isUpdate = true

      this.userDetail.data = {
        Data: this.userDetail.codes
      }

      // 부서
      if (result.data.coId != null && result.data.coId !== '') {
        GLOBAL_CODES.setDepartment(resultCoId.data)
        this.departmentForm = resultCoId.data
      }
    },
    createUser () {
      this.isUpdate = false
      this._resetForm()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.user.list(this.search)
          this.user.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              await this.$api.system.user.update(this.userId, this.userDetail)
            } else {
              // ID 중복 체크
              this.search.coId = this.userDetail.coId
              this.search.loginId = this.userDetail.loginId
              const userDupCnt = await this.$api.system.user.getUserDupChk(this.search)
              if (userDupCnt.data > 0) {
                this.$notify.error(this.$t('message.00012'))// 동일한 아이디가 존재합니다.
                return false
              } else {
                await this.$api.system.user.save(this.userDetail)
              }
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
      this.userDetail = {}
    },
    async changeCompanyForm (event) {
      const value = event.target.value
      if (value != null && value !== '') {
        const result = await this.$api.system.department.getDepartmentCodesByCoId(value)
        GLOBAL_CODES.setDepartment(result.data)
        this.departmentForm = result.data
      } else {
        this.departmentForm = []
      }
    },
    async changeCompanySearch (event) {
      const value = event.target.value
      if (value != null && value !== '') {
        const result = await this.$api.system.department.getDepartmentCodesByCoId(value)
        GLOBAL_CODES.setDepartment(result.data)
        this.departmentSearch = result.data
      } else {
        this.departmentSearch = []
      }
    }
  }
}
</script>

<style scoped>

</style>
