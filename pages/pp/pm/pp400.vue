<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp113 ref="pp113Pop" />
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
      <SJSearchField label="계획일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="제조오더번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="MPS계획번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="FCID">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="제조오더" />
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
          { name: '제조오더번호', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: '수주번호', width: 100 },
          { name: '품목유형', width: 100 },
          { name: 'FCID', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '라우팅명', width: 100 },
          { name: '착수예정', width: 100 },
          { name: '완료예정', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '지시수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '재작업', width: 100 },
          { name: '확정여부', width: 100 },
          { name: '작성일시', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '우선순위', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '공정', width: 100 },
          { name: 'C/T(분)', width: 100 },
          { name: '소요(분)', width: 100 },
          { name: '지시일자', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '거래처', width: 100 },
          { name: '설비명', width: 100 },
          { name: '자재출고', width: 100 },
          { name: '현장창고', width: 100 },
          { name: '생산입고', width: 100 },
          { name: '생산불량', width: 100 },
          { name: '실적여부', width: 100 },
          { name: '최종여부', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '우선순위', width: 100 },
          { name: '공정코드', width: 100 },
          { name: '투입공정', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: '예약수량', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '기준수량', width: 100 },
          { name: '창고', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '공정' },
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
        f1Label: '신규',
        f2Label: '수정',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.pp113Pop.open()
          if (result) {
            console.log(result)
          }
        },
        f2Click: async () => {
          const result = await this.$refs.pp113Pop.open()
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
