<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.master.00001')">
        <SJSelect
          id="whseType"
          v-model="search.whseType"
          :name="$t('page.master.00001')"
          :options="common.WHSE_TYPE"
          item-text="val"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField :label="$t('page.master.00002')">
        <SJInput id="search" v-model="search.whseCode" :name="$t('page.master.00002')" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.master.00003')">
        <SJInput id="md4" v-model="search.whseName" :name="$t('page.master.00003')" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.master.00004')">
        <SJSelect id="useYN" v-model="search.useFlag" :name="$t('page.master.00004')" :options="common.USE_YN" disabled-validation />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle :title="$t('page.master.00011')">
        <button class="btn-white-bg" @click="appendRow">
          {{ $t('page.master.00009') }}
        </button>
        <button class="btn-white-bg" @click="removeRow">
          {{ $t('page.master.00010') }}
        </button>
      </SJTitle>
    </template>
    <template #body>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
        :options="grid.options"
      />
      <CommonDepartment ref="departmentModal" />
    </template>
  </SJSearchOneLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'

export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      search: {},
      common: {},
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          common: []
        },
        columns: [
          { name: 'whseCode' },
          { name: 'whseName' },
          { name: 'whseType' },
          { name: 'osdWhseFlag' },
          { name: 'customer' },
          {
            name: 'respDeptId'
          },
          { name: 'sort' },
          { name: 'availInvntryFlag' },
          { name: 'useFlag' }
        ]
      }
    }
  },
  mounted () {
    this.initGrid()
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['WHSE_TYPE'])
    this.common = codes.data
    this.common.USE_YN = this.$api.common.getYNCodes()

    this.grid.columns.find(column => column.name === 'whseType').editor.options.listItems = this.common.WHSE_TYPE.map((item) => {
      return {
        text: item.val, value: item.subCode
      }
    })
  },
  methods: {
    initGrid () {
      this.$refs.grid.invoke('on', 'click', (ev) => {
        if (ev.columnName === 'respDeptId') {
          this.openDepartmentModal()
        }
      })
    },
    async openDepartmentModal () {
      const deptName = await this.$refs.departmentModal.open()
      this.updateRespDeptIdCell(deptName)
    },
    updateRespDeptIdCell (deptName) {
      const focusedCell = this.$refs.grid.invoke('getFocusedCell')
      if (focusedCell) {
        this.$refs.grid.invoke('setValue', focusedCell.rowKey, 'respDeptId', deptName)
      }
    },
    appendRow () {
      this.$refs.grid.invoke('appendRow')
    },
    removeRow () {
      this.$refs.grid.invoke('removeCheckedRows', false)
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.master.warehouse.list(this.search)
          this.grid.data = result.data
        },
        saveClick: async () => {
          const error = this.$refs.grid.invoke('validate')
          if (error.length > 0) {
            this.$notify.warning(this.$t('message.00007')) // Grid 입력값을 확인하세요.
            return false
          }
          const data = this.$refs.grid.invoke('getModifiedRows')
          await this.$api.master.warehouse.update(data)
          this.$notify.success(this.$t('message.00002'))
          await this.ACTION_REGISTRY().searchClick()
        }
      }
    }
  }
}
</script>
