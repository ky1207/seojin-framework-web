<template>
  <SJInput
    :id="id"
    v-model="content"
    type="number"
    :rules="rules"
    :name="name"
    :disabled-validation="disabledValidation"
    :disabled="disabled"
    :readonly="readonly"
    @input="handleInput"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: this.value.toString()
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', parseInt(this.content))
    }
  }
}
</script>
