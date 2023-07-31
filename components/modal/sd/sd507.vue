<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      출하창고 재고 이력
    </template>
    <template #button>
      <button class="btn-gray-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJSearchOneLayout disabled-navigator-wrap>
        <template #default>
          <SJSearchField label="항목">
            <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
          </SJSearchField>
        </template>
        <template #body>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
        </template>
      </SJSearchOneLayout>
    </template>

    <template #footer />
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      search: {},
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '항목', width: 100 },
          { name: '변경전', width: 100 },
          { name: '변경후', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
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
      // this.$refs.form.reset()

      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    }
  }
}
</script>

<style scoped>
</style>
