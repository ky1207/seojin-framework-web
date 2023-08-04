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
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="제조BOM" />
    </template>
    <template #left>
      <SJGrid ref="large" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle />
    <template #right>
      <SJForm ref="form">
        <SJTitle title="하위BOM" />
        <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
        <SJTitle title="변경점정보" />
        <SJGrid ref="grid" v-model="grid3.data" :columns="grid3.columns" />
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
          { name: '레벨', width: 100 },
          { name: 'PATH', width: 200 },
          { name: '품목명', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          bodyHeight: 250
        },
        columns: [
          { name: '우선순위', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '변경품목코드', width: 100 },
          { name: '변경품목명', width: 100 },
          { name: '변경거래처명', width: 100 },
          { name: '소요량', width: 100 },
          { name: '변경소요량', width: 100 },
          { name: '적용일자', width: 100 },
          { name: '규격', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '비고', width: 200 }
        ]
      },
      grid3: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '변경품목코드', width: 100 },
          { name: '변경품목명', width: 100 },
          { name: '변경거래처명', width: 100 },
          { name: '변경소요량', width: 100 },
          { name: '적용일자', width: 100 },
          { name: '비고', width: 200 }
        ]
      }
    }
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
    }
  }
}
</script>
