<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      포장등록
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
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="등록" />
        </template>
        <template #default>
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="회사">
                <SJSelect id="searchCoType" name="회사" :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]" rules="required" />
              </SJFormField>
              <SJFormField label="품목코드">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목코드" rules="required" />
              </SJFormField>
              <SJFormField label="품목명">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목명" rules="required" />
              </SJFormField>
              <SJFormField label="MRP실행번호">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="MRP실행번호" rules="required" />
              </SJFormField>
              <SJFormField label="생산계획번호">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="생산계획번호" rules="required" />
              </SJFormField>
            </SJFormRow>

            <SJTitle title="FCID별 요청등록정보">
              <button class="btn-blue-bg" @click="itemSet">
                품목적용
              </button>
              <button class="btn-blue-bg" @click="rowDel">
                삭제
              </button>
            </SJTitle>
            <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
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
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 250
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
          { name: '기준단위', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '포장수량', width: 100 },
          { name: '비고', width: 200 }
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
    async itemSet () {
      await this.$notify.success('품목적용')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
form .sj-form-field fieldset{
  width: 250px ;
}
</style>
