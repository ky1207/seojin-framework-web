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
      <SJSearchField label="계획기간">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="규격">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="FCID">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="MPS생성그룹" />
    </template>
    <template #left>
      <SJGrid ref="large" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="생산계획" />
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
          { name: 'MPS그룹', width: 100 },
          { name: '생성일', width: 100 },
          { name: '확정기간(MPS)', width: 100 },
          { name: '예시기간(MRP)', width: 100 },
          { name: '계획(건)', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '작업지시생성및확정', width: 100 },
          { name: '구매발주확정', width: 100 },
          { name: 'FCID', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '제조L/T', width: 100 },
          { name: '계획일자', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '취소일자', width: 100 },
          { name: '계획수량', width: 100 },
          { name: '총소요량', width: 100 },
          { name: '가용재고', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: '작성일시', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      }
    }
  },

  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '계획취소',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        // 계획취소
        f1Click: async () => {
          await fnc.$notify.info('계획취소')
        }
      }
    }
  }
}
</script>
