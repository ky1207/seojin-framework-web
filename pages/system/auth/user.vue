<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          회사
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
          부서
        </div>
        <div class="col-md-1">
          <SJSelect
            id="search_department"
            v-model="search.deptId"
            :name="$t('components.modal.00005')"
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
          이름
        </div>
        <div class="col-md-1">
          <SJInput id="userName" v-model="search.userName" name="이름" type="text" disabled-validation />
        </div>
      </div>
    </template>

    <template #leftTitle>
      사용자 목록
    </template>
    <template #left>
      <SJGrid ref="user" v-model="user.data" :columns="user.columns" @click="onMasterClick" />
    </template>

    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          사용자 정보
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="createUser">
            신규 사용자 <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>아이디</label>
            <SJInput
              id="form_loginId"
              v-model="userDetail.loginId"
              name="아이디"
              type="text"
              rules="required"
            />
          </div>
          <div class="col-md-4  mt-3">
            <label>사용자명</label>
            <SJInput
              id="form_userName"
              v-model="userDetail.userName"
              name="사용자명"
              type="text"
              rules="required"
            />
          </div>
          <div class="col-md-4  mt-3">
            <label>사용자명 영문</label>
            <SJInput
              id="form_userEnName"
              v-model="userDetail.userEnName"
              name="사용자명영문"
              type="text"
              disabled-validation
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>비밀번호</label>
            <SJInput
              id="form_pswd"
              v-model="userDetail.pswd"
              name="비밀번호"
              type="text"
              rules="required"
              disabled-validation
            />
          </div>
          <div class="col-md-4  mt-3">
            <label>비밀번호 확인</label>
            <SJInput
              id="form_pswdChk"
              name="비밀번호확인"
              type="password"
              rules="required"
              disabled-validation
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>이메일</label>
            <SJInput
              id="form_email"
              v-model="userDetail.email"
              name="이메일"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>휴대폰번호</label>
            <SJInput
              id="form_mobile"
              v-model="userDetail.mobile"
              name="휴대폰번호"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>사용여부</label>
            <SJSelect id="form_useYN" v-model="userDetail.useFlag" name="사용여부" :options="$api.common.getYNCodes()" rules="required" />
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
            <label>부서</label>
            <SJSelect
              id="form_department"
              v-model="userDetail.deptId"
              :name="$t('components.modal.00005')"
              :options="departmentForm"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>직위</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.job"
              name="직위"
              :options="common.USR_POSTN"
              item-text="val"
              item-value="codeId"
              disabled-validation
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>직책</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.pos"
              name="직책"
              :options="common.USER_DUTY"
              item-text="val"
              item-value="codeId"
              disabled-validation
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>시스템유형</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.systemType"
              name="시스템유형"
              :options="common.SYSTEM_TYPE"
              item-text="val"
              item-value="codeId"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>계정상태</label>
            <SJSelect
              id="commonCode"
              v-model="userDetail.status"
              name="계정상태"
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
import { GLOBAL_CODES } from '~/plugins/lib/grid/Formatter'

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
            name: 'pos'
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
      departmentForm: {
      },
      departmentSearch: {
      }
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
              await this.$api.system.user.save(this.userDetail)
            }
            this._resetForm()
            this.$notify.success('처리되었습니다.') // TODO:다국어 처리
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
        this.departmentForm = {}
      }
    },
    async changeCompanySearch (event) {
      const value = event.target.value
      if (value != null && value !== '') {
        const result = await this.$api.system.department.getDepartmentCodesByCoId(value)
        GLOBAL_CODES.setDepartment(result.data)
        this.departmentSearch = result.data
      } else {
        this.departmentSearch = {}
      }
    }
  }
}
</script>

<style scoped>

</style>
