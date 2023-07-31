<template>
  <SJSearchLRLayout>
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
      <SJSearchField label="납기일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="수주번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="FCST번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="요청번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="고객PO">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
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
      <SJSearchField label="거래처">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="진행상태">
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="출하요청" />
    </template>
    <template #left>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>
    <template #right>
      <SJForm ref="form">
        <SJTab :list="tabList">
          <template #tab-1>
            <SJTitle title="출하상세" />
            <SJFormRow>
              <SJFormField label="거래처">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="거래처" />
              </SJFormField>
              <SJFormField label="요청수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="요청수량" />
              </SJFormField>
              <SJFormField label="출하수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="출하수량" />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="출하잔량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="출하잔량" />
              </SJFormField>
              <SJFormField label="출하방법">
                <SJSelect
                  id="searchCompany"
                  name=""
                  :options="common.USE_YN"
                  disabled-validation
                  disabled-first-message
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="출하창고">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="출하창고" />
              </SJFormField>
              <SJFormField label="출하일">
                <SJDatePicker
                  id="sentStartDtm"
                  v-model="search.sentStartDtm"
                  name="출하일"
                  show-current="true"
                  disabled-validation
                  rules="required"
                />
              </SJFormField>
              <SJFormField label="출하수량">
                <SJInput id="coCode" v-model="inputData.CO_CODE" name="출하수량" rules="required" />
              </SJFormField>
            </SJFormRow>
            <SJTitle title="창고재고">
              <button class="btn-blue-bg">
                재품출하
              </button>
            </SJTitle>
            <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
          </template>
          <template #tab-2>
            <SJTitle title="출하현황">
              <button class="btn-blue-bg">
                출하취소
              </button>
            </SJTitle>
            <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
          </template>
        </SJtab>
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      common: {},
      search: {},
      inputData: {
        coCode: '',
        coType: '',
        coForm: ''
      },
      grid: {
        data: {},
        columns: [
          { name: '요청일자', width: 100 },
          { name: '출고요청번호', width: 100 },
          { name: '수주번호', width: 100 },
          { name: '진행상태', width: 100 },
          { name: '거래처', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '창고', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '요청수량', width: 100 },
          { name: '출하수량', width: 100 },
          { name: '요청잔량', width: 100 },
          { name: '고객PO번호', width: 100 }

        ],
        options: {

        }
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '불량코드', width: 100 },
          { name: '불량명', width: 120 },
          { name: '비고', width: 200 },
          { name: '사용여부', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '창고재고' },
        { id: 2, title: '출하현황' }
      ]
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
