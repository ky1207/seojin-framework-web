<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      영업활동
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
          <SJTitle title="관리년월" />
        </template>
        <template #default>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="연도">
                <SJSelect id="searchCoType" name="연도" :options="[{text: '2023',value: '2023'},{text: '2024',value: '2024'}]" rules="required" />
              </SJFormField>
              <SJFormField label="월">
                <SJSelect id="searchCoType" name="월" :options="[{text: '1',value: '1'},{text: '2',value: '2'},{text: '3',value: '3'},{text: '4',value: '4'},{text: '5',value: '5'},{text: '6',value: '6'}]" rules="required" />
              </SJFormField>
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJTitle title="사업정보" />
            <SJFormRow>
              <SJFormField label="사업명">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="사업명" rules="required" />
              </SJFormField>
              <SJFormField label="고객사">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="고객사" rules="required" />
              </SJFormField>
              <SJFormField label="담당자명">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자명" rules="required" />
              </SJFormField>
              <SJFormField label="직급">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="직급" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="직책">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="직책" />
              </SJFormField>
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
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="RFP등관련자료">
                <SJFileUpload2 id="form_files" v-model="inputData.files" name="files" @fileDownload="fileDownload" />
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
              <SJFormField label="수주금액">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="수주금액" rules="required" />
              </SJFormField>
              <SJFormField label="처리결과">
                <SJSelect id="searchCoType" name="처리결과" :options="[{text: '등록',value: '등록'},{text: '검토중',value: '검토중'},{text: '제안중',value: '제안중'},{text: '영업종료',value: '영업종료'}]" rules="required" />
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
              <SJFormField />
              <SJFormField />
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
          </SJForm>
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
