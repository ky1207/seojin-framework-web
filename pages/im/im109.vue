<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="search1"
          disabled-first-message
          name="search1"
          :options="[{text: 'A사업부',value: 'A사업부'},{text: 'B사업부',value: 'B사업부'}]"
        />
      </SJSearchField>
      <SJSearchField label="기준일자">
        <SJPeriodSearch id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="창고">
        <SJSelect
          id="search3"
          disabled-first-message
          name="search3"
          :options="[{text: '전체',value: '전체'},{text: 'A창고',value: 'A창고'}]"
        />
      </SJSearchField>
      <SJSearchField label="무재고">
        <SJSelect
          id="search4"
          disabled-first-message
          name="search4"
          :options="[{text: '제외',value: '제외'},{text: '포함',value: '포함'}]"
        />
      </SJSearchField>
      <SJSearchField label="정렬">
        <SJSelect
          id="search5"
          disabled-first-message
          name="search5"
          :options="[{text: '품목생성일자 ▲',value: '1'},{text: '품목생성일자 ▼',value: '2'},{text: '재고많은순',value: '3'},{text: '재고적은순',value: '4'}]"
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="search6"
          disabled-first-message
          name="search6"
          :options="[{text: '전체',value: ''},{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}
                     ,{text: '저장품',value: '저장품'},{text: '...',value: '...'}
          ]"
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        SelectSelect
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="search8" name="search8" />
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
import { ACTION, MENU } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      grid: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '창고', width: 150 },
          { name: 'LOT', width: 100 },
          { name: '이전재고', width: 100 },
          { name: '기초', width: 100 },
          { name: '입고(+)', width: 100 },
          { name: '출고(-)', width: 100 },
          { name: '최종재고', width: 150 },
          { name: '실사수량', width: 150 },
          { name: '실사조정수량', width: 150 },
          { name: '기준단위', width: 150 }
        ],
        options: {
          header: {
            complexColumns: [
              {
                header: '기준일자이전',
                name: 'mergeColumn1',
                childNames: ['이전재고']
              },
              {
                header: '기준일자 내',
                name: 'mergeColumn2',
                childNames: ['기초', '입고(+)', '출고(-)']
              },
              {
                header: '실사조정',
                name: 'mergeColumn3',
                childNames: ['실사수량', '실사조정수량']
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        async saveClick () {
          await fnc.$notify.info('저장')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
