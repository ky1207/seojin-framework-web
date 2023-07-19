<template>
  <div>
    <div style="display: flex;flex-grow: 1;width: 100%;">
      <select v-model="selectedValue" :disabled="disabled" @change="handleSelectChange">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <input
        v-model="inputValue"
        type="text"
        :aria-describedby="id + '-feedback'"
        :disabled="disabled"
        :readonly="readonly"
        :class="{ 'MultiInput-wrap': true }"
      >
    </div>
    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedValue: this.value || '',
      inputValue: ''
    }
  },
  computed: {
    options () {
      return [
        { value: '', label: '선택하세요' },
        { value: '', label: 'AA' },
        { value: '', label: 'AB' },
        { value: '', label: 'AC' },
        { value: '', label: 'AE' }
      ]
    },
    errors () {
      return []
    }
  },
  watch: {
    value (newVal) {
      this.selectedValue = newVal || ''
    }
  },
  methods: {
    handleSelectChange () {
      this.$emit('input', this.selectedValue)
    }
  }
}
</script>

<style scoped>
.MultiInput-wrap{
  display: flex;
}
.field-wrap div{
  width: 50%;
}
input,select{
  width: 100% !important;
}
</style>
