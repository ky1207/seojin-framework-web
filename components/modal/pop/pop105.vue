<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      비가동조회
    </template>
    <template #button>
      <button class="btn-white-bg">
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg" style="background: #0CA896; color: #fff;">
        비가동 등록
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap>
        <template #body>
          <SJGrid
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
          { name: '비가동명', width: 500 }
        ],
        options: {
          header: 200,
          rowHeaders: ['checkbox']
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

<style lang="scss" scoped>
::v-deep{
  .search{
    .search-field{
      flex-basis: 33% !important;
      label{
        min-width: 120px;
      }
    }
  }
}
</style>
