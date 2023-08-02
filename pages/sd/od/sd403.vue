<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
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
      <SJSearchField label="진행상태">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '마감',value: '마감'},{text: '미결',value: '미결'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="수주목록" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
    </template>

    <template #bottomTitle>
      <SJTitle title="출하목록" />
    </template>
    <template #bottom>
      <SJGrid ref="grid2" v-model="grid2.data" :columns="grid2.columns" />
    </template>
  </SJSearchTBLayout>
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
          { name: '품목명', width: 100 },
          { name: '품목코드', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '수주수량', width: 100 },
          { name: '출하요청', width: 100 },
          { name: '출하잔량', width: 100 },
          { name: '매출마감', width: 100 },
          { name: '고객PO번호', width: 100 },
          { name: '작성자', width: 100 },
          { name: '작성일시', width: 100 },
          { name: '수정자', width: 100 },
          { name: '수정일시', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '수주번호', width: 100 },
          { name: '출하일자', width: 100 },
          { name: '거래처', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '창고', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '출하수량', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '작성자', width: 100 },
          { name: '작성일시', width: 100 },
          { name: '수정자', width: 100 },
          { name: '수정일시', width: 100 }
        ]
      }
    }
  },
  methods: {
    async sd401Pop () {
      // 수주관리 신규등록
      const result = await this.$refs.sd401Pop.open()
      if (result) {
        console.log('check')
      }
    },
    async sd402Pop () {
      // 수주출하현황 조회
      const result = await this.$refs.sd402Pop.open()
      if (result) {
        console.log('check')
      }
    },
    async sd403Pop () {
      // 판매계획
      const result = await this.$refs.sd403Pop.open()
      if (result) {
        console.log('check')
      }
    },
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '일괄마감',
        f2Label: '마감취소',
        f3Label: '삭제마감',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        async saveClick () {
          await fnc.$notify.success('저장')
        }
      }
    }
  }
}
</script>
