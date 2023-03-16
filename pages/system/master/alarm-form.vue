<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="search-area">
        <div class="col-md-1 search-label">
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
        <div class="col-md-1 search-label">
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
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00078') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="removeRow">
            {{ $t('page.system.00012') }} <i class="bi bi-file-minus" />
          </button>
        </div>
      </div>
    </template>
    <template #left>
      <SJGrid
        ref="alarmGrid"
        v-model="alarmGrid.data"
        :columns="alarmGrid.columns"
        :options="alarmGrid.options"
        @click="onMasterClick"
      />
    </template>
    <template #rightTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00079') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="createAlarmForm">
            {{ $t('page.system.00089') }} <i class="bi bi-pencil-fill" />
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00080')">
            <SJStepper
              id="form_notifyTmpltId"
              v-model="alarm.notifyTmpltId"
              :name="$t('page.system.00080')"
              type="text"
              disabled-validation
              disabled
            />
          </SJFormField>
          <SJFormField :label="$tc('page.system.00081')">
            <SJInput
              id="form_notifyTmpltName"
              v-model="alarm.notifyTmpltName"
              :name="$t('page.system.00081')"
              type="text"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00082')">
            <SJInput
              id="form_title"
              v-model="alarm.title"
              :name="$t('page.system.00082')"
              type="text"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00004')">
            <SJSelect
              id="form_useYN"
              v-model="alarm.useFlag"
              :name="$t('page.system.00004')"
              :options="$api.common.getYNCodes()"
              rules="required"
              disabled-first-message
            />
          </SJFormField>
          <SJFormField label="EMAIL">
            <SJSelect
              id="form_emailFlag"
              v-model="alarm.emailFlag"
              name="EMAIL"
              :options="$api.common.getYNCodes()"
              rules="required"
              disabled-first-message
            />
          </SJFormField>
          <SJFormField label="PUSH">
            <SJSelect
              id="form_pushFlag"
              v-model="alarm.pushFlag"
              name="PUSH"
              :options="$api.common.getYNCodes()"
              rules="required"
              disabled-first-message
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00090')">
            <SJEditor
              id="form_cntn"
              v-model="alarm.cntn"
              :name="$t('page.system.00090')"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00009')">
            <SJTextarea id="form_desc" v-model="alarm.remark" :name="$t('page.system.00009')" disabled-validation />
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
// 메뉴 화면
// 기능권한버튼을 사용하는 경우
import { MENU, ACTION } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: { },
      search: {},
      alarm: {
      },
      alarmGrid: {
        data: {},
        options: {
          rowHeaders: ['checkbox']
        },
        columns: [
          {
            name: 'notifyTmpltId',
            editor: null
          },
          {
            name: 'coId',
            hidden: true
          },
          {
            name: 'notifyTmpltName',
            width: 500,
            editor: null
          },
          {
            name: 'useFlag',
            editor: null
          }
        ]
      }
    }
  },
  async created () {
    const company = await this.$api.common.getCompanyCodes()
    this.common = { COMPANY: company.data }
    this.common.USE_YN = this.$api.common.getYNCodes()
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.alarmGrid.invoke('getRow', ev.rowKey)
      this.search.notifyTmpltId = item.notifyTmpltId
      const result = await this.$api.system.alarm.load(this.search)
      this.alarm = result.data
      this.isUpdate = true
    },
    createAlarmForm () {
      this.isUpdate = false
      this._resetForm()
    },
    _resetForm () {
      this.$refs.form.reset()
      this.alarm = {}
    },
    async removeRow () {
      this.$refs.alarmGrid.invoke('removeCheckedRows', false)
      const data = { coId: this.search.coId, gridRequest: this.$refs.alarmGrid.invoke('getModifiedRows') }
      await this.$api.system.alarm.delete(data)
      this.$notify.success(this.$t('message.00002'))
      await this.ACTION_REGISTRY().searchClick()
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.alarm.list(this.search)
          this.alarmGrid.data = result.data
        },
        saveClick: async () => {
          /* const error = this.$refs.alarmGrid.invoke('validate')
          if (error.length > 0) {
            this.$notify.warning(this.$t('message.00007')) // Grid 입력값을 확인하세요.
            return false
          }
          const data = { coId: this.search.coId, gridRequest: this.$refs.alarmGrid.invoke('getModifiedRows') }
          await this.$api.system.alarm.update(data)
          this.$notify.success(this.$t('message.00002'))
          await this.ACTION_REGISTRY().searchClick() */
          const result = await this.$refs.form.validate()
          if (result) {
            if (this.isUpdate) {
              await this.$api.system.alarm.update(this.notifyTmpltId, this.alarm)
            } else {
              this.alarm.coId = this.search.coId
              await this.$api.system.alarm.save(this.alarm)
            }
            this._resetForm()
            this.$notify.success(this.$t('message.00002'))// '처리되었습니다.'
            await this.ACTION_REGISTRY().searchClick()
          }
        }
      }
    }
  }
}
</script>
