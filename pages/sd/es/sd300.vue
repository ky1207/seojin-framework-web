<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd301 ref="sd301Pop" />
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
      <SJSearchField label="견적일">
        <SJDatePicker
          id="sentStartDtm"
          v-model="search.sentStartDtm"
          :name="$t('page.system.00083')"
          show-current="true"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField label="견적번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="진행상태">
        <SJSelect id="searchCoType" name="searchCoType" :options="common.USE_YN" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록">
        <button class="btn-white-bg" @click="sd301Pop">
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
          { name: '회사' },
          { name: '담당자' },
          { name: '견적번호' },
          { name: '견적일' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: '견적수량' },
          { name: '유효일자' },
          { name: '결제조건' },
          { name: '거래처코드' },
          { name: '거래처명' },
          { name: '내/외자구분' },
          { name: '부가세적용' },
          { name: '통화' },
          { name: '재료비' },
          { name: '인건비' },
          { name: '견적가' },
          { name: '작성자' },
          { name: '작성일시' },
          { name: '수정자' },
          { name: '수정일시' }
        ]
      }
    }
  },
  methods: {
    async sd301Pop () {
      // this.$notify.info('품목별/거래처별 조회 팝업 호출')
      const result = await this.$refs.sd301Pop.open()
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
