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
          name="사업장"
          :options="[{text: 'A사업부',value: ''},{text: 'B사업부',value: 'B사업부'}]"
        />
      </SJSearchField>
      <SJSearchField label="창고">
        <SJSelect
          id="search2"
          disabled-first-message
          name="창고"
          :options="[{text: '전체',value: ''},{text: 'A창고',value: 'A창고'}]"
        />
      </SJSearchField>
      <SJSearchField label="장기일수">
        <SJInput id="search3" v-model="search.md3" name="장기일수" />
      </SJSearchField>
      <SJSearchField label="양품여부">
        <SJSelect
          id="search4"
          disabled-first-message
          name="양품여부"
          :options="[{text: 'ALL',value: ''},{text: '양품',value: '양품'},{text: '불량',value: '불량'}]"
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
                     ,{text: '저장품',value: '저장품'},{text: '...',value: '...'}
          ]"
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="장기 재고 목록" />
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
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 80 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 100 },
          { name: 'LOT일자', width: 100 },
          { name: '수불유형', width: 100 },
          { name: '양품여부', width: 80 },
          { name: 'LOT', width: 100 },
          { name: '창고', width: 100 },
          { name: '위치코드', width: 80 },
          { name: '검사여부', width: 80 },
          { name: '기준단위', width: 80 },
          { name: '입고수량', width: 80 },
          { name: '출고수량', width: 80 },
          { name: '현재고', width: 80 }
        ],
        options: {

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
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
