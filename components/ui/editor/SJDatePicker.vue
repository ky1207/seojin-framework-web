<template>
  <DatePicker v-model="data" :type="type" :clearable="false" @input="handleInput" @change="handleChange" />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: () => null
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
  computed: {
    data: {
      get () {
        return (this.value) ? new Date(this.value) : null
      },
      set (value) {
        this.date = value.getTime()
        this.handleChange(this.date)
      }
    }
  },
  methods: {
    handleInput (p) {
      if (p !== null) {
        this.$emit('input', this.date)
      } else {
        this.$emit('input', null)
      }
    },
    handleChange (p) {
      this.handleInput(p)
    }
  }
}
</script>

<style scoped>

</style>
