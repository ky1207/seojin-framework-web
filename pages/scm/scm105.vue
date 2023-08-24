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
      <SJSearchField label="납기요청일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="P/O번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="규격">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJForm ref="form">
        <SJTab :list="tabList">
          <template #tab-1>
            <SJTitle title="거래처내역" />
            <SJGrid ref="grid_tab1" v-model="grid1_tab1.data" :columns="grid1_tab1.columns" />
            <SJTitle title="납품내역">
              <button class="btn-blue-bg">
                거래명세서 발행
              </button>
            </SJTitle>
            <SJGrid ref="grid_tab1" v-model="grid2_tab1.data" :columns="grid2_tab1.columns" :options="grid2_tab1.options" />
          </template>
          <template #tab-2>
            <SJTitle title="거래명세표">
              <button class="btn-blue-bg">
                발행취소
              </button>
              <button class="btn-blue-bg">
                명세표 출력
              </button>
            </SJTitle>
            <SJGrid ref="grid1_tab2" v-model="grid1_tab2.data" :columns="grid1_tab2.columns" />
            <SJTitle title="거래명세표 상세">
              <button class="btn-blue-bg">
                바코드 출력
              </button>
            </SJTitle>
            <SJGrid ref="grid2_tab2" v-model="grid2_tab2.data" :columns="grid2_tab2.columns" />
          </template>
        </SJtab>
      </SJForm>
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
      inputData: {
        coCode: '',
        coType: '',
        coForm: ''
      },
      grid1_tab1: {
        data: {},
        columns: [
          { name: '거래처코드', width: 100 },
          { name: '거래처', width: 120 },
          { name: '납품건', width: 200 }
        ]
      },
      grid2_tab1: {
        data: {},
        columns: [
          { name: 'P/O번호', width: 100 },
          { name: 'P/O#', width: 100 },
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
          { name: '납기요청일', width: 100 },
          { name: '지시', width: 100 },
          { name: '납품수량', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '납품상태', width: 100 }
        ],
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          summary: {
            columnContent: {
              지시: {
                template: (valueMap) => {
                  return `TOTAL:${valueMap.sum}`
                }
              },
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
      },
      grid1_tab2: {
        data: {},
        columns: [
          { name: '거래처코드', width: 100 },
          { name: '거래처', width: 120 },
          { name: '거래명세표번호', width: 200 },
          { name: '등록일', width: 200 },
          { name: '등록자', width: 200 },
          { name: '품목코드', width: 200 },
          { name: '출력여부', width: 200 },
          { name: '비고', width: 100 }
        ]
      },
      grid2_tab2: {
        data: {},
        columns: [
          { name: 'P/O번호', width: 100 },
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
          { name: '지시', width: 100 },
          { name: '납품수량', width: 100 },
          { name: '입고수량', width: 100 },
          { name: '납품상태', width: 100 },
          { name: '거래명세표번호', width: 100 },
          { name: '출력여부', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '비고', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '미발행' },
        { id: 2, title: '발행' }
      ]
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
