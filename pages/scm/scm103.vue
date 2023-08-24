<template>
  <SJSearchTBLayout>
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
      <SJSearchField label="P/O일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="P/O번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="잔량여부">
        <SJSelect
          id="search2"
          name="확정여부"
          :options="[{text: '전체',value: '전체'},{text: '없음',value: '없음'},{text: '있음',value: '있음'}]"
        />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="수주" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="납품 상세" />
    </template>
    <template #bottom>
      <SJGrid ref="grid2" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
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
        columns: [
          { name: 'P/O번호', width: 100 },
          { name: 'P/O일자', width: 100 },
          { name: 'P/O#', width: 100 },
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
          { name: '납기요청일', width: 100 },
          { name: '요청수량', width: 100 },
          { name: '단가', width: 100 },
          { name: '공급가', width: 100 },
          { name: '납품수량', width: 100 },
          { name: '납품잔량', width: 100 },
          { name: '비고', width: 100 }
        ],
        options: {
          summary: {
            columnContent: {
              요청수량: {
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
              납품수량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              납품잔량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              }
            }
          }
        }
      },
      grid2: {
        data: {},
        columns: [
          { name: '납품#', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '납품수량', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '납품상태', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '비고', width: 100 }
        ],
        options: {
          summary: {
            columnContent: {
              납품수량: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
              입고수량: {
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
        f1Label: '납품등록(A1)',
        f2Label: '일괄등록(A2)',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        f1Click: async () => {
          await fnc.$notify.info('납품등록(A1)')
        },
        f2Click: async () => {
          await fnc.$notify.info('일괄등록(A2)')
        }
      }
    }
  }
}
</script>
