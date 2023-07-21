<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      수주출하현황
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
          <SJFormField label="수주번호">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="견적번호" rules="required" />
          </SJFormField>
          <SJFormField label="수주일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="수주일"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="거래처">
            <SJSelect id="searchCoType" name="거래처" :options="common.USE_YN" rules="required" />
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
          <SJFormField label="영업구분">
            <SJSelect id="searchCoType" name="영업구분" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="FCST수주">
            <SJSelect id="searchCoType" name="FCST수주" :options="common.USE_YN" />
          </SJFormField>
          <SJFormField label="변경전수주">
            <SJSelect id="searchCoType" name="변경전수주" :options="common.USE_YN" />
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

        <SJTitle title="목록" />
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
      </SJForm>
    </template>

    <template #footer>
      <button type="button" class="btn btn-secondary" @click="close()">
        Close
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
          { name: '수주번호', width: 100 },
          { name: '출하일자', width: 100 },
          { name: '거래처', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '창고', width: 100 },
          { name: '기준단위', width: 100 },
          { name: 'LOT', width: 100 }
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
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
