<template>
  <div class="search-field">
    <label>{{ $props.label }}</label>
    <div class="field-wrap">
      <slot />
    </div>
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
<style scoped>
.field-wrap{
  width: 100%;
}
</style>
