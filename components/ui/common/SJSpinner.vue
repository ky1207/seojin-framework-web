<template>
  <SJModal ref="icon">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="modal-dialog">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </SJModal>
</template>

<script>
export default {
  computed: {
    isLoading () {
      return this.$store.getters['loader/isLoading']()
    }
  },
  watch: {
    isLoading (val, old) {
      if (val) {
        this.$refs.icon.show()
      } else {
        setTimeout(() => {
          this.$refs.icon.hide()
        }, 500)
      }
    }
  }
}
</script>
