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
      <SJSearchField label="창고">
        <SJSelect
          id="search3"
          disabled-first-message
          name="search3"
          :options="[{text: '전체',value: '전체'},{text: 'A창고',value: 'A창고'}]"
        />
      </SJSearchField>
      <SJSearchField label="양품여부">
        <SJSelect
          id="search3"
          disabled-first-message
          name="search3"
          :options="[{text: 'ALL',value: 'ALL'},{text: '양품',value: '양품'},{text: '불량',value: '불량'}]"
        />
      </SJSearchField>
      <SJSearchField label="무재고">
        <SJSelect
          id="search4"
          disabled-first-message
          name="search4"
          :options="[{text: '제외',value: '제외'},{text: '포함',value: '포함'}]"
        />
      </SJSearchField>
      <SJSearchField label="정렬">
        <SJSelect
          id="search5"
          disabled-first-message
          name="search5"
          :options="[{text: '품목생성일자 ▲',value: '1'},{text: '품목생성일자 ▼',value: '2'},{text: '재고많은순',value: '3'},{text: '재고적은순',value: '4'}]"
        />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect
          id="search6"
          disabled-first-message
          name="search6"
          :options="[{text: '전체',value: ''},{text: '제품',value: '제품'},{text: '반제품',value: '반제품'},{text: '원재료',value: '원재료'}
                     ,{text: '저장품',value: '저장품'},{text: '...',value: '...'}
          ]"
        />
      </SJSearchField>
      <SJSearchField label="품목분류">
        SelectSelect
      </SJSearchField>
      <SJSearchField label="품목">
        <SJInput id="search8" name="search8" />
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="search8" name="search8" />
      </SJSearchField>
    </template>
    <template #leftTitle>
      <SJTitle title="LOT별 재고목록" />
    </template>
    <template #left>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
    <template #rightTitle>
      <SJTitle title="LOT 상세" />
      <SJForm ref="form">
        <SJFormRow>
          <SJFormField label="품목코드">
            <SJInput id="form1" name="품목코드" disabled />
          </SJFormField>
          <SJFormField label="품목명">
            <SJInput id="form2" name="품목명" disabled />
          </SJFormField>
          <SJFormField label="LOT">
            <SJInput id="form3" name="LOT" disabled />
          </SJFormField>
        </SJFormRow>
        <SJFormRow>
          <SJFormField label="창고">
            <SJInput id="form4" name="착고" disabled />
          </SJFormField>
          <SJFormField label="수량">
            <SJInput id="form5" name="수샹" disabled />
          </SJFormField>
          <SJFormField />
        </SJFormRow>
      </SJForm>
      <SJForm>
        <SJFormRow>
          <SJFormField label="분할LOT수(장)">
            <div style="display: flex;">
              <SJInput id="form1" name="분할LOT수(장)" />
              <button class="btn-blue-bg" style="margin-right: 5px;">
                분할
              </button>
            </div>
          </SJFormField>
          <SJFormField label="분할수량(EA)">
            <div style="display: flex;">
              <SJInput id="form2" name="분할수량(EA)" />
              <button class="btn-blue-bg" style="margin-right: 5px;">
                분할
              </button>
            </div>
          </SJFormField>
          <SJFormField label="2분할수량(EA)">
            <div style="display: flex;">
              <SJInput id="form3" name="분할수량(EA)" />
              <button class="btn-blue-bg" style="margin-right: 5px;">
                분할
              </button>
            </div>
          </SJFormField>
        </SJFormRow>
      </SJForm>
    </template>
    <template #right>
      <SJTitle title="분할 LOT" />
      <SJGrid
        ref="grid2"
        v-model="grid2.data"
        :columns="grid2.columns"
        :options="grid2.options"
      />

      <SJTitle title="분할 이력" />
      <SJGrid
        ref="grid3"
        v-model="grid3.data"
        :columns="grid3.columns"
        :options="grid3.options"
      />
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
          { name: '품목유형', width: 150 },
          { name: '품목코드', width: 150 },
          { name: '품목명', width: 150 },
          { name: 'REV', width: 100 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 100 },
          { name: '크리티컬여부', width: 100 },
          { name: '크리티컬등급', width: 100 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '양품여', width: 100 },
          { name: '기준단위', width: 100 },
          { name: '현재고', width: 100 }
        ]
      },
      grid2: {
        data: {},
        columns: [
          { name: '품목코드', width: 100 },
          { name: '품명', width: 150 },
          { name: '입고일', width: 100 },
          { name: '창고', width: 150 },
          { name: 'LOT', width: 100 },
          { name: '수량', width: 100 }
        ],
        options: {
          bodyHeight: 150
        }
      },
      grid3: {
        data: {},
        columns: [
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 100 },
          { name: '분할일자', width: 150 },
          { name: '창고', width: 100 },
          { name: '상위LOT', width: 150 },
          { name: 'LOT', width: 150 },
          { name: '재고', width: 100 },
          { name: '수량', width: 100 }
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
