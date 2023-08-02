<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <QmOq100 ref="oqModal" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="md1"
          name="사업장"
          :options="MD_01"
        />
      </SJSearchField>
      <SJSearchField label="요청일">
        <SJPeriodSearch
          id="md2"
          name="요청일"
        />
      </SJSearchField>
      <SJSearchField label="검사번호">
        <SJInput id="md3" v-model="search.md3" name="검사번호" />
      </SJSearchField>
      <SJSearchField label="LOT번호">
        <SJInput id="md4" v-model="search.md4" name="LOT번호" />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJSelect
          id="md5"
          name="품목분류"
          :options="MD_02"
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </sjsearchfield>
      <SJSearchField label="FCID">
        <SJInput id="md6" v-model="search.md6" name="FCID" />
      </SJSearchField>
    </template>
    <template #body>
      <SJTitle title="출하검사" />
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
          { name: '검사일자', width: 80 },
          { name: '검사번호', width: 100 },
          { name: '검사#', width: 150 },
          { name: '품목유형', width: 80 },
          { name: 'FCID', width: 150 },
          { name: '검사결과', width: 80 },
          { name: 'Fab', width: 100 },
          { name: '고객PO번호', width: 80 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 80 },
          { name: '규격', width: 100 },
          { name: '기준단위', width: 80 },
          { name: '검사방법', width: 80 },
          { name: 'LOT', width: 80 },
          { name: '요청수량', width: 80 },
          { name: '합격', width: 80 },
          { name: '불량', width: 80 },
          { name: '내용', width: 100 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: 'Z-TAG Serial', width: 80 }
        ],
        options: {
          summary: {
            columnContent: {
              내용: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              'CE!여부': {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              크리티컬여부: {
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
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          const result = await this.$refs.oqModal.open()
          if (result) {
            console.log(result)
          }
        },
        f1Label: '출하검사'
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
