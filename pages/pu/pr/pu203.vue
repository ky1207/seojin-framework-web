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
        <SJDatePicker
          id="sentStartDtm"
          v-model="search.sentStartDtm"
          :name="$t('page.system.00083')"
          show-current="true"
          disabled-validation
        />
        <div>~</div>
        <SJDatePicker
          id="sentStartDtm"
          v-model="search.sentStartDtm"
          :name="$t('page.system.00083')"
          show-current="true"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField label="요청번호">
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
      <SJSearchField label="확정여부">
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
      <SJSearchField label="요청자">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="대상구분">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="구매요청" />
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
          { name: '요청일자', width: 100 },
          { name: '요청번호', width: 100 },
          { name: '확정여부', width: 100 },
          { name: '진행상태', width: 100 },
          { name: '거래처', width: 100 },
          { name: '품목유형', width: 100 },
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
          { name: '취소일자', width: 100 },
          { name: '창고', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '요청수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '발주수량', width: 100 },
          { name: '요청잔량', width: 100 },
          { name: '마감일자', width: 100 },
          { name: '마감사유', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: 'MRP요청번호', width: 100 },
          { name: 'MRP조회번호', width: 100 },
          { name: 'P/O번호', width: 100 },
          { name: 'P/O#', width: 100 }
        ]
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '구매발주',
        f2Label: '일괄마감',
        f3Label: '마감취소',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        // 구매발주
        f1Click: async () => {
          await fnc.$notify.info('구매발주')
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
