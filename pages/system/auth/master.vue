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
          />
        </div>
        <div class="col-md-1 text-center">
          권한코드
        </div>
        <div class="col-md-1">
          <SJInput
            id="authCode"
            v-model="search.authGroupId"
            name="권한코드"
            type="text"
            disabled-validation
          />
        </div>
        <div class="col-md-1 text-center">
          권한명
        </div>
        <div class="col-md-1">
          <SJInput
            id="authName"
            v-model="search.authName"
            name="권한명"
            type="text"
            disabled-validation
          />
        </div>
        <div class="col-md-1 text-center">
          사용여부
        </div>
        <div class="col-md-1">
          <SJSelect
            id="useYN"
            v-model="search.useFlag"
            name="사용여부"
            :options="common.USE_YN"
            disabled-validation
          />
        </div>
      </div>
    </template>
    <template #leftTitle>
      권한그룹
    </template>
    <template #left>
      <SJGrid ref="authGrid" v-model="authGrid.data" :columns="authGrid.columns" @click="onMasterClick" />
    </template>
    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          권한그룹상세
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="createAuthGroup">
            신규권한 생성 <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4">
            <label>회사</label>
            <SJSelect
              id="form_company"
              v-model="auth.coId"
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
      <h5 class="card-title">
        <div class="row align-items-center">
          <div class="col">
            권한그룹별 담당
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-dark" @click="addUser">
              추가 <i class="bi bi-file-plus" />
            </button>
            <button class="btn btn-outline-dark" @click="removeRow">
              삭제 <i class="bi bi-file-minus" />
            </button>
          </div>
        </div>
      </h5>
      <SJGrid
        ref="detail"
        v-model="detailGrid.data"
        :columns="detailGrid.columns"
        :options="detailGrid.options"
      />
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
import { YNFormatter } from '~/plugins/lib/grid/Formatter'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      isUpdate: false,
      common: {},
      search: {},
      auth: {},
      authGrid: {
        data: {},
        columns: [
          {
            name: 'coId'
          },
          {
            name: 'authGroupId',
            header: '권한코드'
          },
          {
            name: 'authName',
            header: '권한명'
          },
          {
            name: 'defaultAuthFlag',
            header: '기본권한',
            formatter: YNFormatter,
            align: 'center'
          },
          {
            name: 'useFlag'
          }
        ],
        options: {

        }
      },
      detailGrid: {
        data: {},
        columns: [
          {
            name: 'loginId',
            header: '계정'
          },
          {
            name: 'userName',
            header: '사용자명'
          },
          {
            name: 'deptName',
            header: '부서명'
          },
          {
            name: 'email',
            header: 'email'
          }
        ],
        options: {
          rowHeaders: ['checkbox'],
          bodyHeight: 295
        }
      }
    }
  },
  async created () {
    this.common.USE_YN = this.$api.common.getYNCodes()
    const company = await this.$api.common.getCompanyCodes()
    this.common = { USE_YN: this.$api.common.getYNCodes(), COMPANY: company.data }
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.authGrid.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.authority.load(item.authGroupId)
      this.auth = result.data
      this.isUpdate = true
      this.detailGrid.data = {
        Data: this.auth.authorityUsers
      }
    },
    createAuthGroup () {
      this.isUpdate = false
      this._resetForm()
    },
    _resetForm () {
      this.$refs.form.reset()
      this.auth = {}
      this.detailGrid.data = {
        Data: []
      }
    },
    addUser () {
      this.$refs.detail.invoke('appendRow')
    },
    removeRow () {
      this.$refs.detail.invoke('removeCheckedRows', false)
    },

    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.authority.list(this.search)
          this.authGrid.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              const { authorityUsers, ...rest } = this.auth
              const data = { authority: rest, gridRequest: this.$refs.detail.invoke('getModifiedRows') }
              await this.$api.system.authority.update(rest.authGroupId, data)
            } else {
              await this.$api.system.authority.save(this.auth)
            }
            this._resetForm()
            this.$notify.success('처리되었습니다.') // TODO:다국어 처리
            await this.ACTION_REGISTRY().searchClick()
          }
        }
      }
    }
  }
}
</script>
