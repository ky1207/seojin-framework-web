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
      <SJSearchField label="기준일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="창고">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="재고여부">
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
      <SJSearchField label="품목유형">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="규격">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="자재 재고 목록" />
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
                header: '기준일자 이전',
                name: 'mergeColumn1',
                childNames: ['이전재고']
              },
              {
                header: '기준일자 내',
                name: 'mergeColumn2',
                childNames: ['기초', '입고(+)', '출고(-)']
              }
            ]
          }
        },
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '출고수량', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '창고', width: 100 },
          { name: '이전재고', width: 100 },
          { name: '기초', width: 100 },
          { name: '입고(+)', width: 100 },
          { name: '출고(-)', width: 100 },
          { name: '최종재고', width: 100 },
          { name: '기준단위', width: 100 }
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
