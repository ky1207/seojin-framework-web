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
            v-model="search.menuGroup"
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
      <SJGrid ref="menuGrid" v-model="menus.data" :columns="menus.columns" :options="menus.options" />
    </template>

    <template #rightTitle>
      권한그룹설정
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
            <label>사용여부</label>
            <SJSelect
              id="form_useFlag"
              v-model="auth.useFlag"
              name="사용여부"
              :options="common.USE_YN"
              rules="required"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>권한코드</label>
            <SJInput
              id="form_authGroupId"
              v-model="auth.authGroupId"
              name="권한코드"
              type="text"
              disabled-validation
              disabled
            />
          </div>

          <div class="col-md-4">
            <label>권한명</label>
            <SJInput
              id="form_authName"
              v-model="auth.authName"
              name="권한명"
              type="text"
              rules="required"
            />
          </div>
          <div class="col-md-4">
            <label>Default권한</label>
            <SJSelect
              id="form_defaultFlag"
              v-model="auth.defaultAuthFlag"
              name="Default권한"
              :options="common.USE_YN"
              disabled-validation
            />
          </div>
          <div class="col-md-12 mt-3">
            <label>비고</label>
            <SJTextarea id="form_desc" v-model="auth.remark" name="비고" disabled-validation />
          </div>
        </div>
      </SJForm>
      <h5 v-if="isUpdate" class="card-title">
        <div class="row align-items-center">
          <div class="col">
            권한그룹별 담당
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-dark" @click="addUser">
              사용자추가 <i class="bi bi-file-plus" />
            </button>
            <button class="btn btn-outline-dark" @click="removeRow">
              삭제 <i class="bi bi-file-minus" />
            </button>
          </div>
        </div>
      </h5>
      <SJGrid
        v-if="isUpdate"
        ref="detail"
        v-model="auth.data"
        :columns="auth.columns"
        :options="auth.options"
      />
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'

export default {
  name: 'Menu',
  mixins: [MENU, ACTION],
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      menu: {},
      menus: {
        data: {},
        columns: [
          {
            name: 'menuName',
            header: '메뉴명'
          }
        ],
        options: {
          treeColumnOptions: {
            name: 'menuName'
          }
        }
      },
      auth: {
        data: {},
        columns: []
      },
      options: {

      }
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['MENU_GROUP'])
    this.common.USE_YN = this.$api.common.getYNCodes()
    const company = await this.$api.common.getCompanyCodes()
    this.common = { ...codes.data, USE_YN: this.$api.common.getYNCodes(), COMPANY: company.data }
    await this.ACTION_REGISTRY().searchClick()
  },
  methods: {
    addMenu () {

    },
    deleteMenu () {

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
        saveClick: () => {

        }
      }
    }
  }
}
</script>
