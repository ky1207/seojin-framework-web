<template>
  <SJSearchLRLayout :left-size="40" :right-size="60">
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00104')">
        <SJSelect
          id="company"
          v-model="search.bsnsId"
          name="$t('page.system.00104')"
          :options="common.BUSINESS"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00013')">
        <SJSelect
          id="menuGroup"
          v-model="search.menuGroupCode"
          name="$t('page.system.00013')"
          :options="common.MENU_GROUP"
          item-text="val"
          item-value="subCode"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle :title="$t('page.system.00014')" />
    </template>

    <template #left>
      <SJGrid
        ref="menuGrid"
        v-model="menus.data"
        :columns="menus.columns"
        :options="menus.options"
        disable-context
        @click="read"
      />
    </template>

    <template #rightTitle>
      <SJTitle :title="$t('page.system.00015')" />
    </template>
    <template #right>
      <SJGrid
        ref="authGrid"
        v-model="auth.data"
        :columns="auth.columns"
        :options="auth.options"
        disable-context
      />
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
      menuId: null,
      menus: {
        data: {},
        columns: [
          {
            name: 'menuName'
          }
        ],
        options: {
          treeColumnOptions: {
            name: 'menuName'
          },
          rowHeaders: ['rowNum']
        }
      },
      auth: {
        data: {},
        columns: [
          {
            name: 'authGroupCode'
          },
          {
            name: 'authName'
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
          rowHeaders: []
        }
      }
    }
  },
  async created () {
    await Promise.all([this.$api.common.getCommonCodes(['MENU_GROUP']),
      this.$api.common.getBusinessIds()])
      .then((response) => {
        this.common = {
          ...response[0].data,
          BUSINESS: response[1].data,
          USE_YN: this.$api.common.getYNCodes()
        }
      })
    await this.ACTION_REGISTRY().searchClick()
  },
  methods: {
    async read (e) {
      if (e.rowKey === undefined) { return }
      if (e.columnName !== 'menuName') { return }
      const node = this.$refs.menuGrid.invoke('getRow', e.rowKey)
      this.auth.data = { }
      this.menuId = node.menuId
      const result = await this.$api.system.menu.menuAuthByMenuId(this.menuId)
      this.auth.data = result.data
    },
    _resetForm () {
      this.menuId = null
      this.auth.data = {}
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.menu.list(this.search)
          this.menus.data = {
            Total: result.data.Total,
            Data: this.$tree.treeGridSort(result.data.Data)
          }
        },
        saveClick: async () => {
          await this.$api.system.menu.updateAuthByMenuId(this.menuId, this.$refs.authGrid.invoke('getModifiedRows'))
          this.$notify.success(this.$t('message.00002'))
          await this.ACTION_REGISTRY().searchClick()
        }

      }
    }
  }
}
</script>
