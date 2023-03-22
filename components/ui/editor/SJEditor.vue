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
      :editor="editor"
      :class="disabledValidation?'':classes"
      :config="editorConfig"
      v-on="$listeners"
      @blur="handleInput"
    />

    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: ['heading', '|', 'bold', 'sourceEditing', 'italic', 'bulletedList', 'numberedList', '|']
        },
        language: 'en'
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
  methods: {
    handleInput (e) {
      // const html = this.$refs.editor.invoke('getHTML')
      // this.$emit('input', html)
      this.validate()
    },
    validate () {
      // this.$refs.provider.value = this.$refs.editor.invoke('getMarkdown')
      this.$refs.provider.validate()
    }
  }
}

</script>
<style>
.ck-editor__editable {
  height: 200px;
}
</style>
