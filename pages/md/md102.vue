<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template>
      <SJSearchField label="기준단위코드">
        <SJInput id="md1" v-model="search.md1" name="md2" />
      </SJSearchField>
      <LazySJSearchField label="사용여부">
        <SJSelect
          id="md2"
          name="md2"
          :options="MD_01"
        />
      </lazysjsearchfield>
    </template>
    <template #bodyTitle>
      <SJTitle title="창고정보" />
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
      common: {},
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '기준단위코드', width: 200 },
          { name: '기준단위명', width: 200 },
          { name: '우선순위', width: 200 },
          { name: '사용여부', width: 200 }
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
      return [
        {
          text: '전체',
          value: '전체'
        },
        {
          text: '사용',
          value: '사용'
        },
        {
          text: '미사용',
          value: '미사용'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
