<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp102 ref="pp102Pop" />
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
      <SJSearchField label="공정분류">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: 'BUILD',value: 'BUILD'},{text: 'Packing',value: 'Packing'},{text: 'Test',value: 'Test'},{text: 'Prep',value: 'Prep'}]"
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="공정코드">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="공정명">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]"
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="라우팅 목록" />
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
          { name: '라우팅코드', width: 100 },
          { name: '라우팅명', width: 150 },
          { name: '재작업', width: 150 },
          { name: '공정(수)', width: 150 },
          { name: '품목(수)', width: 150 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '불출일자', width: 100 },
          { name: '공정#', width: 120 },
          { name: '공정코드', width: 100 },
          { name: '공정', width: 300 },
          { name: '후공정#', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '거래처', width: 150 },
          { name: '실적여부', width: 100 },
          { name: '최종여부', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 120 },
          { name: '품목유형', width: 300 },
          { name: '규격', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '사용여부', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '라우팅절차' },
        { id: 2, title: '라우팅품목' }
      ]
    }
  },
  created () {
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '신규',
        f2Label: '수정',
        f3Label: '일괄등록',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.pp102Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f2Click: async () => {
          const result = await this.$refs.pp102Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f3Click: async () => {
          await fnc.$notify.success('일괄등록')
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
