<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <LazySJSearchField label="사업장">
        <SJSelect
          id="md1"
          name="md1"
          :options="MD_01"
        />
      </LazySJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="창고정보" />
    </template>
    <template #left>
      <SJGrid
        ref="grid1"
        v-model="grid1.data"
        :columns="grid1.columns"
      />
    </template>
    <template #rightTitle>
      <SJTitle title="창고별 위치">
        <button class="btn-white-bg">
          추가
        </button>
        <button class="btn-white-bg">
          삭제
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJGrid
        ref="grid2"
        v-model="grid2.data"
        :columns="grid2.columns"
      />
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION } from '~/mixins'
export default {
  mixins: [ACTION],
  data () {
    return {
      common: {},
      search: {},
      grid1: {
        data: {},
        columns: [
          { name: '창고코드', width: 100 },
          { name: '창고명' }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '위치유형', width: 100 },
          { name: '위치코드', width: 100 },
          { name: '위치명' },
          { name: '정렬', width: 80 },
          { name: '비고' },
          { name: '사용여부', width: 80 }
        ]
      }
    }
  },
  created () {
    this.MD_01 = this.getMD01()
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
    },
    getMD01 () {
      return [{
        text: 'A사업부',
        value: 'A사업부'
      }, {
        text: 'B사업부',
        value: 'B사업부'
      }
      ]
    }
  }
}
</script>

<style scoped>

</style>
