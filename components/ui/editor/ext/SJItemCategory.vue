<template>
  <div style="display: flex;">
    <select
      :value="value?.largeValue"
      @change="handleLargeChange"
    >
      <option v-if="!disabledFirstMessage" value="">
        {{ $t('components.ui.00004') }}
      </option>
      <option v-for="option in options" :key="option[itemValue]" :value="option[itemValue]">
        {{ option[itemText] }}
      </option>
    </select>
    <select
      :value="value?.smallValue"
      @change="handleSmallChange"
    >
      <option v-if="!disabledFirstMessage" value="">
        {{ $t('components.ui.00004') }}
      </option>
      <option v-for="smallOption in smallOptions" :key="smallOption[itemValue]" :value="smallOption[itemValue]">
        {{ smallOption[itemText] }}
      </option>
    </select>
  </div>
</template>

<script>
import Utils from '~/api/utils'
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
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
    return {
      smallOptions: [],
      category: {
        largeValue: this.$props.value?.largeValue,
        smallValue: this.$props.value?.smallValue
      }
    }
  },
  mounted () {
    this.getSmallOptions(this.category.largeValue)
  },
  methods: {
    async getSmallOptions (code) {
      if (Utils.isEmpty(code)) { return }
      // TODO: url api 교체할것
      const result = await this.$axios.get('/api/v1.0/department/codes', { params: { code } })
      this.smallOptions = result.data
    },
    handleLargeChange (e) {
      this.smallOptions = []
      if (Utils.isEmpty(e.target.value)) {
        this.category.largeValue = null
      } else {
        this.category.largeValue = e.target.value
        this.getSmallOptions(this.category.largeValue)
      }
      this.category.smallValue = null
      this.$emit('input', this.category)
    },
    handleSmallChange (e) {
      if (Utils.isEmpty(e.target.value)) {
        this.category.smallValue = null
      } else {
        this.category.smallValue = e.target.value
      }
      this.$emit('input', this.category)
    }
  }
}
</script>
