<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template>
      <SJSearchField label="채번유형코드">
        <SJInput id="md1" v-model="search.md1" name="md1" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="수량포맷정보">
        <button class="btn-white-bg">
          추가
        </button>
        <button class="btn-white-bg">
          삭제
        </button>
      </SJTitle>
    </template>
    <template #body>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
  </SJSearchOneLayout>
</template>

<script>
import { ACTION } from '~/mixins'

export default {
  mixins: [ACTION],
  data () {
    return {
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '채번유형코드' },
          { name: '채번명' },
          { name: '최대길이' },
          { name: '접두사' },
          { name: '날짜유형' },
          { name: '채번증가수' },
          { name: '숫자최대길이' },
          { name: '상세정보' },
          { name: '날짜정보' },
          { name: '숫자' },
          { name: '최종채번번호' }
        ]
      }
    }
  },
  created () {
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

<style scoped>

</style>
