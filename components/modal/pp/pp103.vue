<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      COMPARE BOM
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save()">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJForm ref="form">
        <SJTitle title="Compare정보" />
        <SJFormRow>
          <SJFormField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="BOM번호">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="BOM번호" rules="required" />
          </SJFormField>
          <SJFormField label="BOM명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="BOM명" rules="required" />
          </SJFormField>
          <SJFormField label="사용여부">
            <SJSelect
              id="md4"
              name="사용여부"
              :options="[{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>

        <SJFormRow>
          <SJFormField label="담당자">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자" rules="required" />
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
          <SJFormField label="비고">
            <SJTextarea
              id="textarea"
              v-model="inputData.content"
              name="textarea"
            />
          </SJFormField>
        </SJFormRow>

        <SJTitle title="BOM">
          <button class="btn-white-bg" @click="addRow">
            추가
          </button>
          <button class="btn-white-bg" @click="rowDel">
            삭제
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
      </SJForm>
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
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '취소일자', width: 100 },
          { name: '창고', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '요청수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '거래처', width: 100 }
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
    async addRow () {
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
