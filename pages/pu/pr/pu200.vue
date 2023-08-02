<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pu201 ref="pu201Pop" />
      <Pu202 ref="pu202Pop" />
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
      <SJSearchField label="구매발주필요일">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>

    <template #left>
      <SJForm ref="form">
        <SJTab :list="tabList">
          <template #tab-1>
            <SJTitle title="단건 구매요청 목록">
              <button class="btn-blue-bg" @click="oneBlocReg">
                거래처 일괄적용
              </button>
            </SJTitle>
            <SJGrid ref="grid_tab1" v-model="grid_tab1.data" :columns="grid_tab1.columns" />
          </template>
          <template #tab-2>
            <SJTitle title="단건 구매요청 목록">
              <button class="btn-blue-bg" @click="pu201Pop">
                그룹적용
              </button>
              <button class="btn-white-bg" @click="groupRemove">
                선택그룹해제
              </button>
              <button class="btn-blue-bg" @click="groupBlocReg">
                그룹일괄적용
              </button>
            </SJTitle>
            <SJGrid ref="grid_tab2" v-model="grid_tab2.data" :columns="grid_tab2.columns" />
          </template>
        </SJtab>
      </SJForm>
    </template>
    <template #rightTitle>
      <SJTitle title="거래처별 목록">
        <button class="btn-blue-bg" @click="pu202Pop">
          품목별거래처
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
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
          { name: '요청번호', width: 100 },
          { name: 'SEQ', width: 100 },
          { name: '그룹코드', width: 100 },
          { name: '거래처', width: 100 },
          { name: '거래처(sub)', width: 100 },
          { name: '배분율', width: 100 },
          { name: '최소구매수량', width: 100 },
          { name: '계산수량', width: 100 },
          { name: '보정수량', width: 100 },
          { name: '주거래처', width: 100 },
          { name: '비고', width: 100 },
          { name: '변경거래처명', width: 100 }
        ]
      },
      grid_tab1: {
        data: {},
        columns: [
          { name: '요청일자', width: 100 },
          { name: '요청번호', width: 100 },
          { name: 'SEQ', width: 100 },
          { name: '구매발주필요일', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '요청수량', width: 100 },
          { name: '수주번호', width: 100 },
          { name: '수주품목명', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '구매단가', width: 100 },
          { name: '요청자', width: 100 },
          { name: '비고', width: 100 }
        ]
      },
      grid_tab2: {
        data: {},
        columns: [
          { name: '그룹코드', width: 100 },
          { name: '납품요청일', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '픔목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '요청수', width: 100 },
          { name: '요청수합계', width: 100 },
          { name: '그룹생성일자', width: 100 },
          { name: '구매단위', width: 100 },
          { name: '구매단가', width: 100 }
        ]
      },
      tabList: [
        { id: 1, title: '단건' },
        { id: 2, title: '그룹' }
      ]
    }
  },

  methods: {
    async oneBlocReg () {
      // 거래처 일괄적용
      await this.$notify.info('거래처 일괄적용')
    },
    async pu201Pop () {
      // 그룹적용
      const result = await this.$refs.pu201Pop.open()
      if (result) {
        console.log('check')
      }
    },
    async groupRemove () {
      // 선택그룹해제
      await this.$notify.info('선택그룹해제')
    },
    async groupBlocReg () {
      // 그룹일괄적용
      await this.$notify.info('그룹일괄적용')
    },
    async pu202Pop () {
      // 품목별 거래처
      const result = await this.$refs.pu202Pop.open()
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
