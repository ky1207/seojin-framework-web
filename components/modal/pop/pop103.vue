<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      작업자조회
    </template>
    <template #button>
      <SJSearchField
        label="주야간구분"
      >
        <SJSelect
          id="search"
          disabled-first-message
          name="search"
          :options="[{text: 'ALL',value: ''},{text: '주간',value: '주간'},{text: '야간',value: '야간'}]"
        />
      </SJSearchField>
      <button class="btn-white-bg">
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg">
        조회
      </button>
      <button class="btn-blue-bg">
        작업자선택
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
  components: {},

  data () {
    return {
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '작업자ID', width: 400 },
          { name: '작업자명' }
        ],
        options: {
          header: 200,
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

<style lang="scss" scoped>
:deep(.search-field) {
  width: 250px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  label{
    width: 120px;
  }
  input,select{
    width: 100%;
    height: 50px;
  }
}
</style>
