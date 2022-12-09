<template>
  <div
    ref="modal"
    class="modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-hidden="true"
  >
    <slot />
  </div>
</template>
<script>
export default {
  data () {
    return {
      w: null
    }
  },
  mounted () {
    this.w = new this.$bootstrap.Modal(this.$refs.modal)
  },
  methods: {
    show () {
      this.w.show()
    },
    hide () {
      this.w.hide()
    }
  }
}
</script>
