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
            id="company"
            v-model="search.coId"
            name="회사"
            :options="common.COMPANY"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 text-center">
          메뉴그룹
        </div>
        <div class="col-md-1">
          <SJSelect
            id="menuGroup"
            v-model="search.menuGroupId"
            name="메뉴그룹"
            :options="common.MENU_GROUP"
            item-text="val"
            item-value="codeId"
            disabled-validation
            disabled-first-message
          />
        </div>
      </div>
    </template>

    <template #leftTitle>
      메뉴목록
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
      프로그램설정
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
            name: 'authGroupId'
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
      this.$api.common.getCompanyCodes()])
      .then((response) => {
        this.common = {
          ...response[0].data,
          COMPANY: response[1].data,
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
          this.$notify.success('처리되었습니다.')
          await this.ACTION_REGISTRY().searchClick()
        }

      }
    }
  }
}
</script>
