<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="등록일">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="발주번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="진행상태">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="구매발주">
        환율(USD)
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
        <button class="btn-blue-bg">
          적용
        </button>
      </SJTitle>
    </template>
    <template #body>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
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
          { name: '발주번호', width: 100 },
          { name: '발주상태', width: 100 },
          { name: '마감여부', width: 100 },
          { name: 'P/O일자', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '취소일자', width: 100 },
          { name: '거래처', width: 100 },
          { name: '거래처(Sub)', width: 100 },
          { name: '납품창고', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '발주수량', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '반품수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '미납수량(납품)', width: 100 },
          { name: '미납수량(정입고)', width: 100 },
          { name: '경과일', width: 100 },
          { name: '통화', width: 100 },
          { name: '단가', width: 100 },
          { name: '적용환율', width: 100 },
          { name: '미납수량(정입고)공급가', width: 100 },
          { name: '남품미납수량공급가(KRW)', width: 100 },
          { name: '정입고미납수량공급가(KRW)', width: 100 }
        ]
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '구매납품',
        f2Label: '일괄마감',
        f3Label: '마감취소',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        // 구매발주
        f1Click: async () => {
          await fnc.$notify.info('구매납품')
        },
        // 일괄마감
        f2Click: async () => {
          await fnc.$notify.info('일괄마감')
        },
        // 마감취소
        f3Click: async () => {
          await fnc.$notify.info('마감취소')
        }
      }
    }
  }
}
</script>
