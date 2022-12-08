<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <template v-for="(l,idx) in data">
      {{ l.langCode }}
      <input
        :key="l.langCode"
        v-model="l.val"
        type="text"
        class="form-control"
        :aria-describedby="id+'-feedback'"
        :disabled="disabled"
        :readonly="readonly"
        :class="disabledValidation?'':classes"
        @blur="copy(idx)"
        @input="handleInput"
      >
    </template>
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
      type: Array,
      default: () => [{ langCode: 'ko', val: null }, { langCode: 'en', val: null }, { langCode: 'vi', val: null }]
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
  computed: {
    data: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    copy (idx) {
      if (idx === 0 && !Utils.isEmpty(this.data[0].val)) {
        if (Utils.isEmpty(this.data[1].val)) { // empty
          this.data[1].val = this.data[0].val
        }
        if (Utils.isEmpty(this.data[2].val)) { // emtpy
          this.data[2].val = this.data[0].val
        }
      }
    },
    handleInput (e) {
      this.$emit('input', this.data)
    }
  }

}
</script>
