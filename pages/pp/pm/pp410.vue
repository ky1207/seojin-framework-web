<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp115 ref="pp115Pop" />
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
      <SJSearchField label="지시일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="공정">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="제조오더번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="실적번호">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="FCID">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="작업지시">
        <button class="btn-blue-bg" @click="workCancel">
          작업취소
        </button>
      </SJTitle>
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle />
    <template #bottom>
      <SJTab :list="tabList">
        <template #tab-1>
          <SJTitle title="목록" />
          <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
        </template>
        <template #tab-2>
          <SJTitle title="목록">
            <button class="btn-blue-bg" @click="purchasePut">
              자재투입
            </button>
          </SJTitle>
          <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
        </template>
        <template #tab-3>
          <SJTitle title="목록">
            <button class="btn-blue-bg" @click="workerApply">
              작업자적용
            </button>
            <button class="btn-blue-bg" @click="workerDel">
              삭제
            </button>
          </SJTitle>
          <SJGrid ref="grid_tab3" v-model="grid_tab3.data" :columns="grid_tab3.columns" />
        </template>
        <template #tab-4>
          <SJTitle title="목록">
            <button class="btn-blue-bg" @click="noWork">
              비가동
            </button>
            <button class="btn-blue-bg" @click="noWorkDel">
              삭제
            </button>
          </SJTitle>
          <SJGrid ref="grid_tab3" v-model="grid_tab3.data" :columns="grid_tab3.columns" />
        </template>
      </SJtab>
    </template>
  </sjsearchtblayout>
</template>
  </SJSearchTBLayout>
</template>

<script>
import { MENU, ACTION } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      search: {},
      grid: {
        data: {},
        columns: [
          { name: 'FCID', width: 100 },
          { name: '제조오더번호', width: 100 },
          { name: '실적번호', width: 100 },
          { name: '지시일자', width: 100 },
          { name: '오더상태', width: 100 },
          { name: '공정#', width: 100 },
          { name: '공정', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '소요(분)', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '라인코드', width: 100 },
          { name: '라인', width: 100 },
          { name: '설비명', width: 100 },
          { name: '지시', width: 100 },
          { name: '생산', width: 100 },
          { name: '양품', width: 100 },
          { name: '불량', width: 100 },
          { name: '재작업', width: 100 },
          { name: '최종여부', width: 100 }
        ]
      },
      grid_tab1: {
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
          { name: '기준단위', width: 100 },
          { name: '실적일', width: 100 },
          { name: '양품여부', width: 100 },
          { name: '실적수량', width: 100 },
          { name: '불량명', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '비고', width: 200 }
        ]
      },
      grid_tab2: {
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
          { name: 'LOT', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '불량여부', width: 100 },
          { name: '불량명', width: 100 },
          { name: '수량', width: 100 }
        ]
      },
      grid_tab3: {
        data: {},
        columns: [
          { name: '사용자ID', width: 100 },
          { name: '사용자명', width: 100 },
          { name: '시작일', width: 100 },
          { name: '주/야간', width: 100 },
          { name: '시작(시간)', width: 100 },
          { name: '시작(분)', width: 100 },
          { name: '종료일', width: 100 },
          { name: '종료(시간)', width: 100 },
          { name: '종료(분)', width: 100 }
        ]
      },
      grid_tab4: {
        data: {},
        columns: [
          { name: '비가동명', width: 100 },
          { name: '시작일', width: 100 },
          { name: '시작(시간)', width: 100 },
          { name: '시작(분)', width: 100 },
          { name: '종료일', width: 100 },
          { name: '종료(시간)', width: 100 },
          { name: '종료(분)', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '생산실적' },
        { id: 2, title: '자재투입' },
        { id: 3, title: '작업자' },
        { id: 4, title: '비가동' }
      ]
    }
  },
  created () {
  },
  methods: {
    async workCancel () {
      await this.$notify.info('작업취소')
    },
    async purchasePut () {
      const result = await this.$refs.pp115Pop.open()
      if (result) {
        console.log('check')
      }
    },
    async workerApply () {
      await this.$notify.info('작업자적용')
    },
    async workerDel () {
      await this.$notify.info('삭제')
    },
    async noWork () {
      await this.$notify.info('비가동')
    },
    async noWorkDel () {
      await this.$notify.info('삭제')
    },
    ACTION_REGISTRY () {
      const fnc = this
      return {
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        async saveClick () {
          await fnc.$notify.info('저장')
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
