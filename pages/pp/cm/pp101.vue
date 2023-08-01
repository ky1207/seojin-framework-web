<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp100 ref="pp100Pop" />
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
      <SJSearchField label="워크센터구분">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '자체',value: '자체'},{text: '외주',value: '외주'}]"
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="워크센터코드">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="워크센터명">
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
      <SJTitle title="워크센터 목록" />
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
          { name: '워크센터코드', width: 100 },
          { name: '워크센터명', width: 150 },
          { name: '워크센터구분', width: 150 },
          { name: '외주거래처', width: 150 },
          { name: '자체출고', width: 150 },
          { name: '현장창고', width: 150 },
          { name: '생산입고', width: 200 },
          { name: '생산불량', width: 100 },
          { name: '가용설비(수)', width: 100 },
          { name: '가용인원(수)', width: 100 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '라인코드', width: 100 },
          { name: '라인', width: 120 },
          { name: '일작업시간', width: 200 },
          { name: '최소인원(수)', width: 100 },
          { name: '최대인원(수)', width: 100 },
          { name: 'CAPA선정구분', width: 100 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '설비코드', width: 100 },
          { name: '설비명', width: 120 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab3: {
        data: {},
        columns: [
          { name: '작업자ID', width: 100 },
          { name: '작업자명', width: 120 },
          { name: '사용여부', width: 200 }
        ]
      },
      tabList: [
        { id: 1, title: '워크센터별라인' },
        { id: 2, title: '워크센터별설비' },
        { id: 3, title: '워크센터별작업자' }
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
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.pp100Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f2Click: async () => {
          const result = await this.$refs.pp100Pop.open()
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
