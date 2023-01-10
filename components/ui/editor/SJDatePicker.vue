<template>
  <DatePicker v-model="date" :type="type" :clearable="false" @input="handleInput" @change="handleChange" />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: () => new Date()
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  data () {
    return {
      date: (this.value) ? new Date(this.value) : new Date()
    }
  },
  mounted () {
    this.handleInput(this.date)
  },
  methods: {
    handleInput (p) {
      if (p !== null) {
        this.$emit('input', this.date.getTime())
      } else {
        this.$emit('input', null)
      }
    },
    handleChange (p) {
    }
  }
}
</script>

<style scoped>

</style>
