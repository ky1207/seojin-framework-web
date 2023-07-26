<template>
  <div style="display: flex;align-items: center;">
    <DatePicker
      v-model="startDtm"
      :type="type"
      :clearable="false"
      input-class="SJPeriodSearch"
      @input="handleStartInput"
      @change="handleStartChange"
    />
    <div style="width:4px;">
      ~
    </div>
    <DatePicker
      v-model="endDtm"
      :type="type"
      :clearable="false"
      input-class="SJPeriodSearch"
      @input="handleEndInput"
      @change="handleEndChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => { }
    },
    type: {
      type: String,
      default: 'date'
    },
    rules: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    disabledValidation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      startDtm: (this.value?.start) ? this.clearTime(new Date(this.value.start)) : this.clearTime(new Date()),
      endDtm: (this.value?.end) ? this.clearTime(new Date(this.value.end)) : this.clearTime(new Date(new Date().setDate(new Date().getDate() + 7)))
    }
  },

  mounted () {
    this.handleStartInput(new Date())
  },

  methods: {
    handleStartInput (p) {
      if (p !== null) {
        this.$emit('input', { start: this.startDtm.getTime(), end: this.endDtm.getTime() })
      } else {
        this.$emit('input', { start: null, end: this.endDtm.getTime() })
      }
      console.log(p)
    },
    handleStartChange (p) {
      this.handleStartInput(p)
    },
    handleEndInput (p) {
      if (p !== null) {
        this.$emit('input', { start: this.startDtm.getTime(), end: this.endDtm.getTime() })
      } else {
        this.$emit('input', { start: this.startDtm.getTime(), end: null })
      }
    },
    handleEndChange (p) {
      this.handleEndInput(p)
    },
    clearTime (date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDay())
    }
  }
}
</script>

<style scoped>
.search-field .mx-datepicker {
  width:98px;
}

</style>
