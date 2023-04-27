<template>
  <SJSearchTLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <SJConfirm ref="confirm" />
      <SystemScheduleManage ref="manage" />
    </template>
    <template #default>
      <SJSearchField label="JOB Name">
        <SJInput id="search" v-model="search.jobName" name="배치명" type="text" disabled-validation />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="Schedule">
        <button class="btn-white-bg" @click="add">
          {{ $t('page.system.00026') }}
        </button>
      </SJTitle>
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" @click="scheduleClick" />
    </template>
    <template #leftTitle>
      <SJTitle title="Schedule Log" />
    </template>
    <template #left>
      <SJGrid
        ref="scheduleLogGrid"
        v-model="scheduleLogGrid.data"
        :columns="scheduleLogGrid.columns"
        :options="scheduleLogGrid.options"
        pageable
        @moveToGridPage="page"
        @click="scheduleLogClick"
      />
    </template>
    <template #rightTitle1>
      <SJTitle title="Batch Job Log" />
    </template>
    <template #right1>
      <SJGrid ref="batchJobLogGrid" v-model="batchJobLogGrid.data" :columns="batchJobLogGrid.columns" :options="batchJobLogGrid.options" @click="batchJobLogGridClick" />
    </template>
    <template #rightTitle2>
      <SJTitle title="Batch Job Step Log" />
    </template>
    <template #right2>
      <SJGrid ref="batchStepLogGrid" v-model="batchStepLogGrid.data" :columns="batchStepLogGrid.columns" :options="batchStepLogGrid.options" />
    </template>
  </SJSearchTLRLayout>
</template>

<script>
import { MENU, ACTION } from '~/mixins'
import { CodeFormatter, DateFormatter } from '~/plugins/lib/grid/Formatter'
import { ButtonRenderer } from '~/plugins/lib/grid/editor/ButtonRenderer'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: {},
      selectedSchedule: null,
      search: {
        jobName: ''
      },
      grid: {
        data: {},
        options: {
          rowHeaders: ['rowNum']
        },
        columns: [
          { name: 'jobName', header: 'JOB Name' },
          { name: 'jobGroup', header: 'JOB Group', formatter: CodeFormatter },
          { name: 'cronExpression', header: 'Cron' },
          { name: 'description', header: 'Desc' },
          { name: 'parameters', header: 'Params' },
          { name: 'prevFireTime', header: 'Prev Fire Time', formatter: DateFormatter, align: 'center' },
          { name: 'nextFireTime', header: 'Next Fire Time', formatter: DateFormatter, align: 'center' },
          { name: 'triggerState', header: 'State', align: 'center' },
          {
            name: '',
            renderer: {
              type: ButtonRenderer,
              options: {
                title: 'EDIT'
              }
            },
            align: 'center',
            filter: null,
            sortable: false
          }

        ]
      },
      scheduleLogGrid: {
        data: {},
        options: {
          rowHeaders: []
        },
        columns: [
          { name: 'triggersExecutionId', header: 'Execution Id', align: 'right', filter: null, sortable: false },
          { name: 'triggerType', header: 'Type', align: 'center', filter: null, sortable: false },
          { name: 'startTime', header: 'Start Time', formatter: DateFormatter, align: 'center', filter: null, sortable: false },
          { name: 'exitCode', header: 'Exit Code', align: 'center', filter: null, sortable: false },
          { name: 'exitMessage', header: 'Exit Message', align: 'center', filter: null, sortable: false },
          // { name: 'jobName', header: 'JOB Name', filter: null, sortable: false },
          { name: 'jobExecutionId', header: 'Job Execution Id', align: 'right', filter: null, sortable: false }
        ]
      },
      batchJobLogGrid: {
        data: {},
        options: {
          rowHeaders: []
        },
        columns: [
          { name: 'jobExecutionId', header: 'Job Execution Id', align: 'right' },
          { name: 'startTime', header: 'Start Time', formatter: DateFormatter, align: 'center' },
          { name: 'endTime', header: 'End Time', formatter: DateFormatter, align: 'center' },
          { name: 'status', header: 'Status' },
          { name: 'exitCode', header: 'Exit Code', align: 'center' },
          { name: 'exitMessage', header: 'Exit Message', align: 'center' }
        ]
      },
      batchStepLogGrid: {
        data: {},
        options: {
          rowHeaders: []
        },
        columns: [
          { name: 'stepExecutionId', header: 'Step Execution Id', align: 'right' },
          { name: 'stepName', header: 'Step Name' },
          { name: 'readCount', header: 'Read', align: 'right' },
          { name: 'writeCount', header: 'Write', align: 'right' },
          { name: 'commitCount', header: 'Commit', align: 'right' },
          { name: 'exitCode', header: 'Exit Code', align: 'center' },
          { name: 'exitMessage', header: 'Exit Message', align: 'center' }
        ]
      }
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['JOB_GROUP'])
    this.common = codes.data
  },
  methods: {
    async add () {
      const result = await this.$refs.manage.open()
      if (result) { await this.ACTION_REGISTRY().searchClick() }
    },
    async page (e) {
      await this.scheduleLog(this.selectedSchedule, e.page)
    },
    async scheduleClick (e) {
      const schedule = this.$refs.grid.invoke('getRow', e.rowKey)
      if (schedule === null) { return }
      if (e.columnName === '') {
        const result = await this.$refs.manage.open(schedule)
        if (result) { await this.ACTION_REGISTRY().searchClick() }
        return
      }
      this.selectedSchedule = schedule
      await this.scheduleLog(this.selectedSchedule)
    },
    async scheduleLog (schedule, page = 1) {
      const result = await this.$api.system.schedule.scheduleLog(this.selectedSchedule, page)
      this.scheduleLogGrid.data = result.data
      this.batchJobLogGrid.data = {}
      this.batchStepLogGrid.data = {}
    },
    async scheduleLogClick (e) {
      const scheduleLog = this.$refs.scheduleLogGrid.invoke('getRow', e.rowKey)
      if (scheduleLog === null) { return }
      const result = await this.$api.system.schedule.batchJobLog(scheduleLog)
      this.batchJobLogGrid.data = result.data
      this.batchStepLogGrid.data = {}
    },
    async batchJobLogGridClick (e) {
      const batchJobLog = this.$refs.batchJobLogGrid.invoke('getRow', e.rowKey)
      if (batchJobLog === null) {
        return
      }
      const result = await this.$api.system.schedule.batchStepLog(batchJobLog)
      this.batchStepLogGrid.data = result.data
    },
    ACTION_REGISTRY () {
      return {
        searchClick: async () => {
          const result = await this.$api.system.schedule.list(this.search)
          this.grid.data = result.data

          this.scheduleLogGrid.data = {}
          this.batchJobLogGrid.data = {}
          this.batchStepLogGrid.data = {}
        }

      }
    }
  }
}
</script>
