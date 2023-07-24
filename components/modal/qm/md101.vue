<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      그룹별품목 일괄등록
    </template>
    <template #button>
      <button class="btn-gray-bg">
        조회
      </button>
      <button class="btn-blue-bg">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJTitle title="기준정보" />
      <SJSearchOneLayout disabled-navigator-wrap>
        <template #default>
          <SJSearchField label="사업장">
            <SJSelect
              id="md1"
              name="사업장"
              :options="MD_01"
              class="md-select"
            />
          </SJSearchField>
          <SJSearchField label="품목유형">
            <SJSelect
              id="md2"
              name="품목유형"
              :options="MD_02"
              class="md-select"
            />
          </SJSearchField>
          <SJSearchField label="품목분류">
            TODO:SELECTSELECT
          </SJSearchField>
          <SJSearchField label="그룹코드">
            <SJInput id="md3" v-model="search.md3" name="그룹코드" class="md-input" />
          </SJSearchField>
          <SJSearchField label="품목">
            TODO:SELECTSELECT
          </SJSearchField>
          <SJSearchField label="생성일">
            <SJDatePicker
              id="md4"
              name="생성일"
            />
            <div>~</div>
            <SJDatePicker
              id="md4"
              name="생성일"
            />
          </SJSearchField>
        </template>
        <template #body>
          <SJTitle title=" EXCEL (행추가 후 항목수에 맡게 붙여넣기, key값 새로 부여-신규등록시 사용)">
            <button class="btn-blue-bg">
              VALIDATION
            </button>
            <button class="btn-white-bg">
              추가
            </button>
            <button class="btn-white-bg">
              삭제
            </button>
          </SJTitle>
          <SJGrid
            ref="grid"
            v-model="grid.data"
            :columns="grid.columns"
          />
        </template>
      </SJSearchOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  data () {
    return {
      search: {},
      resolve: null,
      reject: null,
      grid: {
        data: {},
        columns: [
          { name: '검사그룹코드', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '비고', width: 200 },
          { name: '정렬', width: 80 },
          { name: '사용여부', width: 80 },
          { name: '생성일', width: 100 }
        ]
      }
    }
  },
  created () {
    this.options = []
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
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
<style>
</style>
