<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp106 ref="pp106Pop" />
      <Pp107 ref="pp107Pop" />
      <Pp108 ref="pp108Pop" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}]"
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="재작업여부">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: 'Y',value: 'Y'},{text: 'N',value: 'N'}]"
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="공정 목록" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="목록" />
    </template>
    <template #bottom>
      <SJTab :list="tabList">
        <template #tab-1>
          <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
        </template>
        <template #tab-2>
          <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
        </template>
        <template #tab-3>
          <SJGrid ref="grid_tab3" v-model="grid_tab3.data" :columns="grid_tab3.columns" />
        </template>
      </SJtab>
    </template>
  </SJSearchTBLayout>
</template>

<script>
import { ACTION } from '~/mixins'
export default {
  mixins: [ACTION],
  data () {
    return {
      search: {},
      grid: {
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
          { name: '라우팅코드', width: 100 },
          { name: '라우팅명', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목대분류', width: 100 },
          { name: '품목소분류', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '재작업', width: 100 },
          { name: '공정(수)', width: 100 },
          { name: 'BOM(수)', width: 100 },
          { name: '비고', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '불출일자', width: 100 },
          { name: '공정#', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '공정', width: 300 },
          { name: '후공정#', width: 100 },
          { name: 'C/T(분)', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '거래처', width: 100 },
          { name: '실적여부', width: 100 },
          { name: '최종공정', width: 100 },
          { name: '비고', width: 200 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '공정', width: 100 },
          { name: '공정코드', width: 120 },
          { name: '투입공정', width: 300 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: 'LOSS(%)', width: 100 },
          { name: 'LOSS', width: 100 },
          { name: '총소요량', width: 100 },
          { name: '우선순위', width: 100 },
          { name: '비고', width: 200 },
          { name: '등록일시', width: 100 },
          { name: '등록자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '공정절차' },
        { id: 2, title: 'BOM' }
      ]
    }
  },
  created () {
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '등록',
        f2Label: '공정일괄등록',
        f3Label: 'BOM일괄등록',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.pp106Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f2Click: async () => {
          const result = await this.$refs.pp107Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f3Click: async () => {
          const result = await this.$refs.pp108Pop.open()
          if (result) {
            console.log(result)
          }
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
