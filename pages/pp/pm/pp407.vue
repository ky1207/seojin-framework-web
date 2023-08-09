<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
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
      <SJSearchField label="제조오더번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="제조오더목록" />
    </template>
    <template #left>
      <SJGrid ref="large" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="생산투입자재목록" />
    </template>
    <template #right>
      <SJForm ref="form">
        <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" />
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      common: {},
      search: {},
      inputData: {
        coCode: '',
        coType: '',
        coForm: ''
      },
      grid: {
        data: {},
        columns: [
          { name: '제조오더번호', width: 100 },
          { name: '수주번호', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: '지시', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '제조오더번호', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '현재창고', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '출고창고', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '이동수량', width: 100 }
        ]
      }
    }
  },

  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '자재입고',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          await fnc.$notify.info('자재입고')
        }
      }
    }
  }
}
</script>
