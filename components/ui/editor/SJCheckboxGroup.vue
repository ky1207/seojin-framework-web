<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors,classes }"
    :name="name"
    tag="div"
    :disabled="disabledValidation"
    :rules="rules"
  >
    <label v-for="item in items" :key="item.value">
      <input
        v-model="checkedData"
        type="checkbox"
        :label="item.text"
        :value="item.value"
        :disabled="disabled"
        :class="disabledValidation?'':classes"
      >
      <span class="text" style="margin-right : 20px;">{{ item.text }}</span>
    </label>
    <span :id="value+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      required: true
    },
    label: {
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
    rules: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      checkedData: this.value
    }
  },
  watch: {
    value (newVal) {
      this.checkedData = newVal
    },
    checkedData (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>

<style scoped>

</style>
