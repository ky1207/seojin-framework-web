<template>
  <SJSearchOneLayout>
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
      <SJSearchField :label="$t('page.system.00083')">
        <SJPeriodSearch
          id="sentStartDtm"
          v-model="search.period"
          :name="$t('page.system.00083')"
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle :title="$t('page.system.00084')">
        <button class="btn-blue-bg" @click="sendAlarm">
          {{ $t('page.system.00085') }}
        </button>
      </SJTitle>
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
      afterOneWeek: {},
      search: {
        period: { }
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
    const business = await this.$api.common.getBusinessIds()
    this.common = { BUSINESS: business.data }
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
