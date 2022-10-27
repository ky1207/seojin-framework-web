<template>
  <div>
    <editor
      v-bind="$attrs"
      ref="editor"
      v-model="innerValue"
      :options="editorOptions"
      initial-edit-type="wysiwyg"
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
  }
}

</script>
