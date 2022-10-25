<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="name">
    <input v-model="content" :type="type" @input="handleInput">
    <div>{{ errors[0] }}</div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    }
  }
}
</script>

<style scoped>

</style>
