<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template>
      <SJSearchField label="기준단위코드">
        <SJInput id="md1" v-model="search.md1" name="md1" />
      </sjsearchfield>
      <SJSearchField label="환산단위코드">
        <SJInput id="md2" v-model="search.md2" name="md2" />
      </sjsearchfield>
      <LazySJSearchField label="사용여부">
        <SJSelect id="md3" name="md3" :options="MD_01" />
      </LazySJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="창고정보">
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
          { name: '기준단위코드', width: 150 },
          { name: '환산단위코드', width: 150 },
          { name: '기준계수', width: 150 },
          { name: '변환계수', width: 200 },
          { name: '비고', width: 200 },
          { name: '사용여부', width: 150 }
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
