<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <textarea
      v-model="inputVal"
      :class="disabledValidation?'':classes"
      :aria-describedby="id+'-feedback'"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
    />
    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </validationprovider>
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
    },
    rows: {
      type: Number,
      default: 3
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

<style scoped>

</style>
