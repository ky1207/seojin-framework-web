<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd601 ref="sd601Pop" />
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
      <SJSearchField label="매출일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="통화">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="매출번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="고객PO">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록">
        <button class="btn-white-bg" @click="sd601Pop">
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
          { name: '마감일자' },
          { name: '매출(마감)번호' },
          { name: '거래처' },
          { name: '내외자' },
          { name: '통화' },
          { name: '부가세여부' },
          { name: '품목유형' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: 'REV' },
          { name: '규격' },
          { name: 'CE!여부' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '매출수량' },
          { name: '단가' },
          { name: '공급가' },
          { name: '부가세' },
          { name: '합계' },
          { name: '고객PO번호' },
          { name: '비고' },
          { name: '등록자' },
          { name: '등록일시' },
          { name: '수정자' },
          { name: '수정일시' }
        ]
      }
    }
  },
  methods: {
    async sd601Pop () {
      // this.$notify.info('품목별/거래처별 조회 팝업 호출')
      const result = await this.$refs.sd601Pop.open()
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
