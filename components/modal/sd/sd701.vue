<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      클레임
    </template>

    <template #default>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="클레임코드">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="클레임코드" rules="required" />
          </SJFormField>
          <SJFormField label="클레임일자">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="클레임일자"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
          <SJFormField label="담당자">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="수주적용">
            <SJSelect id="searchCoType" name="수주적용" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="거래처">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="거래처" rules="required" />
          </SJFormField>
          <SJFormField label="요청자">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="요청자" rules="required" />
          </SJFormField>
          <SJFormField label="요청자연락처">
            <SJSelect id="searchCoType" name="요청자연락처" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="클레임품목">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="클레임품목" rules="required" />
          </SJFormField>
          <SJFormField label="수량">
            <SJSelect id="searchCoType" name="수량" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="클레임유형">
            <SJSelect id="searchCoType" name="클레임유형" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="반환예정일자">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="반환예정일자"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="클레임내용">
            <SJTextarea
              id="textarea"
              v-model="inputData.content"
              name="textarea"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="파일첨부">
            <SJFileUpload id="form_files" v-model="inputData.files" name="files" @fileDownload="fileDownload" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJTitle title="답변" />
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="조치일자">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="조치일자"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
          <SJFormField label="완료예정일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="완료예정일"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
          <SJFormField label="완료일자">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="완료일자"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
          <SJFormField label="클레임상태">
            <SJSelect id="searchCoType" name="클레임상태" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="조치담당자">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="조치담당자" />
          </SJFormField>
          <SJFormField label="조치유형">
            <SJSelect id="searchCoType" name="조치유형" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="조치내용">
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
