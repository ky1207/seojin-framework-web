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
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
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
          { name: '레벨', width: 100 },
          { name: 'PATH', width: 200 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '품목대분류', width: 100 },
          { name: '품목소분류', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '소요량', width: 100 },
          { name: 'LOSS(%)', width: 100 },
          { name: 'LOSS', width: 100 },
          { name: '실소요량', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '재고', width: 100 },
          { name: '필요', width: 100 },
          { name: '부족', width: 100 },
          { name: '기준단위', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '레벨', width: 100 },
          { name: 'PATH', width: 200 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '품목대분류', width: 100 },
          { name: '품목소분류', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '소요량', width: 100 },
          { name: 'LOSS(%)', width: 100 },
          { name: 'LOSS', width: 100 },
          { name: '실소요량', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '재고', width: 100 },
          { name: '필요', width: 100 },
          { name: '부족', width: 100 },
          { name: '기준단위', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '다중레벨조회' },
        { id: 2, title: '1레벨조회' }
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
