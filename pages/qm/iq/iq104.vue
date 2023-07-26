<template>
  <SJSearchOneLayout>
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
      <SJSearchField label="부적합등록일자">
        <SJPeriodSearch
          id="md2"
          name="부적합등록일자"
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="md3"
          name="품목유형"
          :options="MD_02"
        />
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="md4" v-model="search.md4" name="LOT" />
      </sjsearchfield>
    </template>
    <template #body>
      <SJTitle title="부적합 처리 목록" />
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
  </SJSearchOneLayout>
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
          { name: '품목코드' },
          { name: '품목명' },
          { name: '거래처' },
          { name: 'LOT' },
          { name: '검사일자' },
          { name: '등록일자' },
          { name: 'CNE No' },
          { name: '발생처' },
          { name: '5M1E' },
          { name: '검사구분' },
          { name: '장비명' },
          { name: '공급사명' },
          { name: '공급사코드' },
          { name: '부적합현상' },
          { name: '귀책처' },
          { name: '부적합유형' },
          { name: '담당자' },
          { name: 'NCR발행여부' },
          { name: 'NCR발생일' },
          { name: 'REV' },
          { name: 'CE!여부' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '기준단위' },
          { name: '품목유형' },
          { name: '규격' },
          { name: '수정일' },
          { name: '수정자' }
        ]
      }
    }
  },
  created () {
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        async f1Click () {
          await fnc.$notify.info('입고검사')
        },
        f1Label: '입고검사'
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
          text: '제품',
          value: '제품'
        },
        {
          text: '반제품',
          value: '반제품'
        },
        {
          text: '원재료',
          value: '원재료'
        },
        {
          text: '저장품',
          value: '저장품'
        },
        {
          text: '...',
          value: '...'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
