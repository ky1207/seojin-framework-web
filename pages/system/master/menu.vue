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
      <div class="row align-items-center">
        <div class="col">
          메뉴목록
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="addMenu">
            추가 <i class="bi bi-file-plus" />
          </button>
          <button class="btn btn-outline-dark" @click="deleteMenu">
            삭제 <i class="bi bi-file-minus" />
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
      프로그램설정
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4">
            <label>회사</label>
            <SJSelect
              id="form_company"
              v-model="menu.coId"
              name="회사"
              :options="common.COMPANY"
              rules="required"
            />
          </div>
          <div class="col-md-4">
            <label>메뉴아이콘</label>
            <SJInput
              id="form_menuIcon"
              v-model="menu.iconName"
              name="메뉴아이콘"
              type="text"
              disabled-validation
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>프로그램명</label>
            <SJSelect
              id="form_company"
              v-model="menu.progId"
              name="프로그램명"
              data-live-search
              :options="common.PROGRAM"
              disabled-validation
              @change="changeProgram"
            />
          </div>

          <div class="col-md-4">
            <label>메뉴코드</label>
            <SJInput
              id="form_menuId"
              v-model="menu.menuId"
              name="메뉴코드"
              type="text"
              disabled-validation
              disabled
            />
          </div>
          <div class="col-md-4">
            <label>App메뉴코드</label>
            <SJInput
              id="form_applnMenuCode"
              v-model="menu.applnMenuCode"
              name="App메뉴코드"
              type="text"
              disabled-validation
            />
          </div>
          <div class="col-md-12 mt-3">
            <label>메뉴명</label>
            <SJMultiInput id="form_lname" v-model="menu.langs" name="메뉴명" type="text" rules="required" />
          </div>
        </div>
      </SJForm>
      <h5 class="card-title mt-3">
        <div class="row align-items-center">
          <div class="col">
            권한그룹 설정
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
  name: 'Menu',
  mixins: [MENU, ACTION],
  data () {
    return {
      gridCheck: true,
      common: { },
      search: {},
      menu: {},
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
          rowHeaders: ['rowNum', 'checkbox'],
          draggable: true
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
        }
      }
    }
  },
  async created () {
    await Promise.all([this.$api.common.getCommonCodes(['MENU_GROUP']),
      this.$api.common.getCompanyCodes(),
      this.$api.common.getProgramCodes()])
      .then((response) => {
        this.common = {
          ...response[0].data,
          COMPANY: response[1].data,
          PROGRAM: response[2].data,
          USE_YN: this.$api.common.getYNCodes()
        }
      })
    await this.ACTION_REGISTRY().searchClick()
  },
  methods: {
    async read (e) {
      this.isUpdate = true

      if (e.rowKey === undefined) { return }
      if (e.columnName !== 'menuName') { return }
      const node = this.$refs.menuGrid.invoke('getRow', e.rowKey)
      const result = await this.$api.system.menu.load(node.menuId)
      this.menu = result.data
      await this._readProgramAuth(this.menu.menuId, this.menu.progId)
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
    _resetForm () {
      this.$refs.form.reset()
      this.menu = {}
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
          menuName: '새메뉴',
          upperMenuId: parent.menuId,
          menuGroupId: parent.menuGroupId,
          level: parent.level + 1
        }
      )
      const { menuName, ...rest } = newNode

      const temp = rest
      temp.langs = [{ langCode: 'ko', val: '새메뉴' }]

      this.menu = temp
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
