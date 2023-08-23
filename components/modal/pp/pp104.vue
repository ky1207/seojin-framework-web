<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      BOM
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
        <SJTitle title="품목정보" />
        <SJFormRow>
          <SJFormField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]" rules="required" />
          </SJFormField>
          <SJFormField label="품목코드">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목코드" rules="required" />
          </SJFormField>
          <SJFormField label="품명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="품명" rules="required" />
          </SJFormField>
          <SJFormField label="규격">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="규격" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="품목유형">
            <SJSelect
              id="md4"
              name="품목유형"
              :options="[{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}]"
              rules="required"
            />
          </SJFormField>
          <SJFormField label="기준단위">
            <SJSelect
              id="md4"
              name="기준단위"
              :options="[{text: 'EA',value: 'EA'}]"
              rules="required"
            />
          </SJFormField>
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

        <SJTitle title="BOM">
          <button class="btn-blue-bg" @click="bomCopy">
            타제품BOM복사
          </button>
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
          { name: '기준단위', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: 'LOSS(%)', width: 100 },
          { name: 'LOSS', width: 100 },
          { name: '총소요량', width: 100 },
          { name: '비고', width: 200 },
          { name: '우선순위', width: 100 }
        ]
      },
      resolve: null,
      reject: null
    }
  },
  created () {
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
    async bomCopy () {
      await this.$notify.success('타품목 BOM복사 팝업 호출')
    },
    async itemSet () {
      await this.$notify.success('품목팝업 호출')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
