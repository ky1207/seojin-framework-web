<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pu203 ref="pu203Pop" />
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
      <SJSearchField label="등록일">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="요청번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="요청자">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="구매요청" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
    </template>

    <template #bottomTitle>
      <SJTitle title="구매요청 상세" />
    </template>
    <template #bottom>
      <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" />
    </template>
  </SJSearchTBLayout>
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
          { name: '요청일자', width: 100 },
          { name: '요청번호', width: 100 },
          { name: '요청자', width: 100 },
          { name: '품목(수)', width: 100 },
          { name: '비고', width: 100 },
          { name: '수정일자', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '확정여부', width: 100 },
          { name: '진행상태', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매발주필요일', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '취소일자', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '요청수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '거래처', width: 100 },
          { name: '비고', width: 100 }
        ]
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '신규',
        f2Label: '수정',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        async saveClick () {
          await fnc.$notify.success('저장')
        },
        // 신규
        f1Click: async () => {
          const result = await this.$refs.pu203Pop.open()
          if (result) {
            console.log('check')
          }
        }
      }
    }
  }
}
</script>
