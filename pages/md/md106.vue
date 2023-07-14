<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="공장코드">
        <SJInput id="md1" v-model="search.md1" name="md1" />
      </SJSearchField>
      <SJSearchField label="공장명">
        <SJInput id="md2" v-model="search.md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect
          id="md3"
          name="md3"
          :options="MD_01"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="공장" />
    </template>
    <template #left>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
    <template #rightTitle>
      <SJTitle title="공장 상세">
        <button class="btn-blue-bg">
          신규공장
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm>
        <SJFormRow>
          <SJFormField label="공장코드">
            <SJInput
              id="f1"
              v-model="formcodes.f1"
              name="공장코드"
              rules="required|max:12"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="공장명">
            <SJInput
              id="f2"
              v-model="formcodes.f2"
              name="공장명"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="사업장">
            <SJSelect
              id="f3"
              v-model="formcodes.f3"
              name="사업장"
              rules="required|max:12"
              :options="MD_02"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="담당자명">
            <SJInput
              id="f4"
              v-model="formcodes.f4"
              name="담당자명"
            />
          </SJFormField>
          <SJFormField label="담당자이메일">
            <SJInput
              id="f5"
              v-model="formcodes.f5"
              name="담당자이메일"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="담당자연락처">
            <SJInput
              id="f6"
              v-model="formcodes.f6"
              name="담당자연락처"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="정렬">
            <SJStepper
              id="f7"
              v-model="formcodes.f7"
              name="정렬"
              rules="required|min_value:1"
            />
          </SJFormField>
          <SJFormField label="사용여부">
            <SJSelect
              id="f8"
              v-model="formcodes.f8"
              name="사용여부"
              rules="required|max:12"
              :options="MD_01"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="우편번호">
            <SJInput
              id="f9"
              v-model="formcodes.f9"
              name="우편번호"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="주소">
            <SJInput
              id="f10"
              v-model="formcodes.f10"
              name="주소"
            />
            <SJInput
              id="f11"
              v-model="formcodes.f11"
              name="주소"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="영문주소">
            <SJInput
              id="f12"
              v-model="formcodes.f12"
              name="영문주소"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="비고">
            <SJTextarea
              id="f13"
              v-model="formcodes.f13"
              name="비고"
            />
          </SJFormField>
        </SJFormRow>
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
      formcodes: {},
      grid: {
        data: {},
        columns: [
          { name: '사업장' },
          { name: '공장코드' },
          { name: '공장명' },
          { name: '담당자명' },
          { name: '담당장연락처' },
          { name: '사용여부' }
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
    },
    getMD02 () {
      return [
        {
          text: 'A사업부',
          value: 'A사업부'
        },
        {
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
