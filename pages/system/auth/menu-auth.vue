<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="search-area">
        <div class="col-md-1 search-label">
          {{ $t('page.system.00001') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="company"
            v-model="search.coId"
            :name="$t('page.system.00001')"
            :options="common.COMPANY"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 search-label">
          {{ $t('page.system.00077') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="menuGroupId"
            v-model="search.menuGroupId"
            :name="$t('page.system.00077')"
            :options="common.MENU_GROUP"
            item-text="val"
            item-value="subCode"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 search-label">
          {{ $t('page.system.00002') }}
        </div>
        <div class="col-md-1">
          <SJInput
            id="authCode"
            v-model="search.authGroupId"
            :name="$t('page.system.00002')"
            type="text"
            disabled-validation
          />
        </div>
        <div class="col-md-1 search-label">
          {{ $t('page.system.00003') }}
        </div>
        <div class="col-md-1">
          <SJInput
            id="authName"
            v-model="search.authName"
            :name="$t('page.system.00003')"
            type="text"
            disabled-validation
          />
        </div>
      </div>
    </template>
    <template #leftTitle>
      {{ $t('page.system.00005') }}
    </template>
    <template #left>
      <SJGrid ref="authGrid" v-model="authGrid.data" :columns="authGrid.columns" @click="onMasterClick" />
    </template>
    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00076') }}
        </div>
      </div>
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
            name: 'coId'
          },
          {
            name: 'authGroupId'
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
    const company = await this.$api.common.getCompanyCodes()
    this.common = codes.data
    this.common.COMPANY = company.data
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.authGrid.invoke('getRow', ev.rowKey)

      this.searchMenu.coId = this.search.coId
      this.searchMenu.menuGroupId = this.search.menuGroupId
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
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
