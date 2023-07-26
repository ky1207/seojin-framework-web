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
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="구매담당자">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="구매발주" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>
    <template #bottomTitle>
      <SJTitle title="구매입고" />
    </template>
    <template #bottom>
      <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
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
          { name: 'P/O일자', width: 100 },
          { name: 'P/O번호', width: 100 },
          { name: '진행상태', width: 100 },
          { name: '거래처', width: 100 },
          { name: '거래처(Sub)', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '취소일자', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '발주수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '납품수량', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '반품수량', width: 100 },
          { name: '입고잔량', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: '납기가능일자', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매담당자', width: 100 },
          { name: '마감일자', width: 100 },
          { name: '마감사유', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '입고일자', width: 100 },
          { name: '입고번호', width: 100 },
          { name: '진행상태', width: 100 },
          { name: '거래처', width: 100 },
          { name: '거래처(Sub)', width: 100 },
          { name: '부가세여부', width: 100 },
          { name: '통화', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '단가', width: 100 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '기준수량', width: 100 }
        ]
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '확정',
        f2Label: '확정취소',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        // 확정
        f1Click: async () => {
          await fnc.$notify.info('확정')
        },
        // 확정취소
        f2Click: async () => {
          await fnc.$notify.info('확정취소')
        }
      }
    }
  }
}
</script>
