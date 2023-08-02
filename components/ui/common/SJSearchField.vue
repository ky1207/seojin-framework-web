<template>
  <div class="search-field">
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
<style scoped>
.search .search-field div{
  width: 100%;
}
</style>
