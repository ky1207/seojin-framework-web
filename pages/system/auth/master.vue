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
        <div class="col-md-1 text-center">
          {{ $t('page.system.00004') }}
        </div>
        <div class="col-md-1">
          <SJSelect
            id="useYN"
            v-model="search.useFlag"
            :name="$t('page.system.00004')"
            :options="common.USE_YN"
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
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="createAuthGroup">
            {{ $t('page.system.00007') }} <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4 mt-3">
            <label> {{ $t('page.system.00001') }}</label>
            <SJSelect
              id="form_company"
              v-model="auth.coId"
              :name="$t('page.system.00001')"
              :options="common.COMPANY"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00004') }}</label>
            <SJSelect
              id="form_useFlag"
              v-model="auth.useFlag"
              :name="$t('page.system.00004')"
              :options="common.USE_YN"
              rules="required"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00002') }}</label>
            <SJInput
              id="form_authGroupId"
              v-model="auth.authGroupId"
              :name="$t('page.system.00002')"
              type="text"
              disabled-validation
              disabled
            />
          </div>

          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00003') }}</label>
            <SJInput
              id="form_authName"
              v-model="auth.authName"
              :name="$t('page.system.00003')"
              type="text"
              rules="required"
            />
          </div>
          <div class="col-md-4 mt-3">
            <label>{{ $t('page.system.00008') }}</label>
            <SJSelect
              id="form_defaultFlag"
              v-model="auth.defaultAuthFlag"
              :name="$t('page.system.00008')"
              :options="common.USE_YN"
              disabled-validation
            />
          </div>
          <div class="col-md-12 mt-3">
            <label>{{ $t('page.system.00009') }}</label>
            <SJTextarea id="form_desc" v-model="auth.remark" :name="$t('page.system.00009')" disabled-validation />
          </div>
        </div>
      </SJForm>
      <div v-if="isUpdate">
        <h5 class="card-title">
          <div class="row align-items-center">
            <div class="col">
              {{ $t('page.system.00010') }}
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-dark" @click="addUser">
                {{ $t('page.system.00011') }} <i class="bi bi-file-plus" />
              </button>
              <button class="btn btn-outline-dark" @click="removeRow">
                {{ $t('page.system.00012') }} <i class="bi bi-file-minus" />
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
      </div>
      <CommonUser ref="userModal" />
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'

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
      detailGrid: {
        data: {},
        columns: [
          {
            name: 'loginId'
          },
          {
            name: 'userName'
          },
          {
            name: 'deptName'
          },
          {
            name: 'email'
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
      this.detailGrid.data = {}
    },
    async addUser () {
      if (!this.isUpdate) {
        this.$notify.info(this.$t('message.00008')) // '권한그룹을 선택하세요'
        return false
      }
      const data = await this.$refs.userModal.open()
      if (data.length > 0) {
        const filtered = data.filter((e) => {
          return !this.$refs.detail.invoke('getData').some(d => d.loginId === e.loginId)
        })
        this.$refs.detail.invoke('appendRows', filtered)
        this.$notify.success(this.$t('message.00009', { count: filtered.length })) // `{count}명이 추가되었습니다.` filtered.length
      }
    },
    removeRow () {
      this.$refs.detail.invoke('removeCheckedRows', false)
    },

    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
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
            this.$notify.success(this.$t('message.00002'))
            await this.ACTION_REGISTRY().searchClick()
          }
        }
      }
    }
  }
}
</script>
