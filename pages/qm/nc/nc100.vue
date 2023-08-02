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
          class="md-select"
        />
      </SJSearchField>
      <SJSearchField label="발생일">
        <SJPeriodSearch id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="md3"
          name="품목유형"
          :options="MD_02"
          class="md-select"
        />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="md4" name="납품번호" class="md-input" />
      </SJSearchField>
      <SJSearchField label="FCID">
        <SJInput id="md5" name="FCID" class="md-input" />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="부적합 목록" />
    </template>
    <template #left>
      <SJGrid
        ref="grid1"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
    <template #rightTitle>
      <SJTitle title="부적합 상세" />
    </template>
    <template #right>
      <SJForm>
        <SJFormRow>
          <SJFormField label="사업장">
            <SJSelect
              id="f1"
              name="사업장"
              :options="MD_01"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="품목코드">
            <SJInput
              id="f2"
              v-model="formcodes.f2"
              name="품목코드"
              disabled
            />
          </SJFormField>
          <SJFormField label="품명">
            <SJInput
              id="f3"
              v-model="formcodes.f3"
              name="품명"
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="규격">
            <SJInput
              id="f4"
              v-model="formcodes.f4"
              name="규격"
              disabled
            />
          </SJFormField>
          <SJFormField label="LOT">
            <SJInput
              id="f5"
              v-model="formcodes.f5"
              name="LOT"
              disabled
            />
          </SJFormField>
          <SJFormField label="부적합재고">
            <SJInput
              id="f6"
              v-model="formcodes.f6"
              name="부적합재고"
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="발생일자">
            <SJInput
              id="f7"
              v-model="formcodes.f7"
              name="발생일자"
              disabled
            />
          </SJFormField>
          <SJFormField label="불량요인">
            <SJInput
              id="f8"
              v-model="formcodes.f8"
              name="불량요인"
              disabled
            />
          </SJFormField>
          <SJFormField label="창고">
            <SJInput
              id="f9"
              v-model="formcodes.f9"
              name="창고"
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="Z-TAG Serial">
            <SJInput
              id="f10"
              v-model="formcodes.f10"
              name="Z-TAG Serial"
            />
          </SJFormField>
          <SJFormField label="FCID">
            <SJInput
              id="f11"
              v-model="formcodes.f11"
              name="FCID"
            />
          </SJFormField>
          <SJFormField label="FAB">
            <SJInput
              id="f12"
              v-model="formcodes.f12"
              name="FAB"
              disabled
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="고객PO번호">
            <SJInput
              id="f13"
              v-model="formcodes.f13"
              name="고객PO번호"
              disabled
            />
          </SJFormField>
          <SJFormField label="처리구분">
            <SJSelect
              id="f14"
              name="처리구분"
              :options="MD_03"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="부적합잔량">
            <SJInput
              id="f15"
              v-model="formcodes.f15"
              name="부적합잔량"
              rules="required|max:12"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="처리일자">
            <SJDatePicker
              id="f17"
              v-model="formcodes.f17"
              name="처리일자"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="발행부서">
            <SJInput
              id="f18"
              v-model="formcodes.f18"
              name="발행부서"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="이동창고">
            <SJSelect
              id="f19"
              name="이동창고"
              :options="MD_04"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="부적합번호">
            <SJInput
              id="f20"
              v-model="formcodes.f20"
              name="부적합번호"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="부적합유형">
            <SJSelect
              id="f21"
              name="부적합유형"
              :options="MD_05"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="장비유형">
            <SJInput
              id="f22"
              v-model="formcodes.f22"
              name="장비유형"
              rules="required|max:12"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="공급사명">
            <SJInput
              id="f23"
              v-model="formcodes.f23"
              name="공급사명"
              rules="required|max:12"
            />
          </SJFormField>
          <SJFormField label="공급사코드">
            <SJInput
              id="f24"
              v-model="formcodes.f24"
              name="공급사코드"
            />
          </SJFormField>
          <SJFormField label="NCR발행여부">
            <SJInput
              id="f25"
              v-model="formcodes.f25"
              name="NCR발행여부"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="조치사항">
            <SJTextarea
              id="f26"
              v-model="formcodes.f26"
              name="조치사항"
              rules="required|max:12"
            />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="비고">
            <SJTextarea
              id="f27"
              v-model="formcodes.f27"
              name="비고"
            />
          </SJFormField>
        </SJFormRow>
      </SJForm>
      <SJTitle title="부적합처리 현황" />
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
      grid: {
        data: {},
        columns: [
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '거래처', width: 100 },
          { name: 'LOT', width: 100 },
          { name: 'LOT일자', width: 80 },
          { name: 'REV', width: 80 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: '기준단위', width: 80 },
          { name: '양품여부', width: 80 },
          { name: '창고', width: 100 },
          { name: '현재고', width: 80 },
          { name: '품목유형', width: 80 },
          { name: '규격', width: 100 },
          { name: 'FCID', width: 80 },
          { name: 'Fab', width: 80 },
          { name: '고객PO번호', width: 80 },
          { name: 'Z-TAG Serial', width: 80 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: 'LOT', width: 100 },
          { name: '후LOT', width: 100 },
          { name: '처리일자', width: 80 },
          { name: '처리구분', width: 80 },
          { name: '수량', width: 80 },
          { name: '이동창고', width: 100 },
          { name: '비고', width: 200 }
        ]
      }
    }
  },
  created () {
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
    this.MD_04 = this.getMD04()
    this.MD_05 = this.getMD05()
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
    },
    getMD03 () {
      return [
        {
          text: '재처리(양품전환)',
          value: '재처리(양품전환)'
        },
        {
          text: '폐기',
          value: '폐기'
        },
        {
          text: '재작업',
          value: '재작업'
        }
      ]
    },
    getMD04 () {
      return [
        {
          text: '반도체 원자재(화성)',
          value: '반도체 원자재(화성)'
        },
        {
          text: '반도체 재공(화성)',
          value: '반도체 재공(화성)'
        },
        {
          text: '반도체 완제품(화성)',
          value: '반도체 완제품(화성)'
        },
        {
          text: '반도체 원자재불량(화성)',
          value: '반도체 원자재불량(화성)'
        },
        {
          text: '반도체 반품(화성)',
          value: '반도체 반품(화성)'
        },
        {
          text: '...',
          value: '...'
        }
      ]
    },
    getMD05 () {
      return [
        {
          text: 'Painting',
          value: 'Painting'
        },
        {
          text: 'Dent',
          value: 'Dent'
        },
        {
          text: 'Part failed',
          value: 'Part failed'
        },
        {
          text: 'Stain',
          value: 'Stain'
        },
        {
          text: 'Missing',
          value: 'Missing'
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
