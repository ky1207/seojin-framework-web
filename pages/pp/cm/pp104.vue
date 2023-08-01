<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '서진본사',value: '서진본사'},{text: '서진베트남',value: '서진베트남'}]"
          disabled-validation
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="구매그룹코드">
        <SJInput id="c2" v-model="search.md1" name="c2" />
      </SJSearchField>
      <SJSearchField label="구매그룹명">
        <SJInput id="c2" v-model="search.md1" name="c2" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect id="c1" name="c1" :options="[{text: '전체',value: '전체'},{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]" />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="공정별품목" />
    </template>
    <template #left>
      <SJGrid ref="large" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="작업표준서" />
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField label="품목코드">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목코드" disabled />
          </SJFormField>
          <SJFormField label="품목명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="품목명" disabled />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="규격">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="규격" disabled />
          </SJFormField>
          <SJFormField label="라우팅">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="라우팅" disabled />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="재작업">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="재작업" disabled />
          </SJFormField>
          <SJFormField label="공정">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="공정" disabled />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="파일첨부">
            <SJFileUpload2 id="form_files" v-model="inputData.files" name="files" @fileDownload="fileDownload" />
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
      inputData: {
        coCode: '',
        coType: '',
        coForm: ''
      },
      grid: {
        data: {},
        columns: [
          { name: '라우팅명', width: 100 },
          { name: '공정', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '기준단위', width: 100 }
        ]
      }
    }
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
    fileDownload (fileId) {
      this.$api.system.program.downloadHelp(fileId)
    }
  }
}
</script>
