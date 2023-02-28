<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors,classes }"
    :rules="rules"
    :name="name"
    tag="div"
    :disabled="disabledValidation"
  >
    <DatePicker
      v-model="data"
      :type="type"
      :clearable="false"
      :class="disabledValidation?'':classes"
      :aria-describedby="id+'-feedback'"
      @input="handleInput"
      @change="handleChange"
      @blur="validate"
    />
    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </validationprovider>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: () => null
    },
    type: {
      type: String,
      default: 'date'
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
    }
  },
  data () {
    return {
      date: (this.value) ? new Date(this.value) : new Date()
    }
  },
  computed: {
    data: {
      get () {
        return (this.value) ? new Date(this.value) : null
      },
      set (value) {
        if (value) {
          this.date = value.getTime()
        } else {
          this.date = null
        }
        this.handleChange(this.date)
      }
    }
  },
  methods: {
    handleInput (p) {
      if (p !== null) {
        this.$emit('input', this.date)
      } else {
        this.$emit('input', null)
      }
      this.validate()
    },
    handleChange (p) {
      this.handleInput(p)
      this.validate()
    },
    validate () {
      this.$refs.provider.value = this.date
      this.$refs.provider.validate()
    }
  }
}
</script>

<style scoped>

</style>
