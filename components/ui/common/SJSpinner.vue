<template>
  <SJModal ref="icon">
    <div class="d-flex justify-content-center">
      <div class="modal-dialog">
        <div class="spinner-border text-primary" role="status">
          <div>
            <span class="visually-hidden">Loading...</span>
          </div>
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
      console.log(val)
      if (val) {
        this.$refs.icon.show()
      } else {
        setTimeout(() => {
          this.$refs.icon.hide()
        }, 500)
      }
    }
  },
  methods: {
    close () {
      alert('close')
      this.$refs.icon.hide()
    }
  }
}
</script>
