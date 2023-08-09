<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp117 ref="pp117Pop" />
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
      <SJSearchField label="납품예정일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="수주번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="생산계획번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="MRP실행번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="생산품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="제조오더" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="생산계획목록" />
    </template>
    <template #bottom>
      <SJTab :list="tabList">
        <template #tab-1>
          <SJTitle title="">
            <button class="btn-blue-bg" @click="itemSet">
              품목생성
            </button>
          </SJTitle>
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
          { name: '수주번호', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: '생산품목', width: 100 },
          { name: '생산품목명', width: 100 },
          { name: 'FCID', width: 100 },
          { name: 'MRP실행번호', width: 100 },
          { name: '라우팅코드', width: 100 },
          { name: '라우팅명', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '공정수', width: 100 },
          { name: 'BOM품목수', width: 100 },
          { name: '변경횟수', width: 100 },
          { name: '사용자ID', width: 100 },
          { name: '사용자명', width: 100 },
          { name: '비고', width: 200 },
          { name: '작성일시', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: 'MRP번호', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '품목유형', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '수정수량', width: 100 },
          { name: '수정자재투입잔량', width: 100 },
          { name: '자재투입잔량', width: 100 },
          { name: '변경횟수', width: 100 },
          { name: '사용자ID', width: 100 },
          { name: '사용자명', width: 100 },
          { name: 'MRP상태', width: 100 },
          { name: 'MRP실행번호', width: 100 },
          { name: '요청번호', width: 100 },
          { name: '비고', width: 200 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '변경유형', width: 100 },
          { name: 'MRP번호', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '품목유형', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '변경전자재투입잔량', width: 100 },
          { name: '자재투입잔량', width: 100 },
          { name: '사용자ID', width: 100 },
          { name: '사용자명', width: 100 },
          { name: 'MRP상태', width: 100 },
          { name: 'MRP실행번호', width: 100 },
          { name: '요청번호', width: 100 },
          { name: '비고', width: 200 },
          { name: '작성일시', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '생산예약자재관리' },
        { id: 2, title: '생산예약자재관리이력' }
      ]
    }
  },
  created () {
  },
  methods: {
    async itemSet () {
      const result = await this.$refs.pp117Pop.open()
      if (result) {
        console.log('check')
      }
    },
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
