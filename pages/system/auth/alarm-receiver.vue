<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00104')">
        <SJSelect
          id="company"
          v-model="search.bsnsId"
          :name="$t('page.system.00104')"
          :options="common.BUSINESS"
          disabled-validation
          disabled-first-message
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
      <SJTitle :title="$t('page.system.00078')" />
    </template>
    <template #left>
      <SJGrid ref="alarmGrid" v-model="alarmGrid.data" :columns="alarmGrid.columns" @click="onMasterClick" />
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00079')" />
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField class="col-md-6" :label="$tc('page.system.00080')">
            <SJInput
              id="form_notifyTmpltCode"
              v-model="alarm.notifyTmpltCode"
              :name="$t('page.system.00080')"
              disabled-validation
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00081')">
            <SJInput
              id="form_notifyTmpltName"
              v-model="alarm.notifyTmpltName"
              :name="$t('page.system.00081')"
              disabled-validation
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00082')">
            <SJInput
              id="form_title"
              v-model="alarm.title"
              :name="$t('page.system.00082')"
              disabled-validation
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00009')">
            <SJTextarea id="form_desc" v-model="alarm.remark" :name="$t('page.system.00009')" disabled-validation disabled />
          </SJFormField>
        </SJFormRow>
      </SJForm>
      <div v-if="isUpdate">
        <SJTitle :title="$t('page.system.00010') ">
          <button class="btn-white-bg" @click="addUser">
            {{ $t('page.system.00011') }}
          </button>
          <button class="btn-white-bg" @click="removeRow">
            {{ $t('page.system.00012') }}
          </button>
        </SJTitle>

        <SJGrid
          ref="detailGrid"
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
      alarm: {},
      alarmGrid: {
        data: {},
        columns: [
          {
            name: 'notifyTmpltCode'
          },
          {
            name: 'bsnsId',
            hidden: true
          },
          {
            name: 'notifyTmpltName',
            editor: null,
            validation: null,
            width: null
          },
          {
            name: 'useFlag',
            width: 100
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
          },
          {
            name: 'useFlag'
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
      const item = this.$refs.alarmGrid.invoke('getRow', ev.rowKey)
      this.search.notifyTmpltId = item.notifyTmpltId
      const result = await this.$api.system.alarm.load(this.search)
      this.alarm = result.data
      this.isUpdate = true
      this.detailGrid.data = {
        Data: this.alarm.alarmReceivers
      }
    },
    _resetForm () {
      this.$refs.form.reset()
      this.alarm = {}
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
          return !this.$refs.detailGrid.invoke('getData').some(d => d.loginId === e.loginId)
        })
        this.$refs.detailGrid.invoke('appendRows', filtered)
        this.$notify.success(this.$t('message.00009', { count: filtered.length })) // `{count}명이 추가되었습니다.` filtered.length
      }
    },
    removeRow () {
      this.$refs.detailGrid.invoke('removeCheckedRows', false)
    },

    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          this._resetForm()
          const result = await this.$api.system.alarm.list(this.search)
          this.alarmGrid.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            const data = { bsnsId: this.search.bsnsId, notifyTmpltCode: this.alarm.notifyTmpltCode, gridRequestAlarmReceiver: this.$refs.detailGrid.invoke('getModifiedRows') }
            await this.$api.system.alarm.updateAlarmReceiver(data)

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
