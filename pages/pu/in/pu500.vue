<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pu501 ref="pu501Pop" />
      <Pu701 ref="pu701Pop" />
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
      <SJSearchField label="입고번호">
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
    </template>
    <template #topTitle>
      <SJTitle title="구매입고목록" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
    </template>

    <template #bottomTitle>
      <SJTitle title="구매입고 상세목록" />
    </template>
    <template #bottom>
      <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" />
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
          { name: '입고일자', width: 100 },
          { name: '입고번호', width: 100 },
          { name: '거래처', width: 100 },
          { name: '사용자명', width: 100 },
          { name: '내외자', width: 100 },
          { name: '통화', width: 100 },
          { name: '부가세적용', width: 100 },
          { name: '품목(수)', width: 100 },
          { name: '공급가', width: 100 },
          { name: '부가세', width: 100 },
          { name: '합계', width: 100 },
          { name: '작성일시', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: 'P/O번호', width: 100 },
          { name: '납품번호', width: 100 },
          { name: '진행상태', width: 100 },
          { name: '양품여부', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '수량', width: 100 },
          { name: '단가', width: 100 },
          { name: '공급가', width: 100 },
          { name: '부가세', width: 100 },
          { name: '합계', width: 100 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '기준수량', width: 100 },
          { name: '현재고', width: 100 },
          { name: '검사여부', width: 100 },
          { name: '위치코드', width: 100 },
          { name: '거래처LOT', width: 100 }
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
        f3Label: '구매마감',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        // 신규
        f1Click: async () => {
          const result = await this.$refs.pu501Pop.open()
          if (result) {
            console.log('check')
          }
        },
        f2Click: async () => {
          const result = await this.$refs.pu501Pop.open()
          if (result) {
            console.log('check')
          }
        },
        f3Click: async () => {
          const result = await this.$refs.pu701Pop.open()
          if (result) {
            console.log('check')
          }
        }
      }
    }
  }
}
</script>
