<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
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
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="미마감 수주 목록" />
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
          { name: '수주일자' },
          { name: '수주번호' },
          { name: '진행상태' },
          { name: '거래처' },
          { name: '사용자명' },
          { name: '품목유형' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: 'REV' },
          { name: '규격' },
          { name: 'CE!여부' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '기준단위' },
          { name: '납품요청일' },
          { name: '수주수량' },
          { name: '출하요청' },
          { name: '출하수량' },
          { name: '매출마감' },
          { name: '수주잔량' },
          { name: '고객번호' },
          { name: '등록자' },
          { name: '등록일시' },
          { name: '수정자' },
          { name: '수정일시' }
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
        }
      }
    }
  }
}
</script>
