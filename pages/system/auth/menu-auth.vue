<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00104')">
        <SJSelect
          id="business"
          v-model="search.bsnsId"
          :name="$t('page.system.00104')"
          :options="common.BUSINESS"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00077')">
        <SJSelect
          id="menuGroupId"
          v-model="search.menuGroupCode"
          :name="$t('page.system.00077')"
          :options="common.MENU_GROUP"
          item-text="val"
          item-value="subCode"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00002')">
        <SJInput
          id="authCode"
          v-model="search.authGroupCode"
          :name="$t('page.system.00002')"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00003')">
        <SJInput
          id="authName"
          v-model="search.authName"
          :name="$t('page.system.00003')"
          disabled-validation
        />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00005')" />
    </template>
    <template #left>
      <SJGrid ref="authGrid" v-model="authGrid.data" :columns="authGrid.columns" @click="onMasterClick" />
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00076')" />
    </template>
    <template #right>
      <SJGrid ref="authMenuGrid" v-model="authMenuGrid.data" :columns="authMenuGrid.columns" />
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
import { CustomCheckRenderer } from '~/plugins/lib/grid/editor/CustomCheckRenderer'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: {},
      search: {},
      searchMenu: {},
      auth: {},
      authGrid: {
        data: {},
        columns: [
          {
            name: 'bsnsId'
          },
          {
            name: 'authGroupCode'
          },
          {
            name: 'authName'
          },
          {
            name: 'defaultAuthFlag'
          },
          {
            name: 'useFlag'
          }
        ],
        options: {

        }
      },
      authMenuGrid: {
        data: {},
        columns: [
          {
            name: 'menuName'
          },
          {
            name: 'useFlag',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'inqryAuth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'saveAuth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'excelAuth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'delAuth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'fn1Auth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'fn2Auth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'fn3Auth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'fn4Auth',
            renderer: CustomCheckRenderer
          },
          {
            name: 'fn5Auth',
            renderer: CustomCheckRenderer
          }
        ],
        options: {
          rowHeaders: ['checkbox']
        }
      }
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['MENU_GROUP'])
    const business = await this.$api.common.getBusinessIds()
    this.common = codes.data
    this.common.BUSINESS = business.data
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.authGrid.invoke('getRow', ev.rowKey)

      this.searchMenu.bsnsId = item.bsnsId
      this.searchMenu.authGroupId = item.authGroupId

      const result = await this.$api.system.menu.menuByAuth(this.searchMenu)
      this.authMenuGrid.data = result.data
    },
    _resetForm () {
      this.auth = {}
      this.authMenuGrid.data = {}
    },

    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.authority.list(this.search)
          this.authGrid.data = result.data
        },
        saveClick: async () => {
          await this.$api.system.menu.updateMenuAuthByAuthority(this.$refs.authMenuGrid.invoke('getModifiedRows'))
          this.$notify.success(this.$t('message.00002'))
        }
      }
    }
  }
}
</script>
