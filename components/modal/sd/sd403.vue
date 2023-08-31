<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      판매계획
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="등록" />
        </template>
        <template #default>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="회사">
                <SJSelect
                  id="searchCoType"
                  name="회사"
                  :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
                  disabled-validation
                  disabled-first-message
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="수주번호">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="견적번호" rules="required" />
              </SJFormField>
              <SJFormField label="영업구분">
                <SJSelect id="searchCoType" name="영업구분" :options="[{text: 'PO(구매주문)',value: 'PO(구매주문)'},{text: 'FCST(수요예측)',value: 'FCST(수요예측)'}]" rules="required" />
              </SJFormField>
              <SJFormField label="MPS요청번호">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="MPS요청번호" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="납기일">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="inputData.sentStartDtm"
                  name="납기일"
                  show-current="true"
                  disabled-validation
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="품목">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목" />
              </SJFormField>
              <SJFormField label="수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="수량" rules="required" />
              </SJFormField>
              <SJFormField />
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
          </SJForm>
          <SJTitle title="목록">
            <button class="btn-white-bg" @click="rowAdd">
              추가
            </button>
            <button class="btn-white-bg" @click="rowDel">
              삭제
            </button>
          </SJTitle>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        </template>
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
          bodyHeight: 400
        },
        columns: [
          { name: '판매계획번호', width: 100 },
          { name: '요청번호', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '판매계획일자', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '계획수량', width: 100 }
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
      await this.$notify.success('품목정보적용')
    },
    async costPrice () {
      await this.$notify.success('단가적용')
    },
    async rowAdd () {
      await this.$notify.success('추가')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
