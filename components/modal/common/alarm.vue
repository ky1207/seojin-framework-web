<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      {{ $t('components.modal.00015') }}
    </template>
    <template #button>
      <button type="button" class="btn btn-primary" @click="list(1)">
        {{ $t('components.modal.00002') }}
      </button>
      <button type="button" class="btn btn-secondary" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJSearchLRLayout disabled-navigator>
        <template #default>
          <div class="d-flex align-items-center flex-wrap">
            <div class="col-md-1 text-center">
              {{ $t('page.system.00082') }}
            </div>
            <div class="col-md-4">
              <SJInput id="search_title" v-model="search.title" :name="$t('page.system.00082')" type="text" disabled-validation />
            </div>
          </div>
        </template>
        <template #leftTitle>
          <div class="row align-items-center">
            <div class="col-auto">
              <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="readPush">
                {{ $t('components.modal.00019') }}
              </button>
              <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="deletePush">
                {{ $t('components.modal.00013') }}
              </button>
            </div>
          </div>
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
              <SJFormField class="col-md-4" :label="$tc('components.modal.00016')">
                <SJInput
                  id="form_sndrId"
                  v-model="alarmDetail.sndrId"
                  :name="$t('components.modal.00016')"
                  type="text"
                  disabled
                />
              </SJFormField>
              <SJFormField class="col-md-4" :label="$tc('components.modal.00017')">
                <SJInput
                  id="form_sndrName"
                  v-model="alarmDetail.sndrName"
                  :name="$t('components.modal.00017')"
                  type="text"
                  disabled
                />
              </SJFormField>
              <SJFormField class="col-md-4" :label="$tc('components.modal.00018')">
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
              <SJFormField class="col-md-12" :label="$tc('page.system.00082')">
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
              <SJFormField class="col-md-12" :label="$tc('page.system.00090')">
                <SJEditor
                  id="form_cntn"
                  v-model="alarmDetail.cntn"
                  :name="$t('page.system.00090')"
                  disabled="true"
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
      search: {},
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
            editor: null
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
          },
          {
            name: 'title',
            width: 200,
            filter: null,
            sortable: false
          }
        ],
        options: {
          rowHeaders: ['rowNum', 'checkbox'],
          bodyHeight: 450
        }
      },
      resolve: null,
      reject: null
    }
  },
  async created () {
    const result = await this.$api.common.getDepartmentCodes()
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

      this.alarmDetail.data = {
        Data: this.alarmDetail.codes
      }
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
      await this.$api.system.alarm.alarmList(this.search)
    },
    async deletePush () {
      this.$refs.grid.invoke('removeCheckedRows', false)
      const data = this.$refs.grid.invoke('getModifiedRows')
      await this.$api.system.alarm.updateAlarm(data)
      this.$notify.success(this.$t('message.00002'))
      await this.list(1)
    }
  }
}
</script>
