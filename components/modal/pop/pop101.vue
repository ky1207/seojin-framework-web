<template>
  <SJModal ref="modal" class="modal-xxl">
    <template #title>
      자재투입
    </template>
    <template #button>
      <SJSearchField
        label="바코드 스캔::"
      >
        <SJInput id="scan" name="scan" />
      </SJSearchField>
      <button
        class="btn-white-bg"
      >
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg">
        예약(생산입고)자재
      </button>
      <button class="btn-blue-bg" @click="searchModal">
        자재검색
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
      <pop104 ref="searchModal" />
    </template>
    <template #default>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap disabled-search>
        <template #title>
          <SJTitle title="BOM" />
        </template>
        <template #body>
          <SJPOPGrid
            v-model="grid_bom.data"
            :columns="grid_bom.columns"
            :options="grid_bom.options"
          />
          <SJTitle title="재고현황" />
          <SJPOPGrid
            v-model="grid_invent.data"
            :columns="grid_invent.columns"
            :options="grid_invent.options"
          />
          <SJTitle title="투입현황" />
          <SJPOPGrid
            v-model="grid_input.data"
            :columns="grid_input.columns"
            :options="grid_input.options"
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
      grid_bom: {
        data: {},
        columns: [
          { name: '품목코드', width: 150 },
          { name: '품목명' },
          { name: '공정', width: 120 },
          { name: '자동투입', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '예약수량', width: 100 },
          { name: '생산입고수량', width: 150 },
          { name: '투입수량', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '투입잔량', width: 100 }
        ],
        options: {
          header: 200
        }
      },
      grid_invent: {
        data: {},
        columns: [
          { name: '품목코드', width: 150 },
          { name: '품목명' },
          { name: '창고', width: 120 },
          { name: 'LOT' },
          { name: '투입단위', width: 100 },
          { name: '현재고', width: 100 },
          { name: '자재투입', width: 100 },
          { name: '투입잔량', width: 100 },
          { name: '자재불량', width: 100 }
        ],
        options: {
          header: 200
        }
      },
      grid_input: {
        data: {},
        columns: [
          { name: '품목코드', width: 150 },
          { name: '품목명' },
          { name: 'LOT', width: 200 },
          { name: '투입단위', width: 100 },
          { name: '투입수량', width: 100 },
          { name: '불량여부', width: 100 },
          { name: '불량명', width: 200 },
          { name: '환입', width: 100 },
          { name: '부분환입', width: 100 }
        ],
        options: {
          header: 200
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
    },
    async searchModal () {
      const result = await this.$refs.searchModal.open()
      if (result) {
        console.log('check')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.contents){
  .txt-wrap h3{
    font-size: 12px !important;
  }
}
:deep(.search-field) {
    margin-right: 5px;
    display: flex;
    align-items: center;
    label{
      width: 100px;
    }
    input,select{
    height: 50px;
    }
    .field-wrap{
      width: auto;
    }
  }
</style>
