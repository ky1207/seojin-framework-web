<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <select
      :value="selected"
      :aria-describedby="id+'-feedback'"
      class="form-select"
      aria-label="Default select example"
      :class="disabledValidation?'':classes"
      @input="handleInput"
      @change="handleChange"
    >
      <option v-if="!disabledFirstMessage" value="">
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
import Utils from '~/api/utils'
export default {
  props: {
    value: {
      type: [String, Boolean],
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
    },
    disabledFirstMessage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return { selected: this.$props.value }
  },
  watch: {
    value (newValue) {
      this.selected = newValue
    },
    selected () {
      this.$emit('input', this.selected)
    },
    options () {
      if (Utils.isEmpty(this.$props.value) && this.$props.disabledFirstMessage) {
        this.selected = this.$props.options[0][this.$props.itemValue]
      }
    }
  },
  methods: {
    handleInput (e) {
      this.selected = e.target.value
    },
    handleChange (e) {
      this.$emit('change', e)
    }
  }
}
</script>
