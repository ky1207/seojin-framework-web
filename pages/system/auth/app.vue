<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00104')">
        <SJSelect
          id="search_company"
          v-model="search.bsnsId"
          :name="$t('page.system.00104')"
          :options="common.BUSINESS"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
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
        <SJInput id="loginId" v-model="search.loginId" name="ID" type="text" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00060')">
        <SJInput id="userName" v-model="search.userName" :name="$t('page.system.00060')" type="text" disabled-validation />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <div class="txt-wrap">
        <h3><i class="fa-regular fa-folder-open" /> {{ $t('page.system.00061') }}</h3>
      </div>
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
    const business = await this.$api.common.getBusinessIds()
    const department = await this.$api.common.getDepartmentIds()
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
