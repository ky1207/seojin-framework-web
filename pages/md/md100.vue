<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="md1"
          name="md1"
          :options="MD_01"
        />
      </SJSearchField>
      <SJSearchField label="창고유형">
        <SJSelect
          id="md2"
          name="md2"
          :options="MD_02"
        />
      </SJSearchField>
      <SJSearchField label="창고코드">
        <SJInput id="md3" v-model="search.md1" name="md3" />
      </SJSearchField>
      <SJSearchField label="창고명">
        <SJInput id="md4" v-model="search.md2" name="md4" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect
          id="md5"
          name="md5"
          :options="MD_03"
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="창고">
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
import { ACTION, MENU } from '~/mixins'
export default {
  mixins: [ACTION, MENU],
  data () {
    return {
      common: {},
      search: {},
      grid: {
        data: {},
        columns: [
          { name: '창고코드', width: 100 },
          { name: '창고명' },
          { name: '창고유형', width: 100 },
          { name: '시외창고', width: 100 },
          { name: '거래처' },
          { name: '부서' },
          { name: '우선순위', width: 100 },
          { name: '가용재고', width: 100 },
          { name: '사용여부', width: 100 }
        ]
      }
    }
  },
  created () {
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
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
      return [{
        text: '자재창고',
        value: '자재창고'
      }, {
        text: '투입대기창고',
        value: '투입대기창고'
      }, {
        text: '제품창고',
        value: '제품창고'
      }, {
        text: '생산창고',
        value: '생산창고'
      }, {
        text: '...',
        value: '...'
      }
      ]
    },
    getMD03 () {
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