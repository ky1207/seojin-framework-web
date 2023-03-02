<template>
  <SJModal ref="modal">
    <template #title>
      {{ $t('components.modal.00008') }}
    </template>
    <template #button>
      <button v-if="parameter&&schedule.triggerState==='PAUSED'" type="button" class="btn btn-secondary" @click="resume">
        {{ $t('components.modal.00010') }}
      </button>
      <button v-if="parameter&&schedule.triggerState!=='PAUSED'" type="button" class="btn btn-secondary" @click="pause">
        {{ $t('components.modal.00011') }}
      </button>
      <button v-if="parameter" type="button" class="btn btn-secondary" @click="execute">
        {{ $t('components.modal.00012') }}
      </button>
      <button v-if="parameter" type="button" class="btn btn-secondary" @click="remove">
        {{ $t('components.modal.00013') }}
      </button>
      <button type="button" class="btn btn-primary" @click="save">
        {{ $t('components.modal.00009') }}
      </button>
      <button type="button" class="btn btn-secondary" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator>
        <template #title>
          Schedule
        </template>
        <template #default>
          <SJForm ref="form">
            <div class="row">
              <div class="mt-3">
                <label>Job Group</label>
                <SJSelect
                  id="jobGroup"
                  v-model="schedule.jobGroup"
                  name="Job Group"
                  :options="common.JOB_GROUP"
                  item-text="val"
                  item-value="codeId"
                  rules="required"
                  :disabled="!!parameter"
                />
              </div>
              <div class="mt-3">
                <label>Job Name</label>
                <SJInput
                  id="jobName"
                  v-model="schedule.jobName"
                  name="Job Name"
                  type="text"
                  rules="required"
                  :disabled="!!parameter"
                />
              </div>
              <div class="mt-3">
                <label>Description</label>
                <SJInput
                  id="description"
                  v-model="schedule.description"
                  name="Description"
                  type="text"
                  rules="required"
                />
              </div>
              <div class="mt-3">
                <label>Cron Expression</label>
                <SJInput
                  id="cronExpression"
                  v-model="schedule.cronExpression"
                  name="Cron Expression"
                  type="text"
                  rules="required"
                />
                <span class="text" v-html="$t('components.modal.00014')" />
              </div>
              <div class="mt-3">
                <label>Parameters</label>
                <SJInput
                  id="parameters"
                  v-model="schedule.parameters"
                  name="Parameters"
                  type="text"
                  disabled-validation
                />
                <span class="text">
                  ex.<br>
                  a=b&amp;c=d
                </span>
              </div>
              <div class="mt-3">
                <label>Start Date</label>
                <SJDatePicker
                  id="startDtm"
                  v-model="schedule.startDtm"
                  name="Start Date"
                  rules="required"
                />
              </div>
            </div>
          </SJForm>
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      common: {},
      parameter: null,
      schedule: {},
      resolve: null,
      reject: null
    }
  },
  async created () {
    const codes = await this.$api.common.getCommonCodes(['JOB_GROUP'])
    this.common = codes.data
  },
  methods: {
    async open (schedule) {
      this.parameter = schedule
      this.schedule = {}
      if (this.parameter) {
        const result = await this.$api.system.schedule.findSchedule(this.parameter)
        this.schedule = result.data
      }
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    async save () {
      const result = await this.$refs.form.validate()
      if (result) {
        if (this.parameter) {
          await this.$api.system.schedule.modifySchedule(this.schedule)
        } else {
          await this.$api.system.schedule.insertSchedule(this.schedule)
        }
        this.$notify.success(this.$t('message.00002'))
        this.resetClose()
      }
    },
    resetClose () {
      this.$refs.modal.hide()
      this.resolve(true)
      this.$refs.form.reset()
    },
    async remove () {
      await this.$api.system.schedule.deleteSchedule(this.schedule)
      this.$notify.success(this.$t('message.00002'))
      this.resetClose()
    },
    async resume () {
      await this.$api.system.schedule.resumeSchedule(this.schedule)
      this.$notify.success(this.$t('message.00002'))
      this.resetClose()
    },
    async pause () {
      await this.$api.system.schedule.pauseSchedule(this.schedule)
      this.$notify.success(this.$t('message.00002'))
      this.resetClose()
    },
    async execute () {
      await this.$api.system.schedule.executeSchedule(this.schedule)
      this.$notify.success(this.$t('message.00002'))
      this.resetClose()
    },
    close () {
      this.$refs.modal.hide()
      this.resolve(false)
      this.$refs.form.reset()
    }
  }
}
</script>
