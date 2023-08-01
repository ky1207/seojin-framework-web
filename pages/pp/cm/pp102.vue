<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd201 ref="sd201Pop" />
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
      <SJSearchField label="비가동코드">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="비가동명">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="비가동항목">
        <button class="btn-white-bg" @click="appendRow">
          추가
        </button>
        <button class="btn-white-bg" @click="rowDel">
          삭제
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
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '비가동코드', width: 100 },
          { name: '비가동명', width: 100 },
          { name: '비고', width: 300 },
          { name: '우선순위', width: 100 },
          { name: '사용여부', width: 100 }
        ]
      }
    }
  },
  methods: {
    appendRow () {
      // row 추가
      this.$refs.grid.invoke('appendRow')
    },
    async rowDel () {
      // row 삭제
      await this.$notify.info('row 삭제')
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
