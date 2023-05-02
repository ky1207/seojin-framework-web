<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00035')">
        <SJInput
          id="authName"
          v-model="search.userName"
          :name="$t('page.system.00035')"
          disabled-validation
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle :title="$t('page.system.00037')" />
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

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      search: {
        userName: ''
      },
      grid: {
        data: {},
        options: {
          rowHeaders: []
        },
        columns: [
          {
            name: 'acsLogId',
            width: 100
          },
          {
            name: 'coName',
            width: 100,
            align: 'center',
            filter: null,
            sortable: false
          },
          {
            name: 'bsnsName',
            width: 200,
            align: 'center',
            filter: null,
            sortable: false
          },
          {
            name: 'userName',
            width: 140,
            align: 'center',
            filter: null,
            sortable: false
          },
          {
            name: 'acsIp',
            width: 140
          },
          {
            name: 'failReasonCode',
            formatter: (e) => {
              return this.$t(e.value)
            }
          },
          {
            name: 'regDtm',
            width: 140,
            filter: null,
            sortable: false
          }
        ]
      }
    }
  },
  methods: {
    goPage (e) {
      this.list(e.page)
    },
    async list (page) {
      const result = await this.$api.system.log.loginList(this.search, page)
      this.grid.data = result.data
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
