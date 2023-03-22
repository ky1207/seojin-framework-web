<template>
  <ValidationObserver ref="observer">
    <form @submit.prevent>
      <slot />
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  methods: {
    reset () {
      return this.$refs.observer.reset()
    },
    validate () {
      return this.$refs.observer.validate()
    }
  }
}
</script>
<style>
form  span.invalid-feedback {
  height: 15px !important;
  display:block;
}
.was-validated .form-select:valid:not([multiple]):not([size]), .was-validated .form-select:valid:not([multiple])[size="1"], .form-select.is-valid:not([multiple]):not([size]), .form-select.is-valid:not([multiple])[size="1"]  {
  background-image:none;
  background-position:unset;
  border-color: #ced4da;
}
.was-validated .form-control:valid, .form-control.is-valid {
  border-color: #ced4da;
  background-size:unset;
  background-image:none;
}
</style>
