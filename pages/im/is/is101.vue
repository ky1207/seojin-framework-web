<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="search1"
          disabled-first-message
          name="사업장"
          :options="[{text: 'A사업부',value: ''},{text: 'B사업부',value: 'B사업부'}]"
        />
      </SJSearchField>
      <SJSearchField label="창고">
        <SJSelect
          id="search2"
          disabled-first-message
          name="창고"
          :options="[{text: '전체',value: ''},{text: '반도체 원자재(화성)',value: '반도체 원자재(화성)'},{text: '반도체 재공(화성)',value: '반도체 재공(화성)'},{text: '반도체 완제품(화성)',value: '반도체 완제품(화성)'},{text: '반도체 원자재불량(화성)',value: '반도체 원자재불량(화성)'},{text: '...',value: '...'}]"
        />
      </SJSearchField>
      <SJSearchField label="양품여부">
        <SJSelect
          id="search3"
          disabled-first-message
          name="양품여부"
          :options="[{text: 'ALL',value: ''},{text: '양품',value: '양품'},{text: '불량',value: '불량'}]"
        />
      </SJSearchField>
      <SJSearchField label="무재고">
        <SJSelect
          id="search4"
          disabled-first-message
          name="무재고"
          :options="[{text: '제외',value: ''},{text: '포함',value: '포함'}]"
        />
      </SJSearchField>
      <SJSearchField label="정렬">
        <SJSelect
          id="search5"
          disabled-first-message
          name="정렬"
          :options="[{text: '품목생성일자',value: ''},{text: '재고많은순',value: '재고많은순'},{text: '재고적은순',value: '재고적은순'}]"
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="search6"
          disabled-first-message
          name="품목유형"
          :options="[{text: '전체',value: ''},{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}
                     ,{text: '저장품',value: '저장품'},{text: '...',value: '...'}]"
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="목록" />
    </template>
    <template #left>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>
    <template #rightTitle>
      <SJTitle title="목록" />
    </template>
    <template #right>
      <SJTab :list="tabList">
        <template #tab-1>
          <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
        </template>
        <template #tab-2>
          <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
        </template>
      </SJtab>
    </template>
  </SJSearchLRLayout>
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
          { name: '크리티컬등급', width: 120 },
          { name: '이월', width: 100 },
          { name: '기초', width: 100 },
          { name: '입고(+)', width: 100 },
          { name: '출고(-)', width: 100 },
          { name: '현재고', width: 100 },
          { name: '기준단위', width: 100 }
        ],
        options: {

        }
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: 'LOT', width: 100 },
          { name: '창고', width: 100 },
          { name: '위치코드', width: 80 },
          { name: '현재고', width: 80 },
          { name: '양품여부', width: 100 },
          { name: '검사여부', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: 'LOT', width: 150 },
          { name: '수불유형', width: 100 },
          { name: '입출고일', width: 100 },
          { name: '#', width: 80 },
          { name: '수량', width: 100 },
          { name: '창고', width: 150 },
          { name: '수정일', width: 150 },
          { name: '수정자', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: 'LOT별' },
        { id: 2, title: '이력' }
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

<style scoped>

</style>
