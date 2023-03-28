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
      :id="editorKey"
      ref="ckeditor"
      v-model="innerValue"
      :editor="editor"
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
      editor: null,
      editorKey: 0,
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
  },
  created () {

  },
  mounted () {
    this.editorKey = 'editor_' + this._uid
    // eslint-disable-next-line no-undef
    this.editor = CKEDITOR.replace(this.editorKey, {
      contenteditable: true
    })
  },
  beforeDestroy () {
    if (this.editor) {
      this.editor.destroy()
    }
  },
  methods: {
  //   validate () {
  //     this.$refs.provider.value = this.innerValue
  //     this.$refs.provider.validate()
  //   }
  }

}

</script>
