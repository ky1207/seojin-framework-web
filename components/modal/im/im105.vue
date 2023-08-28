<template>
  <SJModal ref="modal" size="modal-xl">
    <template #title>
      재고실상등록
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
              <SJFormField label="실사번호">
                <SJInput id="md2" v-model="search.md2" name="실사번호" disabled />
              </SJFormField>
              <SJFormField label="등록일자">
                <SJDatePicker
                  id="md3"
                  name="등록일자"
                  rules="required|max:12"
                />
              </SJFormField>
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="실사창고">
                <SJSelect
                  id="md4"
                  name="실사창고"
                  :options="MD_02"
                  rules="required|max:12"
                />
              </SJFormField>
              <SJFormField />
              <SJFormField />
              <SJFormField />
            </SJFormRow>
            <SJFormRow>
              <SJFormField label="비고" style="width: 100%;">
                <SJTextarea id="md5" name="비고" />
              </SJFormField>
            </SJFormRow>
          </sjform>
          <SJTitle title="실사 상세">
            <button class="btn-blue-bg">
              LOT적용
            </button>
            <button class="btn-blue-bg">
              품목정보 적용
            </button>
            <button class="btn-white-bg">
              일괄등록
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
          { name: '기준단위', width: 80 },
          { name: '창고', width: 100 },
          { name: 'LOT', width: 100 },
          { name: '후LOT', width: 100 },
          { name: '이동수량', width: 80 },
          { name: '현재고', width: 80 },
          { name: '비고', width: 200 }
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
    }
  }
}
</script>
