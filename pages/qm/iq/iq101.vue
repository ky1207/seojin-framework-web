<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="md1"
          name="사업장"
          :options="MD_01"
        />
      </SJSearchField>
      <SJSearchField label="검사일">
        <SJPeriodSearch
          id="md2"
          name="검사일"
        />
      </SJSearchField>
      <SJSearchField label="납품일">
        <SJPeriodSearch
          id="md3"
          name="납품일"
        />
      </SJSearchField>
      <SJSearchField label="납품번호">
        <SJInput id="md4" name="납품번호" />
      </SJSearchField>
      <SJSearchField label="품목">
        TODO:SELECTINPUT
      </SJSearchField>
      <SJSearchField label="진행상태">
        <SJSelect
          id="md5"
          name="진행상태"
          :options="MD_02"
        />
      </SJSearchField>
      <SJSearchField label="검사결과">
        <SJSelect
          id="md6"
          name="검사결과"
          :options="MD_03"
        />
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="md7" name="LOT" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="입고검사">
        <button class="btn-white-bg">
          바코드출력
        </button>
      </SJTitle>
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
          { name: '납품일자', width: 80 },
          { name: '검사일자', width: 80 },
          { name: '품목코드' },
          { name: '품목명' },
          { name: '거래처' },
          { name: 'REV', width: 80 },
          { name: '규격' },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: '검사방법', width: 80 },
          { name: 'LOT' },
          { name: '검사수량' },
          { name: '구매단위' },
          { name: '검사결과' },
          { name: '품목유형' },
          { name: '합격' }
        ],
        options: {
          bodyHeight: 250
        }
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '검사그룹코드', width: 100 },
          { name: '검사항목명', width: 200 },
          { name: '관리SPEC', width: 100 },
          { name: '검사단위', width: 100 },
          { name: '결과', width: 100 },
          { name: '검사상태', width: 100 },
          { name: '비고', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '불량코드', width: 100 },
          { name: '불량명', width: 120 },
          { name: '수량', width: 120 },
          { name: 'LOT', width: 200 },
          { name: '비고', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '검사내역' },
        { id: 2, title: '불량내역' }
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
        }
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
          text: '마감',
          value: '마감'
        },
        {
          text: '미결',
          value: '미결'
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
          text: '미검사',
          value: '미검사'
        },
        {
          text: '합격',
          value: '합격'
        },
        {
          text: '부분합격',
          value: '부분합격'
        },
        {
          text: '불합격',
          value: '불합격'
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
