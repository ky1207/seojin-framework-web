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
      <SJSearchField label="작업일자">
        <SJPeriodSearch id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="공정">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="제조오더번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="실적번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="설비">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록" />
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
          rowHeaders: ['checkbox', 'rowNum'],
          header: {
            complexColumns: [
              {
                header: '생산',
                name: 'mergeColumn1',
                childNames: ['지시수량', '생산수량', '양품수량', '불량수량', '불량율(%)', '생산율(%)']
              },
              {
                header: '가동',
                name: 'mergeColumn2',
                childNames: ['부하시간(분)', '표준시간(분)', '비가동(분)']
              },
              {
                header: '생산성',
                name: 'mergeColumn3',
                childNames: ['설비가동율(%)', '성능가동율(%)', '양품가동율(%)', '설비종합효율(%)']
              }
            ]
          }
        },
        columns: [
          { name: '제조오더번호', width: 100 },
          { name: '지시일자', width: 100 },
          { name: '실적번호', width: 100 },
          { name: '공정#', width: 100 },
          { name: '라우팅명', width: 100 },
          { name: '공정', width: 100 },
          { name: '설비명', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '라인코드', width: 100 },
          { name: '라인', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '오더상태', width: 100 },
          { name: '시작시간', width: 100 },
          { name: '종료시간', width: 100 },
          { name: 'C/T(초)', width: 100 },
          { name: '지시수량', width: 100 },
          { name: '생산수량', width: 100 },
          { name: '양품수량', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '불량률(%)', width: 100 },
          { name: '생산률(%)', width: 100 },
          { name: '부하시간(분)', width: 100 },
          { name: '표준시간(분)', width: 100 },
          { name: '비가동(분)', width: 100 },
          { name: '설비가동율(%)', width: 100 },
          { name: '성능가동율(%)', width: 100 },
          { name: '양품가동율(%)', width: 100 },
          { name: '설비종합효율(%)', width: 100 }
        ]
      }
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
