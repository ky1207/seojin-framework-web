<template>
  <SJSearchOneLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <SdItem ref="itemPop" />
      <SdHistory ref="historyPop" />
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
      <SJSearchField label="거래처코드">
        <SJInput id="searchCoCode" v-model="search.coCode" name="searchCoCode" />
      </SJSearchField>
      <SJSearchField label="거래처명">
        <SJInput id="searchCoName" v-model="search.coName" name="searchCoName" />
      </SJSearchField>
      <SJSearchField label="품목유형">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '제품',value: '제품'},{text: '반제품',value: '반제품'}]" />
      </SJSearchField>
      <SJSearchField label="품목분류">
        <SJItemCategory id="search2" name="search2" />
      </SJSearchField>
      <SJSearchField label="단가유무">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '있음',value: '있음'},{text: '없음',value: '없음'}]" />
      </SJSearchField>
      <SJSearchField label="사용여부">
        <SJSelect id="searchCoType" name="searchCoType" :options="[{text: '전체',value: '전체'},{text: '사용함',value: '사용함'},{text: '사용안함',value: '사용안함'}]" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="목록">
        <button class="btn-white-bg" @click="itemPop">
          품목
        </button>
        <button class="btn-white-bg" @click="historyPop">
          이력
        </button>
      </SJTitle>
    </template>
    <template #body>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" />
    </template>
  </SJSearchOneLayout>
</template>

<script>
// 메뉴 화면
// 기능권한버튼을 사용하는 경우
import { MENU, ACTION } from '~/mixins'

export default {
  mixins: [MENU, ACTION],
  data () {
    return {
      common: {},
      search: {},
      grid: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '거래처코드' },
          { name: '거래처명' },
          { name: '품목유형' },
          { name: '품목코드' },
          { name: '품목명' },
          { name: '품목코드' },
          { name: 'REV' },
          { name: '규격' },
          { name: 'CE!여부' },
          { name: '크리티컬여부' },
          { name: '크리티컬등급' },
          { name: '기준단위' },
          { name: '통화' },
          { name: '구간시작' },
          { name: '구간종료' },
          { name: '판매단가' },
          { name: '적용시작일' },
          { name: '적용종료일' },
          { name: '사용여부' },
          { name: '비고' }
        ]
      }
    }
  },
  methods: {
    async itemPop () {
      // this.$notify.info('품목별/거래처별 조회 팝업 호출')
      const result = await this.$refs.itemPop.open()
      if (result) {
        console.log('check')
      }
    },
    async historyPop () {
      // 이력팝업
      const result = await this.$refs.historyPop.open()
      if (result) {
        console.log('check')
      }
    },
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
