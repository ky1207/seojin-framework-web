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
      <SJSearchField label="매출일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록" />
    </template>
    <template #body>
      <SJTab :list="tabList">
        <template #tab-1>
          <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
        </template>
        <template #tab-2>
          <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
        </template>
      </SJtab>
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
      inputData: {},
      grid_tab1: {
        data: {},
        columns: [
          { name: '거래처', width: 100 },
          { name: '1월', width: 100 },
          { name: '2월', width: 100 },
          { name: '3월', width: 100 },
          { name: '4월', width: 100 },
          { name: '5월', width: 100 },
          { name: '6월', width: 100 },
          { name: '7월', width: 100 },
          { name: '8월', width: 100 },
          { name: '9월', width: 100 },
          { name: '10월', width: 100 },
          { name: '11월', width: 100 },
          { name: '12월', width: 100 },
          { name: '합계', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '1월', width: 100 },
          { name: '2월', width: 100 },
          { name: '3월', width: 100 },
          { name: '4월', width: 100 },
          { name: '5월', width: 100 },
          { name: '6월', width: 100 },
          { name: '7월', width: 100 },
          { name: '8월', width: 100 },
          { name: '9월', width: 100 },
          { name: '10월', width: 100 },
          { name: '11월', width: 100 },
          { name: '12월', width: 100 },
          { name: '합계', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '거래처별' },
        { id: 2, title: '품목별' }
      ]
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        }
      }
    }
  }
}
</script>
