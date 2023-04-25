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
      <div class="txt-wrap">
        <h3><i class="fa-regular fa-folder-open" /> {{ $t('page.system.00078') }}</h3>
        <div class="btn-bar">
          <button class="btn-white-bg" @click="removeRow">
            {{ $t('page.system.00012') }}
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
      <div class="txt-wrap">
        <h3><i class="fa-regular fa-folder-open" /> {{ $t('page.system.00079') }}</h3>
        <div class="btn-bar">
          <button class="btn-blue-bg" @click="createAlarmForm">
            {{ $t('page.system.00089') }}
          </button>
        </div>
      </div>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField :label="$tc('page.system.00080')">
            <SJInput
              id="form_notifyTmpltCode"
              v-model="alarm.notifyTmpltCode"
              :name="$t('page.system.00080')"
              type="text"
              rules="required"
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
        cntn: null
      },
      alarmGrid: {
        data: {},
        options: {
          rowHeaders: ['checkbox']
        },
        columns: [
          {
            name: 'notifyTmpltCode',
            editor: null
          },
          {
            name: 'coId',
            hidden: true
          },
          {
            name: 'notifyTmpltName',
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
    const business = await this.$api.common.getBusinessIds()
    this.common = { BUSINESS: business.data }
    this.common.USE_YN = this.$api.common.getYNCodes()
  },
  methods: {
    async onMasterClick (ev) {
      this._resetForm()
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.alarmGrid.invoke('getRow', ev.rowKey)
      this.search.notifyTmpltId = item.notifyTmpltId
      const result = await this.$api.system.alarm.load(this.search)
      this.alarm = result.data
      if (result.data.cntn === undefined) {
        this.alarm.cntn = null
      }

      this.isUpdate = true
    },
    createAlarmForm () {
      this.isUpdate = false
      this._resetForm()
    },
    _resetForm () {
      this.$refs.form.reset()
      this.alarm = {}
      this.alarm.cntn = null
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
          this._resetForm()
          const result = await this.$api.system.alarm.list(this.search)
          this.alarmGrid.data = result.data
        },
        saveClick: async () => {
          const result = await this.$refs.form.validate()
          if (result) {
            this.alarm.bsnsId = this.search.bsnsId
            if (this.isUpdate) {
              await this.$api.system.alarm.update(this.alarm)
            } else {
              // 알림코드 중복 체크
              this.search.notifyTmpltCode = this.alarm.notifyTmpltCode
              const alarmFormDupCnt = await this.$api.system.alarm.getAlarmFormDupChk(this.search)
              this.search.notifyTmpltCode = null
              if (alarmFormDupCnt.data > 0) {
                this.$notify.error(this.$t('message.00014'))// 동일한 알림코드가 존재합니다.
                return false
              } else {
                await this.$api.system.alarm.save(this.alarm)
              }
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
