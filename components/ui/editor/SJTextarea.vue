<template>
  <ValidationProvider v-slot="{ errors,classes }" :rules="rules" :name="name" tag="div" :disabled="disabledValidation">
    <textarea
      v-model="content"
      :type="type"
      class="form-control"
      :class="disabledValidation?'':classes"
      :aria-describedby="id+'-feedback'"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      @input="handleInput"
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
      type: String,
      default: ''
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
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    }
  }
}
</script>

<style scoped>

</style>
