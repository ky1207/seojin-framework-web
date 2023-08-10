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
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="요청일자">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="제조오더번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="불출지시번호">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="대차">
        <SJInput id="searchCoCode" v-model="search.searchCoCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="공정">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="출고창고">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '반도체원자재',value: '반도체원자재'},{text: '반도체재공',value: '반도체재공'},{text: '반도체완제품',value: '반도체완제품'}]"
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="잔량여부">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '있음',value: '있음'},{text: '없음',value: '없음'}]"
          disabled-first-message
        />
      </SJSearchField>
      <SJSearchField label="작업종료여부">
        <SJSelect
          id="searchCompany"
          name=""
          :options="[{text: '전체',value: '전체'},{text: '진행중',value: '진행중'},{text: '종료',value: '종료'}]"
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="출고요청" />
    </template>
    <template #left>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
    <template #rightTitle>
      <SJTab
        :list="[
          { id: 1, title: '창고자재목록' },
          { id: 2, title: '대차자재목록' }
        ]"
      >
        <template #tab-1>
          <SJTitle title="상세정보" />
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="요청수량">
                <SJInput id="form1" name="요청수량" disabled />
              </SJFormField>
              <SJFormField label="이동수량">
                <SJInput id="form2" name="이동수량" disabled />
              </SJFormField>
              <SJFormField label="요청잔량">
                <SJInput id="form3" name="요청잔량" disabled />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="이동일자">
                <SJDatePicker id="form4" name="이동일자" rules="required" />
              </SJFormField>
              <SJFormField label="LOT분할">
                <SJSelect
                  id="search5"
                  disabled-first-message
                  name="search5"
                  :options="[{text: '자동분할',value: '자동분할'},{text: '지정분할',value: '지정분할'}]"
                />
              </SJFormField>
            </SJFormRow>
            <SJTitle title="자재목록">
              <button class="btn-blue-bg">
                대차이동
              </button>
            </SJTitle>
            <SJGrid
              ref="grid2"
              v-model="grid2.data"
              :columns="grid2.columns"
            />
          </sjform>
        </template>
        <template #tab-2>
          <SJTitle title="대차자재목록">
            <button class="btn-blue-bg">
              이동취소
            </button>
          </SJTitle>
          <SJGrid
            ref="grid3"
            v-model="grid3.data"
            :columns="grid3.columns"
          />
        </template>
      </SJTab>
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
          { name: '제조오더번호', width: 100 },
          { name: '불출지시번호', width: 100 },
          { name: '발행일자', width: 100 },
          { name: '우선순위', width: 100 },
          { name: '공정', width: 100 },
          { name: '출고창고', width: 100 },
          { name: '현장창고', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '규격', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '예약수량', width: 100 },
          { name: '이동수량', width: 100 },
          { name: '불량수량', width: 100 },
          { name: '이동잔량', width: 100 },
          { name: '현재고', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: 'LOT', width: 100 },
          { name: 'LOT입고일', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '현위치', width: 100 },
          { name: '투입단위', width: 100 },
          { name: '이동수량', width: 100 },
          { name: '현재고', width: 100 },
          { name: '이동대상', width: 100 }
        ]
      },
      grid3: {
        data: {},
        columns: [
          { name: '재조오더번호', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 }
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
    }
  }
}
</script>

<style scoped>

</style>
