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
      <SJSearchField label="납품일">
        <SJPeriodSearch
          id="md2"
          name="납품일"
        />
      </SJSearchField>
      <SJSearchField label="납품번호">
        <SJInput id="md3" v-model="search.md3" name="납품번호" />
      </sjsearchfield>
      <SJSearchField label="LOT번호">
        <SJInput id="md4" v-model="search.md4" name="LOT번호" />
      </sjsearchfield>
      <SJSearchField label="품목">
        TODO:SELECTSELECT
      </sjsearchfield>
      <SJSearchField label="검사잔량">
        TODO:radio
      </sjsearchfield>
    </template>
    <template #body>
      <SJTitle title="입고검사" />
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
          { name: '납품일자', width: 80 },
          { name: '검사일자', width: 80 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 150 },
          { name: '거래처', width: 100 },
          { name: 'REV', width: 80 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: '검사방법', width: 80 },
          { name: 'LOT', width: 100 },
          { name: '입고수량', width: 80 },
          { name: '검사수량', width: 80 },
          { name: '입고잔량', width: 80 },
          { name: '구매단위', width: 80 },
          { name: '검사결과', width: 80 },
          { name: '품목유형', width: 80 },
          { name: '합격', width: 80 },
          { name: '불량', width: 80 },
          { name: '납품요청일', width: 80 },
          { name: '납품창고', width: 100 },
          { name: '검사번호', width: 80 },
          { name: '검사#', width: 80 }
        ],
        options: {
          summary: {
            columnContent: {
              입고수량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              검사수량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              입고잔량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              합격: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              불량: {
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
    }
  }
}
</script>

<style scoped>

</style>
