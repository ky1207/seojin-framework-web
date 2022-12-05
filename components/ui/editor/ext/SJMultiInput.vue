<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    ko<input
      v-model="data.ko"
      type="text"
      class="form-control"
      :aria-describedby="id+'-feedback'"
      :disabled="disabled"
      :readonly="readonly"
      :class="disabledValidation?'':classes"
      @blur="copy"
      @input="handleInput"
    >
    en<input
      v-model="data.en"
      type="text"
      class="form-control"
      :aria-describedby="id+'-feedback'"
      :disabled="disabled"
      :readonly="readonly"
      :class="disabledValidation?'':classes"
      @input="handleInput"
    >
    vi<input
      v-model="data.vi"
      type="text"
      class="form-control"
      :aria-describedby="id+'-feedback'"
      :disabled="disabled"
      :readonly="readonly"
      :class="disabledValidation?'':classes"
      @input="handleInput"
    >
    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>
import Utils from '~/assets/js/utils'
export default {
  props: {
    value: {
      type: Object,
      default: () => { return { ko: null, en: null, vi: null } }
    },
    id: {
      type: String,
      required: true
    },
    disabledValidation: {
      type: Boolean,
      default: false
    },
    name: {
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
      data: this.value
    }
  },
  methods: {
    copy () {
      if (this.data.ko) {
        if (Utils.isEmpty(this.data.en)) { // empty
          this.data.en = this.data.ko
        }
        if (Utils.isEmpty(this.data.vi)) { // emtpy
          this.data.vi = this.data.ko
        }
      }
    },
    handleInput (e) {
      console.log('handleinput')
      this.$emit('input', this.data)
    }
  }

}
</script>
