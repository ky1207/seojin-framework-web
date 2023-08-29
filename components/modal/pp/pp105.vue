<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      BOM COPY
    </template>

    <template #button>
      <button class="btn-white-bg">
        조회
      </button>
      <button class="btn-blue-bg">
        복사
      </button>
      <button class="btn-gray-bg" @click="close">
        닫기
      </button>
    </template>

    <template #default>
      <SJSearchLRLayout disabled-navigator-wrap>
        <template #default>
          <SJSearchField label="회사">
            <SJSelect
              id="searchCompany"
              name=""
              :options="[{text: '서진본사',value: ''},{text: '서진베트남',value: '서진베트남'}]"
              disabled-validation
              disabled-first-message
            />
          </SJSearchField>
          <SJSearchField label="품목유형">
            <SJSelect
              id="searchCompany"
              name=""
              :options="[{text: '전체',value: ''},{text: '제품',value: '제품'},{text: '반제품',value: '반제품'}]"
              disabled-validation
              disabled-first-message
            />
          </SJSearchField>
          <SJSearchField label="품목코드">
            <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
          </SJSearchField>
          <SJSearchField label="품목명">
            <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
          </SJSearchField>
        </template>
        <template #leftTitle>
          <SJTitle title="품목정보" />
        </template>
        <template #left>
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        </template>
        <template #rightTitle>
          <SJTitle title="BOM" />
        </template>
        <template #right>
          <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
        </template>
      </SJSearchLRLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      search: {},
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
          { name: '픔목유형', width: 100 },
          { name: '픔목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 }
        ]
      },
      grid2: {
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
          { name: '소용량', width: 100 }
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
      // this.$refs.form.reset()

      this.$refs.modal.hide()
      this.resolve(false) // response의 응답
    }
  }
}
</script>

<style scoped>
</style>
