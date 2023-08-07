<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp111 ref="pp111Pop" />
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
      <SJSearchField label="납품예정일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="MPS상태">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '요청',value: '요청'},{text: '완료',value: '완료'},{text: '취소',value: '취소'},{text: '변경',value: '변경'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="수주번호">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="FCID">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="규격">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="MPS실행번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록" />
    </template>
    <template #body>
      <SJTab :list="tabList">
        <template #tab-1>
          <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
        </template>
        <template #tab-2>
          <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
        </template>
      </SJtab>
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
      inputData: {},
      grid_tab1: {
        data: {},
        columns: [
          { name: '수주번호', width: 100 },
          { name: 'MPS실행번호', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: 'MPS상태', width: 100 },
          { name: 'MRP상태', width: 100 },
          { name: '품목유형', width: 100 },
          { name: 'FCID', width: 100 },
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
          { name: '작성일시', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '품목코드', width: 100 },
          { name: '1주차', width: 200 },
          { name: '2주차', width: 100 },
          { name: '3주차', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '계획기준' },
        { id: 2, title: '주차별계획' }
      ]
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: 'MPS생성',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        // MPS생성
        f1Click: async () => {
          const result = await this.$refs.pp111Pop.open()
          if (result) {
            console.log(result)
          }
        }
      }
    }
  }
}
</script>
