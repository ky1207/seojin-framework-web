<template>
  <fieldset>
    <legend>{{ $props.label }}<i class="fa-solid fa-asterisk fa-2xs" /></legend>
    <div>
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
  }

}
</script>
