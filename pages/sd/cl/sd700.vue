<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd701 ref="sd701Pop" />
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
      <SJSearchField label="클레임일자">
        <SJDatePicker
          id="sentStartDtm"
          v-model="search.sentStartDtm"
          :name="$t('page.system.00083')"
          show-current="true"
          disabled-validation
        />
        <div>~</div>
        <SJDatePicker
          id="sentStartDtm"
          v-model="search.sentStartDtm"
          :name="$t('page.system.00083')"
          show-current="true"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField label="클레임종료여부">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="수주번호">
        <SJSelect id="searchCoType" name="searchCoType" :options="common.USE_YN" />
      </SJSearchField>
      <SJSearchField label="FCST번호">
        <SJSelect id="searchCoType" name="searchCoType" :options="common.USE_YN" />
      </SJSearchField>
      <SJSearchField label="고객PO">
        <SJSelect id="searchCoType" name="searchCoType" :options="common.USE_YN" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록">
        <button class="btn-white-bg" @click="sd701Pop">
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
          { name: '클레임코드' },
          { name: '클레임일자' },
          { name: '진행상태' },
          { name: '접수담당자' },
          { name: '거래처명' },
          { name: '품목유형' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: 'REV' },
          { name: '규격' },
          { name: 'CE!여부' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '고객PO번호' },
          { name: '수량' },
          { name: '클레임내용' },
          { name: '조치일자' },
          { name: '완료예정일' },
          { name: '완료일' },
          { name: '변환예정일' },
          { name: '조치담당자' },
          { name: '작성자' },
          { name: '작성일시' },
          { name: '수정자' },
          { name: '수정일시' }
        ]
      }
    }
  },
  methods: {
    async sd701Pop () {
      // 클레임 등록 팝업
      const result = await this.$refs.sd701Pop.open()
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
