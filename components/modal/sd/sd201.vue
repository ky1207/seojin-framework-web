<template>
  <SJModal ref="modal">
    <template #title>
      영업활동
    </template>

    <template #default>
      <SJForm ref="form">
        <SJTitle title="관리년월" />
        <SJFormRow>
          <SJFormField label="연도">
            <SJSelect id="searchCoType" name="연도" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="월">
            <SJSelect id="searchCoType" name="월" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJTitle title="사업정보" />
        <SJFormRow>
          <SJFormField label="사업명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="사업명" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="고객사">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="고객사" rules="required" />
          </SJFormField>
          <SJFormField label="담당자명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자명" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="직급">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="직급" />
          </SJFormField>
          <SJFormField label="직책">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="직책" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="공고일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="공고일"
              show-current="true"
              disabled-validation
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="RFP등관련자료">
            <SJFileUpload id="form_files" v-model="inputData.files" name="files" @fileDownload="fileDownload" />
          </SJFormField>
        </SJFormRow>
        <SJTitle title="영업정보" />
        <SJFormRow>
          <SJFormField label="영업담당자명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="영업담당자명" rules="required" />
          </SJFormField>
          <SJFormField label="직급">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="직급" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="수주금액">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="수주금액" rules="required" />
          </SJFormField>
          <SJFormField label="처리결과">
            <SJSelect id="searchCoType" name="처리결과" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="매출발생예상일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="매출발생예상일"
              show-current="true"
              disabled-validation
            />
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
    }
  }
}
</script>

<style scoped>
</style>
