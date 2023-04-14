<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="search-area">
        <div class="col-md-1 search-label">
          {{ $t('page.system.00104') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="search_company"
            v-model="search.bsnsId"
            :name="$t('page.system.00104')"
            :options="common.BUSINESS"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 search-label">
          {{ $t('page.system.00059') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="search_department"
            v-model="search.deptId"
            :name="$t('page.system.00059')"
            :options="common.DEPARTMENT"
            disabled-validation
          />
        </div>
        <div class="col-md-1 search-label">
          ID
        </div>
        <div class="col-md-1">
          <SJInput id="loginId" v-model="search.loginId" name="ID" type="text" disabled-validation />
        </div>
        <div class="col-md-1 search-label">
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
import { CodeFormatter } from '~/plugins/lib/grid/Formatter'

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
    const business = await this.$api.common.getBusinessCodes()
    const department = await this.$api.common.getDepartmentCodes()
    this.common = { BUSINESS: business.data, DEPARTMENT: department.data }
  },
  methods: {
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this.search.useFlag = true
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
    }
  }
}
</script>

<style scoped>

</style>
