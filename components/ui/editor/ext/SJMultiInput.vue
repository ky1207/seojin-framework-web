<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <template v-for="(l,idx) in data">
      <input
        :key="l.langCode"
        v-model="l.val"
        type="text"
        class="form-control"
        :aria-describedby="id+'-feedback'"
        :disabled="disabled"
        :readonly="readonly"
        :class="disabledValidation? id+'_bg': { ...classes , [l.langCode+'_bg']: true, 'MultiInput_bg':true }"
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
import Utils from '~/api/utils'

const DEFAULT = [{ langCode: 'ko', val: null }, { langCode: 'en', val: null }, { langCode: 'vi', val: null }]

export default {
  props: {
    value: {
      type: Array,
      default: () => []
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
        return [...this.value, ...this.getDefault()].sort((a, b) => {
          return DEFAULT.findIndex(l => l.langCode === a.langCode) - DEFAULT.findIndex(l => l.langCode === b.langCode)
        })
      }
    }
  },
  methods: {
    getDefault () {
      // 받아온것중에 lang
      const langs = this.value.map((e) => {
        return e.langCode
      })
      // 받아온것 제외하고 리턴
      const T = JSON.parse(JSON.stringify(DEFAULT));
      return T.filter((e) => {
        return langs.findIndex(l => l === e.langCode) === -1
      })
    },
    copy (idx) {
      if (idx === 0 && !Utils.isEmpty(this.data[0].val)) {
        if (Utils.isEmpty(this.data[1].val)) { // empty
          this.data[1].val = this.data[0].val
        }
        if (Utils.isEmpty(this.data[2].val)) { // emtpy
          this.data[2].val = this.data[0].val
        }

        this.$emit('input', this.data)
      }
    },
    handleInput (e) {
      this.$emit('input', this.data)
    }
  }

}
</script>
<style scoped>
.MultiInput_bg {
  padding-right: 30px;
  background-position: right center;
  background-repeat: no-repeat;
}
.vi_bg {
  background-image: url("~/assets/images/flag/vi.png") !important;
}
.ko_bg {
  background-image: url("~/assets/images/flag/ko.png")  !important;
}
.en_bg {
  background-image: url("~/assets/images/flag/en.png")  !important;
}
input {
  margin-bottom: 5px;
}
</style>
