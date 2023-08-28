<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      기타출고등록
    </template>
    <template #button>
      <button class="btn-blue-bg">
        저장
      </button>
      <button class="btn-white-bg" @click="close">
        닫기
      </button>
    </template>
    <template #default>
      <SJOneLayout disabled-navigator-wrap>
        <template #title>
          <SJTitle title="등록" />
        </template>
        <template #default>
          <SJForm>
            <SJFormRow>
              <SJFormField label="사업장">
                <SJSelect
                  id="md1"
                  name="사업장"
                  :options="MD_01"
                />
              </SJFormField>
              <SJFormField label="담당자">
                TODO:SELECTINPUT
              </SJFormField>
              <SJFormField label="출고일자">
                <SJDatePicker
                  id="md2"
                  name="출고일자"
                  rules="required|max:12"
                />
              </SJFormField>
              <SJFormField label="출고창고">
                <SJSelect
                  id="md3"
                  name="출고창고"
                  :options="MD_02"
                  rules="required|max:12"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="예외출고유형">
                <SJSelect
                  id="md5"
                  name="예외출고유형"
                  :options="MD_03"
                  rules="required|max:12"
                />
              </SJFormField>
              <SJFormField label="코스트센터">
                <SJSelect
                  id="md6"
                  name="코스트센터"
                  :options="MD_04"
                  rules="required|max:12"
                />
              </SJFormField>
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="비고" style="width: 100%;">
                <SJTextarea id="md7" name="비고" />
              </SJFormField>
            </SJFormRow>
          </sjform>
          <SJTitle title="출고 상세">
            <button class="btn-blue-bg">
              LOT 적용
            </button>
            <button class="btn-white-bg">
              삭제
            </button>
          </SJTitle>
          <SJGrid
            ref="grid"
            v-model="grid.data"
            :columns="grid.columns"
            :options="grid.options"
          />
        </template>
      </SJOneLayout>
    </template>
  </SJModal>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      search: {},
      resolve: null,
      reject: null,
      grid: {
        data: {},
        columns: [
          { name: '품목유형', width: 100 },
          { name: '품목코드', width: 100 },
          { name: '품목명', width: 150 },
          { name: 'REV', width: 80 },
          { name: '규격', width: 100 },
          { name: 'CE!여부', width: 80 },
          { name: '크리티컬여부', width: 80 },
          { name: '크리티컬등급', width: 80 },
          { name: '기준단위', width: 100 },
          { name: '수량', width: 80 },
          { name: '현재고', width: 80 },
          { name: '비고', width: 150 }
        ],
        options: {
          bodyHeight: 320
        }
      }
    }
  },
  created () {
    this.options = []
    this.MD_01 = this.getMD01()
    this.MD_02 = this.getMD02()
    this.MD_03 = this.getMD03()
    this.MD_04 = this.getMD04()
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
    getMD03 () {
      return [
        {
          text: 'A/S 부품출고',
          value: 'A/S 부품출고'
        },
        {
          text: '계획외 출고(양산용)',
          value: '계획외 출고(양산용)'
        },
        {
          text: '예외출고재고조정',
          value: '예외출고재고조정'
        },
        {
          text: '실사재고조정',
          value: '실사재고조정'
        },
        {
          text: '...',
          value: '...'
        }
      ]
    },
    getMD04 () {
      return [
        {
          text: '반도체지원(화성)',
          value: '반도체지원(화성)'
        },
        {
          text: '반도체영업(화성)',
          value: '반도체영업(화성)'
        },
        {
          text: '반도체제조(화성)',
          value: '반도체제조(화성)'
        },
        {
          text: '반도체품질(화성)',
          value: '반도체품질(화성)'
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
