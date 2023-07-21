<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="대분류명">
        <SJInput id="md1" v-model="search.md1" name="md1" />
      </SJSearchField>
      <SJSearchField label="소분류명">
        <SJInput id="md2" v-model="search.md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect
          id="md3"
          name="md3"
          :options="MD_01"
        />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="품목대분류" />
    </template>
    <template #left>
      <SJGrid
        ref="grid1"
        v-model="grid1.data"
        :columns="grid1.columns"
      />
    </template>
    <template #rightTitle>
      <SJTitle title="대분류 상세" />
    </template>
    <template #right>
      <SJForm>
        <SJFormRow>
          <SJFormField label="대분류코드">
            <SJInput
              id="f1"
              v-model="formcodes.f1"
              name="대분류코드"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="대분류명">
            <SJInput
              id="f2"
              v-model="formcodes.f2"
              name="대분류명"
              rules="required|max:12"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="대분류코드">
            <SJSelect
              id="f3"
              name="대분류코드"
              :options="MD_01"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="정렬">
            <SJInput
              id="f4"
              v-model="formcodes.f4"
              name="정렬"
            />
          </SJFormField>
        </SJFormRow>
      </SJForm>
      <SJTitle title="권한그룹별 사용자">
        <button class="btn-white-bg">
          추가
        </button>
        <button class="btn-white-bg">
          삭제
        </button>
      </SJTitle>
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
      search: {},
      formcodes: {},
      grid1: {
        data: {},
        columns: [
          { name: '대분류코드' },
          { name: '대분류명' },
          { name: '정렬' },
          { name: '사용여부' }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '소분류코드' },
          { name: '소분류명' },
          { name: '정렬', width: 80 },
          { name: '비고' },
          { name: '사용여부' }
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
          text: 'ALL',
          value: 'ALL'
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
