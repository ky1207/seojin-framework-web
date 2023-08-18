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
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="일자구분">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '발주일자',value: '발주일자'},{text: '납기일자',value: '납기일자'}]" />
      </SJSearchField>
      <SJSearchField label="요청일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="발주번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="확정여부">
        <SJSelect
          id="search2"
          disabled-first-message
          name="확정여부"
          :options="[{text: '전체',value: ''},{text: '미확정',value: ''},{text: '확정',value: ''}]"
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="승인요청 내역">
        <button class="btn-white-bg" @click="itemPop">
          확정
        </button>
        <button class="btn-white-bg" @click="historyPop">
          미확정
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
        columns: [
          { name: 'P/O번호', width: 100 },
          { name: 'P/O#', width: 100 },
          { name: '거래처코드', width: 100 },
          { name: '거래처', width: 100 },
          { name: 'P/O일자', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '수량', width: 100 },
          { name: '단가', width: 100 },
          { name: '공급가', width: 100 },
          { name: '부가세', width: 100 },
          { name: '합계', width: 100 },
          { name: '확정여부', width: 100 },
          { name: '납기가능일자', width: 100 }
        ],
        options: {
          summary: {
            columnContent: {
              수량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              단가: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              공급가: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              부가세: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              합계: {
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
