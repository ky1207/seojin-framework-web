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
      <SJSearchField label="New Item">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="Old Item">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="Compare상태">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: 'ALL',value: 'ALL'},{text: 'TRUE',value: 'TRUE'},{text: 'NEW',value: 'NEW'},{text: 'OLD',value: 'OLD'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="Item Num">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="Item Desc">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="MG">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="Rev">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="자재창고 입고 목록" />
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
          { name: 'New Level', width: 100 },
          { name: 'New Num', width: 100 },
          { name: 'New Desc', width: 100 },
          { name: 'UOM', width: 100 },
          { name: 'Qty', width: 100 },
          { name: 'MG', width: 100 },
          { name: 'Rev', width: 100 },
          { name: 'CE', width: 100 },
          { name: 'Cri', width: 100 },
          { name: 'Flag', width: 100 },
          { name: 'Old Level', width: 100 },
          { name: 'Old Num', width: 100 },
          { name: 'Old Desc', width: 100 },
          { name: 'UOM', width: 100 },
          { name: 'MG', width: 100 },
          { name: 'Rev', width: 100 },
          { name: 'CE', width: 100 },
          { name: 'Cri', width: 100 }
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
