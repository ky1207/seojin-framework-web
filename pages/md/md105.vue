<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="환율일자">
        <SJInput id="md1" v-model="search.md1" name="md1" />
      </SJSearchField>
      <SJSearchField label="통화코드">
        <SJSelect
          id="md2"
          name="md2"
          :options="MD_01"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="환율정보" />
    </template>
    <template #body>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
        :options="grid.options"
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
      search: {},
      grid: {
        data: {},
        options: {
          header: {
            complexColumns: [
              {
                header: '현찰',
                name: 'mergeColumn1',
                childNames: ['살때', '팔때']
              },
              {
                header: '전신환(송금)',
                name: 'mergeColumn2',
                childNames: ['보낼때', '받을때']
              }
            ]
          }
        },
        columns: [
          {
            name: '등록일시',
            width: 150
          },
          {
            name: '일시',
            width: 100
          },
          {
            name: '순번',
            width: 50
          },
          {
            name: '통화코드',
            width: 100
          },
          {
            name: '통화명',
            width: 100
          },
          {
            name: '살때',
            width: 150
          },
          {
            name: '팔때',
            width: 150
          },
          {
            name: '보낼때',
            width: 150
          },
          {
            name: '받을때',
            width: 150
          },
          {
            name: '매매기준율',
            width: 150
          }
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
        async f1Click () {
          await fnc.$notify.success('IF')
        },
        f1Label: 'IF'
      }
    },
    getMD01 () {
      return [
        {
          text: 'ALL',
          value: 'ALL'
        },
        {
          text: 'KRW',
          value: 'KRW'
        },
        {
          text: 'USD',
          value: 'USD'
        },
        {
          text: 'VND',
          value: 'VND'
        },
        {
          text: '...',
          value: '...'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
