<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      라우팅 마스터
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
          <SJFormField label="라우팅코드">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="라우팅코드" rules="required" />
          </SJFormField>
          <SJFormField label="공정명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="라우팅명" rules="required" />
          </SJFormField>
          <SJFormField label="재작업여부">
            <SJSelect
              id="md1"
              name="공정분류"
              :options="[{text: 'N',value: 'N'},{text: 'Y',value: 'Y'}]"
              rules="required"
            />
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

        <SJTitle title="라우팅절차">
          <button class="btn-blue-bg" @click="processPop">
            공정적용
          </button>
          <button class="btn-blue-bg" @click="processArray">
            정렬
          </button>
          <button class="btn-white-bg" @click="processRowDel">
            삭제
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />

        <SJTitle title="라우팅품목">
          <button class="btn-blue-bg" @click="itemPop">
            품목적용
          </button>
          <button class="btn-white-bg" @click="itemRowDel">
            삭제
          </button>
        </SJTitle>
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
          { name: '불출일자', width: 100 },
          { name: '공정', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '공정', width: 200 },
          { name: '후공정#', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '거래처', width: 100 },
          { name: '우선순위', width: 100 },
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
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 200 },
          { name: '규격', width: 100 },
          { name: '기준단위', width: 200 },
          { name: '사용여부', width: 100 }
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
    async processPop () {
      await this.$notify.success('공정적용 팝업호출')
    },
    async processArray () {
      await this.$notify.success('공정정렬')
    },
    async processRowDel () {
      await this.$notify.success('공정 삭제')
    },
    async itemPop () {
      await this.$notify.success('품목 팝업호출')
    },
    async itemRowDel () {
      await this.$notify.success('품목 삭제')
    }
  }
}
</script>

<style scoped>
</style>
