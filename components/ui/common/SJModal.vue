<template>
  <div
    ref="modal"
    class="modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="size">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title" />
          </h5>
          <div class="btn-bar">
            <slot name="button" />
          </div>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: '' // modal-xl,modal-lg,modal-sm
    }
  },
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
      setTimeout(() => {
        this.$nuxt.$emit('modal.show')
        window.dispatchEvent(new Event('resize'))
      }, 200)
    },
    hide () {
      this.w.hide()
    }
  }
}
</script>
