<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Sd507 ref="sd507Pop" />
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
      <SJSearchField label="창고">
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="양품여부">
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="무재고">
        <SJSelect
          id="searchCompany"
          name=""
          :options="search.USE_YN"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목분류">
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
      <SJSearchField label="품목">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="재고목록" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="LOT별">
        <button class="btn-white-bg" @click="sd507Pop">
          이력
        </button>
      </SJTitle>
    </template>
    <template #bottom>
      <SJGrid ref="grid_tab1" v-model="grid2.data" :columns="grid2.columns" />
    </template>
  </SJSearchTBLayout>
</template>

<script>
import { ACTION } from '~/mixins'
export default {
  mixins: [ACTION],
  data () {
    return {
      common: {},
      search: {},
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
          bodyHeight: 250
        }
      },
      grid2: {
        data: {},
        columns: [
          { name: 'LOT', width: 100 },
          { name: '창고', width: 120 },
          { name: '현재고', width: 200 },
          { name: '양품여부', width: 100 },
          { name: '검사여부', width: 100 }
        ]
      }
    }
  },
  methods: {
    async sd507Pop () {
      // 출하창고재고이력
      const result = await this.$refs.sd507Pop.open()
      if (result) {
        console.log('check')
      }
    },
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
<style scoped>

</style>
