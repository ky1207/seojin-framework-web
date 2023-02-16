<template>
  <SJSearchOneLayout>
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
          {{ $t('page.system.00083') }}
        </div>
        <div class="col-md-4">
          <SJDatePicker
            id="sentStartDtm"
            v-model="search.sentStartDtm"
            :name="$t('page.system.00083')"
            show-current="true"
            disabled-validation
          />
          ~
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
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
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
            name: 'notifyTmpltId'
          },
          {
            name: 'notifyId'
          },
          {
            name: 'sndrId'
          },
          {
            name: 'sndrEmail'
          },
          {
            name: 'rcvrId'
          },
          {
            name: 'rcvrEmail'
          },
          {
            name: 'title'
          },
          {
            name: 'emailFlag',
            header: this.$t('page.system.00087'),
            formatter: YNFormatter,
            renderer: null
          },
          {
            name: 'pushFlag',
            header: this.$t('page.system.00088'),
            formatter: YNFormatter,
            renderer: null
          },
          {
            name: 'emailSentFlag'
          },
          {
            name: 'pushSentFlag'
          },
          {
            name: 'emailInqryFlag'
          },
          {
            name: 'pushInqryFlag'
          },
          {
            name: 'modDtm'
          },
          {
            name: 'modUserName'
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
    sendAlarm () {
      // TO-DO : 배치 개발 완료 시 배치 호출
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.alarm.alarmList(this.search)
          this.grid.data = result.data
        }
      }
    }
  }
}
</script>
