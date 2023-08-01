<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <SdItem ref="itemPop" />
      <SdHistory ref="historyPop" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="검색년월">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '2023',value: '2023'},{text: '2024',value: '2024'}]" />년
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '1',value: '1'},{text: '2',value: '2'},{text: '3',value: '3'},{text: '4',value: '4'},{text: '5',value: '5'},{text: '6',value: '6'}]" />월
      </SJSearchField>
      <SJSearchField label="일자구분">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '정상근무',value: '정상근무'},{text: '무급휴무',value: '무급휴무'},{text: '무급휴일',value: '무급휴일'},{text: '유급휴일',value: '유급휴일'}]" />
      </SJSearchField>
      <SJSearchField label="휴일구분">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '정기공휴일',value: '정기공휴일'},{text: '임시공휴일',value: '임시공휴일'}]" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록" />
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
          { name: '일자', width: 100 },
          { name: '요일', width: 100 },
          { name: '일자구분', width: 100 },
          { name: '근무시간', width: 100 },
          { name: '근무여부', width: 100 },
          { name: '재고마감', width: 100 },
          { name: '비고', width: 300 }
        ]
      }
    }
  },
  methods: {
    async itemPop () {
      // this.$notify.info('품목별/거래처별 조회 팝업 호출')
      const result = await this.$refs.itemPop.open()
      if (result) {
        console.log('check')
      }
    },
    async historyPop () {
      // 이력팝업
      const result = await this.$refs.historyPop.open()
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
