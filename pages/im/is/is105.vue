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
      <SJSearchField label="입출고일">
        <SJDatePicker
          id="search2"
          name="입출고일"
        />
        <div>~</div>
        <SJDatePicker
          id="search2"
          name="입출고일"
        />
      </SJSearchField>
      <SJSearchField label="수불유형">
        SelectSelect
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="search3"
          disabled-first-message
          name="품목유형"
          :options="[{text: '전체',value: ''},{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}
                     ,{text: '저장품',value: '저장품'},{text: '...',value: '...'}
          ]"
        />
      </SJSearchField>
      <SJSearchField label="품목">
        SelectSelect
      </SJSearchField>
      <SJSearchField label="창고">
        <SJSelect
          id="search4"
          disabled-first-message
          name="창고"
          :options="[{text: '전체',value: ''},{text: 'A창고',value: 'A창고'}]"
        />
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="search5" v-model="search.md1" name="LOT" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="수불원장" />
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
          { name: '입출고일', width: 80 },
          { name: '#', width: 50 },
          { name: '수불구분', width: 80 },
          { name: '수불유형', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 80 },
          { name: '규격', width: 80 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: 'LOT', width: 100 },
          { name: '양품여부', width: 50 },
          { name: '재작업', width: 50 },
          { name: '창고', width: 80 },
          { name: '위치코드', width: 80 },
          { name: '기준단위', width: 80 },
          { name: '수량', width: 100 },
          { name: '제조오더번호', width: 80 },
          { name: '실적번호', width: 80 },
          { name: 'P/O번호', width: 80 },
          { name: '수주번호', width: 80 },
          { name: '수정일', width: 100 },
          { name: '수정자', width: 80 }
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
