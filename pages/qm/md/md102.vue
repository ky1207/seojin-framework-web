<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="md1"
          name="사업장"
          :options="MD_01"
        />
      </SJSearchField>
      <SJSearchField label="불량코드">
        <SJInput id="md2" v-model="search.md2" name="불량코드" />
      </SJSearchField>
      <SJSearchField label="불량명">
        <SJInput id="md3" v-model="search.md3" name="불량명" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect
          id="md4"
          name="사용여부"
          :options="MD_02"
        />
      </SJSearchField>
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
          { name: '불량코드', width: 150 },
          { name: '불량명', width: 150 },
          { name: '비고', width: 200 },
          { name: '우선순위', width: 150 },
          { name: '사용여부', width: 150 }
        ]
      }
    }
  },
  created () {
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
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
    },
    getMD02 () {
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
