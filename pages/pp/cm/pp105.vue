<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp101 ref="pp101Pop" />
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
          { name: '공정코드', width: 100 },
          { name: '공정명', width: 150 },
          { name: '공정분류', width: 150 },
          { name: '검사여부', width: 150 },
          { name: '비가동(수)', width: 150 },
          { name: '불량(수)', width: 150 },
          { name: '비고', width: 200 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '비가동코드', width: 100 },
          { name: '비가동명', width: 120 },
          { name: '비고', width: 300 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '불량코드', width: 100 },
          { name: '불량명', width: 120 },
          { name: '비고', width: 300 },
          { name: '사용여부', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '공정별비가동' },
        { id: 2, title: '공정별불량유형' }
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
        f3Label: '공정복사',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.pp101Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f2Click: async () => {
          const result = await this.$refs.pp101Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f3Click: async () => {
          const result = await this.$refs.pp101Pop.open()
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
