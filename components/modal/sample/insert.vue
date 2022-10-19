<template>
  <SJModal ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">
            Modal title
          </h5>
          <button type="button" class="btn-close" aria-label="Close" />
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">
            Close
          </button>
          <button type="button" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </SJModal>
</template>

<script>
export default {
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style scoped>
</style>
