<template>
  <div ref="modal" class="modal fade" tabindex="-1" aria-hidden="true">
    <slot />
  </div>
</template>
<script>
export default {
  data () {
    return {
      modal: null
    }
  },
  mounted () {
    this.modal = new this.$bootstrap.Modal(this.$refs.modal)
  },
  methods: {
    show () {
      this.modal.show()
    }
  }
}
</script>
