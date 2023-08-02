<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd401 ref="sd401Pop" />
      <Sd402 ref="sd402Pop" />
      <Sd403 ref="sd403Pop" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="수주일">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="수주번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="FCST번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="고객PO">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="FCID">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록" />
    </template>
    <template #body>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
    </template>
  </SJSearchOneLayout>
</template>

<script>
// 메뉴 화면
// 기능권한버튼을 사용하는 경우
import { MENU, ACTION } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: {},
      search: {},
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '수주일자', width: 100 },
          { name: '수주번호', width: 100 },
          { name: '진행상태', width: 100 },
          { name: '삭제마감', width: 100 },
          { name: '거래처', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '고객PO번호', width: 100 },
          { name: '품목명', width: 100 },
          { name: '영업구분', width: 100 },
          { name: 'FCID', width: 100 },
          { name: 'SO', width: 100 },
          { name: 'SO Line', width: 100 },
          { name: '품목코드', width: 100 },
          { name: 'Fab', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: 'Z-TAG Serial', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '수주수량', width: 100 },
          { name: '출하요청', width: 100 },
          { name: '출하수량', width: 100 },
          { name: '매출마감', width: 100 },
          { name: '수주잔량', width: 100 },
          { name: '마감일자', width: 100 },
          { name: '마감사유', width: 100 },
          { name: 'REV', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '비고', width: 100 },
          { name: '작성자', width: 100 },
          { name: '작성일시', width: 100 },
          { name: '수정자', width: 100 },
          { name: '수정일시', width: 100 }
        ]
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '신규',
        f2Label: '수정',
        f3Label: '수주복사',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.sd401Pop.open()
          if (result) {
            console.log('check')
          }
        },
        f2Click: async () => {
          const result = await this.$refs.sd401Pop.open()
          if (result) {
            console.log('check')
          }
        },
        f3Click: async () => {
          const result = await this.$refs.sd401Pop.open()
          if (result) {
            console.log('check')
          }
        }
      }
    }
  }
}
</script>
