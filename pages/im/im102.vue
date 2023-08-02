<template>
  <SJSearchLRLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
    </template>
    <template #default>
      <SJSearchField label="사업장">
        <SJSelect
          id="search1"
          disabled-first-message
          name="search1"
          :options="[{text: 'A사업부',value: 'A사업부'},{text: 'B사업부',value: 'B사업부'}]"
        />
      </SJSearchField>
      <SJSearchField label="요청일자">
        <SJPeriodSearch id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="요청번호">
        <SJInput id="search3" name="search2" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="출고잔량">
        <SJSelect
          id="search5"
          disabled-first-message
          name="search5"
          :options="[{text: '전체',value: ''},{text: '없음',value: '1'},{text: '있음',value: '2'}]"
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
          { id: 1, title: '재고현황' },
          { id: 2, title: '출고현황' }
        ]"
      >
        <template #tab-1>
          <SJTitle title="출고상세" />
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="요청수량">
                <SJInput id="form1" name="요청수량" disabled />
              </SJFormField>
              <SJFormField label="출고수량">
                <SJInput id="form2" name="출고수량" disabled />
              </SJFormField>
              <SJFormField label="출고잔량">
                <SJInput id="form3" name="출고잔량" disabled />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="출고일">
                <SJDatePicker id="form4" name="출고일" rules="required" />
              </SJFormField>
              <SJFormField label="출고수량">
                <SJInput id="form5" name="출고수량" rules="required" />
              </SJFormField>
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="예외출고유형">
                <SJSelect
                  id="search5"
                  disabled-first-message
                  name="search5"
                  :options="[{text: 'A/S부품창고',value: '1'},{text: '계획외 출고',value: '2'}
                             ,{text: '예외출고재고조정',value: '3'},{text: '....',value: '4'}]"
                />
              </SJFormField>
              <SJFormField label="코스트센터">
                <SJSelect
                  id="search6"
                  disabled-first-message
                  name="search6"
                  :options="[{text: '반도체지원',value: '1'},{text: '반도체영업',value: '2'}
                             ,{text: '반도체제조',value: '3'},{text: '....',value: '4'}]"
                />
              </SJFormField>
              <SJFormField label="출고방법">
                <SJSelect
                  id="search6"
                  disabled-first-message
                  name="search6"
                  :options="[{text: '선입선출',value: '1'},{text: '바코드적용',value:'2'}]"
                />
              </SJFormField>
            </SJFormRow>
            <SJTitle title="재고현황">
              <button class="btn-blue-bg">
                출고
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
          <SJTitle title="출고현황" />
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
      grid: {
        data: {},
        columns: [
          { name: '등록일', width: 100 },
          { name: '요청번호', width: 150 },
          { name: '종료여부', width: 100 },
          { name: '품목유형', width: 150 },
          { name: '품목코드', width: 150 },
          { name: '품목명', width: 150 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '요청수량', width: 100 },
          { name: '출고수량', width: 100 },
          { name: '요청잔량', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: 'LOT일자', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '창고', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '재고', width: 100 },
          { name: '출고수량', width: 100 },
          { name: '출고대상', width: 150 }
        ]
      },
      grid3: {
        data: {},
        columns: [
          { name: '등록일', width: 100 },
          { name: '출고일', width: 100 },
          { name: 'LOT', width: 150 },
          { name: '창고', width: 100 },
          { name: '기준단위', width: 150 },
          { name: '출고수량', width: 150 }
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
