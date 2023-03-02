<template>
  <SJSearchOneLayout>
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
          {{ $t('page.system.00083') }}
        </div>
        <div class="col-md-1">
          <SJDatePicker
            id="sentStartDtm"
            v-model="search.sentStartDtm"
            :name="$t('page.system.00083')"
            show-current="true"
            disabled-validation
          />
        </div>
        <div>
          ~
        </div>
        <div class="col-md-1">
          <SJDatePicker
            id="sentEndDtm"
            v-model="search.sentEndDtm"
            :name="$t('page.system.00083')"
            disabled-validation
          />
        </div>
      </div>
    </template>
    <template #bodyTitle>
      <div class="row align-items-center">
        <div class="col">
          {{ $t('page.system.00084') }}
        </div>
        <div class="col-auto">
          <button class="btn btn-mb3 btn-mr3 btn-blue-gray" @click="sendAlarm">
            {{ $t('page.system.00085') }}
          </button>
        </div>
      </div>
    </template>
    <template #body>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
        :options="grid.options"
        pageable
        @moveToGridPage="goPage"
      />
    </template>
  </SJSearchOneLayout>
</template>

<script>

import { MENU, ACTION } from '~/mixins'
import { YNFormatter } from '~/plugins/lib/grid/Formatter'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: { },
      search: {
        progName: ''
      },
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox']
        },
        columns: [
          {
            name: 'notifyTmpltName',
            filter: null,
            sortable: false,
            editor: null
          },
          {
            name: 'notifyId',
            filter: null,
            sortable: false
          },
          {
            name: 'sndrId',
            filter: null,
            sortable: false
          },
          {
            name: 'sndrEmail',
            filter: null,
            sortable: false
          },
          {
            name: 'rcvrId',
            filter: null,
            sortable: false
          },
          {
            name: 'rcvrEmail',
            filter: null,
            sortable: false
          },
          {
            name: 'title',
            width: 200,
            filter: null,
            sortable: false
          },
          {
            name: 'emailFlag',
            header: this.$t('page.system.00087'),
            formatter: YNFormatter,
            renderer: null,
            filter: null,
            sortable: false
          },
          {
            name: 'pushFlag',
            header: this.$t('page.system.00088'),
            formatter: YNFormatter,
            renderer: null,
            filter: null,
            sortable: false
          },
          {
            name: 'emailSentFlag',
            filter: null,
            sortable: false
          },
          {
            name: 'pushSentFlag',
            filter: null,
            sortable: false
          },
          {
            name: 'emailInqryFlag',
            filter: null,
            sortable: false
          },
          {
            name: 'pushInqryFlag',
            filter: null,
            sortable: false
          },
          {
            name: 'modDtm',
            filter: null,
            sortable: false
          },
          {
            name: 'modUserName',
            filter: null,
            sortable: false
          }
        ]
      }
    }
  },
  async created () {
    const company = await this.$api.common.getCompanyCodes()
    this.common = { COMPANY: company.data }
  },
  methods: {
    goPage (e) {
      this.list(e.page)
    },
    async list (page) {
      const result = await this.$api.system.alarm.alarmList(this.search, page)
      this.grid.data = result.data
    },
    sendAlarm () {
      // TO-DO : 배치 개발 완료 시 배치 호출
    },
    ACTION_REGISTRY () {
      return {
        searchClick: () => {
          this.list()
        }
      }
    }
  }
}
</script>
