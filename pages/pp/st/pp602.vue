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
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="창고">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '반도체 재공(화성)',value: '반도체 재공(화성)'},{text: '반도체 작업불량(화성)',value: '반도체 작업불량(화성)'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="양품여부">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '양품',value: '양품'},{text: '불량',value: '불량'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="무재고포함">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '제외',value: '제외'},{text: '포함',value: '포함'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '제품',value: '제품'},{text: '반제품',value: '반제품'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="규격">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="목록" />
    </template>
    <template #left>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>
    <template #right>
      <SJForm ref="form">
        <SJTab :list="tabList">
          <template #tab-1>
            <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
          </template>
          <template #tab-2>
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
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '창고', width: 100 },
          { name: '이월', width: 100 },
          { name: '기초', width: 100 },
          { name: '입고(+)', width: 100 },
          { name: '출고(-)', width: 100 },
          { name: '조정', width: 100 },
          { name: '현재고', width: 100 },
          { name: '기준단위', width: 100 }

        ],
        options: {

        }
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: 'LOT', width: 100 },
          { name: '창고', width: 120 },
          { name: '현재고', width: 200 },
          { name: '양품여부', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '수불유형', width: 100 },
          { name: '입출고일', width: 120 },
          { name: '#', width: 200 },
          { name: '수량', width: 100 },
          { name: '작성일자', width: 100 },
          { name: '작성자', width: 100 },
          { name: '수정일자', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: 'LOT별' },
        { id: 2, title: '이력' }
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
