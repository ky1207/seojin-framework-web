<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp105 ref="pp105Pop" />
      <SdItem ref="itemPop" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="md1"
          name="회사"
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="md4" name="품목" />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="목록" />
    </template>
    <template #left>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="품목정보" />
    </template>
    <template #right>
      <SJForm>
        <SJFormRow>
          <SJFormField label="회사">
            <SJInput
              id="f1"
              v-model="setData.f1"
              name="회사"
            />
          </SJFormField>
          <SJFormField label="규격">
            <SJInput
              id="f2"
              v-model="setData.f2"
              name="규격"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="품목코드">
            <SJInput
              id="f1"
              v-model="setData.f1"
              name="품목코드"
            />
          </SJFormField>
          <SJFormField label="품명">
            <SJInput
              id="f2"
              v-model="setData.f2"
              name="품명"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="비고">
            <SJTextarea
              id="f21"
              v-model="setData.f21"
              name="비고"
            />
          </SJFormField>
        </SJFormRow>
        <SJTitle title="공정">
          <button class="btn-blue-bg" @click="routingSet">
            라우팅적용
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" :options="grid2.options" />
        <SJTitle title="BOM">
          <button class="btn-blue-bg" @click="bomSet">
            설계BOM적용
          </button>
          <button class="btn-blue-bg" @click="bomCopy">
            BOM복사
          </button>
          <button class="btn-blue-bg" @click="itemSet">
            품목적용
          </button>
          <button class="btn-white-bg" @click="rowDel">
            삭제
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid3.data" :columns="grid3.columns" :options="grid3.options" />
      </SJForm>
    </template>
  </SJSearchLRLayout>
</template>

<script>
import { ACTION } from '~/mixins'
export default {
  mixins: [ACTION],
  data () {
    return {
      search: {},
      setData: {},
      grid: {
        data: {},
        columns: [
          { name: '레벨' },
          { name: 'PATH' },
          { name: '품목명' }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 150
        },
        columns: [
          { name: '공정#', width: 100 },
          { name: '공정', width: 100 },
          { name: '후공정#', width: 100 },
          { name: 'C/T(분)', width: 100 },
          { name: '워크센터명', width: 100 },
          { name: '워크센터구분', width: 100 },
          { name: '거래처', width: 100 },
          { name: '실적여부', width: 100 },
          { name: '최종공정', width: 100 },
          { name: '비고', width: 100 }
        ]
      },
      grid3: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum'],
          bodyHeight: 150
        },
        columns: [
          { name: '공정#', width: 100 },
          { name: '투입공정', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '소요량', width: 100 },
          { name: 'LOSS(%)', width: 100 },
          { name: 'LOSS', width: 100 },
          { name: '총소요량', width: 100 },
          { name: '비고', width: 200 },
          { name: '우선순위', width: 100 }
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
    },
    async routingSet () {
      await this.$notify.success('라우팅 적용')
    },
    async bomSet () {
      await this.$notify.success('설계BOM적용')
    },
    async bomCopy () {
      const result = await this.$refs.pp105Pop.open()
      if (result) {
        console.log('check')
      }
    },
    async itemSet () {
      const result = await this.$refs.itemPop.open()
      if (result) {
        console.log('check')
      }
    },
    async rowDel () {
      await this.$notify.success('삭제')
    }
  }
}
</script>

<style scoped>

</style>
