<template>
  <SJSearchLRLayout>
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
            id="company"
            v-model="search.coId"
            :name="$t('page.system.00001')"
            :options="common.COMPANY"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 text-center">
          {{ $t('page.system.00001') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="menuGroupId"
            v-model="search.menuGroupId"
            :name="$t('page.system.00070')"
            :options="common.MENU_GROUP"
            item-text="val"
            item-value="codeId"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 text-center">
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
        <div class="col-md-1 text-center">
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
          {{ $t('page.system.00006') }}
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
import { CustomCheckBoxRenderer } from '~/plugins/lib/grid/editor/CustomCheckBoxRenderer'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      isUpdate: false,
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
            formatter: null,
            renderer: CustomCheckBoxRenderer,
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
  watch: {
    isUpdate () { // hidden 그리드 일경우, 높이 계산이 최초 안됨.
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
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
      this.isUpdate = true
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
          if (this.isUpdate) {
            const { authorityUsers, ...rest } = this.auth
            const data = { authority: rest, gridRequest: this.$refs.detail.invoke('getModifiedRows') }
            await this.$api.system.authority.update(rest.authGroupId, data)
          } else {
            await this.$api.system.authority.save(this.auth)
          }
          this._resetForm()
          this.$notify.success(this.$t('message.00002'))
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
