<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <QmMd100 ref="md1Modal" />
      <QmMd101 ref="md2Modal" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="md1"
          name="사업장"
          :options="MD_01"
        />
      </SJSearchField>
      <SJSearchField label="검사유형">
        <SJSelect
          id="md2"
          name="검사유형"
          :options="MD_02"
        />
      </SJSearchField>
      <SJSearchField label="그룹코드">
        <SJInput id="search1" name="그룹코드" />
      </SJSearchField>
      <SJSearchField label="그룹명">
        <SJInput id="search2" name="그룹명" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect
          id="md3"
          name="사용여부"
          :options="MD_03"
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="품질검사등록" />
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
          { name: '검사그룹코드', width: 100 },
          { name: '검사그룹명', width: 150 },
          { name: '검사유형', width: 150 },
          { name: '점검항목', width: 150 },
          { name: '불량항목', width: 150 },
          { name: '점검품목', width: 150 },
          { name: '비고', width: 200 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '불량코드', width: 100 },
          { name: '불량명', width: 120 },
          { name: '비고', width: 200 },
          { name: '사용여부', width: 100 }
        ]
      },
      grid_tab3: {
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
          { name: '기준단위', width: 100 },
          { name: '사용여부', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '검사항목' },
        { id: 2, title: '검사불량항목' },
        { id: 3, title: '검사품목' }
      ]
    }
  },
  created () {
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.md1Modal.open()
          if (result) {
            console.log(result)
          }
        },
        async f2Click () {
          await fnc.$notify.success('수정')
        },
        f3Click: async () => {
          const result = await this.$refs.md2Modal.open()
          if (result) {
            console.log(result)
          }
        },
        f1Label: '신규',
        f2Label: '수정',
        f3Label: '일괄등록'
      }
    },
    getMD01 () {
      return [{
        text: 'A사업부',
        value: 'A사업부'
      }, {
        text: 'B사업부',
        value: 'B사업부'
      }
      ]
    },
    getMD02 () {
      return [
        {
          text: '전체',
          value: '전체'
        },
        {
          text: '수입검사',
          value: '수입검사'
        },
        {
          text: '출하검사',
          value: '출하검사'
        },
        {
          text: '공정검사',
          value: '공정검사'
        }
      ]
    },
    getMD03 () {
      return [
        {
          text: '전체',
          value: '전체'
        },
        {
          text: '사용',
          value: '사용'
        },
        {
          text: '미사용',
          value: '미사용'
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
