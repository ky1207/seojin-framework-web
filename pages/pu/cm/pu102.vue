<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd201 ref="sd201Pop" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="발주형태유형">
        <SJSelect id="searchCoType" name="searchCoType" :options="common.USE_YN" />
      </SJSearchField>
      <SJSearchField label="발주형태코드">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="발주형태명">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect id="searchCoType" name="searchCoType" :options="common.USE_YN" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="발주형태">
        <button class="btn-white-bg" @click="appendRow">
          추가
        </button>
        <button class="btn-white-bg" @click="rowDel">
          삭제
        </button>
      </SJTitle>
    </template>
    <template #body>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>
  </SJSearchOneLayout>
</template>

<script>
// 메뉴 화면
// 기능권한버튼을 사용하는 경우
import { MENU, ACTION } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: {},
      search: {},
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '발주형태코드' },
          { name: '발주형태명' },
          { name: '멀티컴퍼니거래여부' },
          { name: 'STO여부' },
          { name: '수입여부' },
          { name: '선적여부' },
          { name: '통관여부' },
          { name: '입고여부' },
          { name: '매입여부' },
          { name: '반품여부' },
          { name: '외주가공여부' },
          { name: '입출고형태' },
          { name: '사급형태' },
          { name: '매입형태' },
          { name: '사용여부' }
        ]
      }
    }
  },
  methods: {
    appendRow () {
      // row 추가
      this.$refs.grid.invoke('appendRow')
    },
    async rowDel () {
      // row 삭제
      await this.$notify.info('row 삭제')
    },
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
