<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="ID">
        <SJInput id="loginId" v-model="search.loginId" name="ID" type="text" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00060')">
        <SJInput id="userName" v-model="search.userName" :name="$t('page.system.00060')" type="text" disabled-validation />
      </SJSearchField>
    </template>

    <template #bodyTitle>
      <SJTitle :title="$t('page.system.00061') " />
    </template>
    <template #body>
      <SJGrid ref="user" v-model="user.data" :columns="user.columns" />
    </template>
  </SJSearchOneLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
import { CustomCheckBoxRenderer } from '~/plugins/lib/grid/editor/CustomCheckBoxRenderer'

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
            name: 'macAddr'
          },
          {
            name: 'deviceToken'
          },
          {
            name: 'brand'
          },
          {
            name: 'device'
          },
          {
            name: 'model'
          },
          {
            name: 'product'
          },
          {
            name: 'useFlag',
            renderer: CustomCheckBoxRenderer
          }
        ]
      }
    }
  },
  async created () {

  },
  methods: {
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.userMobile.list(this.search)
          this.user.data = result.data
        },
        saveClick: async () => {
          const error = this.$refs.user.invoke('validate')
          if (error.length > 0) {
            this.$notify.warning(this.$t('message.00007')) // Grid 입력값을 확인하세요.
            return false
          }
          const data = this.$refs.user.invoke('getModifiedRows')
          await this.$api.system.userMobile.update(data)
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
