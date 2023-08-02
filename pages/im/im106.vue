<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Im104 ref="imModal" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="search1"
          disabled-first-message
          name="search1"
          :options="[{text: 'A사업부',value: 'A사업부'},{text: 'B사업부',value: 'B사업부'}]"
        />
      </SJSearchField>
      <SJSearchField label="등록일">
        <SJPeriodSearch id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="이동번호">
        <SJInput id="search3" name="search2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="기타이동" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="기타이동 상세" />
    </template>
    <template #bottom>
      <SJGrid ref="grid_detail" v-model="grid_detail.data" :columns="grid_detail.columns" />
    </template>
  </SJSearchTBLayout>
</template>

<script>
import { ACTION, MENU } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      grid: {
        data: {},
        columns: [
          { name: '이동번호', width: 100 },
          { name: '등록일', width: 150 },
          { name: '사용자명', width: 100 },
          { name: '이동유형', width: 100 },
          { name: '이동전창고', width: 150 },
          { name: '이동후창고', width: 150 },
          { name: '이동전품목', width: 150 },
          { name: '이동후품목', width: 150 },
          { name: '품목(수)', width: 100 },
          { name: '수정일', width: 150 },
          { name: '수정자', width: 100 }
        ],
        options: {
          bodyHeight: 250
        }
      },
      grid_detail: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 120 },
          { name: '품목명', width: 200 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '후LOT', width: 100 },
          { name: '이동수량', width: 100 },
          { name: '현재고', width: 100 },
          { name: '비고', width: 300 }
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
        f1Click: async () => {
          const result = await this.$refs.imModal.open()
          if (result) {
            console.log(result)
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
