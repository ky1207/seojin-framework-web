<template>
  <SJModal ref="modal" size="modal-xl">
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
        class="
        btn-white-bg"
      >
        <i class="bi bi-arrow-clockwise" />
      </button>
      <button class="btn-blue-bg" style="background: #3A83B7; color: #fff;">
        예약(생산입고)자재
      </button>
      <button class="btn-blue-bg" style="background: #3A83B7; color: #fff;" @click="searchModal">
        자재검색
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
      <pop104 ref="searchModal" />
    </template>
    <template #default>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap>
        <template #title>
          <SJTitle title="BOM" />
        </template>
        <template #body>
          <SJPOPGrid
            v-model="grid_bom.data"
            :columns="grid_bom.columns"
            :options="grid_bom.options"
          />
        </template>
      </SJPOPOneLayout>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap>
        <template #title>
          <SJTitle title="재고현황" />
        </template>
        <template #body>
          <SJPOPGrid
            v-model="grid_invent.data"
            :columns="grid_invent.columns"
            :options="grid_invent.options"
          />
        </template>
      </SJPOPOneLayout>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap>
        <template #title>
          <SJTitle title="투입현황" />
        </template>
        <template #body>
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
          { name: '지시일자', width: 120 },
          { name: '제조오더번호', width: 120 },
          { name: '오더상태', width: 100 },
          { name: '재작', width: 50 },
          { name: '품목코드', width: 150 },
          { name: '품목명', width: 200 },
          { name: '지시', width: 50 },
          { name: '양품', width: 50 },
          { name: '불량', width: 50 }
        ],
        options: {
          header: 200
        }
      },
      grid_invent: {
        data: {},
        columns: [
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 150 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 120 },
          { name: '투입단위', width: 80 },
          { name: '현재고', width: 80 },
          { name: '자재투입', width: 80 },
          { name: '투입잔량', width: 80 },
          { name: '자재불량', width: 80 }
        ],
        options: {
          header: 200
        }
      },
      grid_input: {
        data: {},
        columns: [
          { name: '지시일자', width: 120 },
          { name: '제조오더번호', width: 120 },
          { name: '오더상태', width: 100 },
          { name: '재작', width: 50 },
          { name: '품목코드', width: 150 },
          { name: '품목명', width: 200 },
          { name: '지시', width: 50 },
          { name: '양품', width: 50 },
          { name: '불량', width: 50 }
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
:deep(.search-field) {
    margin-right: 5px;
    display: flex;
    align-items: center;
    label{
      width: 100px;
    }
    .field-wrap{
      width: auto;
    }
  }
</style>
