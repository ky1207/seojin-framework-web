<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp110 ref="pp110Pop" />
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
      <SJSearchField label="요청상태">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '요청',value: '요청'},{text: '완료',value: '완료'},{text: '취소',value: '취소'},{text: '변경',value: '변경'}]"
          disabled-validation
          disabled-first-message
        />
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
      <SJTitle title="시뮬레이션" />
    </template>
    <template #left>
      <SJGrid ref="large" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="상세내역" />
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
          { name: '시뮬레이션그룹', width: 100 },
          { name: '생성일', width: 100 },
          { name: '일자기준', width: 100 },
          { name: '생산계획', width: 100 },
          { name: '휴일여부', width: 100 },
          { name: '안전재고', width: 100 },
          { name: '품목LOSS', width: 100 },
          { name: '올림수', width: 100 },
          { name: '최소LOT', width: 100 },
          { name: '최대LOT', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '시뮬레이션그룹', width: 100 },
          { name: '시뮬레이션번호', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'FCID', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '제조L/T', width: 100 },
          { name: '계획일자', width: 100 },
          { name: '계획수량', width: 100 },
          { name: '기준단위', width: 100 }
        ]
      }
    }
  },

  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '시뮬레이션생성',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        // 실행
        f1Click: async () => {
          const result = await this.$refs.pp110Pop.open()
          if (result) {
            console.log(result)
          }
        }
      }
    },
    appendRow () {
      this.$refs.grid.invoke('appendRow')
    }
  }
}
</script>
