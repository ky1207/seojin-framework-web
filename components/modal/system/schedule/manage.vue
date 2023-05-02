<template>
  <SJModal ref="modal">
    <template #title>
      {{ $t('components.modal.00008') }}
    </template>
    <template #button>
      <button v-if="parameter&&schedule.triggerState==='PAUSED'" class="btn-gray-bg" @click="resume">
        {{ $t('components.modal.00010') }}
      </button>
      <button v-if="parameter&&schedule.triggerState!=='PAUSED'" class="btn-gray-bg" @click="pause">
        {{ $t('components.modal.00011') }}
      </button>
      <button v-if="parameter" class="btn-gray-bg" @click="execute">
        {{ $t('components.modal.00012') }}
      </button>
      <button v-if="parameter" class="btn-gray-bg" @click="remove">
        {{ $t('components.modal.00013') }}
      </button>
      <button class="btn-gray-bg" @click="save">
        {{ $t('components.modal.00009') }}
      </button>
      <button class="btn-gray-bg" @click="close">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="Schedule" />
        </template>
        <template #default>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="Job Group">
                <SJSelect
                  id="jobGroup"
                  v-model="schedule.jobGroup"
                  name="Job Group"
                  :options="common.JOB_GROUP"
                  item-text="val"
                  item-value="subCode"
                  rules="required"
                  :disabled="!!parameter"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="Job Name">
                <SJInput
                  id="jobName"
                  v-model="schedule.jobName"
                  name="Job Name"
                  rules="required"
                  :disabled="!!parameter"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="Description">
                <SJInput
                  id="description"
                  v-model="schedule.description"
                  name="Description"
                  rules="required"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="Cron Expression">
                <SJInput
                  id="cronExpression"
                  v-model="schedule.cronExpression"
                  name="Cron Expression"
                  rules="required"
                />
                <span class="text" v-html="$t('components.modal.00014')" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="Parameters">
                <SJInput
                  id="parameters"
                  v-model="schedule.parameters"
                  name="Parameters"
                  disabled-validation
                />
                <span class="text">
                  ex.<br>
                  a=b&amp;c=d
                </span>
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="Start Date">
                <SJDatePicker
                  id="startDtm"
                  v-model="schedule.startDtm"
                  name="Start Date"
                  rules="required"
                />
              </SJFormField>
            </SJFormRow>
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
