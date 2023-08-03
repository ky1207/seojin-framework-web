<template>
  <div style="display: flex;">
    <select
      :value="selected"
      aria-label="Default select"
      @input="handleInput"
      @change="handleChange"
    >
      <option v-if="!disabledFirstMessage" value="">
        {{ $t('components.ui.00004') }}
      </option>
      <option v-for="option in options" :key="option[itemValue]" :value="option[itemValue]">
        {{ option[itemText] }}
      </option>
    </select>
    <select
      :value="selected"
      aria-label="Default select"
      @input="handleInput"
      @change="handleChange"
    >
      <option v-if="!disabledFirstMessage" value="">
        {{ $t('components.ui.00004') }}
      </option>
      <option v-for="option in options" :key="option[itemValue]" :value="option[itemValue]">
        {{ option[itemText] }}
      </option>
    </select>
  </div>
</template>

<script>
import Utils from '~/api/utils'
export default {
  props: {
    value: {
      type: [String, Boolean, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },

    name: {
      type: String,
      required: true
    },
    id: {
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
    disabled: {
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
      if (this.$props.options.length > 0 && Utils.isEmpty(this.$props.value) && this.$props.disabledFirstMessage) {
        this.selected = this.$props.options[0][this.$props.itemValue]
      }
    }
  },
  methods: {
    handleInput (e) {
      if (Utils.isEmpty(e.target.value)) {
        this.selected = null
        return
      }
      this.selected = e.target.value
    },
    handleChange (e) {
      this.$emit('change', e)
    }
  }
}
</script>
