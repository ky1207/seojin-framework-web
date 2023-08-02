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
        <SJInput id="search3" name="search3" />
      </SJSearchField>
      <SJSearchField label="품목">
        <SJItemEditor id="search" name="search" />
      </SJSearchField>
      <SJSearchField label="종료여부">
        <SJSelect
          id="search5"
          disabled-first-message
          name="search5"
          :options="[{text: '전체',value: ''},{text: '진행중',value: '1'},{text: '종료',value: '2'}]"
        />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="이동요청" />
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
          { id: 2, title: '이동현황' }
        ]"
      >
        <template #tab-1>
          <SJTitle title="이동상세" />
          <SJForm ref="form">
            <SJFormRow>
              <SJFormField label="요청수량">
                <SJInput id="form1" name="요청수량" disabled />
              </SJFormField>
              <SJFormField label="출고수량">
                <SJInput id="form2" name="이동수량" disabled />
              </SJFormField>
              <SJFormField label="출고잔량">
                <SJInput id="form3" name="이동잔량" disabled />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="이동전품목">
                <SJInput id="form4" name="이동전품목" disabled />
              </SJFormField>
              <SJFormField label="이동후품목">
                <SJInput id="form5" name="이동후품목" disabled />
              </SJFormField>
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="이동일">
                <SJDatePicker id="form6" name="이동일" rules="required" />
              </SJFormField>
              <SJFormField label="이동창고명">
                <SJInput id="form7" name="이동창고명" disabled />
              </SJFormField>
              <SJFormField label="이동방법">
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
                이동
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
          <SJTitle title="이동현황" />
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
          { name: '이동유형', width: 100 },
          { name: '품목유형', width: 150 },
          { name: '품목코드', width: 150 },
          { name: '품목명', width: 150 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '이동후품목', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '이동전창고', width: 150 },
          { name: '이동후창고', width: 150 },
          { name: '요청수량', width: 100 },
          { name: '이동수량', width: 100 },
          { name: '이동잔량', width: 100 }
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
          { name: '이동수량', width: 100 },
          { name: '이동대상', width: 150 }
        ]
      },
      grid3: {
        data: {},
        columns: [
          { name: '등록일', width: 100 },
          { name: '출고일', width: 100 },
          { name: '후LOT', width: 150 },
          { name: '이동창고', width: 100 },
          { name: '기준단위', width: 150 },
          { name: '이동수량', width: 150 }
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
