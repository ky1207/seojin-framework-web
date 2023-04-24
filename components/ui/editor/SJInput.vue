<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <input
      v-model="inputVal"
      :type="type"
      :class="disabledValidation?'':classes"
      :aria-describedby="id+'-feedback'"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
    >
    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
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
      required: true
    },
    id: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
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
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
