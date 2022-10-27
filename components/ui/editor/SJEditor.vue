<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors,classes }"
    :rules="rules"
    :name="name"
    tag="div"
    :disabled="disabledValidation"
  >
    <Editor
      v-bind="$attrs"
      ref="editor"
      :initial-value="innerValue"
      :options="editorOptions"
      initial-edit-type="wysiwyg"
      :class="disabledValidation?'':classes"
      :aria-describedby="id+'-feedback'"
      v-on="$listeners"
      @change="handleInput"
      @blur="validate"
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
    }
  },
  data () {
    return {
      editorOptions: {
        hideModeSwitch: true
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
      const html = this.$refs.editor.invoke('getHTML')
      this.$emit('input', html)
      this.$refs.provider.value = html
      this.validate()
    },
    validate () {
      this.$refs.provider.value = this.$refs.editor.invoke('getMarkdown')
      this.$refs.provider.validate()
    }
  }
}

</script>
