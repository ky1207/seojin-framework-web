<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      비가동조회
    </template>
    <template #button>
      <button class="btn-white-bg">
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg">
        비가동 등록
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap disabled-search>
        <template #body>
          <SJPOPGrid
            v-model="grid.data"
            :columns="grid.columns"
            :options="grid.options"
          />
        </template>
      </SJPOPOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      grid: {
        data: {},
        columns: [
          { name: '비가동명' }
        ],
        options: {
          header: 200,
          rowHeaders: ['checkbox'],
          bodyHeight: 400
        }
      },
      resolve: null,
      reject: null
    }
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
      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    }
  }
}
</script>
