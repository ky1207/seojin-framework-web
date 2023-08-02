<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp103 ref="pp103Pop" />
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
      <SJSearchField label="BOM번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="BOM명">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect
          id="md1"
          name="사용여부"
          :options="[{text: '전체',value: '전체'},{text: '사용',value: '사용'},{text: '미사용',value: '미사용'}]"
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="COMPARE" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="BOM" />
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
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 250
        },
        columns: [
          { name: 'BOM번호', width: 100 },
          { name: 'BOM명', width: 200 },
          { name: '사용자명', width: 100 },
          { name: '비고', width: 100 },
          { name: '등록일시', width: 100 },
          { name: '등록자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: 'LV', width: 100 },
          { name: 'Item Num', width: 100 },
          { name: 'Item Desc', width: 200 },
          { name: 'QTY', width: 100 },
          { name: 'UOM', width: 100 },
          { name: 'MG', width: 100 },
          { name: 'Rev', width: 100 }
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
          const result = await this.$refs.pp103Pop.open()
          if (result) {
            console.log('check')
          }
        },
        f2Click: async () => {
          const result = await this.$refs.pp103Pop.open()
          if (result) {
            console.log('check')
          }
        }
      }
    }
  }
}
</script>
