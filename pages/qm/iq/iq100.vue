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
      <SJSearchField label="납품일">
        <SJDatePicker
          id="md2"
          name="납품일"
          show-current="true"
        />
        <div>~</div>
        <SJDatePicker
          id="md2"
          name="납품일"
          show-current="true"
        />
      </SJSearchField>
      <SJSearchField label="납품번호">
        <SJInput id="md3" v-model="search.md3" name="납품번호" />
      </sjsearchfield>
      <SJSearchField label="LOT번호">
        <SJInput id="md4" v-model="search.md4" name="LOT번호" />
      </sjsearchfield>
      <SJSearchField label="품목">
        TODO:SELECTSELECT
      </sjsearchfield>
      <SJSearchField label="검사잔량">
        TODO:radio
      </sjsearchfield>
    </template>
    <template #body>
      <SJTitle title="입고검사" />
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
          { name: '납품일자' },
          { name: '검사일자' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: '거래처' },
          { name: 'REV', width: 80 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬등급' },
          { name: '검사방법' },
          { name: 'LOT' },
          { name: '입고수량', width: 80 },
          { name: '검사수량' },
          { name: '입고잔량' },
          { name: '구매단위' },
          { name: '검사결과' },
          { name: '품목유형' }
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
          await fnc.$notify.info('입고검사')
        },
        f1Label: '입고검사'
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
