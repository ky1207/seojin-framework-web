<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <select
      :aria-describedby="id+'-feedback'"
      :value="selected"
      class="form-select"
      aria-label="Default select example"
      :class="disabledValidation?'':classes"
      @change="handleInput"
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
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (val) {
        if (!Utils.isEmpty(val)) { this.$emit('input', val) }
      }
    }
  },
  methods: {
    handleInput (e) {
      this.selected = e.target.value
    }
  }
}
</script>
