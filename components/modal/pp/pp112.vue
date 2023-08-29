<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      MPS생성
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="run">
        실행
      </button>
      <button class="btn-blue-bg" @click="confirm">
        MRP확정
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="MRP생성" />
        </template>
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="회사">
                <SJSelect
                  id="md1"
                  name="회사"
                  :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="MRP생성번호">
                <SJInput id="searchCoCode" v-model="inputData.coCode" name="MPS생성번호" rules="required" />
              </SJFormField>
              <SJFormField label="생성일자">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="inputData.sentStartDtm"
                  name="생성일자"
                  show-current="true"
                  disabled-validation
                  rules="required"
                />
              </SJFormField>
              <SJFormField />
            </SJFormRow>
          </SJForm>
          <SJTitle title="MRP생성목록" />
          <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      inputData: {},
      resolve: null,
      reject: null,
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 400
        },
        columns: [
          { name: 'MRP실행번호', width: 100 },
          { name: 'MRP번호', width: 100 },
          { name: '수주번호', width: 100 },
          { name: '품목유형', width: 100 },
          { name: 'FCID', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매발주필요일', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '소요량', width: 100 },
          { name: 'MRP상태', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: '구매L/T', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '대상구분', width: 100 },
          { name: '구매조직', width: 100 },
          { name: '작성일시', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    async run () {
      await this.$notify.info('실행')
    },
    async confirm () {
      await this.$notify.info('MRP확정')
    },
    close () {
      this.$refs.modal.hide()
    }
  }
}
</script>
