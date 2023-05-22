<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField :label="$t('page.system.00108')">
        <SJInput id="bsnsCode" v-model="search.bsnsCode" :name="$t('page.system.00108')" disabled-validation />
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00109')">
        <SJInput id="bsnsName" v-model="search.bsnsName" :name="$t('page.system.00109')" disabled-validation>
          />
        </sjinput>
      </SJSearchField>
      <SJSearchField :label="$t('page.system.00004')">
        <SJSelect id="useYN" v-model="search.useFlag" :name="$t('page.system.00004')" :options="common.USE_YN" disabled-validation />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle :title="$t('page.system.00104')" />
    </template>
    <template #left>
      <SJGrid ref="business" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle :title="$t('page.system.00110')" />
    </template>
    <template #right>
      <SJForm>
        <SJFormRow>
          <SJFormField label="사업장코드">
            <SJInput id="companyId" name="사업장코드" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="사업장명">
            <SJInput id="companyName" name="사업장명" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="영문사업장명">
            <SJInput id="cp_Num" name="사업장번호" />
          </SJFormField>
          <SJFormField label="사업자번호">
            <SJInput id="cp_coNum" name="사업자번호" />
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
          <SJFormField label="사업장 전화">
            <SJInput id="cp_tel" name="사업장 전화" />
          </SJFormField>
          <SJFormField label="사업장 FAX">
            <SJInput id="cp_fax" name="사업장 FAX" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="개업일자">
            <SJDatePicker id="cp_day" name="개업일자" />
          </SJFormField>
          <SJFormField label="언어">
            <SJSelect id="cp_lang" name="언어" rules="required" :options="common.LANGUAGES" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="정렬">
            <SJInput id="cp_sort" name="정렬" rules="required" />
          </SJFormField>
          <SJFormField label="사용여부">
            <SJSelect id="cn_ame" name="사용여부" rules="required" :options="common.USE_YN" />
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
          <SJFormField label="비고">
            <SJInput id="cp_code" name="코드약어" rules="required" />
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
      common: {},
      search: {},
      businessCode: {
      },
      grid: {
        data: {},
        columns: [
          { name: 'bsnsCode' },
          { name: 'bsnsName' },
          { name: 'biznum' },
          { name: 'repName' },
          { name: 'useFlag' }
        ]
      }
    }
  },
  created () {
    this.common.USE_YN = this.$api.common.getYNCodes()
    this.common.LANGUAGES = this.$api.common.getLanguageCode()
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
