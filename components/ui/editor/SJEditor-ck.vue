<template>
  <div>
    <ckeditor
      v-bind="$attrs"
      ref="editor"
      v-model="innerValue"
      :editor-url="editorUrl"
      :config="editorConfig"
      v-on="$listeners"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data ({ $config: { CDN_STATIC } }) {
    return {
      editorUrl: `${CDN_STATIC}ckeditor4/ckeditor.js`,
      editorConfig: {
        fileTools_requestHeaders: {
          Authorization: this.$auth.$storage._state['_token.customStrategy']
        }
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
}

</script>
