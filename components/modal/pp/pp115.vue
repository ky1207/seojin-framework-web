<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      자재투입
    </template>
    <template #button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <SJTitle title="BOM" />
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        <SJTitle title="자재재고현황">
          <button class="btn-blue-bg" @click="purchasePut">
            자재투입
          </button>
          <button class="btn-blue-bg" @click="purchaseBad">
            자재불량
          </button>
        </SJTitle>
        <SJGrid ref="grid2" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
        <SJTitle title="자재출고현황">
          <button class="btn-blue-bg" @click="purchaseReturn">
            자재환입
          </button>
        </SJTitle>
        <SJGrid ref="grid3" v-model="grid3.data" :columns="grid3.columns" :options="grid3.options" />
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      current: null,
      counter: 10,
      test: 'test',
      selected: null,
      options: null,
      common: {},
      inputData: { CO_CODE: null },
      item: {
        title: null,
        content: null,
        upload: []
      },
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 150
        },
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '공정', width: 100 },
          { name: '자동', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '예약수량', width: 100 },
          { name: '생산입고수량', width: 100 },
          { name: '투입수량', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '투입잔량', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 150
        },
        columns: [
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '현재고', width: 100 },
          { name: '투입수량', width: 100 },
          { name: '불량명', width: 100 },
          { name: '불량수량', width: 100 }
        ]
      },
      grid3: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 150
        },
        columns: [
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '불량여부', width: 100 },
          { name: '불량명', width: 100 },
          { name: '투입수량', width: 100 }
        ]
      },
      resolve: null,
      reject: null
    }
  },
  created () {
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
    async purchasePut () {
      await this.$notify.success('자재투입')
    },
    async purchaseBad () {
      await this.$notify.success('자재불량')
    },
    async purchaseReturn () {
      await this.$notify.success('자재환입')
    }
  }
}
</script>

<style scoped>
</style>
