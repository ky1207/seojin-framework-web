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
      <SJSearchField label="품목유형">
        <SJSelect
          id="search5"
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
      <SJSearchField label="LOT">
        <SJInput id="search8" name="LOT" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="LOT 마스터" />
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
          { name: 'LOT일자', width: 100 },
          { name: '수불유형', width: 150 },
          { name: '최상위LOT', width: 200 },
          { name: '상위LOT', width: 200 },
          { name: 'LOT', width: 200 },
          { name: '양품여부', width: 100 },
          { name: '재작업', width: 100 },
          { name: '창고', width: 200 },
          { name: '위치코드', width: 100 },
          { name: '검사여부', width: 100 },
          { name: '재공', width: 100 },
          { name: '공정', width: 150 },
          { name: '기준단위', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '출고수량', width: 100 },
          { name: '현재고', width: 150 },
          { name: '검사일자', width: 100 },
          { name: '검사결과', width: 150 },
          { name: '포장여부', width: 150 },
          { name: '포장LOT', width: 150 }
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
