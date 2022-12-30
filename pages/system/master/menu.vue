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
              rules="required"
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
            name: 'menuName',
            header: '메뉴명',
            filter: null,
            sortable: false
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
            name: 'authGroupId',
            header: '권한그룹코드'
          },
          {
            name: 'authName',
            header: '권한그룹명'
          },
          {
            name: 'inqryAuth',
            header: '조회',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'saveAuth',
            header: '저장',
            align: 'center',
            renderer: CustomCheckRenderer,
            filter: null
          },
          {
            name: 'excelAuth',
            header: '엑셀',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'delAuth',
            header: '삭제',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn1Auth',
            header: 'FN1',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn2Auth',
            header: 'FN2',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn3Auth',
            header: 'FN3',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn4Auth',
            header: 'FN4',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          },
          {
            name: 'fn5Auth',
            header: 'FN5',
            renderer: CustomCheckRenderer,
            align: 'center',
            filter: null
          }
        ],
        options: {
          bodyHeight: 270
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
      await this._readProgramAuth(node.menuId, this.menu.progId)
    },
    async _readProgramAuth (menuId, progId) {
      this.auth.data = { Data: [] }
      if (Utils.isEmpty(progId)) {
        return
      }
      const result = await this.$api.system.menu.menuProgramAuth({ menuId, progId })
      this.auth.data = result.data
    },
    dropped (e) {
      // rowKey: dropped 된 위치
      // targetRowKey: 상위
      // appended: child여부

      console.log(e)
    },
    async addMenu () {
      const node = this.$refs.menuGrid.invoke('getFocusedCell')
      if (node.rowKey === null) {
        this.$notify.warning('메뉴를 선택하세요')
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

      const result = await this.$api.system.menu.insertTempMenu(temp)
      this.menu = result.data
      temp.menuId = this.menu.menuId

      this.$refs.menuGrid.invoke('appendTreeRow', newNode, { parentRowKey: node.rowKey, focus: true })
      this.$refs.menuGrid.invoke('expand', node.rowKey, true)

      // 바로 임시저장하고 로딩한다.
    },
    async deleteMenu () {
      const checkedData = this.$refs.menuGrid.invoke('getCheckedRows')
      const menus = checkedData.map(menu => menu.menuId)
      if (menus.length === 0) {
        this.$notify.warning('메뉴를 선택하세요.')
        return
      }
      await this.$api.system.menu.delete(menus)
      this.$notify.success('처리되었습니다.')
      await this.ACTION_REGISTRY().searchClick()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.menu.list(this.search)

          this.menus.data = {
            Total: result.data.Total,
            Data: this.$tree.treeGridSort(result.data.Data)
          }
        },
        saveClick: async () => {
          if (!this.menu.menuId) {
            this.$notify.warning('메뉴를 선택하세요')
            return false
          }
          const result = await this.$refs.form.validate()
          if (result) {
            await this.$api.system.menu.update(this.menu.menuId,
              { menu: this.menu, gridRequest: this.$refs.authGrid.invoke('getModifiedRows') })
            this.$notify.success('처리되었습니다.')
            await this.ACTION_REGISTRY().searchClick()
          }
        }
      }
    }
  }
}
</script>
