<template>
  <SJModal ref="modal">
    <template #title>
      {{ title }}
    </template>
    <template #default>
      {{ message }}
    </template>
    <template #footer>
      <button type="button" class="btn btn-primary" @click="agree">
        {{ $t('components.modal.00003') }}
      </button>
      <button type="button" class="btn btn-secondary" @click="cancel">
        {{ $t('components.modal.00004') }}
      </button>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      resolve: null,
      reject: null,
      message: null,
      title: null
    }
  },

  methods: {
    /**
     * dialog open
     *
     * @param {title}  제목
     * @param {message} 내용
     * @public This is a public method
     */
    open (title, message) {
      this.title = title
      this.message = message
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree () {
      this.$refs.modal.hide()
      this.resolve(true)
    },
    cancel () {
      this.$refs.modal.hide()
      this.resolve(false)// response의 응답
    }
  }
}
</script>
