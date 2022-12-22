<template>
  <div
    ref="modal"
    class="modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">
            <slot name="title" />
          </h5>
          <button type="button" class="btn-close" aria-label="Close" @click="hide()" />
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
