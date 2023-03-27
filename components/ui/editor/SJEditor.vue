<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors,classes }"
    :rules="rules"
    :name="name"
    tag="div"
    :disabled="disabledValidation"
  >
    <ckeditor
      ref="editor"
      v-model="innerValue"
      :aria-describedby="id+'-feedback'"
      :class="disabledValidation?'':classes"
      :config="editorConfig"
    />

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
      default: '<p></p>'
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
    modelValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editorConfig: {
        height: '200px',
        resize_enabled: false,
        baseFloatZIndex: 999999,
        toolbar: [
          { name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates'] },
          { name: 'basicstyles', items: ['Bold', 'Italic'] },
          { name: 'clipboard', items: ['Cut', 'Copy', '-', 'Undo', 'Redo'] }
        ]
      }
    }
  },
  computed: {
    innerValue: {
      get () {
        return this.$options.filters.unescapeHTML(this.value)
      },
      set (_val) {
        this.$emit('input', _val)
      }
    }
  }
  // methods: {
  //   validate () {
  //     this.$refs.provider.value = this.innerValue
  //     this.$refs.provider.validate()
  //   }
  // }
}

</script>
<style>
.cke {
  z-index: -100 !important;
}
</style>
