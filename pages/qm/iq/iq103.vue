<template>
  <SJSearchLRLayout>
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
      <SJSearchField label="부적합등록일자">
        <SJPeriodSearch
          id="md2"
          name="부적합등록일자"
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="md3"
          name="품목유형"
          :options="MD_02"
        />
      </SJSearchField>
      <SJSearchField label="품목">
        TODO:SELECTINPUT
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="md4" name="납품번호" />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="부적합처리목록" />
    </template>
    <template #left>
      <SJGrid
        ref="grid1"
        v-model="grid1.data"
        :columns="grid1.columns"
      />
      <SJTitle title="부적합처리이력" />
      <SJGrid
        ref="grid2"
        v-model="grid2.data"
        :columns="grid2.columns"
      />
    </template>
    <template #rightTitle>
      <SJTitle title="부적합 상세" />
    </template>
    <template #right>
      <SJForm>
        <SJFormRow>
          <SJFormField label="NCR No">
            <SJInput
              id="f1"
              v-model="formcodes.f1"
              name="NCR No"
            />
          </SJFormField>
          <SJFormField label="발생처">
            <SJInput
              id="f2"
              v-model="formcodes.f2"
              name="발생처"
            />
          </SJFormField>
          <SJFormField label="5M1E">
            <SJInput
              id="f3"
              v-model="formcodes.f3"
              name="5M1E"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="검사구분">
            <SJInput
              id="f4"
              v-model="formcodes.f4"
              name="검사구분"
            />
          </SJFormField>
          <SJFormField label="발생일">
            <SJInput
              id="f5"
              v-model="formcodes.f5"
              name="발생일"
              disabled
            />
          </SJFormField>
          <SJFormField label="장비명">
            <SJInput
              id="f6"
              v-model="formcodes.f6"
              name="장비명"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="품목코드">
            <SJInput
              id="f7"
              v-model="formcodes.f7"
              name="품목코드"
              disabled
            />
          </SJFormField>
          <SJFormField label="품목평">
            <SJInput
              id="f8"
              v-model="formcodes.f8"
              name="품목평"
              disabled
            />
          </SJFormField>
          <SJFormField label="LOT">
            <SJInput
              id="f9"
              v-model="formcodes.f9"
              name="LOT"
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="공급사명">
            <SJInput
              id="f10"
              v-model="formcodes.f10"
              name="공급사명"
            />
          </SJFormField>
          <SJFormField label="공급사코드">
            <SJInput
              id="f11"
              v-model="formcodes.f11"
              name="공급사코드"
            />
          </SJFormField>
          <SJFormField label="부적합수량">
            <SJInput
              id="f12"
              v-model="formcodes.f12"
              name="부적합수량"
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="부적합현상">
            <SJInput
              id="f13"
              v-model="formcodes.f13"
              name="부적합현상"
            />
          </SJFormField>
          <SJFormField label="귀책처">
            <SJInput
              id="f14"
              v-model="formcodes.f14"
              name="귀책처"
            />
          </SJFormField>
          <SJFormField label="부적합유형">
            <SJInput
              id="f15"
              v-model="formcodes.f15"
              name="부적합유형"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="담당자">
            <SJInput
              id="f16"
              v-model="formcodes.f16"
              name="담당자"
            />
          </SJFormField>
          <SJFormField label="NCR 발행여부">
            <SJInput
              id="f17"
              v-model="formcodes.f17"
              name="NCR 발행여부"
            />
          </SJFormField>
          <SJFormField label="NCR 발행일">
            <SJDatePicker
              id="f18"
              v-model="formcodes.f18"
              name="NCR 발행일"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="FCID">
            <SJInput
              id="f19"
              v-model="formcodes.f19"
              name="FCID"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="조치사항">
            <SJTextarea
              id="f20"
              v-model="formcodes.f20"
              name="조치사항"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="비고">
            <SJTextarea
              id="f21"
              v-model="formcodes.f21"
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
      grid1: {
        data: {},
        columns: [
          { name: '부적합등록' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: '거래처' },
          { name: 'OLT' },
          { name: 'REV' },
          { name: 'CE!여부' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '기준단위' },
          { name: '품목유형' },
          { name: '규격' },
          { name: '사용자명' },
          { name: '비고' },
          { name: '수정일' },
          { name: '수정자' }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '이력순서' },
          { name: '등록일자' },
          { name: 'NCR No' },
          { name: '발생처' },
          { name: '5M1E' },
          { name: '검사구분' },
          { name: '장비명' },
          { name: '공급사명' },
          { name: '공급사코드' },
          { name: '부적합현상' },
          { name: '귀책처' },
          { name: '부적합유형' },
          { name: '담당자' },
          { name: 'CNR발행여부' },
          { name: 'CNR발생일' },
          { name: '수정일' },
          { name: '수정자' }
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
      return [{
        text: 'A사업부',
        value: 'A사업부'
      }, {
        text: 'B사업부',
        value: 'B사업부'
      }
      ]
    },
    getMD02 () {
      return [
        {
          text: '제품',
          value: '제품'
        },
        {
          text: '반제품',
          value: '반제품'
        },
        {
          text: '원재료',
          value: '원재료'
        },
        {
          text: '저장품',
          value: '저장품'
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
