<template>
  <div>
    <div style="display: flex; flex-grow: 1; width: 100%;">
      <select
        v-model="selectedValue"
        :aria-describedby="id+'-feedback'"
        aria-label="Default select"
        :disabled="disabled"
        @change="handleChange"
      >
        <option v-for="option in options" :key="option[itemValue]" :value="option[itemValue]">
          {{ option[itemText] }}
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
      type: [String, Boolean, Number],
      default: null
    },
    id: {
      type: String,
      required: true
    },
    disabledValidation: {
      type: Boolean,
      default: false
    },
    itemText: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedValue: this.value || '',
      inputValue: ''
    }
  },
  computed: {
    errors () {
      return []
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style scoped>
.MultiInput-wrap {
  display: flex;
}
.field-wrap div {
  width: 50%;
}
input,
select {
  width: 100% !important;
}
</style>
