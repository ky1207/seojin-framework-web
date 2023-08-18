<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      작업상세
    </template>
    <template #button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap disabled-grid-wrap>
        <template #body>
          <SJTab :list="tabList">
            <template #tab-1>
              <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
            </template>
            <template #tab-2>
              <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
            </template>
            <template #tab-3>
              <SJGrid ref="grid_tab3" v-model="grid_tab3.data" :columns="grid_tab3.columns" />
            </template>
            <template #tab-4>
              <SJGrid ref="grid_tab4" v-model="grid_tab4.data" :columns="grid_tab4.columns" />
            </template>
            <template #tab-5>
              <SJGrid ref="grid_tab5" v-model="grid_tab5.data" :columns="grid_tab5.columns" />
            </template>
          </SJtab>
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
      resolve: null,
      reject: null,
      grid_tab1: {
        data: {},
        columns: [
          { name: '주/야간', width: 100 },
          { name: '사용자명', width: 200 },
          { name: '시작시간', width: 200 },
          { name: '종료시간', width: 200 },
          { name: '작업종료', width: 150 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: '자동투입', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '예약수량', width: 100 },
          { name: '생산입고', width: 100 },
          { name: '투입수량', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '투입잔량', width: 100 }
        ]
      },
      grid_tab3: {
        data: {},
        columns: [
          { name: '품목코드', width: 150 },
          { name: '품목명', width: 200 },
          { name: '창고', width: 100 },
          { name: '불량유형', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '투입단위', width: 100 }
        ]
      },
      grid_tab4: {
        data: {},
        columns: [
          { name: '불량명', width: 200 },
          { name: 'LOT', width: 150 },
          { name: '불량수량', width: 120 },
          { name: '기준단위', width: 120 },
          { name: '실적시간', width: 120 }
        ]
      },
      grid_tab5: {
        data: {},
        columns: [
          { name: 'LOT', width: 200 },
          { name: '수량', width: 150 },
          { name: '기준단위', width: 150 },
          { name: '수정일', width: 200 }
        ]
      },
      tabList: [
        { id: 1, title: '작업자' },
        { id: 2, title: '자재투입' },
        { id: 3, title: '자재불량' },
        { id: 4, title: '불량등록' },
        { id: 5, title: '생산실적' }
      ]
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
</style>
