<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <div class="d-flex align-items-center flex-wrap">
        <div class="col-md-1 text-center">
          {{ $t('page.system.00029') }}
        </div>
        <div class="col-md-1">
          <SJInput id="search" v-model="search.progName" :name="$t('page.system.00029')" type="text" disabled-validation />
        </div>
        <div class="col-md-1 text-center">
          {{ $t('page.system.00035') }}
        </div>
        <div class="col-md-1">
          <SJInput
            id="authName"
            v-model="search.userName"
            :name="$t('page.system.00035')"
            type="text"
            disabled-validation
          />
        </div>
      </div>
    </template>
    <template #bodyTitle>
      사용자로그
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
        progName: ''
      },
      grid: {
        data: {},
        options: {
          rowHeaders: []
        },
        columns: [
          {
            name: 'logId'
          },
          {
            name: 'coName',
            width: 100,
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
            name: 'api'
          },
          {
            name: 'progName',
            width: 200,
            filter: null,
            sortable: false,
            editor: null,
            validation: null
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
      const result = await this.$api.system.log.list(this.search, page)
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
