<template>
  <SJModal ref="modal">
    <template #title>
      Modal title
    </template>

    <template #default>
      <SJForm ref="form">
        <SJInput
          id="name"
          v-model="item.title"
          :name="$t('sample')"
          type="text"
          rules="required"
          placeholder="입력하세요"
        />
        <SJEditor id="editor" v-model="item.content" name="내용" rules="required" />
        <SJFileUpload id="file" v-model="item.files" name="첨부" rules="required" />
      </SJForm>
    </template>

    <template #footer>
      <button type="button" class="btn btn-secondary" @click="close()">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="save()">
        Save changes
      </button>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      current: null,

      item: {
        title: null,
        content: null,
        files: []
      },
      resolve: null,
      reject: null
    }
  },
  created () {
    this.options = [{ value: 1, text: '사과' }, { value: 2, text: '바나나' }]
  },
  methods: {
    open () {
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.$refs.form.reset()

      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    },
    async save () {
      const result = await this.$refs.form.validate()
      if (result) {
        const status = await this.$api.sample.write(this.item)
        console.log(status)
        //   this.$refs.modal.hide()
      //  this.resolve(true)
      }
    }
  }
}
</script>

<style scoped>
</style>
