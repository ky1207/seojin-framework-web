<template>
  <fieldset>
    <legend>{{ $props.label }}<i v-if="isRequired" class="fa-solid fa-asterisk fa-2xs" /></legend>
    <div class="field-area">
      <slot />
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      isRequired: false
    }
  },
  mounted () {
    this.isRequired = (this.$children[0]?.rules?.indexOf('required') >= 0)
  }
}
</script>
