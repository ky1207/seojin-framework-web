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
      <SJSearchField label="창고">
        <SJSelect
          id="md2"
          name="창고"
          :options="MD_02"
        />
      </SJSearchField>
      <SJSearchField label="검사상태">
        <SJSelect
          id="md3"
          name="검사상태"
          :options="MD_03"
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="md4"
          name="품목유형"
          :options="MD_04"
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </sjsearchfield>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </sjsearchfield>
    </template>
    <template #body>
      <SJTitle title="제품재고" />
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
        :options="grid.options"
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
          { name: '품목유형', width: 80 },
          { name: '품목코드' },
          { name: '품목명' },
          { name: 'REV', width: 80 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 80 },
          { name: '양품여부', width: 80 },
          { name: 'LOT', width: 100 },
          { name: '창고', width: 100 },
          { name: '현재고', width: 80 },
          { name: '검사일자', width: 80 },
          { name: '검사#', width: 80 },
          { name: '검사번호', width: 100 },
          { name: '검사결과', width: 80 }
        ],
        options: {
          summary: {
            columnContent: {
              현재고: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              }
            }
          }
        }
      }
    }
  },
  created () {
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
    this.MD_04 = this.getMD04()
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
          text: '반도체 원자재(화성)',
          value: '반도체 원자재(화성)'
        },
        {
          text: '반도체 재공(화성)',
          value: '반도체 재공(화성)'
        },
        {
          text: '반도체 완제품(화성)',
          value: '반도체 완제품(화성)'
        },
        {
          text: '반도체 원자재불량(화성)',
          value: '반도체 원자재불량(화성)'
        },
        {
          text: '반도체 반품(화성)',
          value: '반도체 반품(화성)'
        },
        {
          text: '...',
          value: '...'
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
    },
    getMD04 () {
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
