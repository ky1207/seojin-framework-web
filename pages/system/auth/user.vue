<template>
  <SJSearchLRLayout :left-size="60" :right-size="40">
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00059')">
        <SJSelect
          id="search_department"
          v-model="search.deptId"
          :name="$t('page.system.00059')"
          :options="common.DEPARTMENT"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField label="ID">
        <SJInput id="search_loginId" v-model="search.loginId" name="ID" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00060')">
        <SJInput id="search_userName" v-model="search.userName" :name="$t('page.system.00060')" disabled-validation />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00061') " />
    </template>
    <template #left>
      <SJGrid ref="user" v-model="user.data" :columns="user.columns" @click="onMasterClick" />
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00062') ">
        <button class="btn-blue-bg" @click="createUser">
          {{ $t('page.system.00063') }}
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00064')">
            <SJInput
              id="form_loginId"
              v-model="userDetail.loginId"
              :name="$t('page.system.00064')"
              rules="required|max:12"
              :disabled="isUpdate"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00004')">
            <SJSelect id="form_useYN" v-model="userDetail.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00035')">
            <SJInput
              id="form_userName"
              v-model="userDetail.userName"
              :name="$t('page.system.00035')"
              rules="required|max:50"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00065')">
            <SJInput
              id="form_userEnName"
              v-model="userDetail.userEnName"
              :name="$t('page.system.00065')"
              rules="max:50"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00066')">
            <SJInput
              id="form_pswd"
              v-model="userDetail.pswd"
              name="password"
              type="password"
              :rules="isUpdate ? '' : 'required'"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00067')">
            <SJInput
              id="form_pswdChk"
              v-model="userDetail.pswdChk"
              name="password_confirmation"
              type="password"
              rules="confirmed:password"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00068')">
            <SJInput
              id="form_email"
              v-model="userDetail.email"
              name="email"
              rules="email|max:50"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00069')">
            <SJInput
              id="form_mobile"
              v-model="userDetail.mobile"
              :name="$t('page.system.00069')"
              rules="numeric|max:20"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00104')">
            <SJCheckboxGroup
              v-model="checkedData"
              :items="common.BUSINESS"
              rules="required"
              :name="$t('page.system.00104')"
              class="check-box"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00059')">
            <SJSelect
              id="form_department"
              v-model="userDetail.deptId"
              :name="$t('page.system.00059')"
              :options="common.DEPARTMENT"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00070')">
            <SJSelect
              id="commonCode"
              v-model="userDetail.job"
              :name="$t('page.system.00070')"
              :options="common.USR_POSTN"
              item-text="val"
              item-value="subCode"
              disabled-validation
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00071')">
            <SJSelect
              id="commonCode"
              v-model="userDetail.pos"
              :name="$t('page.system.00071')"
              :options="common.USER_DUTY"
              item-text="val"
              item-value="subCode"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00072')">
            <SJSelect
              id="commonCode"
              v-model="userDetail.systemType"
              :name="$t('page.system.00072')"
              :options="common.SYSTEM_TYPE"
              item-text="val"
              item-value="subCode"
              rules="required"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00073')">
            <SJSelect
              id="commonCode"
              v-model="userDetail.status"
              :name="$t('page.system.00073')"
              :options="common.USER_ST"
              item-text="val"
              item-value="subCode"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
import { CodeFormatter } from '~/plugins/lib/grid/Formatter'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      checkedData: [],
      userDetail: {
        bsnsUsers: []
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
            header: this.$t('page.system.00071'),
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
    const business = await this.$api.common.getBusinessIds()
    const department = await this.$api.common.getDepartmentIds()
    this.common = codes.data
    this.common.USE_YN = this.$api.common.getYNCodes()
    this.common.BUSINESS = business.data
    this.common.DEPARTMENT = department.data
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.user.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.user.load(item.userId)
      this.userDetail = result.data
      this.isUpdate = true

      this.userDetail.data = {
        Data: this.userDetail.codes
      }

      this.checkedData = result.data.bsnsUsers
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
            this.userDetail.bsnsUsers = this.checkedData
            if (this.isUpdate) {
              await this.$api.system.user.update(this.userId, this.userDetail)
            } else {
              // ID 중복 체크
              this.search.loginId = this.userDetail.loginId
              const userDupCnt = await this.$api.system.user.getUserDupChk(this.search)
              this.search.loginId = null
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
      this.checkedData = []
    }
  }
}
</script>
