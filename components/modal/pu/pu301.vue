<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      구매발주등록
    </template>

    <template #default>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="담당자">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자" rules="required" />
          </SJFormField>
          <SJFormField label="발주번호">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="발주번호" rules="required" />
          </SJFormField>
          <SJFormField label="등록일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="등록일"
              show-current="true"
              disabled-validation
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="거래처">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="거래처" rules="required" />
          </SJFormField>
          <SJFormField label="내/외자구분">
            <SJSelect id="searchCoType" name="내/외자구분" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="부가세적용">
            <SJSelect id="searchCoType" name="부가세적용" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="통화">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="통화" rules="required" />
            <SJSelect id="searchCoType" name="통화" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="발주형태">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="발주형태" rules="required" />
          </SJFormField>
          <SJFormField label="수입여부">
            <SJSelect id="searchCoType" name="수입여부" :options="common.USE_YN" />
          </SJFormField>
          <SJFormField label="입출고형태">
            <SJSelect id="searchCoType" name="입출고형태" :options="common.USE_YN" />
          </SJFormField>
          <SJFormField label="사급형태">
            <SJSelect id="searchCoType" name="사급형태" :options="common.USE_YN" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="결재방법">
            <SJSelect id="searchCoType" name="결재방법" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="가격조건">
            <SJSelect id="searchCoType" name="가격조건" :options="common.USE_YN" />
          </SJFormField>
          <SJFormField label="운송방법">
            <SJSelect id="searchCoType" name="운송방법" :options="common.USE_YN" />
          </SJFormField>
          <SJFormField label="구매그룹">
            <SJSelect id="searchCoType" name="구매그룹" :options="common.USE_YN" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="SellBack여부">
            <SJSelect id="searchCoType" name="SellBack여부" :options="common.USE_YN" />
          </SJFormField>
          <SJFormField label="판매계획">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="판매계획" />
          </SJFormField>
          <SJFormField label="FCID">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="FCID" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="비고">
            <SJTextarea
              id="textarea"
              v-model="inputData.content"
              name="textarea"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="등록일시">
            2023-07-20 18:00:00
          </SJFormField>
          <SJFormField label="등록자">
            홍길동
          </SJFormField>
          <SJFormField label="수정일시">
            2023-07-20 18:00:00
          </SJFormField>
          <SJFormField label="수정자">
            홍길동
          </SJFormField>
        </SJFormRow>

        <SJTitle title="상세정보">
          품목코드
          <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목코드" @click="detailSearch" />
          <button class="btn-blue-bg">
            조회
          </button>
          <button class="btn-white-bg" @click="orderApply">
            구매요청 적용
          </button>
          <button class="btn-white-bg" @click="itemApply">
            품목정보 적용
          </button>
          <button class="btn-white-bg" @click="costApply">
            단가적용
          </button>
          <button class="btn-white-bg" @click="accountApply">
            거래처적용
          </button>
          <button class="btn-white-bg" @click="rowDel">
            삭제
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
      </SJForm>
    </template>

    <template #footer>
      <button type="button" class="btn btn-secondary" @click="close()">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="save()">
        Save changes
      </button>
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
          bodyHeight: 250
        },
        columns: [
          { name: '변경거래처명', width: 100 },
          { name: '요청번호', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '품목유형', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '최초납품요청일', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: 'SCM납기가능', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '취소일자', width: 100 },
          { name: '창고', width: 100 },
          { name: '거래처코드(Sub)', width: 100 },
          { name: '거래처(Sub)', width: 100 },
          { name: '단가구분', width: 100 },
          { name: 'HS CODE', width: 100 },
          { name: '발주수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '단가', width: 100 },
          { name: '공급가', width: 100 },
          { name: '부가세', width: 100 },
          { name: '합계', width: 100 },
          { name: 'FAIR', width: 100 },
          { name: '비고', width: 100 }
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
      this.$refs.form.reset()

      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    },
    async save () {
      const result = await this.$refs.form.validate()
      if (result) {
        this.$refs.modal.hide()
        this.resolve(true)
      }
    },
    async detailSearch () {
      await this.$notify.success('상세정보조회')
    },
    async orderApply () {
      await this.$notify.success('구매요청적용')
    },
    async itemApply () {
      await this.$notify.success('품목정보적용')
    },
    async costApply () {
      await this.$notify.success('단가적용')
    },
    async accountApply () {
      await this.$notify.success('거래처적용')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
