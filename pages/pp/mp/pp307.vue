<template>
  <SJSearchTBLayout>
    <template #master-btn>
      <SJPageButtons :action="ACTION" />
      <Pp104 ref="pp104Pop" />
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
      <SJSearchField label="계획기간">
        <SJPeriodSearch id="md2" name="md2" />
      </SJSearchField>
      <SJSearchField label="워크센터코드">
        <SJSelect
          id="md1"
          name="BOM사용"
          :options="[{text: '전체',value: '전체'},{text: 'Build bay',value: 'Build bay'}]"
          disabled-first-message
        />
      </SJSearchField>
    </template>
    <template #topTitle>
      <SJTitle title="목록" />
    </template>
    <template #top>
      <SJGrid ref="grid" v-model="grid.data" :columns="grid.columns" :options="grid.options" />
    </template>

    <template #bottomTitle>
      <SJTitle title="생산계획">
        <div style="display: flex;">
          FCID
          <SJInput id="form2" name="FCID" />
          <button class="btn-blue-bg" style="margin-right: 5px;">
            조회
          </button>
          품목코드
          <SJInput id="form2" name="품목코드" />
          <button class="btn-blue-bg" style="margin-right: 5px;">
            조회
          </button>
        </div>
        <button class="btn-blue-bg" @click="confirmCancel">
          확정취소
        </button>
      </SJTitle>
    </template>
    <template #bottom>
      <SJGrid ref="grid" v-model="grid2.data" :columns="grid2.columns" />
    </template>
  </SJSearchTBLayout>
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
          { name: '생산Line', width: 100 },
          { name: '구분', width: 200 },
          { name: '2023-08-01', width: 100 },
          { name: '2023-08-02', width: 100 },
          { name: '2023-08-03', width: 100 },
          { name: '2023-08-04', width: 100 },
          { name: '2023-08-05', width: 100 }
        ]
      },
      grid2: {
        data: {},
        options: {
          rowHeaders: ['checkbox', 'rowNum']
        },
        columns: [
          { name: '수주번호', width: 100 },
          { name: 'FCID', width: 100 },
          { name: '생산계획번호', width: 100 },
          { name: '품목코드', width: 100 },
          { name: 'S/T(분)', width: 100 },
          { name: '라인코드', width: 100 },
          { name: '계획일자', width: 100 },
          { name: '계획종료', width: 100 },
          { name: '변경일자', width: 100 },
          { name: '계획수량', width: 100 },
          { name: '변경수량', width: 100 },
          { name: '2023-08-01', width: 100 },
          { name: '2023-08-02', width: 100 },
          { name: '2023-08-03', width: 100 },
          { name: '2023-08-04', width: 100 },
          { name: '2023-08-05', width: 100 }
        ]
      }
    }
  },
  methods: {
    ACTION_REGISTRY () {
      const fnc = this
      return {
        f1Label: '수정',
        async searchClick () {
          await fnc.$notify.info('조회')
        },
        async saveClick () {
          await fnc.$notify.success('저장')
        },
        // 수정
        f1Click: async () => {
          const result = await this.$refs.pp104Pop.open()
          if (result) {
            console.log('check')
          }
        },
        async confirmCancel () {
          await fnc.$notify.success('확정취소')
        }
      }
    }
  }
}
</script>
