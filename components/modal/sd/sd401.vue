<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      수주
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
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]" rules="required" />
          </SJFormField>
          <SJFormField label="담당자">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="담당자" rules="required" />
          </SJFormField>
          <SJFormField label="수주번호">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="견적번호" rules="required" />
          </SJFormField>
          <SJFormField label="수주일">
            <SJDatePicker
              id="sentStartDtm"
              v-model="inputData.sentStartDtm"
              name="수주일"
              show-current="true"
              disabled-validation
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="거래처">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="통화" rules="required" />
          </SJFormField>
          <SJFormField label="내/외자구분">
            <SJSelect id="searchCoType" name="내/외자구분" :options="[{text: '내자',value: '내자'},{text: '외자',value: '외자'}]" rules="required" />
          </SJFormField>
          <SJFormField label="부가세적용">
            <SJSelect id="searchCoType" name="부가세적용" :options="[{text: '적용',value: '적용'},{text: '미적용',value: '미적용'}]" rules="required" />
          </SJFormField>
          <SJFormField label="통화">
            <SJSelectInput id="si" v-model="inputData.company" name="t1" :options="selectinput" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="영업구분">
            <SJSelect id="searchCoType" name="영업구분" :options="[{text: 'PO(구매주문)',value: 'PO(구매주문)'},{text: 'FCST(수요예측)',value: 'FCST(수요예측)'}]" rules="required" />
          </SJFormField>
          <SJFormField label="FCST수주">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="FCST수주" />
          </SJFormField>
          <SJFormField label="변경전수주">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="변경전수주" />
          </SJFormField>
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

        <SJTitle title="목록">
          <button class="btn-blue-bg" @click="bomApply">
            품목정보적용
          </button>
          <button class="btn-blue-bg" @click="costPrice">
            단가적용
          </button>
          <button class="btn-white-bg" @click="rowDel">
            삭제
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
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
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 300
        },
        columns: [
          { name: '견적번호', width: 100 },
          { name: '품목유형', width: 100 },
          { name: 'Vendor Code', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '고객PO번호', width: 100 },
          { name: 'REV', width: 100 },
          { name: 'FCID', width: 100 },
          { name: 'SO', width: 100 },
          { name: 'SO Line', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'Fab', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: 'Z-TAG Serial', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '수량', width: 100 },
          { name: '단가', width: 100 },
          { name: '공급가', width: 100 },
          { name: '부가세', width: 100 },
          { name: '합계', width: 100 },
          { name: 'PO Line', width: 100 },
          { name: 'PO Created Dt', width: 100 },
          { name: 'Schd Line', width: 100 },
          { name: 'From Dt', width: 100 },
          { name: 'Need Dt', width: 100 },
          { name: 'Sys No.', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: 'FA', width: 100 },
          { name: '비고', width: 100 }
        ]
      },
      resolve: null,
      reject: null
    }
  },
  created () {
    this.selectinput = this.getSelectinput()
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
    async bomApply () {
      await this.$notify.success('품목정보적용')
    },
    async costPrice () {
      await this.$notify.success('단가적용')
    },
    async rowDel () {
      await this.$notify.success('삭제')
    },
    getSelectinput () {
      return [
        {
          text: 'WON',
          value: 'A1'
        },
        {
          text: 'DOLLAR',
          value: 'B1'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
