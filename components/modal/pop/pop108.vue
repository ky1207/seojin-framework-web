<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      작업종료
    </template>
    <template #button>
      <button class="btn-blue-bg" style="background: #CC045B;">
        작업종료
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <template>
        <SJTitle title="생산현황" />
      </template>
      <SJPOPOneLayout disabled-navigator-wrap disabled-status-wrap>
        <template #default>
          <SJSearchField label="작업시작">
            <SJInput id="pop" v-model="search.pop01" name="작업시작" disabled />
          </SJSearchField>
          <SJSearchField label="제조오더번호">
            <SJInput id="pop" v-model="search.pop02" name="제조오더번호" disabled />
          </SJSearchField>
          <SJSearchField label="공정">
            <SJInput id="pop" v-model="search.pop03" name="공정" disabled />
          </SJSearchField>
          <SJSearchField label="최초공정">
            <SJInput id="pop" v-model="search.pop04" name="최초공정" disabled />
          </SJSearchField>
          <SJSearchField label="품목코드">
            <SJInput id="pop" v-model="search.pop05" name="품목코드" disabled />
          </SJSearchField>
          <SJSearchField label="품목명">
            <SJInput id="pop" v-model="search.pop06" name="품목명" disabled />
          </SJSearchField>
          <SJSearchField />
          <SJSearchField label="규격">
            <SJInput id="pop" v-model="search.pop07" name="규격" disabled />
          </SJSearchField>
          <SJSearchField label="지시">
            <SJInput id="pop" v-model="search.pop08" name="지시" disabled />
          </SJSearchField>
          <SJSearchField label="생산">
            <SJInput id="pop" v-model="search.pop09" name="생산" disabled />
          </SJSearchField>
          <SJSearchField label="양품">
            <SJInput id="pop" v-model="search.pop10" name="양품" disabled />
          </SJSearchField>
          <SJSearchField label="불량">
            <SJInput id="pop" v-model="search.pop11" name="불량" disabled />
          </SJSearchField>
        </template>
        <template #body>
          <SJTitle title="자재투입현황" />
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
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: '공정', width: 120 },
          { name: '자동투입' },
          { name: '투입단위' },
          { name: '예약수량' },
          { name: '생산입고수량' },
          { name: '투입수량' },
          { name: '불량수량' },
          { name: '투입잔량' }
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
:deep(.contents){
  .txt-wrap h3{
    font-size: 12px !important;
  }
}
</style>
