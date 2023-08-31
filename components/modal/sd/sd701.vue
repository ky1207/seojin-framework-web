<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      클레임
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save()">
        저장
      </button>
      <button class="btn-gray-bg" @click="close">
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
                  rules="required"
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
                  rules="required"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="파일첨부">
                <SJFileUpload2 id="form_files" v-model="inputData.files" name="files" @fileDownload="fileDownload" />
              </SJFormField>
            </SJFormRow>

            <SJTitle title="답변" />
            <SJFormRow>
              <SJFormField label="조치일자">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="inputData.sentStartDtm"
                  name="조치일자"
                  show-current="true"
                  disabled-validation
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="완료예정일">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="inputData.sentStartDtm"
                  name="완료예정일"
                  show-current="true"
                  disabled-validation
                  rules="required"
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
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="조치담당자" rules="required" />
              </SJFormField>
              <SJFormField label="조치유형">
                <SJSelect id="searchCoType" name="조치유형" :options="common.USE_YN" rules="required" />
              </SJFormField>
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="조치내용">
                <SJTextarea
                  id="textarea"
                  v-model="inputData.content"
                  name="textarea"
                  rules="required"
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
