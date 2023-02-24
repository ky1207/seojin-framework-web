<template>
  <SJSearchOneLayout>
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
            disabled-first-message
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

    <template #bodyTitle>
      {{ $t('page.system.00061') }}
    </template>
    <template #body>
      <SJGrid ref="user" v-model="user.data" :columns="user.columns" />
    </template>
  </SJSearchOneLayout>
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
            name: 'email'
          },
          {
            name: 'applnUseFlag'
          },
          {
            name: 'pdaUseFlag'
          }
        ]
      },
      departmentSearch: []
    }
  },
  async created () {
    const company = await this.$api.common.getCompanyCodes()
    this.common = { COMPANY: company.data }
  },
  methods: {
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.user.list(this.search)
          this.user.data = result.data
        },
        saveClick: async () => {
          const error = this.$refs.user.invoke('validate')
          if (error.length > 0) {
            this.$notify.warning(this.$t('message.00007')) // Grid 입력값을 확인하세요.
            return false
          }
          const data = this.$refs.user.invoke('getModifiedRows')
          await this.$api.system.user.updateAuthApp(data)
          this.$notify.success(this.$t('message.00002'))// '처리되었습니다.'
          await this.ACTION_REGISTRY().searchClick()
        }
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
