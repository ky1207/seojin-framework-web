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
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
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
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  methods: {
    handleInput (e) {
      this.selected = e.target.value
      console.log(this.selected)
      this.$emit('input', this.selected)
    }
  }

}
</script>

<style scoped>

</style>
