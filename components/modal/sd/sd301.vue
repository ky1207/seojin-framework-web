<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      견적서
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
          <SJFormField label="견적번호">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="견적번호" rules="required" />
          </SJFormField>
          <SJFormField label="견적일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="견적일"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="품목">
            <SJSelect id="searchCoType" name="품목" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="견적수량">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="견적수량" rules="required" />
          </SJFormField>
          <SJFormField label="유효일자">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="유효일자"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
          <SJFormField label="결제조건">
            <SJSelect id="searchCoType" name="결제조건" :options="common.USE_YN" rules="required" />
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
            <SJSelect id="searchCoType" name="통화" :options="common.USE_YN" rules="required" />
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="통화" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="간접노무비율(%)">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="간접노무비율(%)" />
          </SJFormField>
          <SJFormField label="제조경비율(%)">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="제조경비율(%)" />
          </SJFormField>
          <SJFormField label="일반관리비율(%)">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="일반관리비율(%)" />
          </SJFormField>
          <SJFormField label="이익율(%)">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="이익율(%)" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="재료비">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="재료비" />
          </SJFormField>
          <SJFormField label="인건비">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="인건비" />
          </SJFormField>
          <SJFormField label="Packaging">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="Packaging" />
          </SJFormField>
          <SJFormField label="견적가">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="견적가" rules="required" />
          </SJFormField>
        </SJFormRow>

        <SJTitle title="목록">
          <button class="btn-white-bg" @click="bomApply">
            BOM적용
          </button>
          <button class="btn-white-bg" @click="costPrice">
            원가적용
          </button>
          <button class="btn-white-bg" @click="rowDel">
            삭제
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
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
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: 'Lv', width: 100 },
          { name: 'path', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: '총소요량', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '견적수량', width: 100 },
          { name: '거래처', width: 100 },
          { name: 'Country of Origin', width: 100 },
          { name: '통화', width: 100 },
          { name: '단가', width: 100 },
          { name: '가공시간', width: 100 },
          { name: '가공임율', width: 100 },
          { name: 'Test시간', width: 100 },
          { name: 'Test임율', width: 100 },
          { name: 'Test비용', width: 100 },
          { name: 'Packaging', width: 100 },
          { name: '공급가', width: 100 }
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
    fileDownload (fileId) {
      this.$api.system.program.downloadHelp(fileId)
    },
    async bomApply () {
      await this.$notify.success('BOM적용')
    },
    async costPrice () {
      await this.$notify.success('원가적용')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
