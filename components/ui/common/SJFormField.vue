<template>
  <div class="col SJFormField">
    <div class="label">
      {{ $props.label }}
    </div>
    <div class="input">
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
<style>
/*.SJFormField {*/
/*  display:flex;*/
/*}*/
/*.SJFormField  .label {*/
/* width: 120px;*/
/*}*/
/*.SJFormField .input {*/
/* flex: 1 0 0%*/
/*}*/
</style>
