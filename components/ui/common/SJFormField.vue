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
<style>
/*.SJFormField {*/
/*  display:flex;*/
/*}*/
/*.SJFormField  .label {*/
/* width: 80px;*/
/*}*/
/*.SJFormField .input {*/
/* flex: 1 0 0%*/
/*}*/
</style>
