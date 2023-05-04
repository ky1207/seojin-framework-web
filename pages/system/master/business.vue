<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="회사코드">
        <SJInput id="form_bsnsCode" v-model="search.bsnsCode" name="사업자코드" />
      </SJSearchField>
      <SJSearchField label="사업장명">
        <SJInput id="form_bsnsName" v-model="search.bsnsName" name="사업장명" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect id="useYN" name="사용여부" />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="회사" />
    </template>
    <template #left>
      <SJGrid v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="회사상세" />
    </template>
    <template #right>
      <SJForm>
        <SJFormRow>
          <SJFormField label="사업자코드">
            <SJInput id="companyId" name="회사코드" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="사업장명">
            <SJInput id="companyName" name="회사명" />
          </SJFormField>
          <SJFormField label="영문회사명">
            <SJInput id="cp_engName" name="영문회사명" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="사업자번호">
            <SJInput id="cp_Num" name="사업자번호" />
          </SJFormField>
          <SJFormField label="법인번호">
            <SJInput id="cp_coNum" name="법인번호" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="대표자명">
            <SJInput id="cp_coName" name="대표자명" />
          </SJFormField>
          <SJFormField label="담당자 이메일">
            <SJInput id="cp_email" name="담당자 이메일" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="회사 전화">
            <SJInput id="cp_tel" name="회사 전화" />
          </SJFormField>
          <SJFormField label="회사 FAX">
            <SJInput id="cp_fax" name="회사 FAX" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="설립일">
            <SJDatePicker id="cp_day" name="설립일" />
          </SJFormField>
          <SJFormField label="업태">
            <SJInput id="cp_business" name="업태" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="종목">
            <SJInput id="cp_event" name="종목" />
          </SJFormField>
          <SJFormField label="언어">
            <SJInput id="cp_lang" name="언어" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="정렬">
            <SJInput id="cp_sort" name="정렬" rules="required" />
          </SJFormField>
          <SJFormField label="사용여부">
            <SJInput id="cn_ame" name="사용여부" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="주소">
            <SJInput id="cp_add" name="주소" />
            <SJInput id="cp_add" name="주소" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="영문주소">
            <SJInput id="cp_engAdd" name="영문주소" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="코드약어">
            <SJInput id="cp_code" name="코드약어" rules="required" />
          </SJFormField>
          <SJFormField label="로고파일명">
            <SJInput id="cp_file" name="회사코드" rules="required" />
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
  </SJSearchLRLayout>
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
        columns: [
          { name: 'bsnsCode', header: '사업장코드' },
          { name: 'bsnsName', header: '사업장명' },
          { name: 'useFlag', header: '사용여부' }
        ]
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      return {
        f1Label: 'f1',
        f2Label: 'f2',
        f3Label: 'f3',
        f4Label: 'f4',
        f5Label: 'f5',
        searchClick: async () => {
          const result = await this.$api.system.business.list(this.search)
          this.grid.data = result.data
        },
        saveClick: () => {
          this.$notify.info('saveClick')
        },
        delClick: () => {
          this.$notify.error('delClick')
        },
        f1Click: () => {
          this.$notify.warning('f1Click')
        },
        f2Click: () => {
          this.$notify.warning('f2Click')
        },
        f3Click: () => {
          this.$notify.warning('f3Click')
        },
        f4Click: () => {
          this.$notify.warning('f4Click')
        },
        f5Click: () => {
          this.$notify.warning('f5Click')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
