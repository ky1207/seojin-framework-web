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
      v-bind="$attrs"
      ref="editor"
      v-model="innerValue"
      :class="disabledValidation?'':classes"
      :config="editorConfig"
      v-on="$listeners"
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
          { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] }
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
  },
  mounted () {
    console.log(this)
  },
  methods: {
    validate () {
      this.$refs.provider.validate()
    }
  }
}

</script>
<style>
.cke {
  z-index: -100 !important;
}
</style>
