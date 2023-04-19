<template>
  <SJSearchLRLayout>
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
            id="business"
            v-model="search.bsnsId"
            :name="$t('page.system.00104')"
            :options="common.BUSINESS"
            disabled-validation
            disabled-first-message
          />
        </div>
        <div class="col-md-1 search-label">
          {{ $t('page.system.00013') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="menuGroup"
            v-model="search.menuGroupCode"
            :name="$t('page.system.00013')"
            :options="common.MENU_GROUP"
            item-text="val"
            item-value="subCode"
            disabled-validation
            disabled-first-message
          />
        </div>
      </div>
    </template>

    <template #leftTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00014') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="addMenu">
            {{ $t('page.system.00026') }} <i class="bi bi-file-plus" />
          </button>
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="deleteMenu">
            {{ $t('page.system.00012') }} <i class="bi bi-file-minus" />
          </button>
        </div>
      </div>
    </template>

    <template #left>
      <SJGrid
        ref="menuGrid"
        v-model="menus.data"
        :columns="menus.columns"
        :options="menus.options"
        disable-context
        @click="read"
        @drop="dropped"
      />
    </template>

    <template #rightTitle>
      {{ $t('page.system.00027') }}
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00104')">
            <SJSelect
              id="form_business"
              v-model="menu.bsnsId"
              :name="$t('page.system.00104')"
              :options="common.BUSINESS"
              rules="required"
              disabled
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00030')">
            <SJInput
              id="form_menuCode"
              v-model="menu.menuCode"
              :name="$t('page.system.00030')"
              type="text"
              :disabled-validation="isUpdate"
              rules="required"
              :disabled="isUpdate"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00028')">
            <SJInput
              id="form_menuIcon"
              v-model="menu.iconName"
              :name="$t('page.system.00028')"
              type="text"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00097')">
            <SJSelect
              id="form_folderFlag"
              v-model="menu.folderFlag"
              :name="$t('page.system.00097')"
              :options="$api.common.getYNCodes()"
              rules="required"
              @change="changeUseFolder"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00029')">
            <SJSelect
              id="form_progId"
              v-model="menu.progId"
              :disabled="menu.folderFlag==='true'||menu.folderFlag===true"
              :name="$t('page.system.00029')"
              data-live-search
              :options="common.PROGRAM"
              disabled-validation
              @change="changeProgram"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00031')">
            <SJInput
              id="form_applnMenuCode"
              v-model="menu.applnMenuCode"
              :name="$t('page.system.00031')"
              type="text"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00033') ">
            <SJMultiInput id="form_lname" v-model="menu.langs" :name="$t('page.system.00033')" type="text" rules="required" />
          </SJFormField>
        </SJFormRow>
      </SJForm>
      <h5 class="card-title mt-3">
        <div class="row align-items-center">
          <div class="col">
            {{ $t('page.system.00032') }}
          </div>
        </div>
      </h5>
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
import Utils from '~/api/utils'
import { CustomCheckRenderer } from '~/plugins/lib/grid/editor/CustomCheckRenderer'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      gridCheck: true,
      isUpdate: false,
      common: { },
      search: {},
      menu: {},
      menus: {
        data: {},
        columns: [
          {
            name: 'menuName'
          },
          {
            name: 'menuCode',
            width: 150
          }
        ],
        options: {
          treeColumnOptions: {
            name: 'menuName'
          },
          rowHeaders: ['rowNum', 'checkbox'],
          draggable: true
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
        }
      }
    }
  },
  async created () {
    await Promise.all([this.$api.common.getCommonCodes(['MENU_GROUP']),
      this.$api.common.getBusinessIds(),
      this.$api.common.getProgramCodes()])
      .then((response) => {
        this.common = {
          ...response[0].data,
          BUSINESS: response[1].data,
          PROGRAM: response[2].data,
          USE_YN: this.$api.common.getYNCodes()
        }
      })
    // await this.ACTION_REGISTRY().searchClick()
  },
  methods: {
    async read (e) {
      if (e.rowKey === undefined) { return }
      if (e.columnName !== 'menuName') { return }
      const node = this.$refs.menuGrid.invoke('getRow', e.rowKey)
      if (!node.menuId || !this.isUpdate) {
        this.$notify.warning(this.$t('message.00015'))
        return
      }
      this.isUpdate = true
      const result = await this.$api.system.menu.load(node.menuId)
      this.menu = result.data
      if (this.menu.folderFlag) {
        await this._readFolderAuth(this.menu.menuId, this.menu.progId)
      } else {
        await this._readProgramAuth(this.menu.menuId, this.menu.progId)
      }
    },
    async _readProgramAuth (menuId, progId) {
      this.auth.data = { }
      if (Utils.isEmpty(progId)) {
        return
      }
      const result = await this.$api.system.menu.menuProgramAuth({ menuId, progId })
      this.auth.data = result.data
    },

    async changeProgram (e) {
      await this._readProgramAuth(this.menu.menuId, e.target._value)
    },
    async _readFolderAuth (menuId) {
      this.auth.data = { }
      const result = await this.$api.system.menu.menuFolderAuth({ menuId })
      this.auth.data = result.data
    },
    async changeUseFolder (e) {
      if (e.target.value === 'true') {
        await this._readFolderAuth(this.menu.menuId)
      }
    },
    _resetForm () {
      this.isUpdate = true
      this.$refs.form.reset()
      this.menu = { langs: [] }
      this.auth.data = {}
    },
    async dropped (e) {
      // appended:true --자식으로 이동
      // appended:false -- sibling 사이에서 이동
      if (e.targetRowKey === e.rowKey) { return }
      if (e.targetRowKey === 0 || e.rowKey === 0) {
        this.$notify.info(this.$t('message.00005'))// '최상위 루트는 변경 할 수 없습니다.'
        await this.ACTION_REGISTRY().searchClick()
        return
      }
      const selected = await this.$refs.menuGrid.invoke('getRow', e.rowKey)
      const target = await this.$refs.menuGrid.invoke('getRow', e.targetRowKey)
      await this.$api.system.menu.move(selected.menuId, target.menuId, e.appended)
      this.$notify.success(this.$t('message.00002'))
      await this.ACTION_REGISTRY().searchClick()
    },
    addMenu () {
      if (!this.isUpdate) {
        this.$notify.warning(this.$t('message.00015')) // 메뉴를 입력중입니다.
        return
      }
      this.isUpdate = false
      this.auth.data = {}

      const node = this.$refs.menuGrid.invoke('getFocusedCell')
      if (node.rowKey === null) {
        this.$notify.warning(this.$t('message.00006')) // '메뉴를 선택하세요'
        return false
      }
      const parent = this.$refs.menuGrid.invoke('getRow', node.rowKey)
      const newNode = this.$tree.getNewNode(
        {
          menuName: this.$t('page.system.00105'),
          upperMenuId: parent.menuId,
          menuGroupId: parent.menuGroupId,
          level: parent.level + 1
        }
      )
      const { menuName, ...rest } = newNode

      const temp = rest
      temp.langs = [{ langCode: 'ko', val: '새메뉴' }] // 다국어 처리할 필요 없음

      this.menu = temp
      this.menu.menuGroupCode = this.search.menuGroupCode
      this.menu.bsnsId = this.search.bsnsId
      this.$refs.menuGrid.invoke('appendTreeRow', newNode, { parentRowKey: node.rowKey, focus: true })
      this.$refs.menuGrid.invoke('expand', node.rowKey, true)
    },
    async deleteMenu () {
      const checkedData = this.$refs.menuGrid.invoke('getCheckedRows')
      const menus = checkedData.map(menu => menu.menuId)
      if (menus.length === 0) {
        this.$notify.warning(this.$t('message.00004'))
        return
      }
      await this.$api.system.menu.delete(menus)
      this.$notify.success(this.$t('message.00002'))
      await this.ACTION_REGISTRY().searchClick()
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
          const result = await this.$refs.form.validate()
          if (!result) {
            return
          }
          if (this.isUpdate) {
            if (!this.menu.menuId) {
              this.$notify.warning(this.$t('message.00003'))
              return false
            }
            await this.$api.system.menu.update(this.menu.menuId,
              { menu: this.menu, gridRequest: this.$refs.authGrid.invoke('getModifiedRows') })
          } else {
            await this.$api.system.menu.insertMenu({ menu: this.menu, gridRequest: this.$refs.authGrid.invoke('getModifiedRows') })
          }
          this.$notify.success(this.$t('message.00002'))
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
