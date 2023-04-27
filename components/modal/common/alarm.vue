<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      {{ $t('components.modal.00015') }}
    </template>
    <template #button>
      <button class="btn-gray-bg" @click="list(1)">
        {{ $t('components.modal.00002') }}
      </button>
      <button class="btn-gray-bg" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJSearchLRLayout disabled-navigator-wrap>
        <template #default>
          <SJSearchField :label="$t('page.system.00082')">
            <SJInput id="search_title" v-model="search.title" :name="$t('page.system.00082')" type="text" disabled-validation />
          </SJSearchField>
        </template>
        <template #leftTitle>
          <SJTitle :title="$t('components.modal.00015')">
            <button class="btn-white-bg" @click="readPush">
              {{ $t('components.modal.00019') }}
            </button>
            <button class="btn-white-bg" @click="deletePush">
              {{ $t('components.modal.00013') }}
            </button>
          </SJTitle>
        </template>
        <template #left>
          <SJGrid
            ref="grid"
            v-model="gridProps.data"
            :columns="gridProps.columns"
            :options="gridProps.options"
            pageable
            @moveToGridPage="goPage"
            @click="onMasterClick"
          />
        </template>
        <template #right>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField :label="$tc('components.modal.00016')">
                <SJInput
                  id="form_sndrId"
                  v-model="alarmDetail.sndrId"
                  :name="$t('components.modal.00016')"
                  type="text"
                  disabled
                />
              </SJFormField>
              <SJFormField :label="$tc('components.modal.00017')">
                <SJInput
                  id="form_sndrName"
                  v-model="alarmDetail.sndrName"
                  :name="$t('components.modal.00017')"
                  type="text"
                  disabled
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField :label="$tc('components.modal.00018')">
                <SJInput
                  id="form_sndrEmail"
                  v-model="alarmDetail.sndrEmail"
                  :name="$t('components.modal.00018')"
                  type="text"
                  disabled
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField :label="$tc('page.system.00082')">
                <SJInput
                  id="form_title"
                  v-model="alarmDetail.title"
                  :name="$t('page.system.00082')"
                  type="text"
                  disabled
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField :label="$tc('page.system.00090')">
                <div
                  class="cntn-area"
                  v-html="alarmDetail.cntn != null ? alarmDetail.cntn.unescapeHtml() : ''"
                />
              </SJFormField>
            </SJFormRow>
          </SJForm>
        </template>
      </SJSearchLRLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      common: {},
      search: {
        rcvrId: null,
        pushInqryFlag: null
      },
      alarmDetail: {},
      gridProps: {
        data: {},
        columns: [
          {
            name: 'notifyId',
            hidden: true
          },
          {
            name: 'notifyTmpltName',
            filter: null,
            sortable: false,
            editor: null,
            width: 150
          },
          {
            name: 'title',
            width: 200,
            filter: null,
            sortable: false
          },
          {
            name: 'sndrId',
            filter: null,
            sortable: false,
            width: 100
          },
          {
            name: 'sndrName',
            filter: null,
            sortable: false,
            width: 100
          }

        ],
        options: {
          rowHeaders: ['rowNum', 'checkbox'],
          bodyHeight: 450,
          cell: {
            normal: {
              text: 'red'
            }
          }
        }
      },
      resolve: null,
      reject: null
    }
  },
  async created () {
    const result = await this.$api.common.getDepartmentIds()
    this.common = { DEPARTMENT: result.data }
    // 모달에서 그리드 사용시, 그리드를 모달 크기에 맞추기 위함.
    this.$nuxt.$on('modal.show', () => {
      this.$refs.grid.invoke('refreshLayout')
    })
  },
  beforeDestroy () {
    // 위의 이벤트를 삭제 한다. this.$nuxt.$on('modal.show')
    this.$nuxt.$off('modal.show')
  },
  methods: {
    async onMasterClick (ev) {
      if (ev.rowKey === undefined) { return }
      const item = this.$refs.grid.invoke('getRow', ev.rowKey)
      const result = await this.$api.system.alarm.loadAlarm(item.notifyId)
      this.alarmDetail = result.data

      // 알림 읽음 처리
      const alarms = [item.notifyId]
      await this.$api.system.alarm.readAlarm(alarms)

      this.alarmDetail.data = {
        Data: this.alarmDetail.codes
      }

      this.$refs.grid.invoke('addCellClassName', '0', 'notifyTmpltName', 'font-red')
    },
    open () {
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    goPage (e) {
      this.list(e.page)
    },
    async list (page) {
      this.search.rcvrId = this.$auth.user.userId
      const result = await this.$api.system.alarm.alarmList(this.search, page)
      this.gridProps.data = result.data
    },
    confirm () {
      const data = this.$refs.grid.invoke('getCheckedRows')
      this.resolve(data)
      this.$refs.modal.hide()
    },
    close () {
      this.$refs.modal.hide()
      this.resolve([]) // response의 응답
    },
    async readPush () {
      const checkedData = this.$refs.grid.invoke('getCheckedRows')
      const alarms = checkedData.map(alarm => alarm.notifyId)
      if (alarms.length === 0) {
        this.$notify.warning(this.$t('message.00011'))// '삭제 할 부서를 체크하세요.'
        return
      }
      await this.$api.system.alarm.readAlarm(alarms)
      await this.list(1)
    },
    async deletePush () {
      const checkedData = this.$refs.grid.invoke('getCheckedRows')
      const alarms = checkedData.map(alarm => alarm.notifyId)
      if (alarms.length === 0) {
        this.$notify.warning(this.$t('message.00011'))// '삭제 할 부서를 체크하세요.'
        return
      }
      await this.$api.system.alarm.deleteAlarm(alarms)
      await this.list(1)
    }
  }
}
</script>
