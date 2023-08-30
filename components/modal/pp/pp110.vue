<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      MPS시뮬레이션
    </template>
    <template #button>
      <button class="btn-blue-bg" @click="save">
        실행
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
              <SJFormField label="MPS생성번호">
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
              <SJFormField label="확정일자(MPS)">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="inputData.sentStartDtm"
                  name="확정일자(MPS)"
                  show-current="true"
                  disabled-validation
                  rules="required"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="예시일자">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="inputData.sentStartDtm"
                  name="예시일자"
                  show-current="true"
                  disabled-validation
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="휴일여부">
                <SJSelect
                  id="md5"
                  name="휴일여부"
                  :options="[{text: '적용',value: '적용'},{text: '미적용',value: '미적용'}]"
                />
              </SJFormField>
              <SJFormField label="안전재고">
                <SJSelect
                  id="md5"
                  name="안전재고"
                  :options="[{text: '적용',value: '적용'},{text: '미적용',value: '미적용'}]"
                />
              </SJFormField>
              <SJFormField label="제품LOSS">
                <SJSelect
                  id="md5"
                  name="제품LOSS"
                  :options="[{text: '적용',value: '적용'},{text: '미적용',value: '미적용'}]"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="올림수">
                <SJSelect
                  id="md5"
                  name="올림수"
                  :options="[{text: '적용',value: '적용'},{text: '미적용',value: '미적용'}]"
                />
              </SJFormField>
              <SJFormField />
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJTab :list="tabList">
              <template #tab-1>
                <SJTitle title="목록" />
                <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" :options="grid_tab1.options" />
              </template>
              <template #tab-2>
                <SJTitle title="목록" />
                <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" :options="grid_tab2.options" />
              </template>
            </SJTab>
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
      inputData: {},
      resolve: null,
      reject: null,
      grid_tab1: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 400
        },
        columns: [
          { name: '생산계획번호', width: 100 },
          { name: '상위계획번호', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '제조L/T', width: 100 },
          { name: '생산수량(일)', width: 100 },
          { name: '계획수량', width: 100 },
          { name: '계획일자', width: 100 },
          { name: '작성일자', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일자', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 400
        },
        columns: [
        ]
      },
      tabList: [
        { id: 1, title: '계획기준' },
        { id: 2, title: '주차별계획' }
      ]
    }
  },
  created () {
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    async save () {
      await this.$notify.info('저장')
    },
    close () {
      this.$refs.modal.hide()
    }
  }
}
</script>
