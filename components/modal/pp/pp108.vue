<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      제조BOM 일괄등록
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save()">
        조회
      </button>
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
          <SJFormField label="품목유형">
            <SJSelect
              id="md4"
              name="품목유형"
              :options="[{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}]"
              rules="required"
            />
          </SJFormField>
          <SJFormField label="품목분류">
            <SJItemCategory id="search2" name="search2" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="품목">
            <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
          </SJFormField>
          <SJFormField label="라우팅코드">
            <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
          </SJFormField>
          <SJFormField label="생성일">
            <SJPeriodSearch id="md2" name="md2" />
          </SJFormField>
        </SJFormRow>

        <SJTitle title="BOM">
          <button class="btn-blue-bg" @click="validation">
            VALIDATION
          </button>
          <button class="btn-blue-bg" @click="appendRow">
            추가
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
      search: {},
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
          { name: '모품목코드', width: 100 },
          { name: 'BOM SEQ', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '소요단위', width: 100 },
          { name: 'BOM수량', width: 100 },
          { name: 'LOSS수량', width: 100 },
          { name: 'LOSS율', width: 100 },
          { name: '총소요량', width: 100 },
          { name: '투입공정', width: 100 },
          { name: '공정#', width: 100 },
          { name: '비고', width: 100 },
          { name: 'VALID메세지', width: 100 },
          { name: '정렬', width: 100 },
          { name: '사용여부', width: 100 },
          { name: '생성일', width: 100 }
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
    async validation () {
      await this.$notify.success('validation check')
    },
    appendRow () {
      this.$refs.grid.invoke('appendRow')
    },
    async rowDel () {
      await this.$notify.success('row 삭제')
    }
  }
}
</script>

<style scoped>
</style>
