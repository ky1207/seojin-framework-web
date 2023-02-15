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
      {{ $t('page.system.00078') }}
    </template>
    <template #left>
      <SJGrid ref="alarmGrid" v-model="alarmGrid.data" :columns="alarmGrid.columns" @click="onMasterClick" />
    </template>
    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00079') }}
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <div class="row">
          <div class="col-md-4">
            <label>{{ $t('page.system.00080') }}</label>
            <SJInput
              id="form_notifyTmpltId"
              v-model="alarm.notifyTmpltId"
              :name="$t('page.system.00080')"
              type="text"
              disabled-validation
              disabled
            />
          </div>

          <div class="col-md-4">
            <label>{{ $t('page.system.00081') }}</label>
            <SJInput
              id="form_notifyTmpltName"
              v-model="alarm.notifyTmpltName"
              :name="$t('page.system.00081')"
              type="text"
              disabled-validation
              disabled
            />
          </div>
          <div class="col-md-12">
            <label>{{ $t('page.system.00082') }}</label>
            <SJInput
              id="form_title"
              v-model="alarm.title"
              :name="$t('page.system.00082')"
              type="text"
              disabled-validation
              disabled
            />
          </div>
          <div class="col-md-12 mt-3">
            <label>{{ $t('page.system.00009') }}</label>
            <SJTextarea id="form_desc" v-model="alarm.remark" :name="$t('page.system.00009')" disabled-validation disabled />
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
        options: {
          rowHeaders: ['checkbox']
        },
        columns: [
          {
            name: 'notifyTmpltId'
          },
          {
            name: 'coId',
            hidden: true
          },
          {
            name: 'notifyTmpltName'
          },
          {
            name: 'useFlag'
          }
        ]
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
    const company = await this.$api.common.getCompanyCodes()
    this.common = { USE_YN: this.$api.common.getYNCodes(), COMPANY: company.data }
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
            const data = { coId: this.search.coId, notifyTmpltId: this.alarm.notifyTmpltId, gridRequestAlarmReceiver: this.$refs.detailGrid.invoke('getModifiedRows') }
            debugger
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
