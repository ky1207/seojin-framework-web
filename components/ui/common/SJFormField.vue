<template>
  <div>
    <label>{{ $props.label }}</label>
    <slot />
  </div>
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
  }

}
</script>
