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
      <SJSearchField label="등록일">
        <SJPeriodSearch
          id="md2"
          name="등록일"
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="md3"
          name="품목유형"
          :options="MD_02"
        />
      </sjsearchfield>
      <SJSearchField label="품목분류">
        TODO:SELECTSELECT
      </sjsearchfield>
      <SJSearchField label="품목">
        TODO:SELECTINPUT
      </sjsearchfield>
    </template>
    <template #body>
      <SJTitle title="목록" />
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
          { name: '품목유형' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: 'REV', width: 80 },
          { name: '규격' },
          { name: 'CE!여부' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '품목대분류' },
          { name: '품목소분류' },
          { name: '기준단위', width: 80 },
          { name: '검사방법' },
          { name: '수입검사' },
          { name: '출하검사' }
        ]
      }
    }
  },
  created () {
    this.selectinput = this.getSelectinput()
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
        async saveClick () {
          await fnc.$notify.success('저장')
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
    },
    getSelectinput () {
      return [
        {
          text: '전체',
          value: '전체'
        },
        {
          text: 'LAM',
          value: 'LAM'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
