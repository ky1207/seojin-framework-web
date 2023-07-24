<template>
  <SJSearchOneLayout>
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
      <SJSearchField label="처리일자">
        <SJDatePicker
          id="md2"
          name="처리일자"
        />
        <div>~</div>
        <SJDatePicker
          id="md2"
          name="처리일자"
        />
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
        TODO:SELECTINPUT
      </SJSearchField>
      <SJSearchField label="LOT">
        <SJInput id="md4" name="납품번호" class="md-input" />
      </SJSearchField>
      <SJSearchField label="FCID">
        <SJInput id="md5" name="FCID" class="md-input" />
      </SJSearchField>
    </template>
    <template #bodyTitle>
      <SJTitle title="부적합처리 목록" />
    </template>
    <template #body>
      <SJGrid
        ref="grid"
        v-model="grid.data"
        :columns="grid.columns"
      />
    </template>
  </SJSearchOneLayout>
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
          { name: '발생일자', width: 100 },
          { name: '장비유형', width: 100 },
          { name: '품목코드', width: 150 },
          { name: '품목명', width: 150 },
          { name: '공급사', width: 80 },
          { name: '공급사코드', width: 80 },
          { name: '처리수량', width: 80 },
          { name: '기준단위', width: 80 },
          { name: '부적합유형', width: 80 },
          { name: 'REV', width: 80 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 100 },
          { name: 'LOT', width: 150 },
          { name: '후LOT', width: 150 },
          { name: '이동창고', width: 80 },
          { name: '부적합번호', width: 80 },
          { name: '조치사항', width: 200 },
          { name: '발생부서', width: 80 },
          { name: '양품여부', width: 80 },
          { name: '사용자명', width: 80 },
          { name: '처리구분', width: 80 },
          { name: '처리일자', width: 80 },
          { name: 'NCR발행여부', width: 80 },
          { name: '수정일', width: 150 },
          { name: '품목유형', width: 80 },
          { name: '규격', width: 80 },
          { name: 'FCID', width: 80 },
          { name: 'Fab', width: 80 },
          { name: '고객PO번호', width: 80 },
          { name: 'Z-TAG Serial', width: 80 },
          { name: '비고', width: 200 }
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
