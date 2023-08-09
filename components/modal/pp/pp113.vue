<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      제조오더등록
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
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]" rules="required" />
          </SJFormField>
          <SJFormField label="라우팅명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="라우팅명" rules="required" />
          </SJFormField>
          <SJFormField label="품목코드">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목코드" rules="required" />
          </SJFormField>
          <SJFormField label="품명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="품명" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="규격">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="규격" rules="required" />
          </SJFormField>
          <SJFormField label="품목유형">
            <SJSelect
              id="md1"
              name="품목유형"
              :options="[{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원료',value: '원료'}]"
              rules="required"
            />
          </SJFormField>
          <SJFormField label="기준단위">
            <SJSelect
              id="md4"
              name="기준단위"
              :options="[{text: 'EA',value: 'EA'},{text: 'L',value: 'L'}]"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>

        <SJTitle title="공정" />
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />

        <SJTitle title="BOM" />
        <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
      </SJForm>
    </template>

    <template #footer />
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
      search: {},
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
          { name: '공정#', width: 100 },
          { name: '공정', width: 100 },
          { name: '후공정#', width: 100 },
          { name: 'C/T(분)', width: 100 },
          { name: '소요(분)', width: 100 },
          { name: '지시일자', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '거래처', width: 100 },
          { name: '설비명', width: 100 },
          { name: '실적여부', width: 100 },
          { name: '최종여부', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '공정#', width: 100 },
          { name: '투입공정', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: '예약수량', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '기준수량', width: 100 },
          { name: '출고창고', width: 100 }
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
    async routingSet () {
      await this.$notify.success('라우팅 적용')
    },
    async bomSet () {
      await this.$notify.success('설계BOM적용')
    },
    async itemPop () {
      await this.$notify.success('품목 팝업호출')
    },
    async processPop () {
      await this.$notify.success('공정 팝업호출')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>
</style>
