<template>
  <SJSearchLRLayout left-size="60" right-size="40">
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00104')">
        <SJSelect
          id="bsnsId"
          v-model="search.bsnsId"
          :name="$t('page.system.00104')"
          :options="common.BUSINESS"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00002')">
        <SJInput
          id="authCode"
          v-model="search.authGroupId"
          :name="$t('page.system.00002')"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00003')">
        <SJInput
          id="authName"
          v-model="search.authName"
          :name="$t('page.system.00003')"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00004')">
        <SJSelect
          id="useYN"
          v-model="search.useFlag"
          :name="$t('page.system.00004')"
          :options="common.USE_YN"
          disabled-validation
        />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00005')" />
    </template>
    <template #left>
      <SJGrid ref="authGrid" v-model="authGrid.data" :columns="authGrid.columns" @click="onMasterClick" />
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00006')">
        <button class="btn-blue-bg" @click="createAuthGroup">
          {{ $t('page.system.00007') }}
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00002')">
            <SJInput
              id="form_authGroupCode"
              v-model="auth.authGroupCode"
              :name="$t('page.system.00002')"
              :disabled-validation="isUpdate"
              rules="required"
              :disabled="isUpdate"
            />
          </SJFormField>

          <SJFormField :label="$tc('page.system.00003')">
            <SJInput
              id="form_authName"
              v-model="auth.authName"
              :name="$t('page.system.00003')"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00004')">
            <SJSelect
              id="form_useFlag"
              v-model="auth.useFlag"
              :name="$t('page.system.00004')"
              :options="common.USE_YN"
              rules="required"
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00008')">
            <SJSelect
              id="form_defaultFlag"
              v-model="auth.defaultAuthFlag"
              :name="$t('page.system.00008')"
              :options="common.USE_YN"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00009')">
            <SJTextarea id="form_desc" v-model="auth.remark" :name="$t('page.system.00009')" disabled-validation />
          </SJFormField>
        </SJFormRow>
      </SJForm>
      <div v-if="isUpdate">
        <SJTitle :title="$t('page.system.00010')">
          <button class="btn-white-bg" @click="addUser">
            {{ $t('page.system.00011') }}
          </button>
          <button class="btn-white-bg" @click="removeRow">
            {{ $t('page.system.00012') }}
          </button>
        </SJTitle>
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
            name: 'bsnsId'
          },
          {
            name: 'authGroupCode'
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
    const business = await this.$api.common.getBusinessIds()
    this.common = { USE_YN: this.$api.common.getYNCodes(), BUSINESS: business.data }
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
              this.auth.bsnsId = this.search.bsnsId
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
