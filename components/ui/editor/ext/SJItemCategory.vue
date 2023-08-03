<template>
  <div style="display: flex;">
    <SJSelect
      :id="id+'-select'"
      v-model="selectedValue"
      :options="options"
      :name="name+'-select'"
      disabled-validation
      :disabled-first-message="disabledFirstMessage"
      @change="handleChange"
    />
    <SJSelect
      :id="id+'-input'"
      v-model="inputValue"
      :name="name+'-input'"
      :options="dataOptions"
      disabled-validation
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    disabledFirstMessage: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dataOptions: [],
      selectedValue: this.value?.option || '',
      inputValue: this.value?.value || ''
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('input', { option: this.selectedValue, value: this.inputValue })
    }
  }
}
</script>
