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
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-validation
        />
      </SJSearchField>
      <SJSearchField label="일자구분">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '발주일자',value: '발주일자'},{text: '납기일자',value: '납기일자'}]" />
      </SJSearchField>
      <SJSearchField label="요청일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="발주번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="발주형태">
        <SJSelect
          id="search2"
          name="발주형태"
          :options="[{text: '전체',value: '전체'},{text: '마감',value: '마감'},{text: '미결',value: '미결'}]"
        />
      </SJSearchField>
      <SJSearchField label="합의상태">
        <SJSelect
          id="search2"
          name="합의상태"
          :options="[{text: '전체',value: '전체'},{text: '요청',value: '요청'},{text: '대기',value: '대기'},{text: '수락',value: '수락'},{text: '거절',value: '거절'}]"
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="발주내역" />
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
        columns: [
          { name: '발주번호', width: 100 },
          { name: 'P/O일자', width: 100 },
          { name: '거래처', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '발주수량', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '발주잔량', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '고객계획일자', width: 100 },
          { name: '고객계획수량', width: 100 },
          { name: '고객취소일자', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '변경사유', width: 100 },
          { name: '비고', width: 100 }
        ],
        options: {
          summary: {
            columnContent: {
              발주잔량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              변경일자: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              고객계획일자: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
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
