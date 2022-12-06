<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <select
      :aria-describedby="id+'-feedback'"
      :value="selected"
      class="form-select"
      aria-label="Default select example"
      :class="disabledValidation?'':classes"
      @change="handleInput($event)"
    >
      <option value="">
        선택하세요
      </option>
      <option v-for="option in options" :key="option[itemValue]" :value="option[itemValue]">
        {{ option[itemText] }}
      </option>
    </select>
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
    options: {
      type: Array,
      default: () => []
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
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  watch: {
    options (newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {
    handleInput (e) {
      this.selected = e.target.value
      this.$emit('input', this.selected)
    }
  }
}
</script>
