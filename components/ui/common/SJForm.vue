<template>
  <ValidationObserver ref="observer" tag="form">
    <slot />
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

<style scoped>

</style>
