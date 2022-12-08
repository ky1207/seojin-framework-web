<template>
  <SJInput
    :id="id"
    v-model="inputVal"
    type="number"
    :rules="rules"
    :name="name"
    :disabled-validation="disabledValidation"
    :disabled="disabled"
    :readonly="readonly"
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
  computed: {
    inputVal: {
      get () {
        return this.value.toString()
      },
      set (val) {
        this.$emit('input', parseInt(val))
      }
    }
  }

}
</script>
