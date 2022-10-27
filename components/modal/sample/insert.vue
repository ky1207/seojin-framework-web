<template>
  <SJModal ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">
            Modal title
          </h5>
          <button type="button" class="btn-close" aria-label="Close" @click="close()" />
        </div>
        <div class="modal-body">
          <SJInput
            id="name"
            v-model="test"
            :name="$t('sample')"
            type="text"
            rules="required"
          />
          <SJSelect
            id="select"
            v-model="selected"
            :options="options"
            name="selectBox"
            rules="required"
          />
          <SJDatePicker id="date" v-model="current" name="date" /> {{ current }}
          <SJEditor id="editor" v-model="item.content" name="내용" rules="required" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close()">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="save()">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      current: null,
      test: 'test1',
      selected: null,
      options: [{ value: 1, text: '사과' }, { value: 2, text: '바나나' }],
      item: {
        title: null,
        content: null,
        upload: []
      },
      resolve: null,
      reject: null
    }
  },
  methods: {
    open (params) {
      this.$refs.modal.show()
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    },
    save () {
      this.$refs.modal.hide()
      this.resolve(true)
    }
  }
}
</script>

<style scoped>
</style>
