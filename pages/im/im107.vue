<template>
  <SJSearchTBLayout>
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
      <SJSearchField label="등록일">
        TODO:기간검색
      </SJSearchField>
      <SJSearchField label="실사유형">
        <SJSelect
          id="search3"
          disabled-first-message
          name="search3"
          :options="[{text: '전체',value: '전체'},{text: '실사조정',value: '실사조정'}]"
        />
      </SJSearchField>
      <SJSearchField label="실사번호">
        <SJInput id="search4" name="search4" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="search5" name="search5" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="실사목록" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="실사상세" />
    </template>
    <template #bottom>
      <SJGrid ref="grid_detail" v-model="grid_detail.data" :columns="grid_detail.columns" />
    </template>
  </SJSearchTBLayout>
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
          { name: '실사번호', width: 100 },
          { name: '등록일', width: 150 },
          { name: '창고', width: 200 },
          { name: '사용자명', width: 150 },
          { name: '품목(수)', width: 100 },
          { name: '수정일', width: 150 },
          { name: '수정자', width: 100 }
        ],
        options: {
          bodyHeight: 250
        }
      },
      grid_detail: {
        data: {},
        columns: [
          { name: '종료여부', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '거래처', width: 150 },
          { name: 'LOT', width: 100 },
          { name: '전산재고', width: 100 },
          { name: '실사수량', width: 100 },
          { name: '차이수량', width: 100 },
          { name: '조정수량', width: 100 },
          { name: '비고', width: 300 }
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
