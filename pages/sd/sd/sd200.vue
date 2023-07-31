<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd201 ref="sd201Pop" />
    </template>
    <template #default>
      <SJSearchField label="영업성명">
        <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="상태">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '등록',value: '등록'},{text: '검토중',value: '검토중'},{text: '제안중',value: '제안중'},{text: '영업종료',value: '영업종료'}]" />
      </SJSearchField>
      <SJSearchField label="결과">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '유찰',value: '유찰'},{text: '낙찰',value: '낙찰'}]" />
      </SJSearchField>
      <SJSearchField label="사업명">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="작성일">
        <SJPeriodSearch id="md1" name="md1" />
      </SJSearchField>
      <SJSearchField label="공고일">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="마감일">
        <SJPeriodSearch id="md3" name="md3" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록">
        <button class="btn-white-bg" @click="sd201Pop">
          신규
        </button>
      </SJTitle>
    </template>
    <template #body>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
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
          { name: '상태' },
          { name: '관리년월' },
          { name: '결과' },
          { name: '공고일' },
          { name: '마감일시' },
          { name: '사업명' },
          { name: '고객사' },
          { name: '영업성명' },
          { name: '직급' },
          { name: '등록자' },
          { name: '등록일시' },
          { name: '수정자' },
          { name: '수정일시' }
        ]
      }
    }
  },
  methods: {
    async sd201Pop () {
      // this.$notify.info('품목별/거래처별 조회 팝업 호출')
      const result = await this.$refs.sd201Pop.open()
      if (result) {
        console.log('check')
      }
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
