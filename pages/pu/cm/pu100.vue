<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pu101 ref="pu101Pop" />
    </template>
    <template #default>
      <SJSearchField label="회사">
        <SJSelect
          id="searchCompany"
          name=""
          :options="common.USE_YN"
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
        <SJSelect id="c1" name="c1" :options="common.USE_YN" />
      </SJSearchField>
    </template>

    <template #leftTitle>
      <SJTitle title="구매그룹목록" />
    </template>
    <template #left>
      <SJGrid ref="large" v-model="grid.data" :columns="grid.columns" />
    </template>
    <template #rightTitle>
      <SJTitle title="상세">
        <button class="btn-blue-bg">
          신규
        </button>
      </SJTitle>
    </template>
    <template #right>
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField label="회사">
            <SJSelect id="searchCoType" name="회사" :options="common.USE_YN" rules="required" />
          </SJFormField>
          <SJFormField label="사용여부">
            <SJSelect id="searchCoType" name="사용여부" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="구매그룹ID">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="구매그룹ID" rules="required" />
          </SJFormField>
          <SJFormField label="구매그룹명">
            <SJInput id="coCode" v-model="inputData.CO_CODE" name="구매그룸명" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="구매조직">
            <SJSelect id="searchCoType" name="구매조직" :options="common.USE_YN" rules="required" />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="비고">
            <SJTextarea
              id="textarea"
              v-model="inputData.content"
              name="textarea"
              rules="required"
            />
          </SJFormField>
        </SJFormRow>
        <SJTitle title="담당자목록">
          <button class="btn-blue-bg" @click="pu101Pop">
            구매그룹등록
          </button>
          <button class="btn-white-bg" @click="rowDel">
            삭제
          </button>
        </SJTitle>
        <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" />
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
          { name: '구매그룹코드', width: 100 },
          { name: '구매그룹명', width: 100 },
          { name: '구매조직', width: 100 },
          { name: '등록일시', width: 100 },
          { name: '등록자', width: 100 },
          { name: '수정일시', width: 100 },
          { name: '수정자', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '사용자ID', width: 100 },
          { name: '사용자명', width: 100 },
          { name: '비고', width: 400 },
          { name: '사용여부' }
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
    async pu101Pop () {
      // 수주관리 신규등록
      const result = await this.$refs.pu101Pop.open()
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
