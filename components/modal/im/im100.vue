<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      기타입고등록
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
                <SJUserEditor id="user" name="user" />
              </SJFormField>
              <SJFormField label="입고일자">
                <SJDatePicker
                  id="md2"
                  name="입고일자"
                />
              </SJFormField>
              <SJFormField label="입고창고">
                <SJSelect
                  id="md3"
                  name="입고창고"
                  :options="MD_02"
                  rules="required|max:12"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="비고">
                <SJTextarea id="md4" name="비고" />
              </SJFormField>
            </SJFormRow>
          </SJForm>
          <SJTitle title="입고상세">
            <button class="btn-blue-bg">
              품목정보적용
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
          { name: '양품여부', width: 100 },
          { name: 'LOT', width: 100 },
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
          text: '수입검사',
          value: '수입검사'
        },
        {
          text: '출하검사',
          value: '출하검사'
        },
        {
          text: '공정검사',
          value: '공정검사'
        }
      ]
    }
  }
}
</script>
