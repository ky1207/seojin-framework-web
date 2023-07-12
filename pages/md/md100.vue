<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00104')">
        <SJSelect
          id=""
          :options="common.BUSINESS"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="창고유형">
        <SJSelect id="c1" :options="USE_MD" />
      </SJSearchField>
      <SJSearchField label="창고코드">
        <SJInput id="c2" v-model="search.md1" />
      </SJSearchField>
      <SJSearchField label="창고명">
        <SJInput id="c3" v-model="search.md2" />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00004')">
        <SJSelect id="c4" :options="common.USE_YN" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="창고">
        <button class="btn-white-bg">
          {{ $t('page.system.00026') }}
        </button>
        <button class="btn-white-bg">
          {{ $t('page.system.00012') }}
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
  async created () {
    const business = await this.$api.common.getBusinessIds()
    this.common = { BUSINESS: business.data }
    this.common.USE_YN = this.$api.common.getYNCodes()
    this.USE_MD = this.getMDCodes()
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
    getMDCodes () {
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
    }
  }
}
</script>
